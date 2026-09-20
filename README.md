# Undangan Pernikahan — Arkhul & Resti

A premium, offline-capable digital wedding invitation built with
**HTML5 + CSS3 + vanilla JavaScript only** — no frameworks, no build step,
no network dependencies at runtime.

## Features

- Full-screen opening cover with guest personalisation (`index.html?to=Nama+Tamu`)
- Multi-owner links: one invitation shared by both families (`index.html?owner=pria` / `?owner=wanita`)
- Hero, quote, couple profiles, events, live countdown, love-story timeline,
  gallery with fullscreen lightbox, cashless gift section
  with copy-to-clipboard, wishes guestbook, closing
- Client-side generated `.ics` calendar files ("Simpan ke Kalender")
- Google Maps deep links for navigation
- Background ambient music (gesture-triggered, fades in/out, never autoplays before the user opens the invitation)
- Floating controls: music toggle, scroll-to-top, navigation sheet
- `prefers-reduced-motion` respected; keyboard accessible; semantic landmarks

## Running locally

Any static server works:

```bash
python3 -m http.server 8099
# then open http://localhost:8099/
```

Or simply open `index.html` directly in a browser (double-click). Both work;
a static server is only preferred because the browser URL bar then supports
the `?to=` parameter cleanly.

**However**, the "Kirim Ucapan" section reads `data/wishes.json` via `fetch`,
which does not work over `file://` — so the wishes list requires running the
local server above.

## Personalising a guest link

```
http://localhost:8099/?to=Budi%20Santoso
```

The cover displays "Kepada: Budi Santoso". The value is rendered with
`textContent` only (never `innerHTML`) and is limited to 60 characters.

## Multi-owner links (undangan dipakai dua pihak)

One invitation, two links — each family sees **its own reception and its own bank account**,
while the akad, couple profiles, story, gallery and guestbook stay shared:

| Link | What is shown |
|---|---|
| `?owner=pria` (alias `?owner=groom`) | akad + the groom family's reception + the groom family's account |
| `?owner=wanita` (alias `?owner=bride`) | akad + the bride family's reception + the bride family's account |
| `?owner=semua` (alias `all`/`both`/`gabungan`) | every event and both accounts, with a family badge on each reception card |
| no parameter, or an unknown value | the **groom** view (the default) |

Combine with a guest name: `?to=Budi%20Santoso&owner=pria`.
The `owner` value is read from the URL only — it is never stored on the device, and each
family simply keeps its own link. This is why the plain URL shows the groom view.

## Generator link tamu (generate.html)

**Halaman internal** untuk membuat link undangan personal per tamu tanpa
menyusun query param manual:

```
https://<host>/generate.html
```

Isi **Nama Tamu Undangan**, pilih **Jenis Undangan** (Groom / Bride / All),
lalu tekan **Salin URL**. URL yang dihasilkan memakai query yang sama dengan
tabel di atas (`?to=<nama>&owner=<pria|wanita|semua>`) dan **otomatis mengikuti
base URL tempat web berjalan** — `http://localhost:8099/index.html?to=...`
saat lokal, `https://...github.io/.../index.html?to=...` saat di GitHub Pages.

Detail perilaku:

- Nama dibatasi 60 karakter (batas yang sama dengan `?to=`) dan di-encode
  otomatis via `URLSearchParams` — karakter seperti `&`, `#`, `<` aman dan
  selalu ditampilkan sebagai teks (`textContent`), tidak pernah `innerHTML`.
- Nama kosong tidak memblokir — link tanpa `?to=` menampilkan default
  "Bapak/Ibu/Saudara/i" pada sampul.
- Tombol **Buka Pratinjau** membuka link hasil di tab baru untuk dicek
  sebelum dibagikan.
- Halaman ini `noindex, nofollow` dan tidak menaut ke halaman utama —
  ini alat untuk pemilik undangan, bukan bagian navigasi tamu.

## Customising the content

Everything editable lives in **one object at the top of [`js/app.js`](js/app.js)**:

