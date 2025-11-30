# Security Policy

## Supported Versions

This portfolio website is a fork of [al-folio](https://github.com/alshedivat/al-folio). Security updates are applied as they become available from the upstream repository.

| Version | Supported          |
| ------- | ------------------ |
| Current (main branch) | :white_check_mark: |
| Older commits | :x:                |

Since this is a personal portfolio site built with Jekyll and hosted on GitHub Pages, there are no versioned releases. The `main` branch represents the current production version.

## Reporting a Vulnerability

If you discover a security vulnerability in this repository, please follow these steps:

### How to Report

1. **Do not open a public issue.** Security vulnerabilities should not be disclosed publicly until they are addressed.

2. **Contact me directly** via email at [your.email@example.com] with the subject line: "Security Vulnerability Report"

3. **Include the following information:**
   - Description of the vulnerability
   - Steps to reproduce the issue
   - Potential impact
   - Any suggested fixes (if applicable)

## Security Considerations

This is a static website with no backend, database, or user authentication. However, security considerations include:

- **Dependencies:** Jekyll and Ruby gem dependencies are regularly updated
- **Third-party scripts:** Minimal use of external libraries (particles.js, Font Awesome)
- **User data:** No user data is collected or stored beyond standard GitHub Pages/basic Google analytics

## Upstream Security

Since this project is based on al-folio, security issues in the upstream theme should be reported to the [al-folio repository](https://github.com/alshedivat/al-folio/security).
