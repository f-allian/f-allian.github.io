document.addEventListener("DOMContentLoaded", () => {
  const ninjaKeys = document.getElementById("global-ninja-keys");
  const searchLink = document.getElementById("search-link");
  if (!ninjaKeys || !searchLink) return;

  // Apply theme class
  const theme = window.determineComputedTheme?.() || "light";
  ninjaKeys.classList.toggle("dark", theme === "dark");

  // Function to open the search modal
  const openSearchModal = () => {
    // Collapse mobile navbar if open (vanilla JS — no jQuery dependency)
    const navbarNav = document.getElementById("navbarNav");
    if (navbarNav && navbarNav.classList.contains("show")) {
      const toggler = document.querySelector(".navbar-toggler");
      if (toggler) toggler.click();
    }

    customElements.whenDefined("ninja-keys").then(() => {
      ninjaKeys.open();
    });
  };

  // Click handler for header icon
  searchLink.addEventListener("click", (e) => {
    e.preventDefault();
    openSearchModal();
  });

  // Keyboard shortcut Ctrl+K / Cmd+K
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      openSearchModal();
    }
  });

  // Expose globally in case inline onclick is used
  window.openSearchModal = openSearchModal;
});
