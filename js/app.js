/* ==========================================================================
   ARKHUL & RESTI — invitation interactions (vanilla JS, no dependencies)
   ========================================================================== */
"use strict";

/* ---------- 1. SINGLE SOURCE OF TRUTH ---------- */
const invitationData = {
  couple: {
    bride: "Nurfadilla Resti Harisda, S.Pt",
    groom: "Arkhul Prakashandy Putra, S.Pt",
    brideShort: "Resti",
    groomShort: "Arkhul",
  },

  date: "Kamis, 8 Oktober 2026 & Sabtu, 10 Oktober 2026",

  /* ---------- MULTI-OWNER ----------
     sharedEvents = acara milik berdua (akad).
     owners.<key>.events = resepsi milik pihak tersebut.
     owners.<key>.bank   = rekening pihak tersebut.  */
  sharedEvents: [
    {
      id: "akad",
      kind: "Akad Nikah",
      name: "Akad Nikah",
      dateLabel: "Kamis, 8 Oktober 2026",
      timeLabel: "10.00 WITA",
      start: "2026-10-08T10:00:00+08:00",
      end: "2026-10-08T12:00:00+08:00",
      venue: "Sudiang, Kota Makassar",
      address: "Jl. Bahagia No. 56 Lr 1, Kelurahan Sudiang, Kota Makassar",
    },
  ],

  owners: {
    groom: {
      key: "groom",
      label: "Mempelai Pria",
      shortName: "Arkhul",
      host: "Keluarga Mempelai Pria",
      events: [
        {
          id: "resepsi-pria",
          kind: "Resepsi",
          name: "Resepsi",
          dateLabel: "Sabtu, 10 Oktober 2026",
          timeLabel: "10.00 WITA – Selesai",
          start: "2026-10-10T10:00:00+08:00",
          end: "2026-10-10T23:00:00+08:00", // praktis "sampai larut malam" (lihat plan §8 no. 2)
          venue: "Bulutanah, Kab. Bone",
          address: "Jl. Poros Sinjai-Palattae, Cangkano, Desa Bulutanah, Kec. Kajuara, Kab. Bone",
          latitude: -5.066166,
          longitude: 120.214316
        },
      ],
      bank: {
        name: "Bank BCA",
        accountName: "Arkhul Prakashandy Putra",
        accountNumber: "7325794763",
      },
    },

    bride: {
      key: "bride",
      label: "Mempelai Wanita",
      shortName: "Resti",
      host: "Keluarga Mempelai Wanita",
      events: [
        {
          id: "resepsi-wanita",
          kind: "Resepsi",
          name: "Resepsi",
          dateLabel: "Kamis, 8 Oktober 2026",
          timeLabel: "19.00 WITA – Selesai",
          start: "2026-10-08T19:00:00+08:00",
          end: "2026-10-08T23:00:00+08:00", // .ics: "sampai selesai" dibatasi 23.00 WITA
          venue: "Sudiang, Kota Makassar",
          address: "Jl. Bahagia No. 56 Lr 1, Kelurahan Sudiang, Kota Makassar",
        },
      ],
      bank: {
        name: "Bank BCA",
        accountName: "Nurfadilla Resti Harisda",
        accountNumber: "3650176455",
      },
    },
  },

  events: [
    {
      id: "akad",
      kind: "Akad Nikah",
      name: "Akad Nikah",
      dateLabel: "Kamis, 8 Oktober 2026",
      timeLabel: "10.00 WITA",
      start: "2026-10-08T10:00:00+08:00",
      end: "2026-10-08T12:00:00+08:00",
      venue: "Sudiang, Kota Makassar",
      address: "Jl. Bahagia No. 56 Lr 1, Kelurahan Sudiang, Kota Makassar",

    },
    {
      id: "resepsi",
      kind: "Resepsi",
      name: "Resepsi",
      dateLabel: "Sabtu, 10 Oktober 2026",
      timeLabel: "10.00 WITA – Selesai",
      start: "2026-10-10T10:00:00+08:00",
      end: "2026-10-10T14:00:00+08:00",
      venue: "Bulutanah, Kab. Bone",
      address: "Jl. Poros Sinjai-Palattae, Cangkano, Desa Bulutanah, Kec. Kajuara, Kab. Bone",
      latitude: -5.066166,
     longitude: 120.214316
    },
  ],

  // story: [
  //   {
  //     year: "2021",
  //     title: "Pertemuan Pertama",
  //     desc: "Kami dipertemukan di sebuah kegiatan volunteer di Makassar. Obrolan singkat sore itu ternyata menjadi awal dari segalanya.",
  //   },
  //   {
  //     year: "2023",
  //     title: "Mulai Menjalin Hubungan",
  //     desc: "Setelah dua tahun saling mengenal, kami memantapkan hati untuk berjalan bersama mengenal Tuhan dan satu sama lain.",
  //   },
  //   {
  //     year: "2025",
  //     title: "Lamaran",
  //     desc: "Di hadapan keluarga besar, Arkhul mengetuk pintu dan meminjam tangan Resti. Restu kedua keluarga kami terima dengan penuh syukur.",
  //   },
  //   {
  //     year: "2026",
  //     title: "Hari Pernikahan",
  //     desc: "Kini kami memutuskan untuk melangkah lebih jauh: mengikat janji suci di hadapan Tuhan, keluarga, dan sahabat tercinta.",
  //   },
  // ],

  gallery: [
    {
      src: "assets/images/gallery1.webp",
      alt: "Potret berdua Arkhul dan Resti di taman",
      ratio: "4 / 5",
    },
    {
      src: "assets/images/gallery2.webp",
      alt: "Lanskap taman lokasi akad nikah",
      ratio: "10 / 7",
    },
    {
      src: "assets/images/gallery3.webp",
      alt: "Detail rangkaian bunga dan cincin pernikahan",
      ratio: "7 / 9",
    },
    {
      src: "assets/images/gallery4.webp",
      alt: "Meja dekorasi resepsi dengan bunga dan lilin",
      ratio: "9 / 6.2",
    },
    {
      src: "assets/images/gallery5.webp",
      alt: "Kedua mempelai berjalan di bawah pohon",
      ratio: "3.8 / 4.75",
    },
    {
      src: "assets/images/gallery6.webp",
      alt: "Detail tangan mempelai dengan cincin",
      ratio: "11 / 7",
    },
    {
      src: "assets/images/gallery7.webp",
      alt: "Kotak cincin di atas hiasan bunga saat lamaran",
      ratio: "6.4 / 8.8",
    },
    {
      src: "assets/images/gallery8.webp",
      alt: "Tarian pertama di bawah lampu gantung",
      ratio: "9 / 6.4",
    },
  ],

  // Ucapan: Firestore (collection "wishes") adalah sumber utama; data/wishes.json
  // hanyalah cadangan bila Firestore tidak dapat dimuat (offline / rules belum dibuka).
  // `backend` diisi SAAT RUNTIME dari window.wishesBackend (jembatan di index.html).
  wishes: {
    seedUrl: "data/wishes.json",
    backend: null, // diisi runtime: { kind: "firestore", collection: "wishes" } bila jembatan terdeteksi
    degraded: [], // alasan bagian ucapan berjalan terbatas (tanpa console noise), mis. ["firestore"]
  },

  /* Musik latar per jenis undangan. `tracks.<key>` dipetakan dari ownerState.key;
     bila browser tidak bisa memutar format primary (mis. WebM/Opus), jatuh ke fallback.
     `active` diisi runtime oleh initMusic() untuk keperluan verifikasi. */
  music: {
    volume: 0.55, /* target fade — dipakai initMusic() */
    tracks: {
      groom: {
        primary: "assets/audio/groom.webm",
        fallback: "assets/audio/leberch-invitation-wedding.mp3",
      },
      bride: {
        primary: "assets/audio/bride.mp3",
        fallback: "assets/audio/leberch-invitation-wedding.mp3",
      },
      all: {
        primary: "assets/audio/groom.webm",
        fallback: "assets/audio/leberch-invitation-wedding.mp3",
      },
    },
    active: null, // diisi runtime: { key, src, used: "primary"|"fallback" }
  },

  bank: {
    name: "Bank BCA",
    accountName: "Nurfadilla Resti Harisda",
    accountNumber: "1234567890",
  },
};

