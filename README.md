# Undangan Pernikahan — Alya & Raka

A premium, offline-capable digital wedding invitation built with
**HTML5 + CSS3 + vanilla JavaScript only** — no frameworks, no build step,
no network dependencies at runtime.

## Features

- Full-screen opening cover with guest personalisation (`index.html?to=Nama+Tamu`)
- Hero, quote, couple profiles, events, live countdown, love-story timeline,
  gallery with fullscreen lightbox, RSVP (simulated), cashless gift section
  with copy-to-clipboard + QRIS modal, wishes guestbook, closing
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

## Personalising a guest link

```
http://localhost:8099/?to=Budi%20Santoso
```

The cover displays "Kepada: Budi Santoso". The value is rendered with
`textContent` only (never `innerHTML`) and is limited to 60 characters.

## Customising the content

Everything editable lives in **one object at the top of [`js/app.js`](js/app.js)**:

```js
const invitationData = {
  couple:     { bride: "...", groom: "..." },
  date:       "...",
  weddingDateTime: "ISO datetime with +08:00 offset",
  venue:      { name: "...", address: "..." },
  events:     [ /* akad, resepsi — times, venue, ICS start/end */ ],
  story:      [ /* timeline entries */ ],
  gallery:    [ /* src, alt, aspect ratio */ ],
  bank:       { name, accountName, accountNumber, qrisImage },
  demoWishes: [ /* seeded guestbook entries */ ],
};
```

A non-developer can change names, dates, venue, bank details and gallery
images by editing only that object. Static prose (hero message, quote,
parent names, closing) stays in `index.html`.

## Replacing artwork

The files in `assets/images/` are **original vector placeholders authored for
this project** in the "Modern Editorial Botanical Wedding" language (warm
ivory/espresso/olive/rose duotones, line-art botanicals, paper grain). They are
designed to be swapped 1:1 for the couple's real photographs with the same
filenames — no layout changes needed. `assets/images/qris.svg` is an
illustration, **not a scannable code**; replace it with the couple's official
QRIS image before real use.

## Assets

`assets/audio/ambient-loop.wav` is a real 30-second seamlessly looping
ambient pad; it is only fetched when the user first presses play, and fades
in/out over ~1.5 s.

## Limitations (frontend-only by design)

- RSVP and wishes are stored in `localStorage` on each visitor's device —
  there is no backend and nothing is sent anywhere. The invitation text
  states this honestly.
- Wishes are seeded with demo entries locally; each visitor sees their own.
- The QRIS image is a placeholder illustration, not a working payment code.
- Google Maps links require internet when the *user* taps them (navigation
  links only — nothing is loaded from the network by the page itself).
