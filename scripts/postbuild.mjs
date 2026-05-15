// Post-build steps for gh-pages:
//  1. Copy index.html → 404.html so unknown URLs boot the SPA (client-side routing
//     then resolves the path). vite-react-ssg pre-renders known routes, so 404.html
//     only kicks in for truly unknown URLs.
//  2. Emit sitemap.xml + robots.txt from blogs.json.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');
const SITE_URL = 'https://samer-khdr.github.io/portfolio';

if (!fs.existsSync(dist)) {
  console.error('[postbuild] dist/ not found — did the build run?');
  process.exit(1);
}

// 1. SPA fallback for gh-pages
const indexHtml = path.join(dist, 'index.html');
const fourOhFour = path.join(dist, '404.html');
fs.copyFileSync(indexHtml, fourOhFour);
console.log('[postbuild] wrote dist/404.html');

// 2. sitemap.xml from blogs.json
const blogsJson = JSON.parse(
  fs.readFileSync(path.join(root, 'src/data/blogs.json'), 'utf8'),
);
const today = new Date().toISOString().slice(0, 10);
const urls = [
  { loc: `${SITE_URL}/`, lastmod: today, changefreq: 'weekly', priority: '1.0' },
  ...blogsJson.map((b) => ({
    loc: `${SITE_URL}/article/${b.id}`,
    lastmod: b.date || today,
    changefreq: 'monthly',
    priority: '0.7',
  })),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) =>
      `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`,
  )
  .join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);
console.log(`[postbuild] wrote dist/sitemap.xml (${urls.length} urls)`);

// 3. robots.txt
const robots = `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`;
fs.writeFileSync(path.join(dist, 'robots.txt'), robots);
console.log('[postbuild] wrote dist/robots.txt');
