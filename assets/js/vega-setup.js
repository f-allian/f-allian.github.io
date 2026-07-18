const vegaTheme = typeof determineComputedTheme === "function" ? determineComputedTheme() : "light";

/* Create vega lite chart as another node and hide the code block, appending the vega lite node after it
       this is done to enable retrieving the code again when changing theme between light/dark */
function initVegaCharts() {
  document.querySelectorAll("pre>code.language-vega_lite").forEach((elem) => {
    const jsonData = elem.textContent;
    const backup = elem.parentElement;
    backup.classList.add("unloaded");
    /* create vega lite node */
    let chartElement = document.createElement("div");
    chartElement.classList.add("vega-lite");
    backup.after(chartElement);

    /* Embed the visualization in the container */
    if (vegaTheme === "dark") {
      vegaEmbed(chartElement, JSON.parse(jsonData), { theme: "dark" });
    } else {
      vegaEmbed(chartElement, JSON.parse(jsonData));
    }
  });
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initVegaCharts);
} else {
  initVegaCharts();
}
