/* ======
   VGrow — interactions
   Renders the portfolio from data.js and wires up:
   nav / mobile menu / scroll reveal / thumbnail lightbox / video cards (native HTML5 player)
   ====== */
(function () {
  "use strict";

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  function esc(s) {
    var d = document.createElement("div");
    d.textContent = String(s == null ? "" : s);
    return d.textContent;
  }
  var ICONS = {
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    prev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>',
    next: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>',
    zoomIn: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M16.5 16.5L21 21M8 11h6M11 8v6"/></svg>',
  };

  /* ======
     Render: thumbnails
     ====== */
  var thumbGrid = $("#thumbGrid");
  if (thumbGrid && thumbnails) {
    thumbGrid.innerHTML = thumbnails.map(function (t) {
      return (
        '<button class="thumb-card" type="button" data-index="' +
        thumbnails.indexOf(t) + '">' +
        '<span class="frame"><img src="' + esc(t.image) + '" alt="' + esc(t.title) +
        '" loading="lazy" decoding="async"></span>' +
        '<span class="thumb-caption" style="display:flex;flex-direction:column;gap:3px;">' +
        '<span class="thumb-title">' + esc(t.title) + "</span>" +
        '<span class="thumb-cat">' + esc(t.category) + "</span>" +
        "</span></button>"
      );
    }).join("");
  }

  /* ======
     Render: videos — plain HTML5 <video> with native controls.
     The browser's own play/pause, seek, volume and fullscreen controls
     are used, which work on every device without any custom JS.
     ====== */
  var videoGrid = $("#videoGrid");
  if (videoGrid && videos) {
    videoGrid.innerHTML = videos.map(function (v) {
      return (
        '<article class="video-card">' +
        '<div class="player">' +
        '<video src="' + esc(v.video) + '" poster="' + esc(v.poster) +
        '" preload="metadata" playsinline controls></video>' +
        "</div>" +
        '<div class="video-info">' +
        '<span class="video-tag">' + esc(v.category) + "</span>" +
        "<h3>" + esc(v.title) + "</h3>" +
        "<p>" + esc(v.description || "") + "</p>" +
        "</div></article>"
      );
    }).join("");
  }

  /* ======
     Lightbox
     ====== */
  var lightbox = $("#lightbox");
  var lbIndex = 0;
  var lbImg = null, lbCaption = null, lbCounter = null;
  var zoomState = { on: false, x: 0, y: 0, dragging: false, sx: 0, sy: 0 };

  function buildLightbox() {
    lightbox.innerHTML =
      '<div class="lightbox-topbar">' +
      '<span class="lightbox-counter"></span>' +
      '<div class="lightbox-topbar-actions">' +
      '<button class="lb-btn lb-zoom" type="button" aria-label="Zoom in / out">' + ICONS.zoomIn + "</button>" +
      '<button class="lb-btn lb-close" type="button" aria-label="Close viewer">' + ICONS.close + "</button>" +
      "</div></div>" +
      '<div class="lightbox-stage">' +
      '<button class="lb-btn lb-nav prev" type="button" aria-label="Previous image">' + ICONS.prev + "</button>" +
      '<img alt="" decoding="async">' +
      '<button class="lb-btn lb-nav next" type="button" aria-label="Next image">' + ICONS.next + "</button>" +
      "</div>" +
      '<div class="lightbox-caption"></div>';
    lbImg = $("img", lightbox);
    lbCaption = $(".lightbox-caption", lightbox);
    lbCounter = $(".lightbox-counter", lightbox);

    $(".lb-close", lightbox).addEventListener("click", closeLightbox);
    $(".lb-prev, .lb-nav.prev", lightbox); /* noop guard */
    $(".lb-nav.prev", lightbox).addEventListener("click", function () { openLightbox(lbIndex - 1); });
    $(".lb-nav.next", lightbox).addEventListener("click", function () { openLightbox(lbIndex + 1); });
    $(".lb-zoom", lightbox).addEventListener("click", toggleZoom);
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox || e.target.classList.contains("lightbox-stage")) closeLightbox();
    });

    /* zoom drag-to-pan */
    lbImg.addEventListener("pointerdown", function (e) {
      if (!zoomState.on) return;
      zoomState.dragging = true;
      zoomState.sx = e.clientX - zoomState.x;
      zoomState.sy = e.clientY - zoomState.y;
      lbImg.setPointerCapture(e.pointerId);
      e.preventDefault();
    });
    lbImg.addEventListener("pointermove", function (e) {
      if (!zoomState.dragging) return;
      zoomState.x = e.clientX - zoomState.sx;
      zoomState.y = e.clientY - zoomState.sy;
      applyZoom();
    });
    ["pointerup", "pointercancel"].forEach(function (ev) {
      lbImg.addEventListener(ev, function () { zoomState.dragging = false; });
    });
    lbImg.addEventListener("dblclick", toggleZoom);

    document.addEventListener("keydown", function (e) {
      if (lightbox.hidden) return;
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowRight") openLightbox(lbIndex + 1);
      else if (e.key === "ArrowLeft") openLightbox(lbIndex - 1);
      else if (e.key === "+" || e.key === "=") toggleZoom();
    });
  }

  function applyZoom() {
    lbImg.style.transform = zoomState.on
      ? "scale(2) translate(" + zoomState.x + "px," + zoomState.y + "px)"
      : "";
  }
  function toggleZoom() {
    zoomState.on = !zoomState.on;
    zoomState.x = 0; zoomState.y = 0;
    lbImg.classList.toggle("is-zoomed", zoomState.on);
    applyZoom();
  }
  function resetZoom() {
    zoomState.on = false; zoomState.dragging = false;
    lbImg.classList.remove("is-zoomed");
    applyZoom();
  }

  function openLightbox(index) {
    if (!thumbnails || !thumbnails.length) return;
    lbIndex = (index + thumbnails.length) % thumbnails.length;
    var t = thumbnails[lbIndex];
    resetZoom();
    lbImg.src = t.image;
    lbImg.alt = t.title;
    lbCounter.textContent = lbIndex + 1 + " / " + thumbnails.length;
    lbCaption.innerHTML =
      '<span class="thumb-title">' + esc(t.title) + "</span>" +
      (t.description ? "<p>" + esc(t.description) + "</p>" : "") +
      '<p style="margin-top:8px;font-size:0.78rem;letter-spacing:0.08em;text-transform:uppercase;color:rgba(255,255,255,0.45);">' +
      esc(t.category) + "</p>";
    if (lightbox.hidden) {
      lightbox.hidden = false;
      requestAnimationFrame(function () { lightbox.classList.add("is-open"); });
      document.body.style.overflow = "hidden";
      $(".lb-close", lightbox).focus();
    }
  }
  function closeLightbox() {
    lightbox.classList.remove("is-open");
    document.body.style.overflow = "";
    setTimeout(function () { lightbox.hidden = true; }, 260);
  }

  if (lightbox) buildLightbox();
  if (thumbGrid) {
    thumbGrid.addEventListener("click", function (e) {
      var card = e.target.closest(".thumb-card");
      if (card) openLightbox(parseInt(card.getAttribute("data-index"), 10) || 0);
    });
  }

  /* ======
     Contact links (from SITE config)
     ====== */
  (function buildContact() {
    var actions = $("#contactActions");
    if (!actions || !SITE) return;

    var isPlaceholder = function (v) { return !v || v.indexOf("YOUR_") === 0; };
    var links = [
      {
        label: "Email Me",
        href: isPlaceholder(SITE.email) ? "#" : "mailto:" + SITE.email,
        cls: "btn btn-primary",
        ph: isPlaceholder(SITE.email),
      },
      {
        label: "WhatsApp",
        href: isPlaceholder(SITE.whatsapp) ? "#" : "https://wa.me/" + SITE.whatsapp,
        cls: "btn btn-ghost",
        ext: !isPlaceholder(SITE.whatsapp),
        ph: isPlaceholder(SITE.whatsapp),
      },
    ];

    actions.innerHTML = links.map(function (l) {
      return (
        '<a class="' + l.cls + (l.ph ? " is-placeholder" : "") + '" href="' + esc(l.href) + '"' +
        (l.ext ? ' target="_blank" rel="noopener noreferrer"' : "") +
        (l.ph ? ' aria-disabled="true" title="Add your link in assets/js/data.js"' : "") +
        ">" + l.label + "</a>"
      );
    }).join("");

    var note = $("#contactNote");
    if (note && links.some(function (l) { return l.ph; })) {
      note.hidden = false;
      if (window.console) console.warn("[VGrow] Contact details are still placeholders — edit assets/js/data.js (SITE block).");
    }
  })();

  /* ======
     Header, mobile nav, active section, reveal
     ====== */
  var header = $(".site-header");
  function onScroll() {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var toggle = $(".nav-toggle");
  var nav = $("#site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    $$("a", nav).forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* active nav link */
  var navLinks = $$(".site-nav > a");
  var sections = navLinks
    .map(function (a) { return $(a.getAttribute("href")); })
    .filter(Boolean);
  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) {
          a.classList.toggle("is-active", a.getAttribute("href") === "#" + entry.target.id);
        });
      });
    }, { rootMargin: "-42% 0px -52% 0px" });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* reveal on scroll */
  var revealEls = $$("[data-reveal]");
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("revealed"); });
  } else {
    var stagger = 0;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("revealed");
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    /* children inside grids get a small stagger */
    revealEls.forEach(function (el) {
      if (el.id === "thumbGrid" || el.id === "videoGrid") {
        var kids = Array.prototype.slice.call(el.children);
        kids.forEach(function (k, i) {
          k.style.transitionDelay = Math.min(i * 70, 420) + "ms";
        });
      }
      io.observe(el);
    });
  }

  /* footer year */
  var yearEl = $("#year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
