import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 80,
    proxy: {
      '/api': {
        target: 'http://51.103.250.250:3002',
        changeOrigin: true,
        rewrite: (path) => {
          console.log('Proxying:', path);
          return path;
        }
      },
      '/users': {
        target: 'http://20.208.131.253:3002',
        changeOrigin: true,
        rewrite: (path) => {
          console.log('Proxying:', path);
          return path;
        }
      },
      '/panoramas': {
        target: 'http://74.242.168.151:5050',
        changeOrigin: true,
        rewrite: (path) => {
          console.log('Proxying:', path);
          return path;
        }
      }
    }
  },
  plugins: [
    react(),
    {
      name: 'vite-plugin-csp-nonce',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const nonce = uuidv4();
          res.locals = { nonce }; // Attach nonce to res.locals for access in other middlewares

          // Set CSP header with the nonce, ensure no newlines
        //   res.setHeader('Content-Security-Policy', `default-src 'self'; script-src 'self' 'nonce-${nonce}'; style-src 'self' 'nonce-${nonce}'; object-src 'none'; frame-src 'none'; img-src 'self' data:; font-src 'self'; connect-src 'self' ws:; base-uri 'self'; form-action 'self';`);

          next();
        });

        // Custom middleware to inject nonce into script and style tags
        server.middlewares.use((req, res, next) => {
          const originalEnd = res.end;
          res.end = function (chunk, ...args) {
            if (chunk && typeof chunk === 'string') {
              const nonce = res.locals.nonce;
              chunk = chunk.replaceAll(/PLACEHOLDER/g, `${nonce}`)
            }
            return originalEnd.call(this, chunk, ...args);
          };
          next();
        });
      }
    }
  ],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html')
      }
    }
  },
  html: {
        cspNonce: 'PLACEHOLDER' // This placeholder will be replaced by the middleware
      }
});