/* ---------- 2. SHORT HELPERS ---------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

function pad2(n) {
  return String(n).padStart(2, "0");
}

/* ---------- 2b. OWNER RESOLUTION (?owner=pria|wanita|semua) ---------- */
const OWNER_PARAM = "owner";
const OWNER_ALIASES = {
  pria: "groom",
  groom: "groom",
  "mempelai-pria": "groom",
  wanita: "bride",
  bride: "bride",
  "mempelai-wanita": "bride",
};

/* "all" = tampil semua; "groom"/"bride" = satu pihak.
   Default (tanpa param) DAN alias tak dikenal = pihak pria (keputusan pemilik undangan). */
const DEFAULT_OWNER = "groom";

function resolveOwnerKey(search) {
  try {
    const raw = (new URLSearchParams(search).get(OWNER_PARAM) || "")
      .trim()
      .toLowerCase();
    if (!raw) return DEFAULT_OWNER;
    if (
      raw === "all" ||
      raw === "semua" ||
      raw === "both" ||
      raw === "gabungan"
    )
      return "all";
    return OWNER_ALIASES[raw] || DEFAULT_OWNER;
  } catch (err) {
    return DEFAULT_OWNER;
  }
}

function activeOwnerKeys(ownerKey) {
  const keys = Object.keys(invitationData.owners);
  if (ownerKey && ownerKey !== "all" && keys.includes(ownerKey))
    return [ownerKey];
  return keys;
}

/* Acara yang tampil = shared + resepsi milik pihak yang aktif. */
function activeEvents(ownerKey) {
  const shared = invitationData.sharedEvents.map((ev) => ({
    ...ev,
    ownerKey: null,
    host: null,
  }));
  const perOwner = activeOwnerKeys(ownerKey).flatMap((k) =>
    invitationData.owners[k].events.map((ev) => ({
      ...ev,
      ownerKey: k,
      host: invitationData.owners[k].host,
    })),
  );
  return [...shared, ...perOwner];
}

