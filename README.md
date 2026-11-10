# Portfolio · Indah Ramadhani

Website portfolio dua bahasa (EN / ID) berbasis React + TypeScript + Tailwind, dikembangkan dari template `portfolio-template` (MIT).

## Menjalankan

```bash
npm install
npm run dev      # buka http://localhost:5173
npm run build    # hasil siap upload ada di folder dist/
```

## Mengubah isi

Hampir semua teks ada di dua file:

| File | Isi |
|------|-----|
| `src/data/content.ts` | Headline, about, proyek, pengalaman, skills, penghargaan, HKI, publikasi, volunteering, teks tombol. Setiap teks punya versi `en` dan `id`. |
| `src/data/certs.ts` | Daftar sertifikat (dibuat dari ekspor LinkedIn). |

### Menambah screenshot proyek
Simpan gambar di `src/assets/`, import di `src/components/section/Projects.tsx`, lalu tampilkan di kartu proyek. Status proyek diatur lewat field `status`: `live`, `development`, `concept`, atau `completed`.

### Menambah foto profil
Simpan foto di `src/assets/`, lalu isi `profilePhotos` di `src/assets/index.ts`. Kalau sudah diisi, jurnal di bagian About bisa diklik untuk membuka galeri foto.

## Deploy

- **Vercel / Netlify**: hubungkan repo, build command `npm run build`, output folder `dist`.
- **GitHub Pages / hosting biasa**: upload isi folder `dist/`. Situs memakai hash routing dan path relatif, jadi bisa jalan dari folder mana pun.

## Catatan lisensi

- Font: Caveat dan Covered By Your Grace (SIL Open Font License, via `@fontsource`).
- Stiker di `src/assets/stickers/` adalah SVG orisinal untuk situs ini.
- Font dan stiker bermerek dari template asli sudah dihapus.
