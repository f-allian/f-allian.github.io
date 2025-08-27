---
layout: page
permalink: /gallery/
title: Gallery
description: There is a time for timelessness
nav: true
nav_order: 4
---

<style>
.gallery-container {
  max-width: 100%;
  margin: auto;
  position: relative;
}

.carousel-container {
  position: relative;
  width: 100%;
  max-height: 80vh;
  aspect-ratio: 16/9;
  overflow: hidden;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel-slide {
  position: absolute;
  top: 0; left: 0; 
  width: 100%; height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 1s ease-in-out;
  pointer-events: none;
}
.carousel-slide.active { 
  opacity: 1; 
  pointer-events: auto; 
}

.carousel-slide img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  display: block;
  opacity: 0;
  transition: opacity 1s ease-in-out;
}
.carousel-slide.loaded img { opacity: 1; }

/* Caption with semi-transparent container */
.carousel-caption {
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  padding: 10px 20px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  font-size: 11px;
  text-align: center;
  max-width: 100%;
  box-sizing: border-box;
  white-space: normal; 
  overflow-wrap: break-word; 
  overflow: hidden;    
  display: none; /* hidden by default */
}
.carousel-captions-visible .carousel-caption {
  display: block;
}

/* Navigation buttons */
.carousel-controls {
  position: absolute;
  top: 50%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  pointer-events: none;
}
.carousel-btn {
  cursor: pointer;
  background-color: rgba(0,0,0,0.4);
  color: white;
  border: none;
  width: 40px; height: 40px;
  border-radius: 50%;
  font-size: 18px;
  pointer-events: all;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
}
.carousel-btn:hover { background-color: var(--global-hover-color); }

/* Dots */
.dots-container {
  text-align: center;
  padding: 1rem;
}
.dot {
  cursor: pointer;
  height: clamp(5px, 0.8vw, 8px);  
  width: clamp(5px, 0.8vw, 8px);
  margin: 0 clamp(3px, 0.5vw, 7px);
  background-color: var(--global-text-color-light);
  border-radius: 50%;  
  display: inline-block;
  transition: background-color 0.3s;
}
.dot.active, .dot:hover { background-color: var(--global-theme-color); }

/* Caption toggle button */
#toggle-captions-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.15);
  color: var(--global-text-color);
  border: none;
  width: clamp(30px, 2vw, 36px);
  height: clamp(30px, 2vw, 36px);
  font-size: clamp(10px, 1vw, 14px);
  font-weight: normal;
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
}
#toggle-captions-btn:hover {
  background-color: var(--global-hover-color);
}

/* Loading / error states */
.loading, .error { 
  text-align: center; 
  padding: 40px; 
  color: #666; 
}
.spinner {
  border: 3px solid #eee;
  border-top: 3px solid #555;
  border-radius: 50%;
  width: 30px; height: 30px;
  animation: spin 1s linear infinite;
  position: absolute;
}
@keyframes spin { 
  0% { transform: rotate(0deg); } 
  100% { transform: rotate(360deg); } 
}
</style>

<div class="gallery-container">
  <button id="toggle-captions-btn" title="Show captions">CC</button>
  <div id="gallery-carousel" class="carousel-container">
    <div class="loading"><div class="spinner"></div></div>
  </div>
  <div class="dots-container" id="dots-container"></div>
</div>

<script>
let currentSlide = 0;
let slides = [];
let autoPlayInterval;
let captionsVisible = false;

function dropboxRaw(url){ 
  return url ? url.replace('?dl=0','?raw=1').replace('&dl=0','&raw=1') : ''; 
}

fetch('{{ "/assets/data/gallery.json" | relative_url }}')
  .then(res=>res.json())
  .then(data=>{
    if(!data.photos || !data.photos.length){ showError('No photos found'); return; }
    slides = data.photos.map(p=>({...p,url:dropboxRaw(p.url)}));
    slides = slides.sort(()=>Math.random()-0.5);
    initializeGallery();
  })
  .catch(err=>{ console.error('Error loading gallery:',err); showError('Failed to load gallery'); });

function initializeGallery(){
  const carousel = document.getElementById('gallery-carousel');
  const dotsContainer = document.getElementById('dots-container');
  carousel.innerHTML = '';
  dotsContainer.innerHTML = '';

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

    // dots
    const dot = document.createElement('span');
    dot.className = 'dot';
    dot.setAttribute("tabindex","0");
    dot.onclick = ()=>goToSlide(i);
    dotsContainer.appendChild(dot);
  });

  const controls = document.createElement('div');
  controls.className = 'carousel-controls';
  controls.innerHTML = `
    <button class="carousel-btn prev" onclick="changeSlide(-1)">❮</button>
    <button class="carousel-btn next" onclick="changeSlide(1)">❯</button>
  `;
  carousel.appendChild(controls);

  showSlide(0);
  startAutoPlay();
  carousel.addEventListener('mouseenter',stopAutoPlay);
  carousel.addEventListener('mouseleave',startAutoPlay);
}

// Caption toggle
document.getElementById('toggle-captions-btn').addEventListener('click', () => {
  captionsVisible = !captionsVisible;
  document.getElementById('gallery-carousel').classList.toggle('carousel-captions-visible', captionsVisible);
  document.getElementById('toggle-captions-btn').title = captionsVisible ? "Hide captions" : "Show captions";
});

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
