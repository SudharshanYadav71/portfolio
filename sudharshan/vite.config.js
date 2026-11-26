import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression';

const START_PAGE_PATHS = new Set(['/start', '/start/']);

function rewriteStartPage(req, _res, next) {
  const [pathname, query = ''] = req.url.split('?');

  if (START_PAGE_PATHS.has(pathname)) {
    req.url = `/start/index.html${query ? `?${query}` : ''}`;
  }

  next();
}

function serveStaticStartPage() {
  return {
    name: 'serve-static-start-page',
    configureServer(server) {
      server.middlewares.use(rewriteStartPage);
    },
    configurePreviewServer(server) {
      server.middlewares.use(rewriteStartPage);
    }
  };
}

// https://vite.dev/config/
const ROUTE_PAGES = ['about', 'gallery', 'contact', 'studio'];

function rewriteRoutePages(req, _res, next) {
  const [pathname, query = ''] = req.url.split('?');
  const match = pathname.match(/^\/(about|gallery|contact|studio)\/?$/);
  if (match) {
    req.url = `/${match[1]}.html${query ? `?${query}` : ''}`;
  }
  next();
}

export default defineConfig({
  plugins: [
    serveStaticStartPage(),
    {
      name: 'serve-route-pages',
      configureServer(server) {
        server.middlewares.use(rewriteRoutePages);
      },
      configurePreviewServer(server) {
        server.middlewares.use(rewriteRoutePages);
      }
    },
    react(),
    viteCompression()
  ],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        about: 'about.html',
        gallery: 'gallery.html',
        contact: 'contact.html',
        studio: 'studio.html'
      }
    }
  }
})
