---
layout: post
title: "Reflections on RSECon 2026 📝"
list_title: "Reflections on RSECon 2026 📝"
date: 2026-09-21
inline: false
related_posts: false
tags: [RSE, research, open-source]
---

---

> _Testing software is hard; Testing AI is harder._

This year's annual [research software engineering (RSE) conference](https://rsecon26.society-rse.org/), and its 10th anniversary edition, was held at Sheffield University between 9-11 September 2026. 
The point of this conference is to foster a collaborative space for RSEs to share ideas, discuss strategies and to
collectively develop a shared thematic vision for the future of research software engineering - a mission I've followed for three years now, and this year contributed to directly as a volunteer and presenter.

One recurring question that comes up every year is: &ldquo;How can we ensure software is recognised as a fundamental part of the research journey?&rdquo;
As surprising as this question might seem at first, especially for a decade-old established role, there's arguably a lack of acknowledgement and recognition both in and across institutions when it comes to RSE contributions in academia. 
In fact, the [Research Excellence Framework](https://2029.ref.ac.uk/) 2029 (which is the UK's system for assessing the quality of research), will be the first time that research technical professionals, including RSEs, to be directly credited
for their standalone work, allowing for better credit, transparency and recognition for those involved. So, it's no surprise that the [vision statement](https://rsecon26.society-rse.org/vision/) of this year's conference was centered on the following two themes:

1. RSEs as part of the research journey
2. Enhancing credit and reproducibility: research software quality, performance, and evidence.

As part of this vision, RSECon partnered with the [Journal of Open Source Software (JOSS)](https://joss.theoj.org/) for the first time to encourage RSEs to publish and disseminate their software by formalising their research outputs. Alongside this,
the conference also called for research posters as an alternative way to disseminate their work, and encouraged uploads to [Zenodo](https://zenodo.org/) to enhance the artefact's citability via a digital object identifier.  

For this year, I thought I'd submit a poster for a project I had worked on some months prior (see below). Broadly speaking, the [project](https://n8cir.org.uk/case-studies/enabling-ai-for-science/) itself was a cross-institution and interdisciplinary piece of work, initially designed to bring together research technical professionals to create resources that facilitate artificial intelligence (AI) in scientific research on the [N8's HPC cluster, Bede](https://n8cir.org.uk/bede/). 

My contribution to this project was to create a tool called `causal-ai` that can systematically enable better testing of AI workflows using causal inference (you can find out more information in this [blog post](https://n8cir.org.uk/case-studies/enabling-ai-for-science/causal-testing-framework/)). The central motivation behind the tool is that, not only is software testing under-prioritised by researchers, but the testing of any black-box system, such as an AI workflow, is incredibly arduous, for instance, because of its large parameter spaces and computational demands.
With these problems in mind, I created the tool as a proof-of-concept and alternative approach to make testing AI systems more accessible, interpretable and transparent for researchers. 

My poster also makes a broader argument about the future of research software. Although the purpose of the poster is to highlight the features of the tool, my claim in reference to the conference's two themes is that the necessity and advocacy of software testing, especially for AI systems, needs to be driven by RSEs.
If we as a community care about research integrity, transparency, validity and fidelity, then it's beyond doubt that we are the ones best equipped to lower the barrier to entry for making software testing more accessible for researchers - not just enabling research, but enabling verifiable research.

`causal-ai` is open-source under the MIT License, built on top of the [Causal Testing Framework](https://github.com/CITCOM-project/CausalTestingFramework), and available on [GitHub](https://github.com/RSE-Sheffield/causal-ai). The poster is archived on [Zenodo](https://zenodo.org/records/22262635) (DOI: 10.5281/zenodo.22262635), with a PDF copy below.

---
<div class="image-gallery" style="display: flex; flex-direction: column; align-items: center; gap: 1.5rem; margin: 2rem 0;">
  <div style="width: 100%; max-width: 800px;">
    <div id="pdf-container" style="position: relative; width: 100%; padding-top: 129.4%; border-radius: 5px; overflow: hidden; background: #f5f5f5;"></div>
  </div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/pdfobject/2.3.0/pdfobject.min.js"></script>
<script>
  PDFObject.embed(
    "/assets/img/news/announcement_rsecon/Allian_Causal_Testing.pdf",
    "#pdf-container",
    {
      fallbackLink: '<p style="text-align:center; padding:2rem;"><a href="[url]" target="_blank" rel="noopener">View PDF</a></p>',
      pdfOpenParams: { view: "FitH" }
    }
  );
</script>

<small>Allian, F. (2026) <em>Causal AI: Evaluating AI Workflows on HPC Environments Using Causal Testing</em>. Research Software Engineering Conference 2026 (RSECon26), RSECon26. Available at: <a href="https://doi.org/10.5281/zenodo.22262635">https://doi.org/10.5281/zenodo.22262635</a>.</small>



