---
layout: about
title: About
permalink: /
subtitle: <b>Research Data Engineer</b>  @ <a href="https://www.sheffield.ac.uk/">The University of Sheffield</a> 

profile:
  align: center
  image: prof_pic.jpg
  address: >
    <html>
    <body>
    <div id="spotify-container">
        <div class="music-emoji">🎵 <em> Currently listening to </em> </div>
    </div>

    <script>
        // Define the Spotify profile information
        const spotifyProfile = {
            image_url: "https://spotify-github-profile.vercel.app/api/view?uid=11130333962&cover_image=true&theme=novatorem&show_offline=true&background_color=121212&interchange=false&bar_color=53b14f&bar_color_cover=true",
            hyperlink_url: "https://spotify-github-profile.vercel.app/api/view?uid=11130333962&redirect=true"
        };

        // Create an <a> element with an <img> element inside
        const spotifyLink = document.createElement("a");
        const spotifyImage = document.createElement("img");

        // Set the image source and hyperlink URL
        spotifyImage.src = spotifyProfile.image_url;
        spotifyImage.alt = "Spotify";
        spotifyImage.srcset = `${spotifyProfile.image_url} 1x`
        spotifyImage.preload = "auto"; // Preload the image
        spotifyLink.href = spotifyProfile.hyperlink_url;
        spotifyLink.textContent = ""; // Add descriptive text

        // Append the image to the link and the link to the container
        spotifyLink.appendChild(spotifyImage);
        document.getElementById("spotify-container").appendChild(spotifyLink);
    </script>
    </body>
    </html>
news: true # includes a list of news items
selected_papers: false # includes a list of papers marked as "selected={true}"
social: true  # includes social icons at the bottom of the page
---

Welcome to my website <span class="wave">👋🏼</span>

I'm currently a Research Data Engineer at <a href="https://www.sheffield.ac.uk/">The University of Sheffield</a>. My main responsibility is to develop data and software products, and integrate them
into workflows to produce high quality research frameworks.

Previously, I attained my PhD in Applied Mathematics, where I utilised <a href="https://sdo.gsfc.nasa.gov/data/">NASA</a> observational data from the Sun to better understand how its atmospheres are heated to multi-million degree temperatures. 
I also hold an MSci in Physics with Astrophysics from <a href="https://www.gla.ac.uk//">Glasgow University</a>.

I'm passionate about making technical content accessible for everyone.

