const portfolio = {
  profile: {
    name: 'HM MODZ TEAM',
    role: 'Independent Developer',
    description: 'Membangun aplikasi, eksperimen digital, dan pengalaman pengguna yang modern.',
    locale: 'id-ID'
  },
  projects: [
    {
      id: 'nest-stream', name: 'Nest Stream', status: 'v34.0',
      description: 'Aplikasi hiburan untuk menjelajahi film, anime, dan manhwa dengan fokus pada navigasi dan pengalaman penggunaan yang nyaman.',
      category: 'Android / Streaming',
      links: { download: 'https://www.mediafire.com/file/mvuu8eqpll2izdp/Nest+Stream_34.0.apk/file', demo: 'https://vt.tiktok.com/ZS4Mvb25C/' }
    },
    {
      id: 'nest-music', name: 'Nest Music', status: 'rebuild',
      description: 'Aplikasi musik yang dirancang untuk pengalaman mendengarkan sederhana, dengan fokus pada pencarian, pemutaran, dan koleksi.',
      category: 'Android / Music',
      links: { download: 'https://www.mediafire.com/file/d5xzhwrifwrpwny/Nest-Music#Rebuild_opt_opt.apk/file' }
    },
    {
      id: 'nest-comic', name: 'Nest Comic', status: 'v1.0',
      description: 'Aplikasi membaca komik dan manga dengan fokus pada pencarian, koleksi, integrasi API, dan pengalaman membaca yang nyaman.',
      category: 'Android / Reader',
      links: { download: 'https://www.mediafire.com/file/0bz5ys02eo56p27/Nest+Comic_1.0_Rebuild.apk/file' }
    },
    {
      id: 'droid-up-dex', name: 'Droid-Up Dex', status: 'beta',
      description: 'Eksperimen mirroring Android bergaya desktop yang memanfaatkan USB debugging atau koneksi nirkabel melalui opsi pengembang.',
      category: 'Android / Windows',
      links: { download: 'https://www.mediafire.com/file/yox8l83rqzzp5ws/DroidUP-Dex-v1.6-win-x64.zip/file' }
    },
    {
      id: 'hm-tube', name: 'HM TUBE', status: 'offline',
      description: 'Eksperimen aplikasi video Android dengan fokus pada tampilan dan kontrol pemutaran yang nyaman di perangkat mobile.',
      category: 'Android / Video',
      links: { download: 'https://www.mediafire.com/file/88xxt1p5uxm57iz/HM+TUBE_1.5.apk/file', community: 'https://whatsapp.com/channel/0029VbDQhK9GufIwKphQYn1v' }
    }
  ],
  technologies: [
    { name: 'PHP', category: 'Backend / Web' },
    { name: 'C++', category: 'Native / System' },
    { name: 'Java', category: 'App / System' },
    { name: 'Kotlin', category: 'Android Development' },
    { name: 'Jet Compose', category: 'Modern UI' },
    { name: 'Database', category: 'Data Storage' },
    { name: 'Homelab Server', category: 'Infrastructure' },
    { name: 'Reverse Engineer', category: 'Software Analysis' },
    { name: 'Cyber Security', category: 'Security Research' }
  ]
};

module.exports = function handler(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  return res.status(200).json(portfolio);
};
