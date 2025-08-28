---
layout: page
permalink: /publications/
title: Publications
description: 
years: [2025, 2021, 2019]
nav: true
nav_order: 4
---
<!-- _pages/publications.md -->

<head>
<meta name="robots" content="noindex">
</head>

<div class="publications">
  
  {%- for y in page.years %}
    <h2 class="year">{{y}}</h2>
    {% bibliography -f papers -q @*[year={{y}}]* %}
  {%- endfor %}

</div>