function activeBanks(ownerKey) {
  return activeOwnerKeys(ownerKey).map((k) => invitationData.owners[k]);
}

/* Event terdekat yang belum lewat; kalau semua sudah lewat, pakai yang terakhir. */
function countdownTarget() {
  const events = activeEvents(ownerState.key)
    .slice()
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
  if (!events.length) return NaN;
  const now = Date.now();
  const next = events.find((ev) => new Date(ev.start).getTime() > now);
  return new Date((next || events[events.length - 1]).start).getTime();
}

const ownerState = { key: resolveOwnerKey(window.location.search) };

/* ---------- 3. GUEST PERSONALISATION (?to=) ---------- */
function applyGuestName() {
  const el = $("#guestName");
  if (!el) return;
  let guest = null;
  try {
    const params = new URLSearchParams(window.location.search);
    const raw = (params.get("to") || "").trim().slice(0, 60);
    if (raw) guest = raw;
  } catch (err) {
    /* malformed URL — keep the default */
  }
  el.textContent = guest || "Bapak/Ibu/Saudara/i";

  const prefix = $(".cover__to-prefix", $("#cover") || document);
  if (!guest && prefix && prefix.parentNode)
    prefix.parentNode.removeChild(prefix);
}

/* Label pihak muncul pada tampilan satu pihak (termasuk link default = pria),
   dan tersembunyi pada tampilan ?owner=semua. */
function applyOwnerLabel() {
  const el = $("#coverOwner");
  if (!el) return;
  const keys = activeOwnerKeys(ownerState.key);
  if (ownerState.key === "all" || keys.length !== 1) return;
  el.textContent = invitationData.owners[keys[0]].host;
  el.hidden = false;
}

/* ---------- 4. COVER / OPENING ---------- */
function initCover() {
  const cover = $("#cover");
  const btn = $("#openInviteBtn");
  const floating = $("#floatingControls");
  if (!cover || !btn) return;

  document.body.classList.add("is-locked");

  btn.addEventListener("click", () => {
    cover.classList.add("is-open");
    cover.setAttribute("aria-hidden", "true");
    document.body.classList.remove("is-locked");
    if (floating) floating.hidden = false;
    const hero = $("#hero");
    if (hero) hero.setAttribute("tabindex", "-1");
    if (hero) hero.focus({ preventScroll: true });
    if (typeof window.__weddingStartMusic === "function") {
      window.__weddingStartMusic();
    }
    window.setTimeout(
      () => {
        if (cover.parentNode) cover.parentNode.removeChild(cover);
      },
      prefersReducedMotion ? 50 : 1100,
    );
  });
}

/* ---------- 5. COUNTDOWN ---------- */
function initCountdown() {
  const target = countdownTarget();
  const els = {
    d: $("#cdDays"),
    h: $("#cdHours"),
    m: $("#cdMinutes"),
    s: $("#cdSeconds"),
  };
  const grid = $("#countdownGrid");
  if (!grid || Object.values(els).some((el) => !el)) return;
  if (Number.isNaN(target)) {
    grid.textContent = "";
    return;
  }

  let timer = null;

  function render() {
    const diff = target - Date.now();
    if (diff <= 0) {
      window.clearInterval(timer);
      timer = null;
      grid.innerHTML =
        '<p class="countdown__done">Hari bahagia telah tiba — terima kasih atas doa dan restu Anda!</p>';
      grid.removeAttribute("role");
      return;
    }
    els.d.textContent = String(Math.floor(diff / 86400000));
    els.h.textContent = pad2(Math.floor(diff / 3600000) % 24);
    els.m.textContent = pad2(Math.floor(diff / 60000) % 60);
    els.s.textContent = pad2(Math.floor(diff / 1000) % 60);
  }

  render();
  timer = window.setInterval(render, 1000);
}

/* ---------- 6. EVENTS RENDER + MAPS + ICS ---------- */
function initEvents() {
  const list = $("#eventsList");
  if (!list) return;

  const showHost = activeOwnerKeys(ownerState.key).length > 1;
  list.textContent = "";

  activeEvents(ownerState.key).forEach((ev) => {
    const card = document.createElement("article");
    card.className = "event-card";
    card.dataset.reveal = "";
    card.dataset.owner = ev.ownerKey || "shared";

    const kind = document.createElement("p");
    kind.className = "event-card__kind";
    kind.textContent = ev.kind;
    if (showHost && ev.host) {
      const host = document.createElement("p");
      host.className = "event-card__owner";
      host.textContent = ev.host;
      card.append(host);
    }

    const name = document.createElement("h3");
    name.className = "event-card__name";
    name.textContent = ev.name;

    const when = document.createElement("p");
    when.className = "event-card__when";
    when.textContent = `${ev.dateLabel} · ${ev.timeLabel}`;

    const venue = document.createElement("p");
    venue.className = "event-card__venue";
    const strong = document.createElement("strong");
    strong.textContent = ev.venue;
    venue.append(strong, document.createElement("br"), ev.address);

    const actions = document.createElement("div");
    actions.className = "event-card__actions";

    const mapBtn = document.createElement("a");
    mapBtn.className = "btn btn--primary btn--sm";
    mapBtn.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${ev.venue}, ${ev.address}`)}`;
    if (ev.latitude && ev.longitude) {
      mapBtn.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${ev.latitude}, ${ev.longitude}`)}`;
    }
    mapBtn.target = "_blank";
    mapBtn.rel = "noopener";
    mapBtn.setAttribute(
      "aria-label",
      `Buka peta lokasi ${ev.name} di Google Maps (tab baru)`,
    );
    mapBtn.innerHTML =
      '<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path d="M12 21 s-7-6.2-7-11 a7 7 0 0 1 14 0 c0 4.8-7 11-7 11 Z" fill="none" stroke="currentColor" stroke-width="1.3"/><circle cx="12" cy="10" r="2.4" fill="none" stroke="currentColor" stroke-width="1.3"/></svg> Navigasi';

    const calBtn = document.createElement("button");
    calBtn.type = "button";
    calBtn.className = "btn btn--ghost btn--sm";
    calBtn.setAttribute("aria-label", `Simpan ${ev.name} ke kalender`);
    calBtn.innerHTML =
      '<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="1.3"/><path d="M3 9 h18 M8 3 v4 M16 3 v4" stroke="currentColor" stroke-width="1.3" fill="none"/></svg> Simpan ke Kalender';
    calBtn.addEventListener("click", () => downloadIcs(ev));

    actions.append(mapBtn, calBtn);
    card.append(kind, name, when, venue, actions);
    list.append(card);
  });
}

