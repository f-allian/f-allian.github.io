---
permalink: /assets/js/search-data.js
---

customElements.whenDefined("ninja-keys").then(() => {
  const ninja = document.querySelector("ninja-keys");

ninja.data = [

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

  /* =====================
   * Pages
   * ===================== */
  {%- for page in site.pages -%}
    {%- if page.title and page.url != '/' -%}
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
];
