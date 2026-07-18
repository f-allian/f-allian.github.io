const diff2HtmlTheme = typeof determineComputedTheme === "function" ? determineComputedTheme() : "light";

/* Create diff2html as another node and hide the code block, appending the diff2html node after it
    this is done to enable retrieving the code again when changing theme between light/dark */
function initDiff2Html() {
  document.querySelectorAll("pre>code.language-diff2html").forEach((elem) => {
    const textData = elem.textContent;
    const backup = elem.parentElement;
    backup.classList.add("unloaded");
    /* create diff node */
    let diffElement = document.createElement("div");
    diffElement.classList.add("diff2html");
    backup.after(diffElement);
    const configuration = { colorScheme: diff2HtmlTheme, drawFileList: true, highlight: true, matching: "lines" };
    const diff2htmlUi = new Diff2HtmlUI(diffElement, textData, configuration);
    diff2htmlUi.draw();
  });
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initDiff2Html);
} else {
  initDiff2Html();
}
