$(document).ready(function () {
  // Let external links in jupyter notebooks open in new tab
  let jupyterNotebooks = $(".jupyter-notebook-iframe-container");
  jupyterNotebooks.each(function () {
    const iframe = $(this).find("iframe").get(0);
    if (!iframe) return;
    let iframeBody;
    try {
      iframeBody = iframe.contentWindow.document.body;
    } catch (e) {
      return; // cross-origin iframe
    }
    // Get all <a> elements in the bodyElement
    let links = $(iframeBody).find("a");

    // Loop through each <a> element
    links.each(function () {
      // Check if the <a> element has an 'href' attribute
      if ($(this).attr("href")) {
        // Set the 'target' attribute to '_blank' to open the link in a new tab/window
        $(this).attr("target", "_blank");
      }
    });
  });
});
