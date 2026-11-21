import { portfolio } from "/data/portfolio.js?v=5";

const portrait = document.querySelector(".portrait");
const showPortrait = () => {
  portrait.hidden = false;
};

portrait.addEventListener("load", showPortrait, { once: true });
portrait.addEventListener("error", () => {
  if (!portrait.src.endsWith("/assets/profile-placeholder.svg")) {
    portrait.src = "/assets/profile-placeholder.svg";
  }
}, { once: true });

if (portrait.complete) {
  if (portrait.naturalWidth > 0) {
    showPortrait();
  } else {
    portrait.src = "/assets/profile-placeholder.svg";
  }
}

const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
}[character]));

const safeURL = (value) => /^(https?:|mailto:)/i.test(value);

function renderLink(label, url, fallback = "URL to add") {
  if (url && safeURL(url)) {
    const newTab = /^https?:/i.test(url) ? ' target="_blank" rel="noopener noreferrer"' : "";
    return `<a href="${escapeHTML(url)}"${newTab}>${escapeHTML(label)}</a>`;
  }
  return `<span>${escapeHTML(label)} <span class="placeholder">(${escapeHTML(fallback)})</span></span>`;
}

function renderProfileLink({ label, url }) {
  if (label === "Resume") {
    const resumeURL = url || "/assets/resume-placeholder.pdf";
    return `<a class="profile-resume" href="${escapeHTML(resumeURL)}" download="Gajendra-Singh-Resume.pdf">Resume</a>`;
  }

  const icons = {
    LinkedIn: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M5.2 8.4H2V22h3.2zM3.6 2a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8M22 13.5c0-4.1-2.2-6-5.1-6a4.4 4.4 0 0 0-4 2.2V8.4H9.7V22h3.2v-6.7c0-1.8.3-3.6 2.6-3.6s2.3 2.1 2.3 3.7V22H22z"/></svg>',
    GitHub: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 .9a11.1 11.1 0 0 0-3.5 21.6c.6.1.8-.2.8-.6v-2.1c-3.3.7-4-1.4-4-1.4-.5-1.3-1.3-1.6-1.3-1.6-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.5-2.7 5.5-5.3 5.8.4.3.8 1 .8 2v3c0 .4.2.7.8.6A11.1 11.1 0 0 0 12 .9"/></svg>',
    Email: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 19V5.8L12 12l8.5-6.2V19" fill="none" stroke="#4285f4" stroke-width="3" stroke-linejoin="round"/><path d="M3.5 5.8 12 12" fill="none" stroke="#ea4335" stroke-width="3"/><path d="m12 12 8.5-6.2" fill="none" stroke="#34a853" stroke-width="3"/><path d="M20.5 5.8V19" fill="none" stroke="#fbbc04" stroke-width="3"/></svg>',
  };
  const accessibleLabel = url ? label : `${label}, URL to add`;
  const tag = url && safeURL(url) ? "a" : "span";
  const href = tag === "a" ? ` href="${escapeHTML(url)}"` : "";
  const rel = /^https?:/i.test(url) ? ' target="_blank" rel="noopener noreferrer"' : "";
  return `<${tag} class="profile-icon profile-icon-${label.toLowerCase()}${href ? "" : " is-placeholder"}"${href}${rel} aria-label="${escapeHTML(accessibleLabel)}" title="${escapeHTML(accessibleLabel)}">${icons[label] || ""}</${tag}>`;
}

function renderSection(id, title, content) {
  return `<section id="${id}" aria-labelledby="${id}-heading"><h2 class="ctitle" id="${id}-heading">${title}</h2>${content}</section>`;
}

