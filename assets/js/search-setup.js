document.addEventListener("DOMContentLoaded", () => {
  const ninjaKeys = document.getElementById("global-ninja-keys");
  const searchLink = document.getElementById("search-link");
  if (!ninjaKeys || !searchLink) return;

  // Apply theme class
  const theme = window.determineComputedTheme?.() || "light";
  ninjaKeys.classList.toggle("dark", theme === "dark");

  // Function to open the search modal
  const openSearchModal = () => {
    const $navbarNav = $("#navbarNav");
    if ($navbarNav.hasClass("show")) {
      $navbarNav.collapse("hide");
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
