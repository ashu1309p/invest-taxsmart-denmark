/* ============================================================
   SHARED SITE SHELL (header + footer) - authored once, rendered
   on every page (index / play / learn).
   ------------------------------------------------------------
   Dependency-free, no build step. Loaded SYNCHRONOUSLY in <head>,
   then each page injects the chrome at parse time via a tiny inline
   call right after its placeholder:

     <body data-page="plan">
     <div id="site-header"></div><script>Shell.header()</script>
       ... page content ...
     <div id="site-footer"></div><script>Shell.footer()</script>

   Because injection runs during parse (not on DOMContentLoaded) the
   chrome is present at first paint - no layout shift. Every visible
   string carries a data-i18n / data-i18n-aria key, so the page's
   existing renderStrings() pass (run later, at end of <body>) trans-
   lates the injected nodes in the SAME pass as the rest of the page.
   The active tab is taken from <body data-page="…"> (plan|play|learn).
   No strings are hard-coded here beyond English fallbacks identical to
   the prior static markup; the real text comes from js/i18n.js.
   ============================================================ */
(function () {
  /* GoatCounter: prefix every recorded path with the hostname so hits from
     different domains (e.g. the live Vercel URL vs any older URL) are
     distinguishable in the dashboard instead of all collapsing onto the same
     path. shell.js loads synchronously in <head>, so this is set before the
     gc count.js snippet (at the end of <body>) reads it. */
  window.goatcounter = window.goatcounter || {};
  window.goatcounter.path = function (p) { return location.host + p; };

  function headerHTML(active) {
    function tab(page, href, key, fallback) {
      var cls = "tab" + (page === active ? " active" : "");
      return '<a class="' + cls + '" href="' + href + '" data-i18n="' + key + '">' + fallback + "</a>";
    }
    return '' +
      '<a class="skip-link" href="#main" data-i18n="skipLink">Skip to content</a>' +
      '<header class="site">' +
        '<div class="site-inner">' +
          '<a class="brand" href="index.html" data-i18n-aria="ariaBackTop" aria-label="Back to top"><span class="dot"></span><span data-i18n="brand">Tax-smart investing in Denmark</span></a>' +
          '<nav class="tabs">' +
            tab("home", "index.html", "tabHome", "Home") +
            tab("plan", "plan.html", "tabPlan", "Plan") +
            tab("play", "play.html", "tabPlay", "Play") +
            tab("learn", "learn.html", "tabLearn", "Learn") +
          '</nav>' +
          '<div class="lang-toggle" role="group" aria-label="Language" data-i18n-aria="ariaLangGroup">' +
            '<button id="lang-en" class="active">EN</button><button id="lang-da">DA</button>' +
          '</div>' +
        '</div>' +
      '</header>';
  }

  function footerHTML() {
    return '' +
      '<div class="wrap">' +
        '<footer class="big">' +
          '<p data-i18n="bigDisclaimer">This site is an educational tool built by a private individual. It is not tax, legal or investment advice.</p>' +
          '<p style="margin-top:8px" data-i18n="privacyNote">Privacy: anonymous visit counts via GoatCounter (cookieless, no personal data).</p>' +
          '<p style="margin-top:10px"><a href="about.html" data-i18n="footerAbout">About</a></p>' +
        '</footer>' +
      '</div>' +
      '<aside class="stickybar" aria-label="Important disclaimer" data-i18n-aria="ariaDisclaimer">' +
        '<span data-i18n="stickyBar">Educational only, not tax, legal or investment advice.</span> ' +
        '<a href="about.html#sources" data-i18n="stickyLink">Sources</a>' +
        '<button class="sb-x" type="button" onclick="this.closest(\'.stickybar\').remove()" aria-label="Dismiss" data-i18n-aria="ariaDismiss">&times;</button>' +
      '</aside>';
  }

  function pageId() {
    return (document.body && document.body.getAttribute("data-page")) || "";
  }

  /* Hide-on-scroll-down / reveal-on-scroll-up for the shared header, plus
     lifting the context pill when the header is hidden. Authored once here so
     it runs on EVERY page that uses the shell (it previously lived inline in
     index.html and so only worked there). The context pill (#ctxPill) only
     exists on the Plan tool page; when absent that part is simply skipped. */
  function scrollToTop() {
    var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }

  function initHeaderScroll() {
    var header = document.querySelector("header.site");
    if (!header) return;

    /* Brand acts as a "back to top" control on every page. The href stays as a
       no-JS fallback (home), but with JS we intercept and smooth-scroll to top.
       Keyboard: Enter fires click on the anchor; Space is handled explicitly. */
    var brand = header.querySelector(".brand");
    if (brand) {
      brand.addEventListener("click", function (e) { e.preventDefault(); scrollToTop(); });
      brand.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") { e.preventDefault(); scrollToTop(); }
      });
    }

    var pill = document.getElementById("ctxPill");
    var se = document.scrollingElement || document.documentElement;
    function sy() { return se.scrollTop || 0; }
    var lastY = sy();
    function check() {
      var y = sy();
      if (y <= 90) header.classList.remove("header-hidden");          // always show near the top
      else if (y > lastY) header.classList.add("header-hidden");      // scrolling down -> hide
      else if (y < lastY) header.classList.remove("header-hidden");   // scrolling up -> reveal
      if (pill) pill.classList.toggle("lifted", header.classList.contains("header-hidden"));
      lastY = y;
    }
    addEventListener("scroll", check, { passive: true });
    addEventListener("resize", check, { passive: true });
    check();
  }

  /* ------------------------------------------------------------
     Swipe navigation between the four TAB pages (additive to the
     tab clicks; every existing click/tap target is untouched).
     Only the four real tab files swipe - the current page's index
     is derived from the URL basename, so Learn ARTICLE pages and
     the check/quiz utility pages (which also carry data-page) are
     naturally excluded. Desktop mouse drags never fire touch events,
     so they do nothing, as required.
     ------------------------------------------------------------ */
  var SWIPE_PAGES = ["index.html", "plan.html", "play.html", "learn.html"];

  function currentBasename() {
    var p = location.pathname, b = p.substring(p.lastIndexOf("/") + 1);
    return b === "" ? "index.html" : b;
  }

  function slideAndGo(dir, href) {
    var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { location.href = href; return; }
    var el = document.querySelector(".wrap") || document.body;
    el.style.transition = "transform .18s ease, opacity .18s ease";
    el.style.transform = "translateX(" + (dir < 0 ? "-6%" : "6%") + ")";
    el.style.opacity = "0.55";
    setTimeout(function () { location.href = href; }, 170);
  }

  function initSwipeNav() {
    var curIdx = SWIPE_PAGES.indexOf(currentBasename());
    if (curIdx < 0) return;   // article / utility pages: no swipe

    // Elements the gesture must NOT start from (sliders, charts, disclosures, controls, links).
    var BLOCK = "input[type=range], svg.race, #yc-svg, .yc-chart, summary, button, a," +
                " input, textarea, select, [contenteditable], [role='button']";

    function startsInScroller(node) {
      var depth = 0;
      while (node && node.nodeType === 1 && depth < 8) {
        try {
          var st = getComputedStyle(node);
          if ((st.overflowX === "auto" || st.overflowX === "scroll") &&
              node.scrollWidth > node.clientWidth + 4) return true;
        } catch (e) { }
        node = node.parentElement; depth++;
      }
      return false;
    }

    var startX = 0, startY = 0, startT = 0, ignore = false;

    document.addEventListener("touchstart", function (e) {
      if (e.touches && e.touches.length > 1) { ignore = true; return; }   // multi-touch / pinch
      var tp = e.touches ? e.touches[0] : e;
      startX = tp.clientX; startY = tp.clientY; startT = Date.now(); ignore = false;
      var tgt = e.target;
      if (tgt && tgt.closest && tgt.closest(BLOCK)) { ignore = true; return; }
      if (startsInScroller(tgt)) { ignore = true; return; }
    }, { passive: true });

    document.addEventListener("touchend", function (e) {
      if (ignore) return;
      if (e.touches && e.touches.length > 0) return;                       // fingers still down
      var sel = window.getSelection && window.getSelection();
      if (sel && String(sel).length > 0) return;                          // was selecting text
      var tp = e.changedTouches ? e.changedTouches[0] : e;
      var dx = tp.clientX - startX, dy = tp.clientY - startY, dt = Date.now() - startT;
      if (dt >= 600) return;                                              // too slow
      if (Math.abs(dx) < 70) return;                                      // too short
      if (Math.abs(dx) <= 2 * Math.abs(dy)) return;                       // too vertical
      var dir = dx < 0 ? 1 : -1;                                          // swipe left => next tab
      var target = curIdx + dir;
      if (target < 0 || target >= SWIPE_PAGES.length) return;             // ends do not wrap
      slideAndGo(dir, SWIPE_PAGES[target]);
    }, { passive: true });
  }

  window.Shell = {
    header: function () {
      var el = document.getElementById("site-header");
      if (el) el.innerHTML = headerHTML(pageId());
    },
    footer: function () {
      var el = document.getElementById("site-footer");
      if (el) el.innerHTML = footerHTML();
    },
    initHeaderScroll: initHeaderScroll,
    initSwipeNav: initSwipeNav
  };

  /* The header is injected synchronously mid-parse, but wait for DOMContentLoaded
     so the element (and the page's #ctxPill, if any) are guaranteed present. */
  function initShell() { initHeaderScroll(); initSwipeNav(); }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initShell);
  } else {
    initShell();
  }
})();
