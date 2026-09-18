import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Helper to ensure .env.local is always loaded into process.env during local dev
function loadLocalEnv(root) {
  const envFile = path.resolve(root || process.cwd(), '.env.local');
  if (fs.existsSync(envFile)) {
    const lines = fs.readFileSync(envFile, 'utf8').split(/\r?\n/);
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
        const [k, ...v] = trimmed.split('=');
        if (k) process.env[k.trim()] = v.join('=').trim();
      }
    }
  }
}

// Local dev middleware that runs /api/payment/* serverless handlers during `npm run dev`
function phonePeApiDevPlugin(env) {
  return {
    name: 'phonepe-api-dev-server',
    configureServer(server) {
      // Inject env into process.env
      Object.assign(process.env, env);
      loadLocalEnv(server.config.root);

      server.middlewares.use(async (req, res, next) => {
        if (!req.url.startsWith('/api/payment')) {
          return next();
        }

        // Always ensure latest .env.local is in process.env
        loadLocalEnv(server.config.root);

        // Parse body for POST requests
        let rawBody = '';
        req.on('data', (chunk) => {
          rawBody += chunk;
        });
        await new Promise((resolve) => req.on('end', resolve));

        try {
          req.body = rawBody ? JSON.parse(rawBody) : {};
        } catch {
          req.body = rawBody;
        }

        // Polyfill res.status and res.json for Vercel Serverless Function compatibility
        res.status = function (statusCode) {
          res.statusCode = statusCode;
          return res;
        };
        res.json = function (payload) {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(payload));
          return res;
        };

        try {
          const pathname = req.url.split('?')[0];
          if (pathname === '/api/payment/create-order') {
            const { default: handler } = await server.ssrLoadModule('./api/payment/create-order.js');
            return await handler(req, res);
          } else if (pathname === '/api/payment/status') {
            const { default: handler } = await server.ssrLoadModule('./api/payment/status.js');
            return await handler(req, res);
          } else if (pathname === '/api/payment/webhook') {
            const { default: handler } = await server.ssrLoadModule('./api/payment/webhook.js');
            return await handler(req, res);
          }
        } catch (err) {
          console.error('API Dev Middleware Error:', err);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: false, message: err.message }));
          return;
        }

        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), phonePeApiDevPlugin(env)],
  };
});
