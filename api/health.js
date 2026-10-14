module.exports = function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }
  return res.status(200).json({
    ok: true,
    service: 'hm-modz-portfolio-api',
    runtime: 'vercel-serverless-nodejs',
    timestamp: new Date().toISOString()
  });
};
