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

`assets/audio/leberch-invitation-wedding.mp3` is the background track; it is
only fetched when the user first presses play, and fades in/out over ~1.5 s.

## Ucapan (guestbook)

Ucapan dan doa **dibaca dari file JSON** [`data/wishes.json`](data/wishes.json),
bukan dari `localStorage`. Skema filenya:

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

Cara menambah ucapan manual: edit `data/wishes.json`, tambahkan satu objek ke dalam
`wishes[]`. **Urutan entri bebas** — situs selalu menampilkan **terbaru di atas**,
diurutkan otomatis dari `createdAt`. Entri tanpa `name` atau `message` dilewati.

Catatan penting: file ini dibaca dengan `fetch`, jadi **halaman harus dibuka lewat
server** (`python3 -m http.server 8099` dari root repo), **bukan** `file://` —
kalau dibuka lewat `file://` daftar ucapan tetap kosong. Saat daftar kosong tampil
teks "Jadilah yang pertama memberi ucapan dan doa."

Tanpa backend, ucapan yang dikirim pengunjung hanya tampil di perangkatnya untuk
sesi itu saja dan tidak disimpan di mana pun.

## Penyimpanan bersama (opsional)

Supaya ucapan tersimpan persistent dan terlihat oleh semua pengunjung, aktifkan
penyimpanan bersama dengan **Firebase Realtime Database** (frontend tetap vanilla
JS — hanya `fetch` REST biasa):

1. Buat proyek di <https://console.firebase.google.com> (paket gratis Spark, tanpa kartu kredit).
2. Buat Realtime Database, pilih lokasi `asia-southeast1` (Singapura).
3. Di tab **Rules**, tempel aturan berikut, lalu Publish:

```json
{
  "rules": {
    "wishes": {
      ".read": true,
      ".indexOn": "ts",
      "$wishId": {
        ".write": "!data.exists()",
        ".validate": "newData.hasChildren(['name','message','ts'])",
        "name": {
          ".validate": "newData.isString() && newData.val().length >= 1 && newData.val().length <= 40"
        },
        "message": {
          ".validate": "newData.isString() && newData.val().length >= 1 && newData.val().length <= 200"
        },
        "ts": {
          ".validate": "newData.isNumber()"
        },
        "$other": {
          ".validate": false
        }
      }
    }
  }
}
```

4. Salin URL database (berakhiran `firebaseio.com` atau `firebasedatabase.app`) ke
   `invitationData.wishes.backend.url` di `js/app.js`:

```js
wishes: {
  seedUrl: "data/wishes.json",
  backend: { url: "https://<proyek>-default-rtdb.asia-southeast1.firebasedatabase.app" },
},
```

Selesai — ucapan baru langsung terlihat oleh semua pengunjung, dan dapat
dihapus/dimoderasi dari Firebase Console. Selama `backend` masih `null`, situs
tetap jalan normal dengan `data/wishes.json` saja.

## Limitations (frontend-only by design)

- Tanpa backend, ucapan yang dikirim hanya tampil untuk sesi tersebut di
  perangkat itu — tidak disimpan di mana pun. Jika ingin persistent di semua
  perangkat, aktifkan "Penyimpanan bersama (opsional)" di atas.
- Google Maps links require internet when the *user* taps them (navigation
  links only — nothing is loaded from the network by the page itself).
