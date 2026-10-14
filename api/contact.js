const MAX_BODY_BYTES = 10_000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value, max = 1500) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
};

module.exports = async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    if (Buffer.byteLength(body, 'utf8') > MAX_BODY_BYTES) return res.status(413).json({ ok: false, error: 'Payload terlalu besar.' });
    try { body = JSON.parse(body); } catch { return res.status(400).json({ ok: false, error: 'Format JSON tidak valid.' }); }
  }
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return res.status(400).json({ ok: false, error: 'Body JSON diperlukan.' });
  }

  // Honeypot field for basic bot filtering.
  if (clean(body.website, 200)) return res.status(200).json({ ok: true, message: 'Pesan diterima.' });

  const name = clean(body.name, 100);
  const email = clean(body.email, 254).toLowerCase();
  const message = clean(body.message, 3000);
  if (name.length < 2 || !EMAIL_RE.test(email) || message.length < 10) {
    return res.status(400).json({ ok: false, error: 'Isi nama, email valid, dan pesan minimal 10 karakter.' });
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) {
    return res.status(503).json({ ok: false, error: 'Form kontak belum dikonfigurasi. Hubungkan CONTACT_WEBHOOK_URL di Vercel Environment Variables.' });
  }

  try {
    const upstream = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ source: 'HM MODZ Portfolio', name, email, message, sentAt: new Date().toISOString() }),
      signal: AbortSignal.timeout(8000)
    });
    if (!upstream.ok) throw new Error('Contact webhook returned ' + upstream.status);
    return res.status(200).json({ ok: true, message: 'Pesan berhasil dikirim.' });
  } catch {
    return res.status(502).json({ ok: false, error: 'Layanan kontak sedang tidak tersedia. Silakan coba lagi nanti.' });
  }
}
