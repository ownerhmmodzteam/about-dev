# HM MODZ Portfolio — Full Stack

Portofolio ini memakai frontend HTML/CSS/Vanilla JavaScript untuk menjaga UI ringan, ditambah Node.js Serverless Functions untuk API. Tidak membutuhkan framework frontend berat atau dependency npm untuk API.

## Fitur

- Mempertahankan konten dan interaksi portfolio HTML awal: Home, Journey, Projects, Tech, loader, animasi klik/ripple, musik, dan tautan proyek.
- Tema adaptif: System / Light / Dark, dengan pilihan disimpan secara lokal.
- Responsif untuk mobile, tablet, dan desktop; navigasi mobile disesuaikan agar tidak meluber.
- API portfolio digunakan frontend untuk memperbarui deskripsi proyek dan menampilkan status backend.
- Serverless API: `/api/health`, `/api/portfolio`, dan `/api/contact`.
- Tidak membutuhkan database untuk endpoint portfolio statis. Endpoint kontak memakai webhook opsional.
- Dukungan `prefers-reduced-motion` dan fokus keyboard.

## Jalankan lokal

Memerlukan Node.js 18 atau lebih baru.

```bash
npm run dev
```

Buka `http://localhost:3000`.

Uji API:

```bash
curl http://localhost:3000/api/health
curl http://localhost:3000/api/portfolio
```

## Deploy ke Vercel

1. Unggah folder ini ke repository GitHub.
2. Impor repository di Vercel.
3. Framework Preset: **Other**.
4. Root Directory: `./`.
5. Build Command dan Output Directory: kosongkan; tidak diperlukan proses build.
6. Deploy. Vercel akan menyajikan `index.html` sebagai static asset dan file di `api/` sebagai Serverless Functions.

Jangan set Development Command ke `vercel dev` jika memakai `npm run dev`; script lokal yang disediakan memakai Node server sederhana agar tidak memanggil `vercel dev` secara rekursif.

## Mengaktifkan form kontak

Endpoint `POST /api/contact` memvalidasi nama, email, dan pesan. Untuk benar-benar meneruskan pesan, tambahkan `CONTACT_WEBHOOK_URL` di Vercel Project Settings → Environment Variables. URL tersebut harus mengarah ke webhook yang memang Anda kontrol dan menerima JSON. Tanpa konfigurasi itu, endpoint akan mengembalikan HTTP 503 secara jujur, bukan berpura-pura pesan sudah dikirim.

Contoh body:

```json
{
  "name": "Nama Pengunjung",
  "email": "pengunjung@example.com",
  "message": "Halo, saya ingin berdiskusi tentang proyek."
}
```

## Aset opsional

HTML awal merujuk ke `latar.webm` dan `sta.mp3`. Letakkan file milik Anda di root project dengan nama yang sama bila ingin menampilkan video latar dan musik. Halaman tetap berjalan tanpa aset tersebut.

## Catatan performa

UI awal dipertahankan supaya identitas dan interaksinya tidak hilang. Frontend menggunakan JavaScript native; API tidak memiliki dependency npm. Tailwind CDN, Font Awesome CDN, dan Google Fonts dari source awal masih digunakan untuk mempertahankan desain yang ada. Jika target berikutnya adalah ukuran transfer paling kecil, langkah optimasi lanjutan adalah mengganti Tailwind CDN dengan CSS hasil build lokal dan mengurangi ketergantungan ikon/font eksternal.
