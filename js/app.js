/* ==========================================================================
   ALYA & RAKA — invitation interactions (vanilla JS, no dependencies)
   ========================================================================== */
"use strict";

/* ---------- 1. SINGLE SOURCE OF TRUTH ---------- */
const invitationData = {
  couple: {
    bride: "Alya Putri",
    groom: "Raka Pratama",
  },

  date: "Sabtu, 21 November 2026",
  weddingDateTime: "2026-11-21T08:00:00+08:00",

  venue: {
    name: "The Grand Garden",
    address: "Jl. Botolempangan No. 10, Makassar, Sulawesi Selatan",
  },

  events: [
    {
      id: "akad",
      kind: "Akad Nikah",
      name: "Akad Nikah",
      dateLabel: "Sabtu, 21 November 2026",
      timeLabel: "08.00 – 10.00 WIB",
      start: "2026-11-21T08:00:00+08:00",
      end: "2026-11-21T10:00:00+08:00",
      venue: "The Grand Garden",
      address: "Jl. Botolempangan No. 10, Makassar, Sulawesi Selatan",
    },
    {
      id: "resepsi",
      kind: "Resepsi",
      name: "Resepsi",
      dateLabel: "Sabtu, 21 November 2026",
      timeLabel: "11.00 – 14.00 WIB",
      start: "2026-11-21T11:00:00+08:00",
      end: "2026-11-21T14:00:00+08:00",
      venue: "The Grand Garden",
      address: "Jl. Botolempangan No. 10, Makassar, Sulawesi Selatan",
    },
  ],

  story: [
    {
      year: "2021",
      title: "Pertemuan Pertama",
      desc: "Kami dipertemukan di sebuah kegiatan volunteer di Makassar. Obrolan singkat sore itu ternyata menjadi awal dari segalanya.",
    },
    {
      year: "2023",
      title: "Mulai Menjalin Hubungan",
      desc: "Setelah dua tahun saling mengenal, kami memantapkan hati untuk berjalan bersama mengenal Tuhan dan satu sama lain.",
    },
    {
      year: "2025",
      title: "Lamaran",
      desc: "Di hadapan keluarga besar, Raka mengetuk pintu dan meminjam tangan Alya. Restu kedua keluarga kami terima dengan penuh syukur.",
    },
    {
      year: "2026",
      title: "Hari Pernikahan",
      desc: "Kini kami memutuskan untuk melangkah lebih jauh: mengikat janji suci di hadapan Tuhan, keluarga, dan sahabat tercinta.",
    },
  ],

  gallery: [
    { src: "assets/images/gallery-01.svg", alt: "Potret berdua Alya dan Raka di taman", ratio: "4 / 5" },
    { src: "assets/images/gallery-02.svg", alt: "Lanskap taman lokasi akad nikah", ratio: "10 / 7" },
    { src: "assets/images/gallery-03.svg", alt: "Detail rangkaian bunga dan cincin pernikahan", ratio: "7 / 9" },
    { src: "assets/images/gallery-04.svg", alt: "Meja dekorasi resepsi dengan bunga dan lilin", ratio: "9 / 6.2" },
    { src: "assets/images/gallery-05.svg", alt: "Kedua mempelai berjalan di bawah pohon", ratio: "3.8 / 4.75" },
    { src: "assets/images/gallery-06.svg", alt: "Detail tangan mempelai dengan cincin", ratio: "11 / 7" },
    { src: "assets/images/gallery-07.svg", alt: "Kotak cincin di atas hiasan bunga saat lamaran", ratio: "6.4 / 8.8" },
    { src: "assets/images/gallery-08.svg", alt: "Tarian pertama di bawah lampu gantung", ratio: "9 / 6.4" },
  ],

  bank: {
    name: "Bank BCA",
    accountName: "Alya Putri",
    accountNumber: "1234567890",
    qrisImage: "assets/images/qris.svg",
  },

  demoWishes: [
    { name: "Sinta Maharani", message: "Selamat menempuh hidup baru, Alya & Raka! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. 🤍", date: "2026-08-30" },
    { name: "Dimas & Keluarga", message: "Barakallahu lakuma wa baraka alaikuma. Turut berbahagia untuk kalian berdua!", date: "2026-09-02" },
    { name: "Om Anton", message: "Selamat ya Raka & Alya! Semoga langgeng sampai kakek-nenek, diundang akadnya tapi nunggu resepsi dulu.", date: "2026-09-05" },
    { name: "Rani Puspita", message: "Aku turut berbahagia! Semoga cinta kalian terus tumbuh dan rumah tangga kalian dipenuhi tawa.", date: "2026-09-10" },
    { name: "Bimo Aditya", message: "Congrats, bro Raka! Jaga Alya baik-baik ya. Sampai jumpa tanggal 21 November nanti.", date: "2026-09-12" },
  ],
};