function icsEscape(text) {
  return String(text)
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

function toIcsUtc(isoWithOffset) {
  const d = new Date(isoWithOffset);
  return (
    d.getUTCFullYear() +
    pad2(d.getUTCMonth() + 1) +
    pad2(d.getUTCDate()) +
    "T" +
    pad2(d.getUTCHours()) +
    pad2(d.getUTCMinutes()) +
    pad2(d.getUTCSeconds()) +
    "Z"
  );
}

function buildIcs(ev) {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Arkhul & Resti//Undangan Pernikahan//ID",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${ev.id}-arkhulresti-2026@undangan.local`,
    `DTSTAMP:${toIcsUtc(new Date().toISOString())}`,
    `DTSTART:${toIcsUtc(ev.start)}`,
    `DTEND:${toIcsUtc(ev.end)}`,
    `SUMMARY:${icsEscape(`${ev.name} — ${ev.host || "Arkhul & Resti"}`)}`,
    `DESCRIPTION:${icsEscape(`${ev.dateLabel}. ${ev.timeLabel}. Mohon hadir tepat waktu.`)}`,
    `LOCATION:${icsEscape(`${ev.venue}, ${ev.address}`)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.join("\r\n") + "\r\n";
}

function downloadIcs(ev) {
  const blob = new Blob([buildIcs(ev)], {
    type: "text/calendar;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${ev.id}-arkhul-resti.ics`;
  document.body.append(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 4000);
}

/* ---------- 7. STORY TIMELINE ---------- */
function initStory() {
  const list = $("#storyTimeline");
  if (!list) return;
  invitationData.story.forEach((item) => {
    const li = document.createElement("li");
    li.className = "story-item";
    li.dataset.reveal = "";

    const year = document.createElement("p");
    year.className = "story-item__year";
    year.textContent = item.year;

    const title = document.createElement("h3");
    title.className = "story-item__title";
    title.textContent = item.title;

    const desc = document.createElement("p");
    desc.className = "story-item__desc";
    desc.textContent = item.desc;

    li.append(year, title, desc);
    list.append(li);
  });
}

/* ---------- 8. GALLERY + LIGHTBOX ---------- */
function initGallery() {
  const grid = $("#galleryGrid");
  const lightbox = $("#lightbox");
  const img = $("#lightboxImg");
  const caption = $("#lbCaption");
  if (!grid || !lightbox || !img || !caption) return;

  let current = 0;
  let lastFocus = null;

  invitationData.gallery.forEach((photo, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "gallery__item";
    btn.dataset.index = String(i);
    btn.setAttribute(
      "aria-label",
      `Perbesar foto ${i + 1} dari ${invitationData.gallery.length}: ${photo.alt}`,
    );
    btn.dataset.reveal = "";

    const picture = document.createElement("img");
    picture.src = photo.src;
    picture.alt = photo.alt;
    picture.loading = "lazy";
    picture.decoding = "async";
    picture.width = 800;
    picture.height = Math.round(800 / evalRatio(photo.ratio));
    picture.style.aspectRatio = photo.ratio;
    picture.style.objectFit = "cover";

    btn.append(picture);
    btn.addEventListener("click", () => openLightbox(i));
    grid.append(btn);
  });

  function evalRatio(ratio) {
    const m = ratio.split("/").map((n) => parseFloat(n.trim()));
    if (
      m.length !== 2 ||
      !Number.isFinite(m[0]) ||
      !Number.isFinite(m[1]) ||
      m[0] <= 0 ||
      m[1] <= 0
    ) {
      return 0.75; /* safe default 4:3-ish fallback */
    }
    return m[0] / m[1];
  }

  function openLightbox(i) {
    current = i;
    lastFocus = document.activeElement;
    updateLightbox();
    if (typeof lightbox.showModal === "function") {
      lightbox.showModal();
    } else {
      lightbox.setAttribute("open", "");
    }
    document.body.classList.add("is-locked");
    $("#lbClose").focus();
  }

  function updateLightbox() {
    const photo = invitationData.gallery[current];
    img.src = photo.src;
    img.alt = photo.alt;
    caption.textContent = `${current + 1} / ${invitationData.gallery.length} — ${photo.alt}`;
  }

  function closeLightbox() {
    if (typeof lightbox.close === "function" && lightbox.open) {
      lightbox.close();
    } else {
      lightbox.removeAttribute("open");
    }
    document.body.classList.remove("is-locked");
    if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
  }

  function step(delta) {
    current =
      (current + delta + invitationData.gallery.length) %
      invitationData.gallery.length;
    updateLightbox();
  }

  $("#lbClose").addEventListener("click", closeLightbox);
  $("#lbPrev").addEventListener("click", () => step(-1));
  $("#lbNext").addEventListener("click", () => step(1));

  /* click on backdrop (the dialog element itself) closes */
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  lightbox.addEventListener("close", () => {
    document.body.classList.remove("is-locked");
    if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.open) return;
    if (e.key === "ArrowLeft") step(-1);
    else if (e.key === "ArrowRight") step(1);
  });
}

