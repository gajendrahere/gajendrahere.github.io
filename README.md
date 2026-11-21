# Gajendra Singh

A small, dependency-free personal website built with HTML, CSS, and vanilla JavaScript.

## Edit the content

Update `data/portfolio.js` for experience, projects, blog articles, skills, education, interests, and profile links. Add optional featured post links to the `articles` array. The Blog section links to [Bear Blog](https://bearblog.dev/gajendrasingh/). Keep unknown details visibly marked until they are confirmed. Place your portrait at `assets/profile.jpg`; the page loads it automatically and uses `assets/profile-placeholder.svg` if the photo is missing. It appears circular beside your introduction on desktop and above it on mobile. The introduction and SEO descriptions are in `index.html`; visual styles are in `style.css`.

The profile's Resume link currently downloads `assets/resume-placeholder.pdf`, a sample file marked as a placeholder. Replace that file with your real PDF resume to keep the current download link.

Experience logos are loaded from `assets/bread-financial-logo.png` and `assets/affine-logo.png`. Save the supplied company logo images with those names; until then, the timeline displays company initials.

## Preview locally

Serve this directory over HTTP so the browser can load the JavaScript module:

```sh
ruby -run -e httpd . -p 4173
```

Then open `http://localhost:4173`.

## Deploy with GitHub Pages

The included `.github/workflows/pages.yml` deploys the site on every push to `main` and can also be run manually. Your GitHub username is `gajendrahere`, so the user-site repository must be named `gajendrahere.github.io` and the Pages address will be `https://gajendrahere.github.io/`.

1. Create the `gajendrahere.github.io` repository and push this project to its `main` branch.
2. In repository Settings > Pages, set the build and deployment source to GitHub Actions.
3. After the workflow completes, open `https://gajendrahere.github.io/`.

The existing `CNAME` for `gajendrasingh.in` is temporarily removed for this GitHub-hosted URL. To switch to the custom domain later, add `gajendrasingh.in` in Pages settings, restore a `CNAME` file containing that domain, and configure the DNS records described in [GitHub's custom-domain documentation](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site).

## Deploy with Vercel

Import the repository into Vercel with the project root as the site root, then add `gajendrasingh.in` in the project's Domains settings. Apply the DNS records Vercel shows for the domain. Do not configure both GitHub Pages and Vercel as the active host for the same domain.

## Details to confirm

- Bread Financial start date.
- Affine dates, exact title, and responsibilities.
- Degree, university, specialization, and dates.
- LinkedIn, GitHub, and email URLs; add a resume PDF and link when ready.
- Project descriptions, technologies, repository/demo URLs, and any future article links.