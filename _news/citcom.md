---
layout: post
title: The Causal Testing Framework 💻
list_title: Our software paper on the Causal Testing Framework was published 💻
date: 2025-03-06
inline: false
related_posts: false
meta: Professional
tags: [Software, Engineering, Paper]
---

---

As part of my project work, I'm a research software engineer on the CITCOM project led by [Dr. Neil Walkinshaw](https://neilwalkinshaw.github.io/) where
I support the development and maintenance of the Causal Testing Framework; a causal inference-driven framework for functional black-box testing of complex software written in Python.

In a nutshell, computational models can be challenging to test. This can be due to several reasons, including the lack of ground truth makes it difficult to know the “correct” answer,
large parameter spaces means testing at scale can be computational costly, and the stochasticity of simulations can cause different outputs for the same input, making robust and reliable testing difficult to achieve. 
The causal testing framework utilises the power of causal inference that draws upon the testers subject-matter knowledge to better model the relationship between inputs and outputs compared to traditional methods. 
For more details on the theory of the causal testing framework, check out the following papers: [Metamorphic Testing with Causal Graphs](https://eprints.whiterose.ac.uk/id/eprint/195317/1/CITCOM_2022_ICST%20%284%29.pdf),
[Testing Causality in Scientific Modelling Software](https://dl.acm.org/doi/abs/10.1145/3607184) and [Causal Test Adequacy](https://eprints.whiterose.ac.uk/id/eprint/208652/1/main.pdf).

For more practical information of the framework, we recently published a [software paper](https://joss.theoj.org/papers/10.21105/joss.07739) in the Journal of Open Source Software, led by [Dr. Michael Foster](https://jmafoster1.github.io/), that outlines the concept of causal testing
at a high level. You can find our codebase including examples and documentation on our [GitHub repository](https://github.com/CITCOM-project/CausalTestingFramework).

---
<style>
  .lightbox {
    display: none;
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.85);
    justify-content: center;
    align-items: center;
  }

  .lightbox img {
    max-width: 95%;
    max-height: 95%;
    border-radius: 8px;
    transition: transform 0.7s ease;
  }
</style>

<div class="image-gallery" style="display: flex; flex-direction: column; align-items: center; gap: 1.5rem; margin: 2rem 0;">
  <div style="width: 100%; max-width: 750px; text-align: center;">
    <img class="light-mode-only zoom-trigger"
         src="/assets/img/news/announcement_citcom/schematic.png"
         alt="Causal Testing Workflow"
         style="width: 100%; height: auto; border-radius: 5px; cursor: zoom-in;">
    <img class="dark-mode-only zoom-trigger"
         src="/assets/img/news/announcement_citcom/schematic-dark.png"
         alt="Causal Testing Workflow"
         style="width: 100%; height: auto; border-radius: 5px; cursor: zoom-in;">
  </div>
</div>

<div id="lightbox" class="lightbox">
  <img src="" alt="">
</div>

<script>
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = lightbox.querySelector("img");

  document.querySelectorAll(".zoom-trigger").forEach(img => {
    img.addEventListener("click", () => {
      lightboxImg.src = img.src;
      lightbox.style.display = "flex";
    });
  });

  // Close when clicking anywhere on overlay
  lightbox.addEventListener("click", () => {
    lightbox.style.display = "none";
    lightboxImg.src = "";
  });
</script>