/* ---------- 9b. GIFT (satu blok per pihak) ---------- */
function fillGiftCard(tpl, owner, showOwner) {
  if (!tpl || !owner) return null;
  const node = tpl.content.firstElementChild.cloneNode(true);
  const badge = node.querySelector(".gift__owner");
  if (badge) {
    if (showOwner) {
      badge.hidden = false;
      badge.textContent = owner.host;
    } else {
      badge.remove();
    }
  }
  return node;
}

function initGift() {
  const grid = $("#giftGrid");
  if (!grid) return;
  const tpl = $("#giftBankTpl");
  if (!tpl) return;
  const owners = activeBanks(ownerState.key);
  const showOwner = owners.length > 1;
  grid.textContent = "";

  owners.forEach((owner) => {
    const bank = owner.bank;
    if (!bank) return;

    const card = fillGiftCard(tpl, owner, showOwner);
    if (card) {
      const name = card.querySelector(".gift__bank-name");
      if (name) name.textContent = bank.name;
      const holder = card.querySelector(".gift__holder");
      if (holder) holder.textContent = `a.n. ${bank.accountName}`;
      const number = card.querySelector(".gift__number");
      if (number) number.textContent = bank.accountNumber;
      const copy = card.querySelector(".gift__copy");
      if (copy) {
        copy.setAttribute(
          "aria-label",
          `Salin nomor rekening ${bank.name} milik ${bank.accountName}`,
        );
        copy.addEventListener("click", () =>
          copyToClipboard(bank.accountNumber, copy),
        );
      }
      grid.append(card);
    }
  });
}

/* ---------- 10. CLIPBOARD (dipakai tiap tombol rekening) ---------- */
function copyToClipboard(text, btn) {
  function fallback() {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.append(ta);
    ta.select();
    let ok = false;
    try {
      ok = document.execCommand("copy");
    } catch (err) {
      ok = false;
    }
    ta.remove();
    return ok;
  }

  function flash(ok) {
    if (!btn) return;
    const label = btn.lastChild;
    btn.classList.add("is-copied");
    if (label && label.nodeType === Node.TEXT_NODE) {
      label.textContent = ok ? " Tersalin!" : " Gagal menyalin";
    }
    window.setTimeout(() => {
      btn.classList.remove("is-copied");
      if (label && label.nodeType === Node.TEXT_NODE)
        label.textContent = " Salin Nomor Rekening";
    }, 2200);
  }

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(
      () => flash(true),
      () => flash(fallback()),
    );
  } else {
    flash(fallback());
  }
}

/* ---------- 11. WISHES / GUESTBOOK (Firestore via window.wishesBackend, cadangan data/wishes.json) ---------- */
const WISH_LIMITS = { name: 40, wish: 200 };

/* Catat bahwa bagian ucapan berjalan dalam mode terbatas. Sengaja TIDAK memakai console.*
   supaya console pengunjung tetap bersih; statusnya bisa diperiksa lewat
   `invitationData.wishes.degraded` (mis. "firestore", "seed", "firestore-submit"). */
function tandaiDegradasi(alasan) {
  const w = invitationData.wishes;
  if (!Array.isArray(w.degraded)) w.degraded = [];
  if (!w.degraded.includes(alasan)) w.degraded.push(alasan);
}

/* Tunggu jembatan Firestore dari index.html. Resolve window.wishesBackend bila sudah ada,
   else dengarkan event "wishes-backend-ready" (+ timeout -> resolve null).
   TIDAK menahan render: data/wishes.json tetap dirender lebih dulu. */
function waitForWishesBackend(timeoutMs = 5000) {
  if (window.wishesBackend) return Promise.resolve(window.wishesBackend);
  return new Promise((resolve) => {
    let selesai = false;
    const finish = (value) => {
      if (selesai) return;
      selesai = true;
      window.clearTimeout(timer);
      resolve(value);
    };
    const timer = window.setTimeout(() => finish(null), timeoutMs);
    window.addEventListener(
      "wishes-backend-ready",
      () => finish(window.wishesBackend),
      { once: true },
    );
  });
}

