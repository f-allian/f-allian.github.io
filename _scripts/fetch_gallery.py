"""
Fetch photos from Dropbox folder and extract metadata for gallery.
This script is run during GitHub Actions build process.
"""

import os
import json
import dropbox
from dropbox.files import FileMetadata
from datetime import datetime
from PIL import Image
from PIL.ExifTags import TAGS
from io import BytesIO
from dotenv import load_dotenv
import requests
import time

load_dotenv()

# Configuration
DROPBOX_ACCESS_TOKEN = os.environ.get('DROPBOX_ACCESS_TOKEN')
DROPBOX_FOLDER_PATH = os.environ.get('DROPBOX_FOLDER_PATH', '/Apps/Website-Gallery')
OUTPUT_FILE = 'assets/data/gallery.json'
SUPPORTED_FORMATS = ('.jpg', '.jpeg', '.png', '.gif', '.webp')


def get_dropbox_client():
    if not DROPBOX_ACCESS_TOKEN:
        raise ValueError("DROPBOX_ACCESS_TOKEN environment variable is not set")
    return dropbox.Dropbox(DROPBOX_ACCESS_TOKEN)


def get_decimal_from_dms(dms, ref):
    """Convert GPS coordinates from DMS to decimal format."""
    try:
        degrees = dms[0]
        minutes = dms[1] / 60.0
        seconds = dms[2] / 3600.0
        decimal = degrees + minutes + seconds
        if ref in ['S', 'W']:
            decimal = -decimal
        return decimal
    except:
        return None


def get_gps_coordinates(img):
    """Extract GPS coordinates from image using EXIF."""
    try:
        exifdata = img._getexif()
        if not exifdata:
            return None, None
        gps_info = exifdata.get(34853)  # GPSInfo tag
        if not isinstance(gps_info, dict):
            return None, None  # skip malformed GPSInfo
        lat = lon = None
        if 2 in gps_info and 1 in gps_info:
            lat = get_decimal_from_dms(gps_info[2], gps_info[1])
        if 4 in gps_info and 3 in gps_info:
            lon = get_decimal_from_dms(gps_info[4], gps_info[3])
        return lat, lon
    except Exception:
        return None, None


def reverse_geocode(lat, lon):
    """Get city name from GPS coordinates using Nominatim."""
    try:
        url = "https://nominatim.openstreetmap.org/reverse"
        params = {'lat': lat, 'lon': lon, 'format': 'json', 'zoom': 10, 'accept-language': 'en'}
        headers = {'User-Agent': 'Website-Gallery-Script/1.0'}
        response = requests.get(url, params=params, headers=headers, timeout=5)
        if response.status_code == 200:
            data = response.json()
            address = data.get('address', {})
            city = (address.get('city') or address.get('town') or address.get('village') or
                    address.get('municipality') or address.get('county') or address.get('state_district'))
            country = address.get('country')
            if city and country:
                return f"{city}, {country}"
            elif city:
                return city
            elif country:
                return country
        time.sleep(1)  # respect Nominatim rate limit
    except Exception:
        pass
    return None


def extract_image_metadata(dbx, file_path):
    """Extract EXIF metadata from image."""
    metadata = {'location': 'Unknown', 'date': 'Unknown', 'original_date': None}
    try:
        _, response = dbx.files_download(file_path)
        img = Image.open(BytesIO(response.content))

        # Try GPS first
        lat, lon = get_gps_coordinates(img)
        if lat and lon:
            city = reverse_geocode(lat, lon)
            if city:
                metadata['location'] = city

        # Fallback text fields
        exifdata = img._getexif()
        if exifdata:
            for tag_id, value in exifdata.items():
                tag = TAGS.get(tag_id, tag_id)

                # Date
                if tag in ['DateTime', 'DateTimeOriginal', 'DateTimeDigitized']:
                    try:
                        dt = datetime.strptime(str(value), '%Y:%m:%d %H:%M:%S')
                        metadata['date'] = dt.strftime('%B, %Y')
                        metadata['original_date'] = dt.isoformat()
                    except:
                        pass

                # Location text
                if metadata['location'] == 'Unknown' and tag in ['ImageDescription', 'XPSubject', 'XPComment']:
                    if value:
                        val_str = str(value).strip()
                        if len(val_str) < 50 and not val_str.startswith('DSC'):
                            metadata['location'] = val_str
    except Exception as e:
        print(f"Error extracting metadata from {file_path}: {e}")
    return metadata

def get_shared_link(dbx, file_path):
    """Get or create a direct Dropbox shared link usable in <img>."""
    try:
        # Try to get an existing shared link
        links = dbx.sharing_list_shared_links(path=file_path, direct_only=True)
        if links.links:
            url = links.links[0].url
        else:
            # Create a new shared link if none exists
            shared_link = dbx.sharing_create_shared_link_with_settings(file_path)
            url = shared_link.url

        # Convert to direct link for embedding
        if 'dl=0' in url:
            url = url.replace('dl=0', 'raw=1')
        elif '?' not in url:
            url += '?raw=1'
        else:
            url += '&raw=1'

        return url

    except Exception as e:
        print(f"Error creating shared link for {file_path}: {e}")
        return None

def fetch_gallery_photos():
    """Fetch all photos from Dropbox folder and return gallery data."""
    dbx = get_dropbox_client()
    photos = []

    print(f"Fetching photos from Dropbox folder: {DROPBOX_FOLDER_PATH}")

    try:
        result = dbx.files_list_folder(DROPBOX_FOLDER_PATH)
        files = result.entries

        while result.has_more:
            result = dbx.files_list_folder_continue(result.cursor)
            files.extend(result.entries)

        print(f"Found {len(files)} items in folder")

        for entry in files:
            if isinstance(entry, FileMetadata):
                if entry.name.lower().endswith(SUPPORTED_FORMATS):
                    print(f"Processing: {entry.name}")

                    # Get a direct link suitable for browser <img>
                    url = get_shared_link(dbx, entry.path_display)
                    if not url:
                        print(f"Skipping {entry.name} (no direct link)")
                        continue

                    # Extract metadata
                    metadata = extract_image_metadata(dbx, entry.path_display)

                    photos.append({
                        "filename": entry.name,
                        "url": url,
                        "location": metadata['location'],
                        "date": metadata['date'],
                        "original_date": metadata['original_date']
                    })

        # Sort by original date descending
        photos.sort(key=lambda x: x['original_date'] or x['filename'], reverse=True)
        print(f"Successfully processed {len(photos)} photos")

    except dropbox.exceptions.ApiError as e:
        print(f"Dropbox API error: {e}")
        raise

    return photos


def main():
    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
    photos = fetch_gallery_photos()
    gallery_data = {
        'last_updated': datetime.now().isoformat(),
        'total_photos': len(photos),
        'source_folder': DROPBOX_FOLDER_PATH,
        'photos': photos
    }
    with open(OUTPUT_FILE, 'w') as f:
        json.dump(gallery_data, f, indent=2)
    print(f"Gallery data saved to {OUTPUT_FILE}")


if __name__ == '__main__':
    main()
