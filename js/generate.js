/* ==========================================================================
   GENERATOR LINK UNDANGAN — alat internal
   Membuat URL index.html?to=<nama>&owner=<pria|wanita|semua>
   Base URL diambil dari lokasi halaman ini (localhost / GitHub Pages / dll).
   Seluruh teks tamu masuk lewat .value / .textContent — tidak pernah innerHTML.
   ========================================================================== */
(function () {
  "use strict";

  var MAX_GUEST = 60; /* sama dengan limit ?to= di js/app.js */

  var els = {
    form: document.getElementById("genForm"),
    guest: document.getElementById("guestInput"),
    count: document.getElementById("guestCount"),
    owner: document.getElementById("ownerSelect"),
    link: document.getElementById("linkOutput"),
    copy: document.getElementById("copyBtn"),
    status: document.getElementById("copyStatus"),
    preview: document.getElementById("previewLink"),
  };

  if (!els.form || !els.guest || !els.owner || !els.link || !els.copy) return;

  /* ---------- base URL: ikuti tempat web berjalan ---------- */
  function baseUrl() {
    /* pathname halaman ini → ganti nama file dengan "index.html"
       (generate.html dan index.html selalu sejajar di root repo) */
    var dir = window.location.pathname.replace(/[^/]*$/, "");
    return window.location.origin + dir + "index.html";
  }

  function buildUrl() {
    var url = baseUrl();
    var params = new URLSearchParams();

    var guest = (els.guest.value || "").trim().slice(0, MAX_GUEST);
    if (guest) params.set("to", guest);

    var owner = els.owner.value;
    if (owner) params.set("owner", owner);

    var qs = params.toString();
    return qs ? url + "?" + qs : url;
  }

  /* ---------- render ---------- */
  function render() {
    var guest = (els.guest.value || "").trim().slice(0, MAX_GUEST);
    if (els.count) els.count.textContent = String(guest.length);

    var url = buildUrl();
    els.link.value = url;

    if (els.preview) {
      els.preview.href = url;
    }

    if (els.status) els.status.textContent = "";
  }

  /* ---------- copy ---------- */
  function legacyCopy(text) {
    var ok = false;
    try {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      ok = document.execCommand("copy");
      document.body.removeChild(ta);
    } catch (err) {
      ok = false;
    }
    return ok;
  }

  function setStatus(msg) {
    if (els.status) els.status.textContent = msg;
  }

  function onCopy() {
    var url = els.link.value;
    if (!url) return;

    function fallback() {
      if (legacyCopy(url)) {
        setStatus("URL tersalin ke clipboard.");
      } else {
        setStatus("Gagal menyalin — salin manual dari kolom di atas.");
      }
    }

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(url).then(
        function () { setStatus("URL tersalin ke clipboard."); },
        fallback
      );
    } else {
      fallback();
    }
  }

  /* ---------- events ---------- */
  els.guest.addEventListener("input", render);
  els.owner.addEventListener("change", render);
  els.copy.addEventListener("click", onCopy);

  /* inisialisasi pertama */
  render();
})();
