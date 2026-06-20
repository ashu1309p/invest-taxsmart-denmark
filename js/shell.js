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
            tab("plan", "index.html", "tabPlan", "Plan") +
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

  window.Shell = {
    header: function () {
      var el = document.getElementById("site-header");
      if (el) el.innerHTML = headerHTML(pageId());
    },
    footer: function () {
      var el = document.getElementById("site-footer");
      if (el) el.innerHTML = footerHTML();
    },
    initHeaderScroll: initHeaderScroll
  };

  /* The header is injected synchronously mid-parse, but wait for DOMContentLoaded
     so the element (and the page's #ctxPill, if any) are guaranteed present. */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHeaderScroll);
  } else {
    initHeaderScroll();
  }
})();