```js
const invitationData = {
  couple:     { bride: "Nurfadilla Resti Harisda, S.Pt", groom: "Arkhul Prakashandy Putra, S.Pt" },
  date:       "Kamis, 8 Oktober 2026 & Sabtu, 10 Oktober 2026",
  sharedEvents: [ /* akad — shown on BOTH owner links */ ],
  owners: {
    groom: {
      host:   "Keluarga Mempelai Pria",
      events: [ /* this family's reception — times, venue, ICS start/end */ ],
      bank:   { name, accountName, accountNumber },
    },
    bride: { /* same shape */ },
  },
  story:      [ /* timeline entries */ ],
  gallery:    [ /* src, alt, aspect ratio */ ],
  wishes:     { seedUrl, backend }, /* see "Ucapan (guestbook)" below */
};
```

A non-developer can change names, dates, events, bank details and gallery
images by editing only that object — including which reception and which account
belongs to which family (`owners.groom` / `owners.bride`). Static prose (hero message, quote,
parent names, closing) stays in `index.html`.

## Replacing artwork

The files in `assets/images/` are **original vector placeholders authored for
this project** in the "Modern Editorial Botanical Wedding" language (warm
ivory/espresso/olive/rose duotones, line-art botanicals, paper grain). They are
designed to be swapped 1:1 for the couple's real photographs with the same
filenames — no layout changes needed.

## Assets