/* Normalisasi satu entri ucapan dari Firestore/JSON; kembalikan null bila tidak layak.
   `wish` boleh datang dari `wish` atau `message` (kompatibel dengan data/wishes.json).
   Entri tanpa name DAN wish dibuang; panjang dipotong 40/200.
   createdAt dinormalkan jadi timestamp (Number) atau null. */
function normalizeWish(raw) {
  if (!raw || typeof raw !== "object") return null;
  const id = typeof raw.id === "string" && raw.id ? raw.id : "";
  const name = String(raw.name ?? "").trim().slice(0, WISH_LIMITS.name);
  const wish = String(raw.wish ?? raw.message ?? "").trim().slice(0, WISH_LIMITS.wish);
  if (!name && !wish) return null;
  let createdAt = null;
  if (typeof raw.createdAt === "number" && Number.isFinite(raw.createdAt)) {
    createdAt = raw.createdAt;
  } else if (typeof raw.createdAt === "string" && raw.createdAt) {
    const t = Date.parse(raw.createdAt);
    if (!Number.isNaN(t)) createdAt = t;
  }
  return { id, name, wish, createdAt };
}

/* Urut terbaru dulu: pakai createdAt bila ada; entri tanpa createdAt diletakkan setelah
   yang punya, urut id DESC. Kalau tidak ada createdAt sama sekali -> urut id DESC. */
function sortWishes(list) {
  const adaCreatedAt = list.some((w) => w.createdAt !== null && w.createdAt !== undefined);
  const byIdDesc = (a, b) => String(b.id).localeCompare(String(a.id));
  if (!adaCreatedAt) return [...list].sort(byIdDesc);
  return [...list].sort((a, b) => {
    if (a.createdAt !== null && b.createdAt !== null) return b.createdAt - a.createdAt;
    if (a.createdAt !== null) return -1;
    if (b.createdAt !== null) return 1;
    return byIdDesc(a, b);
  });
}