function renderExperienceDates(dates) {
  return dates.split("–").map((value) => {
    const date = value.trim();
    const match = /^(\d{4})\/(\d{2})$/.exec(date);

    if (!match) return escapeHTML(date);

    const [, year, month] = match;
    const isoDate = `${year}-${month}`;
    const displayDate = new Intl.DateTimeFormat("en", {
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(Date.UTC(Number(year), Number(month) - 1, 1)));

    return `<time datetime="${isoDate}">${displayDate}</time>`;
  }).join(' <span class="date-range-dash" aria-hidden="true">–</span> ');
}

const profileLinks = document.querySelector("#profile-links");
profileLinks.innerHTML = portfolio.links.map(renderProfileLink).join("");

const experience = portfolio.experience.map((item) => `
  <article class="entry timeline-entry">
    <p class="timespan">${renderExperienceDates(item.dates)}${item.dateNote ? `<span class="date-note">${escapeHTML(item.dateNote)}</span>` : ""}</p>
    <div class="entry-marker" aria-hidden="true">
      <span class="entry-dot"></span>
      <span class="org-mark">
        ${item.logo ? `<img class="org-logo" src="${escapeHTML(item.logo)}" alt="" hidden>` : ""}
        <span class="org-initials">${item.company.split(/\s+/).map((part) => part[0]).slice(0, 2).join("").toUpperCase()}</span>
      </span>
    </div>
    <div class="desc">
      <h3>${item.url ? renderLink(item.company, item.url) : escapeHTML(item.company)}</h3>
      <p class="entry-subtitle">${escapeHTML(item.title)}${item.group ? ` · ${escapeHTML(item.group)}` : ""}</p>
      ${item.project ? `<p class="role-project">${escapeHTML(item.project)}</p>` : ""}
      ${Array.isArray(item.description)
        ? `<ul class="role-points">${item.description.map((point) => `<li>${escapeHTML(point)}</li>`).join("")}</ul>`
        : `<p>${escapeHTML(item.description)}</p>`}
    </div>
  </article>`).join("");

const projects = `<ol class="entry-list">${portfolio.projects.map((project) => `
  <li class="entry">
    <h3>${escapeHTML(project.category)}: ${escapeHTML(project.title)}</h3>
    <p>${escapeHTML(project.description)}</p>
    <p class="entry-meta">Technologies: ${escapeHTML(project.technologies)}</p>
    <p class="project-links">${renderLink("GitHub", project.github, "URL to add")} <span>${renderLink("Demo", project.demo, "URL to add")}</span></p>
  </li>`).join("")}</ol>`;

const blog = `<p>I write about ideas, technical concepts, and things I learn.</p>${portfolio.articles.length
  ? `<div class="blog-list">${portfolio.articles.map((article) => `<article class="blog-entry"><time class="blog-date">${escapeHTML(article.date || "Date to add")}</time><div class="blog-title"><span>${escapeHTML(article.title)}</span> — ${renderLink("Link", article.url, "URL to add")}</div></article>`).join("")}</div>`
  : ""}`;

const skills = portfolio.skills.map((group) => `
  <div class="skills-group">
    <h3>${escapeHTML(group.category)}</h3>
    <p>${group.items.map(escapeHTML).join(", ")}</p>
  </div>`).join("");

const education = portfolio.education.map((item) => `
  <article class="entry timeline-entry education-entry">
    <p class="timespan">${renderExperienceDates(item.dates)}</p>
    <div class="entry-marker education-marker" aria-hidden="true">
      <span class="entry-dot"></span>
      <span class="org-mark">
        <img class="org-logo" src="${escapeHTML(item.logo)}" alt="" hidden>
      </span>
    </div>
    <div class="desc education-desc">
      <h3 class="education-degree">${escapeHTML(item.degree)}</h3>
      <p class="education-institution">${escapeHTML(item.institution)}</p>
      <p class="education-specialization">${escapeHTML(item.specialization)}</p>
    </div>
  </article>`).join("");

const contact = `<p>I'm always interested in connecting with people working on interesting problems, exchanging ideas, and exploring meaningful opportunities.</p><p>${portfolio.links.filter(({ label }) => ["Email", "LinkedIn", "GitHub"].includes(label)).map(({ label, url }) => renderLink(label, url, `${label} URL to add`)).join(" · ")}</p>`;
const experienceSection = `<section id="experience" aria-labelledby="experience-heading"><h2 class="ctitle" id="experience-heading">Experience</h2><div class="timeline">${experience}</div></section>`;
const biography = `<p>I'm a Data Scientist exploring the intersection of Artificial Intelligence, machine learning, and technology. I enjoy solving complex problems, building intelligent systems, and continuously learning along the way.</p>`;

document.querySelector("#site-content").innerHTML = [
  renderSection("bio", "Bio", biography),
  experienceSection,
  renderSection("education", "Education", `<div class="timeline education-timeline">${education}</div>`),
  renderSection("blog", "Blog", blog),
//   renderSection("projects", "Selected Projects", projects),
//   renderSection("interests", "Interests", `<ul class="plain-list">${portfolio.interests.map((interest) => `<li>${escapeHTML(interest)}</li>`).join("")}</ul>`),
//   renderSection("tools", "Technical Skills", skills),
  renderSection("contact", "Contact", contact),
].join("");

document.querySelectorAll(".org-logo").forEach((logo) => {
  const revealLogo = () => {
    logo.hidden = false;
    if (logo.nextElementSibling) logo.nextElementSibling.hidden = true;
  };

  logo.addEventListener("load", revealLogo, { once: true });
  if (logo.complete && logo.naturalWidth > 0) revealLogo();
});

// document.querySelector("#year").textContent = String(new Date().getFullYear());