`assets/audio/` holds three tracks: `groom.webm` and `bride.mp3` (Opus, per
jenis undangan) plus `leberch-invitation-wedding.mp3` (trek cadangan untuk semua jenis
undangan).
A track is only fetched when the guest first presses play (cover "Buka
Undangan" or the music button), and it fades in/out over ~1.5 s — see
"Musik latar per jenis undangan" below for the full mapping.

## Musik latar per jenis undangan

Setiap jenis undangan memutar treknya sendiri. Pemetaannya ada di
`invitationData.music.tracks` (bagian atas [`js/app.js`](js/app.js)):

| Jenis undangan | Trek utama (primary) | Fallback |
|---|---|---|
| `?owner=pria` (mempelai pria) | `assets/audio/groom.webm` | `assets/audio/leberch-invitation-wedding.mp3` |
| `?owner=wanita` (mempelai wanita) | `assets/audio/bride.mp3` | `assets/audio/leberch-invitation-wedding.mp3` |
| `?owner=semua` (gabungan) | `assets/audio/groom.webm` | `assets/audio/leberch-invitation-wedding.mp3` |
| Tanpa parameter / nilai tak dikenal | (default pria) `assets/audio/groom.webm` | `assets/audio/leberch-invitation-wedding.mp3` |

**Aturan fallback:** saat halaman dibuka, `initMusic()` memeriksa dukungan
browser dengan `audio.canPlayType('audio/webm; codecs="opus"')`. Bila browser
tidak bisa memutar WebM/Opus (mis. Safari/iOS sebelum 17.4 yang hanya bisa Opus
di container CAF), otomatis dipakai trek `fallback` (mp3 generik). Tidak ada percobaan memutar dua kali —
`src` ditetapkan sekali sebelum pemutaran pertama.

**Cara mengganti trek:** cukup ubah nilai `primary` / `fallback` pada
`invitationData.music.tracks.<key>` di `js/app.js` — tidak perlu menyentuh
logika di `initMusic()`. Volume target fade diatur lewat
`invitationData.music.volume` (angka 0–1, saat ini `0.55`). Semua perilaku
lain tetap: fade 1,5 detik, tombol togol, dan musik berhenti saat tab
disembunyikan.

## Ucapan (guestbook)

Ucapan dan doa **dibaca dari Firestore** (collection `wishes` — lihat "Penyimpanan
bersama" di bawah) dengan [`data/wishes.json`](data/wishes.json) sebagai **cadangan**
saat Firestore tidak dapat dimuat (offline / aturan belum dibuka). Skema file cadangan:

```json
{
  "_catatan": "…dokumentasi bebas, diabaikan aplikasi…",
  "wishes": [
    { "name": "Budi", "message": "Selamat menempuh hidup baru!", "createdAt": "2026-10-08T10:15:00+08:00" }
  ]
}
```

| Field | Keterangan |
|---|---|
| `name` | wajib, teks, maks 40 karakter |
| `message` | wajib, teks, maks 200 karakter |
| `createdAt` | ISO 8601 dengan offset zona waktu (contoh `2026-10-08T10:15:00+08:00`) |

Cara menambah ucapan manual di cadangan: edit `data/wishes.json`, tambahkan satu objek
ke dalam `wishes[]`. Entri tanpa `name` atau `message` dilewati.

## Penyimpanan bersama (Firestore)

Supaya ucapan tersimpan persistent dan terlihat oleh semua pengunjung, gunakan
**Cloud Firestore** (sudah terhubung lewat blok `<script type="module">` di
`index.html` — frontend tetap vanilla JS tanpa build step):

1. Buat proyek di <https://console.firebase.google.com> (paket gratis Spark, tanpa kartu kredit).
2. Buka **Firestore Database** → **Create database**, lalu buat collection `wishes`.
3. Satu dokumen ucapan berbentuk **hanya dua field**:

   | Field | Tipe | Ketentuan |
   |---|---|---|
   | `name` | string | wajib, 1–40 karakter |
   | `wish` | string | wajib, 1–200 karakter |

   (Jangan menambah field lain — aplikasi hanya menyimpan `name` dan `wish`.
   Field `createdAt` opsional hanya untuk urutan, lihat catatan di bawah.)
4. Di tab **Rules** Firestore, tempel aturan berikut, lalu **Publish**:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /wishes/{wishId} {
      allow read: if true;
      allow create: if request.resource.data.keys().hasOnly(['name', 'wish'])
                    && request.resource.data.name is string
                    && request.resource.data.wish is string
                    && request.resource.data.name.size() > 0
                    && request.resource.data.name.size() <= 40
                    && request.resource.data.wish.size() > 0
                    && request.resource.data.wish.size() <= 200;
      allow update, delete: if false;
    }
  }
}
```

   Efeknya: siapa pun **boleh membaca** semua ucapan dan **membuat** ucapan baru,
   tetapi hanya dengan dua field `name` + `wish` dalam batas panjang itu — tidak
   bisa mengubah, menghapus, atau menambah field lain dari sisi tamu.
   **Update/delete hanya bisa dilakukan dari Firebase Console** — di sanalah
   moderasi dilakukan: buka Firestore → collection `wishes` → pilih dokumen →
   titik tiga (*Delete document*) untuk menghapus ucapan yang tidak pantas.
5. Selesai — ucapan baru langsung tersimpan dan terlihat oleh semua pengunjung.

**Catatan urutan:** aplikasi mengurutkan ucapan dari field `createdAt` bila field
itu ada; kalau tidak, urutan mengikuti urutan dokumen Firestore (ID otomatis)
yang dibalik. Kalau ingin urutan yang pasti, tambahkan field `createdAt`
(timestamp) secara manual saat menambah ucapan di Console.

**Peran `data/wishes.json`:** file itu sekarang berperan sebagai **cadangan** bila
Firestore tidak dapat dimuat (mis. perangkat offline, CDN diblokir, atau aturan
keamanan belum dibuka sehingga Firestore menolak akses) — bukan sumber utama lagi.
Saat Firestore gagal dimuat, daftar ucapan tetap tampil dari file JSON dan pesan
status ditulis jujur di layar.

## Limitations (frontend-only by design)

- Selama Firestore tidak dapat dimuat (mis. aturan belum dibuka atau perangkat
  offline), ucapan yang dikirim hanya tampil untuk sesi tersebut di perangkat itu —
  tidak disimpan di mana pun. Ikuti "Penyimpanan bersama (Firestore)" di atas agar
  ucapan persistent di semua perangkat.
- Google Maps links require internet when the *user* taps them (navigation
  links only — nothing is loaded from the network by the page itself).
