require 'feedjira'
require 'httparty'
require 'jekyll'
require 'uri'

module ExternalPosts
  class ExternalPostsGenerator < Jekyll::Generator
    safe true
    priority :high

    def generate(site)
      return if site.config['external_sources'].nil?

      site.config['external_sources'].each do |src|
        name = src['name']
        url  = src['rss_url']

        uri = URI.parse(url)
        unless uri.is_a?(URI::HTTP) || uri.is_a?(URI::HTTPS)
          raise "Invalid RSS URL scheme for external source '#{name}': #{url}"
        end

        p "Fetching external posts from #{name}:"
        xml = HTTParty.get(uri.to_s).body
        feed = Feedjira.parse(xml)

        feed.entries.each do |e|
          p "...fetching #{e.url}"

          slug = e.title
                  .downcase
                  .strip
                  .gsub(' ', '-')
                  .gsub(/[^\w-]/, '')

          path = site.in_source_dir("_posts/#{slug}.md")

          doc = Jekyll::Document.new(
            path,
            site: site,
            collection: site.collections['posts']
          )

          doc.data['external_source'] = name
          doc.data['feed_content']   = e.content
          doc.data['title']          = e.title
          doc.data['description']    = e.summary
          doc.data['date']           = e.published
          doc.data['redirect']       = e.url

          site.collections['posts'].docs << doc
        end
      end
    end
  end
end