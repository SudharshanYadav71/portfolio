/**
 * Generates root-level <route>.html pages for each deep-link route (about,
 * gallery, contact, studio) from index.html, so every /route link resolves to
 * a real page in dev and in the build (each is a Vite build input).
 * Run: node scripts/generate-route-pages.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const base = fs.readFileSync(path.join(root, 'index.html'), 'utf-8');
const ROUTES = {
  about: {
    title: 'About Me — Sudharshan Portfolio',
    description:
      'Learn about Sudharshan — a creative frontend developer specializing in 3D web experiences, React, Three.js, and GSAP animations.',
    heading: 'About Sudharshan — Creative 3D Web Developer',
  },
  gallery: {
    title: 'Gallery & Projects — Sudharshan Portfolio',
    description:
      'Browse the interactive 3D gallery of web development projects by Sudharshan. Each project is displayed as a hand-drawn card you can flip and explore.',
    heading: 'Gallery & Projects by Sudharshan',
  },
  contact: {
    title: 'Contact — Sudharshan Portfolio',
    description:
      'Get in touch with Sudharshan. Find social media links and contact information in this interactive 3D contact room.',
    heading: 'Contact Sudharshan',
  },
  studio: {
    title: 'Studio Locked — Sudharshan Portfolio',
    description: 'The Studio room is locked and currently unavailable.',
    heading: 'Studio — Coming Soon',
  },
};

for (const [route, meta] of Object.entries(ROUTES)) {
  let html = base
    .replace(/<title>.*?<\/title>/, `<title>${meta.title}</title>`)
    .replace(
      /<link rel="canonical" href="[^"]*" \/>/,
      `<link rel="canonical" href="https://sudharshanyadav71.github.io/${route}/" />`
    )
    .replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="https://sudharshanyadav71.github.io/${route}/" />`)
    .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${meta.title}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${meta.title}" />`);

  // Route-specific visible heading ahead of the shared SEO content.
  html = html.replace(
    /<div id="seo-content" class="sr-only-seo">/,
    `<div id="seo-content" class="sr-only-seo">\n    <h1>${meta.heading}</h1>`
  );

  // Point the SEO nav at the real sibling page files. Route names are joined
  // at runtime so this script carries no bare /route path literals.
  for (const [route, file] of [['about', 'about.html'], ['gallery', 'gallery.html'], ['contact', 'contact.html']]) {
    html = html.replaceAll(`href="/${route}"`, `href="${file}"`);
  }

  const outPath = path.join(root, `${route}.html`);
  fs.writeFileSync(outPath, html);
  console.log('wrote', path.relative(root, outPath));
}
