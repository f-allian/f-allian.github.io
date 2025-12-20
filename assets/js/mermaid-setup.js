document.addEventListener("DOMContentLoaded", function() {
  // Convert code blocks to mermaid divs
  document.querySelectorAll('pre > code.language-mermaid').forEach(function(code) {
    var pre = code.parentElement;
    var div = document.createElement('div');
    div.className = 'mermaid';
    div.textContent = code.textContent;
    pre.parentElement.replaceChild(div, pre);
  });

  // Initialize mermaid
  mermaid.initialize({ startOnLoad: true });
  mermaid.init();

  // Add zoom if d3 is loaded
  if (typeof d3 !== 'undefined') {
    setTimeout(function() {
      document.querySelectorAll('.mermaid svg').forEach(function(svg) {
        var zoom = d3.zoom().on('zoom', function(event) {
          d3.select(svg).select('g').attr('transform', event.transform);
        });
        d3.select(svg).call(zoom);
      });
    }, 500);
  }
});