/* Buang duplikat: kunci utama `id`, fallback "name|wish" (JSON cadangan punya id kosong). */
function dedupeWishes(list) {
  const seen = new Set();
  const out = [];
  for (const w of list) {
    const key = w.id || `${w.name}|${w.wish}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(w);
  }
  return out;
}

/* Baca data/wishes.json (cadangan). Gagal (404, file://, JSON rusak) -> [] tanpa error di console. */
async function fetchSeedWishes() {
  try {
    const res = await fetch(invitationData.wishes.seedUrl);
    if (!res.ok) {
      tandaiDegradasi("seed");
      return [];
    }
    const data = await res.json();
    const arr = Array.isArray(data.wishes) ? data.wishes : [];
    return sortWishes(dedupeWishes(arr.map(normalizeWish).filter(Boolean)));
  } catch (err) {
    tandaiDegradasi("seed");
    return [];
  }
}

function formatWishDate(ts) {
  const d = new Date(ts);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function buildWishCard(wish) {
  const li = document.createElement("li");
  li.className = "wish-card";

  const msg = document.createElement("p");
  msg.className = "wish-card__msg";
  msg.textContent = wish.wish; /* textContent only — never innerHTML for user content */

  const meta = document.createElement("p");
  meta.className = "wish-card__meta";

  const name = document.createElement("span");
  name.className = "wish-card__name";
  name.textContent = wish.name;

  meta.append(name);

  if (wish.createdAt !== null && wish.createdAt !== undefined) {
    const date = document.createElement("time");
    date.dateTime = new Date(wish.createdAt).toISOString();
    date.textContent = formatWishDate(wish.createdAt);
    meta.append(date);
  }

  li.append(msg, meta);
  return li;
}

/* Satu kartu baru selalu di atas daftar. */
function renderWish(wish, list) {
  list.prepend(buildWishCard(wish));
}

function renderWishList(wishes, list, emptyEl) {
  const frag = document.createDocumentFragment();
  wishes.forEach((w) => frag.append(buildWishCard(w)));
  list.textContent = "";
  list.append(frag);
  if (emptyEl) emptyEl.hidden = wishes.length >= 1;
}

async function initWishes() {
  const list = $("#wishesList");
  const form = $("#wishForm");
  const nameInput = $("#wishName");
  const msgInput = $("#wishMsg");
  const status = $("#wishStatus");
  const emptyEl = $("#wishesEmpty");
  if (!list || !form) return;

  try {
    /* 1. Render segera dari JSON cadangan — first paint cepat, tidak menunggu Firestore. */
    const seed = await fetchSeedWishes();
    renderWishList(seed, list, emptyEl);

    /* 2. Daftar kosong + backend belum selesai -> tampilkan "Memuat ucapan…" sementara,
          lalu kembalikan teks aslinya setelah selesai (jangan biarkan menggantung). */
    const emptyTextAsli = emptyEl ? emptyEl.textContent : "";
    const tampilkanMemuat = seed.length === 0 && emptyEl && !window.wishesBackend;
    if (tampilkanMemuat) emptyEl.textContent = "Memuat ucapan…";

    /* 3. Tunggu jembatan Firestore (maks 5 dtk). */
    let backend = null;
    try {
      backend = await waitForWishesBackend();
    } catch (err) {
      backend = null;
    }
    if (tampilkanMemuat) emptyEl.textContent = emptyTextAsli;
    invitationData.wishes.backend = backend
      ? { kind: backend.kind || "firestore", collection: backend.collection || "wishes" }
      : null;

    /* 4. Bila jembatan ada, Firestore adalah sumber kebenaran. Gagal (mis. rules belum
          dibuka) -> tetap tampilkan cadangan JSON, tanpa alert, warn sekali saja. */
    if (backend) {
      try {
        const remote = await backend.load();
        const daftar = sortWishes(dedupeWishes(remote.map(normalizeWish).filter(Boolean)));
        renderWishList(daftar, list, emptyEl);
      } catch (err) {
        /* Mis. rules Firestore belum dibuka: tetap tampilkan cadangan JSON, tanpa alert. */
        tandaiDegradasi("firestore");
      }
    }

    const nameError = $("#wishNameError");
    const msgError = $("#wishMsgError");
    [nameInput, msgInput].forEach((input) =>
      input.addEventListener("input", () => {
        const err = input === nameInput ? nameError : msgError;
        if (err) err.hidden = true;
        input.closest(".field").classList.remove("has-error");
      }),
    );

    const setStatus = (text, ok) => {
      if (!status) return;
      status.textContent = text;
      status.classList.toggle("is-ok", ok);
      window.setTimeout(() => {
        status.textContent = "";
        status.classList.remove("is-ok");
      }, 5000);
    };

    /* 5. Kirim ucapan: backend ada -> simpan ke Firestore; backend null -> sesi saja.
          Gagal kirim: form TIDAK dikosongkan, tidak ada kartu palsu. */
    const submitWish = async (name, wish) => {
      if (backend) {
        try {
          await backend.add(name, wish);
          renderWish({ id: "", name, wish, createdAt: Date.now() }, list);
          if (emptyEl) emptyEl.hidden = true;
          form.reset();
          setStatus("Ucapan Anda telah terkirim. Terima kasih!", true);
        } catch (err) {
          tandaiDegradasi("firestore-submit");
          setStatus("Ucapan belum berhasil dikirim. Silakan coba lagi.", false);
        }
      } else {
        /* Firestore tidak termuat: tampil untuk sesi ini saja. */
        renderWish({ id: "", name, wish, createdAt: Date.now() }, list);
        if (emptyEl) emptyEl.hidden = true;
        form.reset();
        setStatus("Ucapan tersimpan di perangkat ini untuk sesi ini. Belum tersambung ke penyimpanan bersama.", true);
      }
    };

    const submitBtn = form.querySelector('[type="submit"]');

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = nameInput.value.trim().slice(0, WISH_LIMITS.name);
      const wish = msgInput.value.trim().slice(0, WISH_LIMITS.wish);
      let valid = true;

      if (!name) {
        nameError.hidden = false;
        nameInput.closest(".field").classList.add("has-error");
        valid = false;
      }
      if (!wish) {
        msgError.hidden = false;
        msgInput.closest(".field").classList.add("has-error");
        valid = false;
      }
      if (!valid) return;

      if (submitBtn) submitBtn.disabled = true;
      try {
        await submitWish(name, wish);
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  } catch (err) {
    /* Jangan biarkan unhandled rejection: daftar JSON tetap tampil seperti semula. */
    tandaiDegradasi("init");
  }
}

/* ---------- 12. MUSIC (DOM element, gesture-driven, fade) ---------- */
function selectMusicTrack(audio) {
  const cfg = invitationData.music;
  try {
    const tracks = cfg.tracks || {};
    const key = tracks[ownerState.key] ? ownerState.key : tracks.all ? "all" : "groom";
    const entry = tracks[key];
    if (!entry || !entry.primary) return;

    let chosen = entry.primary;
    let used = "primary";
    /* Diperiksa dengan string codec-spesifik saja. Safari < 17.4 (termasuk iOS lama) hanya
       bisa memutar Opus di container CAF, tetapi sering menjawab "maybe" untuk container
       WebM generik padahal isinya tidak bisa didekode — jawaban itu akan menyesatkan. */
    let webmOk = false;
    try {
      const opus = audio.canPlayType('audio/webm; codecs="opus"');
      webmOk = opus === "probably" || opus === "maybe";
    } catch (err) {
      webmOk = false;
    }
    if (!webmOk && entry.fallback) {
      chosen = entry.fallback;
      used = "fallback";
    }
    audio.src = chosen;
    cfg.active = { key: key, src: chosen, used: used };
  } catch (err) {
    cfg.active = null;
  }
}

function initMusic() {
  const toggle = $("#musicToggle");
  const audio = $("#bgMusic");
  if (!toggle || !audio) return;

  const musicCfg = invitationData.music;
  selectMusicTrack(audio);

  audio.loop = true;
  audio.volume = 0;

  let playing = false;
  let fadeTimer = null;
  let inginMain = false; /* ada niat memutar? dipakai jaring fallback saat gagal dekode */
  let sudahCadangan = false; /* fallback hanya boleh dipakai sekali, jangan sampai berputar-putar */

  function fadeTo(target, done) {
    window.clearInterval(fadeTimer);
    const start = audio.volume;
    const t0 = performance.now();
    const dur = 1500;
    fadeTimer = window.setInterval(() => {
      const t = Math.min(1, (performance.now() - t0) / dur);
      audio.volume = Math.max(0, Math.min(1, start + (target - start) * t));
      if (t >= 1) {
        window.clearInterval(fadeTimer);
        fadeTimer = null;
        audio.volume =
          target; /* land exactly on the target — never leave the ramp at 0 */
        if (done) done();
      }
    }, 50);
  }

  function setUi(isPlaying) {
    playing = isPlaying;
    toggle.classList.toggle("is-playing", isPlaying);
    toggle.setAttribute("aria-pressed", String(isPlaying));
    toggle.setAttribute("aria-label", isPlaying ? "Jeda musik" : "Putar musik");
    toggle.dataset.playing = String(isPlaying);
  }

  function play() {
    inginMain = true;
    audio
      .play()
      .then(() => {
        setUi(true);
        fadeTo(musicCfg.volume);
      })
      .catch(() => {
        /* autoplay policy rejected or the asset failed — revert honestly */
        setUi(false);
      });
  }

  function pause() {
    setUi(false);
    fadeTo(0, () => {
      audio.pause();
    });
  }

  window.__weddingStartMusic = play; /* called by the cover-open gesture */

  toggle.addEventListener("click", () => {
    if (playing) pause();
    else play();
  });

  audio.addEventListener("pause", () => {
    if (playing) setUi(false);
  });

  /* Jaring kedua: bila trek utama gagal dimuat/didekode (jawaban canPlayType bisa keliru),
     pindah ke trek cadangan SEKALI saja lalu coba putar lagi — jangan biarkan tamu sunyi. */
  audio.addEventListener("error", () => {
    const cfg = invitationData.music;
    const act = cfg.active;
    const entry = act ? cfg.tracks[act.key] : null;
    const cadangan = entry ? entry.fallback : null;
    if (sudahCadangan || !cadangan || !act || act.used === "fallback") {
      inginMain = false;
      setUi(false);
      return;
    }
    sudahCadangan = true;
    audio.src = cadangan;
    cfg.active = { key: act.key, src: cadangan, used: "fallback", reason: "error" };
    if (inginMain) play();
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden && playing) {
      audio.pause();
      audio.volume = 0;
      setUi(false);
    }
  });
}

/* ---------- 13. NAVIGATION ---------- */
function initNavigation() {
  const navToggle = $("#navToggle");
  const sheet = $("#navSheet");
  const links = $$("[data-nav]");
  if (!navToggle || !sheet) return;

  navToggle.addEventListener("click", () => {
    const willOpen = sheet.hidden;
    sheet.hidden = false;
    if (willOpen) {
      requestAnimationFrame(() => sheet.classList.add("is-open"));
    } else {
      sheet.classList.remove("is-open");
      window.setTimeout(() => {
        sheet.hidden = true;
      }, 250);
    }
    navToggle.setAttribute("aria-expanded", String(willOpen));
    navToggle.setAttribute(
      "aria-label",
      willOpen ? "Tutup menu navigasi" : "Buka menu navigasi",
    );
  });

  document.addEventListener("click", (e) => {
    if (
      !sheet.hidden &&
      !sheet.contains(e.target) &&
      e.target !== navToggle &&
      !navToggle.contains(e.target)
    ) {
      sheet.classList.remove("is-open");
      window.setTimeout(() => {
        sheet.hidden = true;
      }, 250);
      navToggle.setAttribute("aria-expanded", "false");
    }
  });

  links.forEach((link) =>
    link.addEventListener("click", () => {
      sheet.classList.remove("is-open");
      sheet.hidden = true;
      navToggle.setAttribute("aria-expanded", "false");
    }),
  );

  /* active section highlight */
  const ids = ["hero", "couple", "events", "gallery", "wishes"];
  const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
  if ("IntersectionObserver" in window && sections.length) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          links.forEach((link) => {
            const active = link.getAttribute("href") === `#${entry.target.id}`;
            link.classList.toggle("is-active", active);
          });
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((s) => navObserver.observe(s));
  }
}

/* ---------- 14. SCROLL TO TOP + REVEALS ---------- */
function initScrollTop() {
  const btn = $("#scrollTopBtn");
  if (!btn) return;
  let ticking = false;
  window.addEventListener(
    "scroll",
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        btn.hidden = window.scrollY < 700;
        ticking = false;
      });
    },
    { passive: true },
  );
  btn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  });
}

function initReveals() {
  const targets = $$("[data-reveal]");
  if (!targets.length) return;
  if (!("IntersectionObserver" in window) || prefersReducedMotion) {
    targets.forEach((t) => t.classList.add("is-visible"));
    return;
  }
  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
  );
  targets.forEach((t) => revealObserver.observe(t));
}

/* ---------- 15. BOOT ---------- */
function init() {
  applyGuestName();
  applyOwnerLabel();
  initCover();
  initCountdown();
  initEvents();
  initGift();
  initStory();
  initGallery();
  initWishes();
  initMusic();
  initNavigation();
  initScrollTop();
  initReveals();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
