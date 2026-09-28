/* ======
   VGrow — interactions
   Renders the portfolio from data.js and wires up:
   nav / mobile menu / scroll reveal / thumbnail lightbox / custom video player
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
  function fmtTime(t) {
    if (!isFinite(t) || t < 0) t = 0;
    var m = Math.floor(t / 60), s = Math.floor(t % 60);
    return m + ":" + (s < 10 ? "0" : "") + s;
  }
  var ICONS = {
    play: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l11-6.5z"/></svg>',
    pause: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z"/></svg>',
    volHigh: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4 9.5v5h3.2L12 19V5L7.2 9.5H4z"/><path d="M14.5 8.6a4.6 4.6 0 0 1 0 6.8v-1.9a2.9 2.9 0 0 0 0-3z"/><path d="M14.5 5.8a7.4 7.4 0 0 1 0 12.4v-1.9a5.6 5.6 0 0 0 0-8.6z"/></svg>',
    volMute: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4 9.5v5h3.2L12 19V5L7.2 9.5H4z"/><path d="m15.2 9.8 1.1-1.1 4.2 4.2-1.1 1.1z" transform="translate(-2.2 -1.8)"/><path d="M17.4 8.1l1.1 1.1-4.2 4.2-1.1-1.1z" transform="translate(2 -1.5)"/></svg>',
    expand: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 4H4v5M15 4h5v5M9 20H4v-5M15 20h5v-5"/></svg>',
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
     Render: videos + custom player
     ====== */
  var videoGrid = $("#videoGrid");
  if (videoGrid && videos) {
    videoGrid.innerHTML = videos.map(function (v, i) {
      return (
        '<article class="video-card">' +
        '<div class="player" tabindex="0" role="group" aria-label="Video player: ' + esc(v.title) + '">' +
        '<video src="' + esc(v.video) + '" poster="' + esc(v.poster) +
        '" preload="metadata" playsinline></video>' +
        '<div class="player-overlay"></div>' +
        '<button class="player-bigplay" type="button" aria-label="Play video: ' + esc(v.title) + '">' +
        ICONS.play + "</button>" +
        '<div class="player-controls">' +
        '<button class="ctl-btn ctl-play" type="button" aria-label="Play">' + ICONS.play + "</button>" +
        '<div class="player-progress" role="slider" aria-label="Seek" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" tabindex="-1">' +
        '<div class="track"><div class="buffered"></div><div class="played"></div><div class="knob"></div></div>' +
        "</div>" +
        '<span class="player-time"><span class="t-cur">0:00</span> / <span class="t-dur">0:00</span></span>' +
        '<div class="player-volume">' +
        '<button class="ctl-btn ctl-mute" type="button" aria-label="Mute">' + ICONS.volHigh + "</button>" +
        '<input type="range" min="0" max="1" step="0.05" value="1" aria-label="Volume">' +
        "</div>" +
        '<button class="ctl-btn ctl-fs" type="button" aria-label="Fullscreen">' + ICONS.expand + "</button>" +
        "</div></div>" +
        '<div class="video-info">' +
        '<span class="video-tag">' + esc(v.category) + "</span>" +
        "<h3>" + esc(v.title) + "</h3>" +
        "<p>" + esc(v.description || "") + "</p>" +
        "</div></article>"
      );
    }).join("");

    $$(".player", videoGrid).forEach(initPlayer);
  }

  function initPlayer(player) {
    var video = $("video", player);
    var bigPlay = $(".player-bigplay", player);
    var playBtn = $(".ctl-play", player);
    var muteBtn = $(".ctl-mute", player);
    var fsBtn = $(".ctl-fs", player);
    var progress = $(".player-progress", player);
    var playedEl = $(".played", progress);
    var bufferedEl = $(".buffered", progress);
    var knob = $(".knob", progress);
    var curEl = $(".t-cur", player);
    var durEl = $(".t-dur", player);
    var volInput = $('input[type="range"]', player);
    var hideTimer = null;

    function isPlaying() { return !video.paused && !video.ended; }

    function toggle() {
      if (isPlaying()) video.pause(); else video.play();
    }

    function setIcon(btn, html, label) {
      btn.innerHTML = html;
      btn.setAttribute("aria-label", label);
    }

    function lockControls() {
      clearTimeout(hideTimer);
      player.classList.add("controls-locked");
      hideTimer = setTimeout(function () {
        player.classList.remove("controls-locked");
      }, 2600);
    }

    video.addEventListener("play", function () {
      player.classList.add("isPlaying");
      player.classList.remove("paused");
      setIcon(playBtn, ICONS.pause, "Pause");
      lockControls();
    });
    video.addEventListener("pause", function () {
      player.classList.remove("isPlaying");
      player.classList.add("paused");
      setIcon(playBtn, ICONS.play, "Play");
    });
    video.addEventListener("ended", function () {
      player.classList.remove("isPlaying");
      player.classList.add("paused");
    });

    video.addEventListener("loadedmetadata", function () { durEl.textContent = fmtTime(video.duration); });
    video.addEventListener("timeupdate", function () {
      if (!video.duration) return;
      var pct = (video.currentTime / video.duration) * 100;
      playedEl.style.width = pct + "%";
      knob.style.left = pct + "%";
      curEl.textContent = fmtTime(video.currentTime);
      progress.setAttribute("aria-valuenow", Math.round(pct));
    });
    video.addEventListener("progress", function () {
      try {
        if (video.buffered.length && video.duration) {
          var end = video.buffered.end(video.buffered.length - 1);
          bufferedEl.style.width = (end / video.duration) * 100 + "%";
        }
      } catch (e) { /* noop */ }
    });

    bigPlay.addEventListener("click", toggle);
    playBtn.addEventListener("click", toggle);
    video.addEventListener("click", function (e) {
      if (e.target === video) toggle();
    });
    /* tap anywhere on the player (not just the video/big button) toggles play */
    player.addEventListener("click", function (e) {
      if (e.target.closest(".player-controls")) return;
      if (e.target === video || e.target.closest("button")) return;
      toggle();
    });
    video.addEventListener("dblclick", function (e) {
      if (e.target === video) toggleFs();
    });

    /* seek */
    function seekFromEvent(e) {
      var rect = progress.getBoundingClientRect();
      var x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
      var ratio = Math.min(Math.max(x / rect.width, 0), 1);
      if (video.duration) video.currentTime = ratio * video.duration;
    }
    var dragging = false;
    progress.addEventListener("pointerdown", function (e) {
      dragging = true;
      progress.setPointerCapture(e.pointerId);
      seekFromEvent(e);
    });
    progress.addEventListener("pointermove", function (e) { if (dragging) seekFromEvent(e); });
    progress.addEventListener("pointerup", function () { dragging = false; });
    progress.addEventListener("pointercancel", function () { dragging = false; });

    /* volume */
    function updateVolIcon() {
      var muted = video.muted || video.volume === 0;
      setIcon(muteBtn, muted ? ICONS.volMute : ICONS.volHigh, muted ? "Unmute" : "Mute");
    }
    muteBtn.addEventListener("click", function () { video.muted = !video.muted; updateVolIcon(); });
    volInput.addEventListener("input", function () {
      video.volume = parseFloat(volInput.value);
      video.muted = video.volume === 0;
      updateVolIcon();
    });
    updateVolIcon();

    /* fullscreen */
    function toggleFs() {
      if (document.fullscreenElement) {
        if (document.exitFullscreen) document.exitFullscreen();
      } else if (player.requestFullscreen) {
        player.requestFullscreen();
      } else if (video.webkitEnterFullscreen) {
        video.webkitEnterFullscreen(); /* iOS Safari */
      }
    }
    fsBtn.addEventListener("click", toggleFs);

    /* keyboard */
    player.addEventListener("keydown", function (e) {
      var k = e.key.toLowerCase();
      if (k === " " || k === "k") { e.preventDefault(); toggle(); }
      else if (k === "arrowright" && video.duration) { e.preventDefault(); video.currentTime = Math.min(video.currentTime + 5, video.duration); }
      else if (k === "arrowleft" && video.duration) { e.preventDefault(); video.currentTime = Math.max(video.currentTime - 5, 0); }
      else if (k === "m") { video.muted = !video.muted; updateVolIcon(); }
      else if (k === "f") { toggleFs(); }
    });

    /* auto-hide controls while playing */
    ["pointermove", "pointerdown", "touchstart"].forEach(function (ev) {
      player.addEventListener(ev, function () {
        if (isPlaying()) lockControls();
      });
    });
    player.addEventListener("mouseleave", function () {
      if (isPlaying()) player.classList.remove("controls-locked");
    });
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
  var navLinks = $$(".site-nav > a:not(.nav-cta)");
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
