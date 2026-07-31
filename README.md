# BantuDev

Website resmi statis untuk BantuDev, layanan bantuan pengembangan software gratis oleh independent developer.

BantuDev diposisikan sebagai bantuan sukarela yang serius: saya hanya otodidak 100% yang bertekad untuk membangun portofolio dan pengalaman, berusaha merespons pengajuan dengan cepat, mempelajari kebutuhan nyata, dan menggunakan prosesnya untuk mengasah skill.

## Cara Menjalankan

Website ini menggunakan HTML, CSS, dan JavaScript vanilla tanpa backend.

Cara paling sederhana:

1. Buka file `index.html` langsung di browser.
2. Atau jalankan static server lokal, misalnya dengan ekstensi Live Server di VS Code.

## Mengganti Nomor WhatsApp

Buka `assets/js/config.js`, lalu ubah:

```js
whatsappNumber: "WHATSAPP_NUMBER=62XXXXXXXXXXX"
```

Menjadi nomor WhatsApp aktif dengan format internasional tanpa tanda plus, contoh:

```js
whatsappNumber: "6281234567890"
```

Link WhatsApp memakai format `wa.me`. Pesan otomatis default dan pesan dari form kontak berisi pengajuan bantuan pengembangan software gratis.

## Mengganti Email

Buka `assets/js/config.js`, lalu ubah:

```js
emailAddress: "EMAIL_ADDRESS=alamat@email.com"
```

Menjadi email aktif, contoh:

```js
emailAddress: "nama@email.com"
```

Subject email dapat diganti dari properti `emailSubject`.

## Menambahkan Portofolio

Buka `index.html`, cari section:

```html
<section class="section section-muted" id="portofolio">
```

Salin salah satu blok:

```html
<article class="portfolio-card">
```

Lalu ubah isi:

- Nama proyek
- Jenis proyek
- Masalah
- Solusi
- Teknologi
- Hasil
- Status proyek

Gunakan label yang jujur seperti `Proyek pribadi`, `Latihan teknis`, `Bantuan gratis`, atau `Studi kasus`. Pastikan tidak menulis nama klien, data sensitif, atau detail proyek tanpa izin.

## Deploy ke GitHub Pages

1. Buat repository GitHub.
2. Upload semua file website ke repository.
3. Buka menu repository `Settings`.
4. Pilih `Pages`.
5. Pada bagian source, pilih branch utama dan folder root.
6. Simpan, lalu tunggu URL GitHub Pages aktif.

## Deploy ke VPS Nginx

Contoh langkah umum:

1. Upload folder website ke VPS, misalnya `/var/www/bantudev`.
2. Buat konfigurasi Nginx untuk domain.
3. Arahkan `root` ke folder website.
4. Aktifkan konfigurasi dengan symbolic link ke `sites-enabled`.
5. Uji konfigurasi Nginx.
6. Reload Nginx.
7. Pasang SSL menggunakan Certbot jika domain sudah mengarah ke VPS.

Contoh blok Nginx:

```nginx
server {
    listen 80;
    server_name domain-anda.com www.domain-anda.com;
    root /var/www/bantudev;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

## Catatan

Form kontak tidak mengirim data ke server. Data yang diisi hanya digunakan di browser untuk menyusun pesan WhatsApp.

Bantuan yang disetujui diposisikan tanpa biaya jasa. Dukungan sukarela boleh diterima setelah pengerjaan, tetapi tidak diwajibkan dan tidak menjadi syarat penerimaan permintaan.
"# landingpage-jasa-dev-gratis" 
