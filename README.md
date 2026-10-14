# HM MODZ Portfolio — Full Stack

Portofolio ini memakai frontend HTML/CSS/Vanilla JavaScript untuk menjaga UI ringan, ditambah Node.js Serverless Functions untuk API. Tidak membutuhkan framework frontend berat atau dependency npm untuk API.

## Fitur

- Menata ulang portfolio menjadi satu halaman scroll dengan navigasi anchor: Home, Journey, Projects, dan Tech Stack. Loader berat dan logika video latar `latar.webm` dihapus; latar diganti ambience gradient dan grid CSS yang ringan.
- Tema adaptif: System / Light / Dark, dengan pilihan disimpan secara lokal. Desain editorial gelap dengan aksen hijau-lime, kartu rapi, dan animasi reveal yang menghormati reduced-motion.
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

## Aset

Tidak membutuhkan `latar.webm`; seluruh latar visual dibuat dengan CSS dan animasi ringan. Audio latar juga tidak dipakai pada desain baru.

## Catatan performa

Struktur konten penting tetap dipertahankan, tetapi UI/UX ditata ulang menjadi satu halaman scroll agar navigasi tidak menyembunyikan section. Frontend menggunakan JavaScript native; API tidak memiliki dependency npm. Tailwind CDN, Font Awesome CDN, dan Google Fonts dari source awal masih digunakan untuk mempertahankan desain yang ada. Jika target berikutnya adalah ukuran transfer paling kecil, langkah optimasi lanjutan adalah mengganti Tailwind CDN dengan CSS hasil build lokal dan mengurangi ketergantungan ikon/font eksternal.


### Logo halaman Home
Letakkan file logo yang ingin digunakan dengan nama `icon.png` di folder root proyek (sejajar dengan `index.html`). Logo ditampilkan di tengah di atas nama **NEST TEAM PROJECT**. Gunakan PNG transparan agar hasilnya rapi.
