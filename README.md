# farhadallian.co.uk 🧑🏻‍💻

[![deploy](https://github.com/f-allian/f-allian.github.io/actions/workflows/deploy.yml/badge.svg?branch=master)](https://github.com/f-allian/f-allian.github.io/actions/workflows/deploy.yml)
[![pages-build-deployment](https://github.com/f-allian/f-allian.github.io/actions/workflows/pages/pages-build-deployment/badge.svg?branch=gh-pages)](https://github.com/f-allian/f-allian.github.io/actions/workflows/pages/pages-build-deployment)
[![CodeQL](https://github.com/f-allian/f-allian.github.io/actions/workflows/github-code-scanning/codeql/badge.svg?branch=master)](https://github.com/f-allian/f-allian.github.io/actions/workflows/github-code-scanning/codeql)
[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/f-allian/f-allian.github.io)

This repository contains the source code for my [personal website](https://www.farhadallian.co.uk), built with [Jekyll](https://jekyllrb.com/) and based on the [al-folio](https://github.com/alshedivat/al-folio) theme.

## Main Pages

- Resume
- Github projects
- Publications management via BibTeX
- Gallery with slideshows
- Blog

## Local Development

```bash
docker compose up --build
```

Then visit `http://localhost:8080`. Live reload is available on port `35729`.

## Deployment

Pushing to `master` triggers the automatic CI/CD tests and deployment via GitHub Actions. The site is built and pushed to `gh-pages`, then served via GitHub Pages with my custom domain (see CNAME).

## Project Structure
```
├── .github/             # GitHub Actions workflows
├── _bibliography/       # BibTeX publications
├── _data/               # YAML data files (CV, etc.)
├── _includes/           # Reusable HTML components
├── _layouts/            # Page templates
├── _news/               # News/announcements
├── _pages/              # Static pages (about, cv, blog, etc.)
├── _plugins/            # Custom Jekyll plugins
├── _posts/              # Blog posts
├── _projects/           # Project pages
├── _sass/               # SCSS stylesheets
├── _scripts/            # Build scripts
├── assets/              # Images, JS, CSS, PDFs, JSON
├── bin/                 # Utility scripts
├── blog/                # Blog index page
├── lighthouse_results/  # Lighthouse audit results
├── _config.yml          # Jekyll configuration
├── docker-compose.yml   # Docker setup
├── Gemfile              # Ruby dependencies
└── CNAME                # Custom domain config
```

## Pagespeed Insights

![Lighthouse Performance](lighthouse_results/desktop/pagespeed.svg?v=1)

## License

This repository is licensed under the [MIT License](LICENSE).

## Acknowledgements

Built on [al-folio](https://github.com/alshedivat/al-folio) by [Maruan Al-Shedivat](https://github.com/alshedivat) and their [maintainers](https://github.com/alshedivat/al-folio?tab=readme-ov-file#maintainers).
