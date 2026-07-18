// Has to be in the head tag, otherwise a flicker effect will occur.

let defined = (s) => s && s !== "null";

let defined_or = (s, d) => defined(s) ? s : d;

let determineComputedTheme = () => {
  let themeSetting = defined_or(localStorage.getItem("theme"), "system");
  if (themeSetting === "system") {
    const userPref = window.matchMedia;
    return (userPref && userPref("(prefers-color-scheme: dark)").matches) ? "dark" : "light";
  }
  return themeSetting;
};

// Expose globally so other scripts (e.g. search-setup.js) can use it
window.determineComputedTheme = determineComputedTheme;

let setTheme = (themeSetting) => {
  transTheme();

  let computedTheme = themeSetting;
  if (themeSetting === "system") {
    const userPref = window.matchMedia;
    computedTheme = (userPref && userPref("(prefers-color-scheme: dark)").matches) ? "dark" : "light";
  }

  document.documentElement.setAttribute("data-theme", computedTheme);
  document.documentElement.setAttribute("data-theme-setting", themeSetting);
  localStorage.setItem("theme", themeSetting);

  setHighlight(computedTheme);
  setGiscusTheme(computedTheme);
  setSearchTheme(computedTheme);

  // Updates the background of medium-zoom overlay.
  if (typeof medium_zoom !== "undefined") {
    medium_zoom.update({
      background: getComputedStyle(document.documentElement)
          .getPropertyValue("--global-bg-color") + "ee",
    });
  }
};

let toggleTheme = () => {
  const current = determineComputedTheme();
  setTheme(current === "dark" ? "light" : "dark");
};

let setHighlight = (theme) => {
  const light = document.getElementById("highlight_theme_light");
  const dark = document.getElementById("highlight_theme_dark");
  if (light) light.media = theme === "dark" ? "none" : "";
  if (dark) dark.media = theme === "dark" ? "" : "none";
};

let setGiscusTheme = (theme) => {
  const iframe = document.querySelector("iframe.giscus-frame");
  if (!iframe || !iframe.contentWindow) return;
  iframe.contentWindow.postMessage(
    { giscus: { setConfig: { theme: theme } } },
    "https://giscus.app"
  );
};

let setSearchTheme = (theme) => {
  const ninjaKeys = document.getElementById("global-ninja-keys");
  if (ninjaKeys) ninjaKeys.classList.toggle("dark", theme === "dark");
};

let transTheme = () => {
  document.documentElement.classList.add("transition");
  window.setTimeout(() => {
    document.documentElement.classList.remove("transition");
  }, 500);
};

// Attach click handler once DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("light-toggle");
  if (toggle) {
    toggle.addEventListener("click", toggleTheme);
  }
});