/* ---------- 2. SHORT HELPERS ---------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function pad2(n) {
  return String(n).padStart(2, "0");
}

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
    window.setTimeout(() => {
      if (cover.parentNode) cover.parentNode.removeChild(cover);
    }, prefersReducedMotion ? 50 : 1100);
  });
}

/* ---------- 5. COUNTDOWN ---------- */
function initCountdown() {
  const target = new Date(invitationData.weddingDateTime).getTime();
  const els = {
    d: $("#cdDays"), h: $("#cdHours"), m: $("#cdMinutes"), s: $("#cdSeconds"),
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
      grid.innerHTML = '<p class="countdown__done">Hari bahagia telah tiba — terima kasih atas doa dan restu Anda!</p>';
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

  invitationData.events.forEach((ev) => {
    const card = document.createElement("article");
    card.className = "event-card";
    card.dataset.reveal = "";

    const kind = document.createElement("p");
    kind.className = "event-card__kind";
    kind.textContent = ev.kind;

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
    mapBtn.target = "_blank";
    mapBtn.rel = "noopener";
    mapBtn.setAttribute("aria-label", `Buka peta lokasi ${ev.name} di Google Maps (tab baru)`);
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
  return String(text).replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");
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
    "PRODID:-//Alya & Raka//Undangan Pernikahan//ID",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${ev.id}-alyaraka-2026@undangan.local`,
    `DTSTAMP:${toIcsUtc(new Date().toISOString())}`,
    `DTSTART:${toIcsUtc(ev.start)}`,
    `DTEND:${toIcsUtc(ev.end)}`,
    `SUMMARY:${icsEscape(`${ev.name} — Alya & Raka`)}`,
    `DESCRIPTION:${icsEscape(`${invitationData.date}. ${ev.timeLabel}. Mohon hadir tepat waktu.`)}`,
    `LOCATION:${icsEscape(`${ev.venue}, ${ev.address}`)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.join("\r\n") + "\r\n";
}

function downloadIcs(ev) {
  const blob = new Blob([buildIcs(ev)], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${ev.name.replace(/\s+/g, "-").toLowerCase()}-alya-raka.ics`;
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
    btn.setAttribute("aria-label", `Perbesar foto ${i + 1} dari ${invitationData.gallery.length}: ${photo.alt}`);
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
    if (m.length !== 2 || !Number.isFinite(m[0]) || !Number.isFinite(m[1]) || m[0] <= 0 || m[1] <= 0) {
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
    current = (current + delta + invitationData.gallery.length) % invitationData.gallery.length;
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

/* ---------- 9. QR MODAL ---------- */
function initQrModal() {
  const modal = $("#qrModal");
  const openBtn = $("#qrOpenBtn");
  const closeBtn = $("#qrCloseBtn");
  if (!modal || !openBtn || !closeBtn) return;

  openBtn.addEventListener("click", () => {
    if (typeof modal.showModal === "function") modal.showModal();
    else modal.setAttribute("open", "");
  });
  closeBtn.addEventListener("click", () => {
    if (modal.open && typeof modal.close === "function") modal.close();
    else modal.removeAttribute("open");
  });
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.close();
  });
}

/* ---------- 10. CLIPBOARD ---------- */
function initClipboard() {
  const btn = $("#copyBankBtn");
  if (!btn) return;
  const number = invitationData.bank.accountNumber;

  function fallbackCopy(text) {
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
    btn.classList.add("is-copied");
    const label = btn.lastChild;
    if (label && label.nodeType === Node.TEXT_NODE) {
      label.textContent = ok ? " Tersalin!" : " Gagal menyalin";
    }
    window.setTimeout(() => {
      btn.classList.remove("is-copied");
      if (label && label.nodeType === Node.TEXT_NODE) label.textContent = " Salin Nomor Rekening";
    }, 2200);
  }

  btn.addEventListener("click", () => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(number).then(
        () => flash(true),
        () => flash(fallbackCopy(number))
      );
    } else {
      flash(fallbackCopy(number));
    }
  });
}

/* ---------- 11. RSVP (simulated, localStorage) ---------- */
const RSVP_KEY = "wedding-rsvp";

function initRsvp() {
  const form = $("#rsvpForm");
  const done = $("#rsvpDone");
  const doneMsg = $("#rsvpDoneMsg");
  const status = $("#rsvpStatus");
  const nameInput = $("#rsvpName");
  const nameError = $("#rsvpNameError");
  if (!form || !done || !status) return;

  function showDone(saved) {
    form.hidden = true;
    done.hidden = false;
    doneMsg.textContent =
      saved.attendance === "Hadir"
        ? `Konfirmasi kehadiran atas nama ${saved.name} (${saved.guests} tamu) telah kami catat di perangkat ini.`
        : `Terima kasih, ${saved.name}. Kami mendoakan kesibukan Anda — semoga nanti ada waktu bertemu.`;
  }

  try {
    const saved = JSON.parse(localStorage.getItem(RSVP_KEY) || "null");
    if (saved && saved.name) showDone(saved);
  } catch (err) {
    /* corrupted storage — ignore and show the form */
  }

  nameInput.addEventListener("input", () => {
    nameError.hidden = true;
    nameInput.closest(".field").classList.remove("has-error");
  });

  $("#rsvpEditBtn").addEventListener("click", () => {
    done.hidden = true;
    form.hidden = false;
    status.textContent = "";
    status.classList.remove("is-ok");
    try {
      const saved = JSON.parse(localStorage.getItem(RSVP_KEY) || "null");
      if (saved) {
        nameInput.value = saved.name || "";
        const radio = form.querySelector(`input[name="attendance"][value="${saved.attendance}"]`);
        if (radio) radio.checked = true;
        $("#rsvpGuests").value = saved.guests || "1";
        $("#rsvpNotes").value = saved.notes || "";
      }
    } catch (err) { /* ignore */ }
    nameInput.focus();
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    if (!name) {
      nameError.hidden = false;
      nameInput.closest(".field").classList.add("has-error");
      nameInput.focus();
      return;
    }
    nameError.hidden = true;
    nameInput.closest(".field").classList.remove("has-error");

    const submitBtn = $("#rsvpSubmit");
    submitBtn.disabled = true;
    submitBtn.textContent = "Mengirim…";

    window.setTimeout(() => {
      const record = {
        name,
        attendance: form.attendance.value,
        guests: $("#rsvpGuests").value,
        notes: $("#rsvpNotes").value.trim(),
        submittedAt: new Date().toISOString(),
      };
      try {
        localStorage.setItem(RSVP_KEY, JSON.stringify(record));
      } catch (err) { /* storage full/blocked — demo continues */ }
      submitBtn.disabled = false;
      submitBtn.textContent = "Kirim Konfirmasi";
      status.textContent = "";
      showDone(record);
    }, 500);
  });
}

/* ---------- 12. WISHES / GUESTBOOK (localStorage) ---------- */
const WISHES_KEY = "wedding-wishes";
const MAX_WISHES = 200;

function loadWishes() {
  try {
    const parsed = JSON.parse(localStorage.getItem(WISHES_KEY) || "null");
    if (Array.isArray(parsed)) return parsed.slice(0, MAX_WISHES);
  } catch (err) { /* corrupted storage — fall through */ }
  return null;
}

function saveWishes(wishes) {
  try {
    localStorage.setItem(WISHES_KEY, JSON.stringify(wishes.slice(0, MAX_WISHES)));
  } catch (err) { /* storage full/blocked — demo continues */ }
}

function formatWishDate(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

function renderWish(wish, list) {
  const li = document.createElement("li");
  li.className = "wish-card";

  const msg = document.createElement("p");
  msg.className = "wish-card__msg";
  msg.textContent = wish.message; /* textContent only — never innerHTML for user content */

  const meta = document.createElement("p");
  meta.className = "wish-card__meta";

  const name = document.createElement("span");
  name.className = "wish-card__name";
  name.textContent = wish.name;

  const date = document.createElement("time");
  if (wish.date) {
    date.dateTime = wish.date;
    date.textContent = formatWishDate(wish.date);
  }

  meta.append(name, date);
  li.append(msg, meta);
  list.prepend(li);
}

function initWishes() {
  const list = $("#wishesList");
  const form = $("#wishForm");
  const nameInput = $("#wishName");
  const msgInput = $("#wishMsg");
  const status = $("#wishStatus");
  if (!list || !form) return;

  let wishes = loadWishes();
  if (!wishes) {
    wishes = invitationData.demoWishes.slice();
    saveWishes(wishes);
  }
  wishes.forEach((w) => renderWish(w, list));

  const nameError = $("#wishNameError");
  const msgError = $("#wishMsgError");
  [nameInput, msgInput].forEach((input) =>
    input.addEventListener("input", () => {
      const err = input === nameInput ? nameError : msgError;
      err.hidden = true;
      input.closest(".field").classList.remove("has-error");
    })
  );

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const message = msgInput.value.trim();
    let valid = true;

    if (!name) {
      nameError.hidden = false;
      nameInput.closest(".field").classList.add("has-error");
      valid = false;
    }
    if (!message) {
      msgError.hidden = false;
      msgInput.closest(".field").classList.add("has-error");
      valid = false;
    }
    if (!valid) return;

    const wish = { name, message, date: new Date().toISOString().slice(0, 10) };
    wishes.unshift(wish);
    wishes = wishes.slice(0, MAX_WISHES);
    saveWishes(wishes);
    renderWish(wish, list);

    form.reset();
    status.textContent = "Ucapan Anda telah terkirim. Terima kasih!";
    status.classList.add("is-ok");
    window.setTimeout(() => {
      status.textContent = "";
      status.classList.remove("is-ok");
    }, 3500);
  });
}

/* ---------- 13. MUSIC (DOM element, gesture-driven, fade) ---------- */
function initMusic() {
  const toggle = $("#musicToggle");
  const audio = $("#bgMusic");
  if (!toggle || !audio) return;

  audio.loop = true;
  audio.volume = 0;

  let playing = false;
  let fadeTimer = null;

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
        audio.volume = target; /* land exactly on the target — never leave the ramp at 0 */
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
    audio.play().then(() => {
      setUi(true);
      fadeTo(0.55);
    }).catch(() => {
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

  document.addEventListener("visibilitychange", () => {
    if (document.hidden && playing) {
      audio.pause();
      audio.volume = 0;
      setUi(false);
    }
  });
}

/* ---------- 14. NAVIGATION ---------- */
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
      window.setTimeout(() => { sheet.hidden = true; }, 250);
    }
    navToggle.setAttribute("aria-expanded", String(willOpen));
    navToggle.setAttribute("aria-label", willOpen ? "Tutup menu navigasi" : "Buka menu navigasi");
  });

  document.addEventListener("click", (e) => {
    if (!sheet.hidden && !sheet.contains(e.target) && e.target !== navToggle && !navToggle.contains(e.target)) {
      sheet.classList.remove("is-open");
      window.setTimeout(() => { sheet.hidden = true; }, 250);
      navToggle.setAttribute("aria-expanded", "false");
      }
  });

  links.forEach((link) =>
    link.addEventListener("click", () => {
      sheet.classList.remove("is-open");
      sheet.hidden = true;
      navToggle.setAttribute("aria-expanded", "false");
    })
  );

  /* active section highlight */
  const ids = ["hero", "couple", "events", "gallery", "rsvp", "wishes"];
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
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => navObserver.observe(s));
  }
}

/* ---------- 15. SCROLL TO TOP + REVEALS ---------- */
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
    { passive: true }
  );
  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
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
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
  );
  targets.forEach((t) => revealObserver.observe(t));
}

/* ---------- 16. BOOT ---------- */
function init() {
  applyGuestName();
  initCover();
  initCountdown();
  initEvents();
  initStory();
  initGallery();
  initQrModal();
  initClipboard();
  initRsvp();
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
