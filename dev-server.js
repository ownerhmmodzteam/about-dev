const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = __dirname;
const PORT = Number(process.env.PORT || 3000);
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.webm': 'video/webm', '.mp3': 'audio/mpeg', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp'
};
const handlers = {};

async function getHandler(name) {
  if (!handlers[name]) handlers[name] = require(path.join(ROOT, 'api', name + '.js'));
  return handlers[name];
}

function createResponse(res) {
  return {
    setHeader: (key, value) => res.setHeader(key, value),
    status(code) { res.statusCode = code; return this; },
    json(value) { res.setHeader('Content-Type', 'application/json; charset=utf-8'); res.end(JSON.stringify(value)); return this; },
    end(value) { res.end(value); return this; }
  };
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  if (url.pathname.startsWith('/api/')) {
    const name = url.pathname.slice('/api/'.length).replace(/[^a-z-]/g, '');
    if (!['health', 'portfolio', 'contact'].includes(name)) {
      res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
      return res.end(JSON.stringify({ error: 'API route not found' }));
    }
    try {
      let raw = '';
      if (req.method === 'POST') {
        for await (const chunk of req) {
          raw += chunk;
          if (Buffer.byteLength(raw) > 10000) {
            res.writeHead(413, { 'Content-Type': 'application/json; charset=utf-8' });
            return res.end(JSON.stringify({ ok: false, error: 'Payload terlalu besar.' }));
          }
        }
      }
      req.body = raw ? JSON.parse(raw) : {};
      const handler = await getHandler(name);
      await handler(req, createResponse(res));
    } catch (error) {
      if (!res.headersSent) res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
      if (!res.writableEnded) res.end(JSON.stringify({ ok: false, error: 'Internal server error' }));
      if (process.env.NODE_ENV !== 'production') console.error(error);
    }
    return;
  }

  let pathname = decodeURIComponent(url.pathname);
  if (pathname === '/') pathname = '/index.html';
  const filePath = path.resolve(ROOT, '.' + pathname);
  if (!filePath.startsWith(ROOT + path.sep) && filePath !== path.join(ROOT, 'index.html')) {
    res.writeHead(403); return res.end('Forbidden');
  }
  fs.readFile(filePath, (error, content) => {
    if (error) { res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }); return res.end('Not found'); }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(filePath)] || 'application/octet-stream', 'X-Content-Type-Options': 'nosniff' });
    res.end(content);
  });
});

server.listen(PORT, '0.0.0.0', () => console.log(`HM MODZ Portfolio running at http://localhost:${PORT}`));
