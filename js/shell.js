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
          '<a class="brand" href="index.html"><span class="dot"></span><span data-i18n="brand">Tax-smart investing in Denmark</span></a>' +
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
        '</footer>' +
      '</div>' +
      '<aside class="stickybar" aria-label="Important disclaimer" data-i18n-aria="ariaDisclaimer">' +
        '<span data-i18n="stickyBar">Educational only, not tax, legal or investment advice.</span> ' +
        '<a href="#sources" data-i18n="stickyLink">Sources</a>' +
        '<button class="sb-x" type="button" onclick="this.closest(\'.stickybar\').remove()" aria-label="Dismiss" data-i18n-aria="ariaDismiss">&times;</button>' +
      '</aside>';
  }

  function pageId() {
    return (document.body && document.body.getAttribute("data-page")) || "";
  }

  window.Shell = {
    header: function () {
      var el = document.getElementById("site-header");
      if (el) el.innerHTML = headerHTML(pageId());
    },
    footer: function () {
      var el = document.getElementById("site-footer");
      if (el) el.innerHTML = footerHTML();
    }
  };
})();
