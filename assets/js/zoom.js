// Initialize medium zoom.
$(document).ready(function() {
  var navbar = document.querySelector('.navbar');
  var navHeight = navbar ? navbar.offsetHeight : 0;

  medium_zoom = mediumZoom('[data-zoomable]', {
    background: getComputedStyle(document.documentElement)
        .getPropertyValue('--global-bg-color') + 'ee',  // + 'ee' for trasparency.
    margin: navHeight + 10,
  });

  medium_zoom.on('open', function() { document.body.style.overflow = 'hidden'; });
  medium_zoom.on('close', function() { document.body.style.overflow = ''; });
});
