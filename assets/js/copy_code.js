var codeBlocks = document.querySelectorAll("div.highlight");
codeBlocks.forEach(function (highlightDiv) {
  var code = highlightDiv.querySelector("code");

  if (!code) return;

  var excludedLanguages = [
    "language-chartjs",
    "language-diff2html",
    "language-echarts",
    "language-geojson",
    "language-mermaid",
    "language-plotly",
    "language-vega_lite"
  ];

  var isExcluded = excludedLanguages.some(function(lang) {
    return code.classList.contains(lang);
  });

  if (isExcluded) return;

  var copyButton = document.createElement("button");
  copyButton.className = "copy";
  copyButton.type = "button";
  copyButton.ariaLabel = "Copy code to clipboard";
  copyButton.innerHTML = '<i class="fa-solid fa-clipboard"></i>';

  copyButton.addEventListener("click", function () {
    var codeText = code.innerText.trim();
    window.navigator.clipboard.writeText(codeText);
    copyButton.innerHTML = '<i class="fa-solid fa-clipboard-check"></i>';

    setTimeout(function () {
      copyButton.innerHTML = '<i class="fa-solid fa-clipboard"></i>';
    }, 3000);
  });

  highlightDiv.style.position = "relative";
  highlightDiv.appendChild(copyButton);
});