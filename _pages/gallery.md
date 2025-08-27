---
layout: page
permalink: /gallery/
title: Gallery
description: A collection of moments captured through my lens.
nav: true
nav_order: 4
---

<style>
.gallery-container { max-width:100%; margin:auto; position:relative; height:70vh; }
.carousel-container { position:relative; width:100%; height:100%; overflow:hidden; border-radius:8px; background:#000; display:flex; justify-content:center; align-items:center; }
.carousel-slide {
  position:absolute;
  top:0; left:0; width:100%; height:100%;
  display:flex; justify-content:center; align-items:center;
  opacity:0;
  transition: opacity 1s ease-in-out;
  pointer-events:none;
}
.carousel-slide.active { opacity:1; pointer-events:auto; }
.carousel-slide img {
  max-width:95%; max-height:95%; object-fit:contain;
  display:block; opacity:0; transition: opacity 1s ease-in-out;
}
.carousel-slide.loaded img { opacity:1; }
.carousel-caption {
  background: rgba(0,0,0,0.7);
  color:white;
  padding:10px 20px;
  position:absolute; bottom:0; left:0; right:0;
  font-size:12px; text-align:center;
  opacity:0;
  transition: opacity 0.5s;
}
.carousel-slide.loaded .carousel-caption { opacity:1; }
.carousel-controls { position:absolute; top:50%; width:100%; display:flex; justify-content:space-between; padding:0 20px; pointer-events:none; }
.carousel-btn { cursor:pointer; background-color: rgba(0,0,0,0.5); color:white; border:none; padding:16px; font-size:18px; border-radius:0 3px 3px 0; pointer-events:all; transition:background-color 0.3s; }
.carousel-btn:hover { background-color: rgba(0,0,0,0.8); }
.carousel-btn.next { border-radius: 3px 0 0 3px; }
.dots-container { text-align:center; padding:20px; }
.dot { cursor:pointer; height:13px; width:13px; margin:0 5px; background-color:#bbb; border-radius:50%; display:inline-block; transition:background-color 0.3s; }
.dot.active, .dot:hover { background-color:#717171; }
.loading, .error { text-align:center; padding:40px; color:#666; }
.spinner {
  border: 2px solid #eee;
  border-top: 2px solid #555;
  border-radius: 50%;
  width: 28px; height: 28px;
  animation: spin 1s linear infinite;
  position: absolute;
  opacity: 1;
  transition: opacity 0.5s ease;
}

.spinner.hidden {
  opacity: 0;
  pointer-events: none;
}

@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
</style>

<div class="gallery-container">
  <div id="gallery-carousel" class="carousel-container">
    <div class="loading"><div class="spinner"></div></div>
  </div>
  <div class="dots-container" id="dots-container"></div>
</div>

<script>
let currentSlide = 0;
let slides = [];
let autoPlayInterval;

function dropboxRaw(url){ return url ? url.replace('?dl=0','?raw=1').replace('&dl=0','&raw=1') : ''; }

fetch('{{ "/assets/data/gallery.json" | relative_url }}')
  .then(res=>res.json())
  .then(data=>{
    if(!data.photos || !data.photos.length){ showError('No photos found'); return; }
    slides = data.photos.map(p=>({...p,url:dropboxRaw(p.url)}));
    initializeGallery();
  })
  .catch(err=>{ console.error('Error loading gallery:',err); showError('Failed to load gallery'); });

function initializeGallery(){
  const carousel = document.getElementById('gallery-carousel');
  const dotsContainer = document.getElementById('dots-container');
  carousel.innerHTML = '';

  slides.forEach((photo,i)=>{
    const slide = document.createElement('div');
    slide.className = 'carousel-slide';

    const spinner = document.createElement('div');
    spinner.className = 'spinner';
    slide.appendChild(spinner);

    const img = document.createElement('img');
    img.src = photo.url;
    img.alt = photo.filename;
    img.loading = 'lazy';
    const caption = document.createElement('div');
    caption.className = 'carousel-caption';
    caption.innerText = formatCaption(photo.location, photo.date);
    slide.appendChild(img);
    slide.appendChild(caption);

    img.addEventListener('load', ()=>{
      spinner.style.display = 'none';
      slide.classList.add('loaded');
    });

    carousel.appendChild(slide);
  });

  const controls = document.createElement('div');
  controls.className = 'carousel-controls';
  controls.innerHTML = `
    <button class="carousel-btn prev" onclick="changeSlide(-1)">❮</button>
    <button class="carousel-btn next" onclick="changeSlide(1)">❯</button>
  `;
  carousel.appendChild(controls);

  document.querySelectorAll('.carousel-slide')[0]?.classList.add('active');

  startAutoPlay();
  carousel.addEventListener('mouseenter',stopAutoPlay);
  carousel.addEventListener('mouseleave',startAutoPlay);
}

function formatCaption(location,date){
  let parts=[];
  if(location && location!=='Unknown') parts.push(location);
  if(date && date!=='Unknown') parts.push(date);
  return parts.join(', ');
}

function showSlide(n){
  const slideElems = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.dot');
  if(n>=slides.length) currentSlide=0;
  if(n<0) currentSlide=slides.length-1;
  slideElems.forEach(s=>s.classList.remove('active'));
  dots.forEach(d=>d.classList.remove('active'));
  slideElems[currentSlide]?.classList.add('active');
  dots[currentSlide]?.classList.add('active');
}

// Global functions
window.changeSlide = function(n){ currentSlide+=n; showSlide(currentSlide); resetAutoPlay(); }
window.goToSlide = function(n){ currentSlide=n; showSlide(currentSlide); resetAutoPlay(); }
function startAutoPlay(){ stopAutoPlay(); autoPlayInterval=setInterval(()=>{currentSlide++; showSlide(currentSlide);},5000); }
function stopAutoPlay(){ if(autoPlayInterval) clearInterval(autoPlayInterval); }
function resetAutoPlay(){ stopAutoPlay(); startAutoPlay(); }
function showError(msg){ document.getElementById('gallery-carousel').innerHTML=`<div class="error">${msg}</div>`; }
</script>
