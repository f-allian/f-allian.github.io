---
layout: page
permalink: /publications/
title: Publications
description: 
years: [2021, 2019]
nav: true
nav_order: 1
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


