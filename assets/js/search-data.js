customElements.whenDefined("ninja-keys").then(() => {
  const ninja = document.querySelector("ninja-keys");

  const allData = [{
    id: "page-resume",
    title: "Resume",
    description: "Enabling research and innovation",
    section: "Pages",
    handler: () => {
      window.location.href = "/resume/";
    },
  },{
    id: "page-gallery",
    title: "Gallery",
    description: "A time for timelessness",
    section: "Pages",
    handler: () => {
      window.location.href = "/gallery/";
    },
  },{
    id: "page-news",
    title: "News",
    description: "",
    section: "Pages",
    handler: () => {
      window.location.href = "/news/";
    },
  },{
    id: "page-privacy-policy",
    title: "Privacy Policy",
    description: "How this website collects and uses data",
    section: "Pages",
    handler: () => {
      window.location.href = "/privacy/";
    },
  },{
    id: "page-publications",
    title: "Publications",
    description: "Where research meets discovery",
    section: "Pages",
    handler: () => {
      window.location.href = "/publications/";
    },
  },{
    id: "page-projects",
    title: "Projects",
    description: "From concept to code",
    section: "Pages",
    handler: () => {
      window.location.href = "/projects/";
    },
  },{
    id: "page-blog",
    title: "Blog",
    description: "",
    section: "Pages",
    handler: () => {
      window.location.href = "/blog/index.html";
    },
  },{
    id: "news-sheffield",
    title: "Sheffield",
    description: "I’ve joined the Research &amp;amp; Innovation IT team at The University of Sheffield 🚀",
    section: "News",
    handler: () => {
      window.location.href = "/news/sheffield/";
    },
  },{
    id: "news-the-causal-testing-framework",
    title: "The Causal Testing Framework 💻",
    description: "As part of my project work, I’m a research software engineer on the CITCOM project, led by Dr. Ne...",
    section: "News",
    handler: () => {
      window.location.href = "/news/citcom/";
    },
  },{
    id: "news-first-marathon",
    title: "First Marathon 🏃🏻",
    description: "I recently ran my first marathon through the Pentlands in Edinburgh, and this was massive for me ...",
    section: "News",
    handler: () => {
      window.location.href = "/news/marathon/";
    },
  },];

  // Start empty so no suggestions appear on open
  ninja.data = [];

  // Populate results only when the user types
  ninja.addEventListener("change", (e) => {
    ninja.data = e.detail.search ? allData : [];
  });
});
