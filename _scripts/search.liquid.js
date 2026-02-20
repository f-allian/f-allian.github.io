---
permalink: /assets/js/search-data.js
---

customElements.whenDefined("ninja-keys").then(() => {
  const ninja = document.querySelector("ninja-keys");

  const allData = [

  {%- for post in site.posts -%}
  {
    id: "post-{{ post.title | slugify }}",
    title: "{{ post.title | strip | escape }}",
    description: "{{ post.description | strip_html | strip_newlines | escape }}",
    section: "Posts",
    handler: () => {
      {% if post.redirect == blank %}
        window.location.href = "{{ post.url | relative_url }}";
      {% elsif post.redirect contains '://' %}
        window.open("{{ post.redirect }}", "_blank");
      {% else %}
        window.location.href = "{{ post.redirect | relative_url }}";
      {% endif %}
    },
  },
  {%- endfor -%}

  {%- for page in site.pages -%}
    {%- if page.title and page.url != '/' and page.permalink != '/404.html' and page.layout != 'archive-year' and page.layout != 'archive-tag' and page.layout != 'archive-category' -%}
  {
    id: "page-{{ page.title | slugify }}",
    title: "{{ page.title | strip | escape }}",
    description: "{{ page.description | strip_html | strip_newlines | escape }}",
    section: "Pages",
    handler: () => {
      window.location.href = "{{ page.url | relative_url }}";
    },
  },
    {%- endif -%}
  {%- endfor -%}

  {%- for item in site.news -%}
    {%- if item.title -%}
  {
    id: "news-{{ item.title | slugify }}",
    title: "{{ item.title | strip | escape }}",
    description: "{{ item.content | strip_html | strip_newlines | truncate: 100 | escape }}",
    section: "News",
    handler: () => {
      window.location.href = "{{ item.url | relative_url }}";
    },
  },
    {%- endif -%}
  {%- endfor -%}
  ];

  // Start empty so no suggestions appear on open
  ninja.data = [];

  // Populate results only when the user types
  ninja.addEventListener("change", (e) => {
    ninja.data = e.detail.search ? allData : [];
  });
});
