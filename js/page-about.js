/* ============================================================
   Page controller: about.html
   ------------------------------------------------------------
   Dependency-free, no build. Loaded after js/config.js and js/i18n.js.
   Holds this page's PAGE_I18N override (namespace about_*, plus the
   per-page shell strings), merges it onto I18N_BASE, and runs the shared
   render pass that also translates the injected header/footer.

   The only interpolated values are the tax year {yr} and verified {date},
   both read from TAX_YEAR_CONFIG, so no figure is hard-coded here. The
   static text in the HTML is only an English fallback for no-JS / crawlers
   and is overwritten on load. The DA block is a first-pass translation
   PENDING the author's proofread.
   ============================================================ */
(function () {
  var GLOBAL_KEY = "dkie_global_v1";   // lang shared across pages

  var PAGE_I18N = {
    en: {
      "skipLink":"Skip to content",
      "ariaLangGroup":"Language",
      "ariaDisclaimer":"Important disclaimer",
      "ariaDismiss":"Dismiss",
      "bigDisclaimer":"This site is an educational tool built by a private individual. It is not tax, legal or investment advice, it stores no personal data, and it can be outdated the day after a law changes. Amounts are for the tagged tax year, adjusted every January; the positivliste [SKAT’s fund list] changes every December. Verify with skat.dk or ask an advokat/revisor before acting.",
      "stickyBar":"Educational only, not tax, legal or investment advice.",
      "about_kicker":"About",
      "about_h1":"About / methodology",
      "about_lead":"Who made this, what it assumes, and where every number comes from.",
      "about_taxyear":"Tax year {yr}",
      "about_verifiedNote":"Every figure here is tagged to this tax year and read from TAX_YEAR_CONFIG, the same single source the tools use.",
      "about_who_h2":"Who made this",
      "about_who_p1":"I'm Ashutosh Pathak, a technology and delivery professional based in Copenhagen. I've spent close to two decades building and shipping complex software platforms, and I built this site the same way I approach that work: carefully, with every number checked against the source and every claim something I could point to.",
      "about_who_p2":"It started as my own problem. Like a lot of people investing in Denmark, I kept re-deriving the same questions (which account to use, whether a fund sits on SKAT's positivliste, how gifts to children are taxed) from scattered, often Danish-only sources. I wanted one plain place that just showed the answer, in English and Dansk. So I made it.",
      "about_who_p3":"A few honest things: this is a personal, non-commercial project. There are no ads, no login, and nothing for sale. I'm not a tax advisor, accountant, or lawyer; I'm an investor who reads the rules carefully. Everything here is educational, every figure is dated to its tax year, and every page points you back to skat.dk so you can verify it yourself.",
      "about_who_linkedin":"Connect on LinkedIn →",
      "about_who_feedback":"Send feedback (a 1-minute form) →",
      "about_assume_h2":"What this site assumes (and what it doesn't)",
      "about_assume_p1":"Every amount on this site is tagged to a single tax year. Right now that is tax year {yr}, taken from one place in the code (TAX_YEAR_CONFIG), so the Plan and Play tools and these articles can never quietly disagree.",
      "about_assume_p2":"The figures are SKAT and Skatteministeriet (SKM) published values for that year. Indexed amounts such as allowances and thresholds are adjusted every January, so a number that is correct this year can change next year.",
      "about_assume_p3":"Whether a fund's gains count as share income or capital income depends on SKAT's positivliste. What this site refers to is a periodic snapshot of that official list, and a snapshot can lag a change by a while, so confirm the current list before you act.",
      "about_assume_pos_link":"Read how the positivliste works →",
      "about_assume_p4":"The simulators illustrate generic scenarios to show how the rules interact. They are not personalized advice, they do not know your situation, and rates or thresholds can change with new law.",
      "about_src_intro":"Everything here traces back to official sources. Where a page makes a specific claim, it links the exact reference.",
      "about_disc":"This is a personal, educational project by a private individual, not tax, legal or investment advice. Amounts are for tax year {yr} and change as the law changes. Verify on skat.dk, and consult an advokat or revisor for advice about your own situation.",
      "about_back":"← Back to home",
      "i18nReady":"i18n complete"
    },
    da: {
      "skipLink":"Spring til indhold",
      "ariaLangGroup":"Sprog",
      "ariaDisclaimer":"Vigtig ansvarsfraskrivelse",
      "ariaDismiss":"Afvis",
      "bigDisclaimer":"Dette site er et undervisningsværktøj lavet af en privatperson. Det er ikke skatte-, juridisk eller investeringsrådgivning, gemmer ingen persondata og kan være forældet dagen efter en lovændring. Beløb gælder det angivne skatteår og reguleres hver januar; positivlisten [SKATs godkendte fonde] ændres hver december. Bekræft på skat.dk eller spørg en advokat/revisor før du handler.",
      "stickyBar":"Kun til undervisning, ikke skatte-, juridisk eller investeringsrådgivning.",
      "about_kicker":"Om",
      "about_h1":"Om / metode",
      "about_lead":"Hvem der har lavet dette, hvad det antager, og hvor hvert tal kommer fra.",
      "about_taxyear":"Skatteår {yr}",
      "about_verifiedNote":"Alle tal her er mærket til dette skatteår og læses fra TAX_YEAR_CONFIG, den samme ene kilde, som værktøjerne bruger.",
      "about_who_h2":"Hvem har lavet dette",
      "about_who_p1":"Jeg hedder Ashutosh Pathak og er en teknologi- og leveranceprofessionel bosat i København. Jeg har brugt næsten to årtier på at bygge og levere komplekse softwareplatforme, og jeg har bygget dette site på samme måde, som jeg griber det arbejde an: omhyggeligt, med hvert tal kontrolleret mod kilden og hver påstand som noget, jeg kunne pege på.",
      "about_who_p2":"Det startede som mit eget problem. Som mange andre, der investerer i Danmark, blev jeg ved med at udlede de samme spørgsmål igen og igen (hvilken konto man skal bruge, om en fond står på SKATs positivliste, hvordan gaver til børn beskattes) fra spredte, ofte kun dansksprogede kilder. Jeg ville have ét enkelt sted, der bare viste svaret, på engelsk og dansk. Så jeg lavede det.",
      "about_who_p3":"Et par ærlige ting: dette er et personligt, ikke-kommercielt projekt. Der er ingen reklamer, ingen login og intet til salg. Jeg er ikke skatterådgiver, revisor eller advokat; jeg er en investor, der læser reglerne omhyggeligt. Alt her er til undervisning, hvert tal er dateret til sit skatteår, og hver side henviser dig tilbage til skat.dk, så du selv kan bekræfte det.",
      "about_who_linkedin":"Find mig på LinkedIn →",
      "about_who_feedback":"Send feedback (et 1-minuts skema) →",
      "about_assume_h2":"Hvad dette site antager (og hvad det ikke gør)",
      "about_assume_p1":"Hvert beløb på dette site er mærket til ét bestemt skatteår. Lige nu er det skatteår {yr}, hentet ét sted i koden (TAX_YEAR_CONFIG), så Planlæg- og Leg-værktøjerne og disse artikler aldrig stille og roligt kan modsige hinanden.",
      "about_assume_p2":"Tallene er offentliggjorte værdier fra SKAT og Skatteministeriet (SKM) for det år. Regulerede beløb som fradrag og grænser justeres hver januar, så et tal, der er korrekt i år, kan ændre sig næste år.",
      "about_assume_p3":"Om en fonds gevinster tæller som aktieindkomst eller kapitalindkomst afhænger af SKATs positivliste. Det, dette site henviser til, er et periodisk øjebliksbillede af den officielle liste, og et øjebliksbillede kan halte bagefter en ændring et stykke tid, så bekræft den aktuelle liste, før du handler.",
      "about_assume_pos_link":"Læs hvordan positivlisten virker →",
      "about_assume_p4":"Simulatorerne illustrerer generiske scenarier for at vise, hvordan reglerne spiller sammen. De er ikke personlig rådgivning, de kender ikke din situation, og satser eller grænser kan ændre sig med ny lovgivning.",
      "about_src_intro":"Alt her kan føres tilbage til officielle kilder. Hvor en side fremsætter en bestemt påstand, linker den til den præcise henvisning.",
      "about_disc":"Dette er et personligt, undervisende projekt lavet af en privatperson, ikke skatte-, juridisk eller investeringsrådgivning. Beløb gælder skatteåret {yr} og ændrer sig, når loven ændrer sig. Bekræft på skat.dk, og kontakt en advokat eller revisor for rådgivning om din egen situation.",
      "about_back":"← Tilbage til forsiden",
      "i18nReady":"i18n komplet"
    }
  };

  var I18N = mergeI18n(I18N_BASE, PAGE_I18N);
  var cfg = TAX_YEAR_CONFIG;

  function $(id){ return document.getElementById(id); }
  var lang = "en";
  try { var g = JSON.parse(localStorage.getItem(GLOBAL_KEY) || "{}"); if (g.lang === "da" || g.lang === "en") lang = g.lang; } catch (e) {}

  function numMap(){
    return { yr: cfg.taxYear, date: cfg.verifiedDate };
  }
  function fill(str, map){ return String(str).replace(/\{(\w+)\}/g, function(_, k){ return map[k] !== undefined ? map[k] : "{" + k + "}"; }); }

  function t(key){
    if (I18N[lang] && I18N[lang][key] !== undefined) return I18N[lang][key];
    if (I18N.en[key] !== undefined) return I18N.en[key];
    return key;
  }
  function renderStrings(){
    document.documentElement.lang = lang;
    var map = numMap();
    document.querySelectorAll("[data-i18n]").forEach(function(el){ el.textContent = fill(t(el.getAttribute("data-i18n")), map); });
    document.querySelectorAll("[data-i18n-aria]").forEach(function(el){ el.setAttribute("aria-label", fill(t(el.getAttribute("data-i18n-aria")), map)); });
    var en = $("lang-en"), da = $("lang-da");
    if (en) en.classList.toggle("active", lang === "en");
    if (da) da.classList.toggle("active", lang === "da");
  }
  function setLang(l){
    lang = l;
    try { var g = JSON.parse(localStorage.getItem(GLOBAL_KEY) || "{}"); g.lang = l; localStorage.setItem(GLOBAL_KEY, JSON.stringify(g)); } catch (e) {}
    renderStrings();
  }
  if ($("lang-en")) $("lang-en").onclick = function(){ setLang("en"); };
  if ($("lang-da")) $("lang-da").onclick = function(){ setLang("da"); };
  renderStrings();

  /* i18n completeness self-check (mirrors the tools' badge) */
  (function(){
    var r = checkI18nComplete(I18N);
    var b = $("testbadge");
    if (!b) return;
    if (r.ok) { b.textContent = "\u2713 " + t("i18nReady"); }
    else { b.textContent = "\u26A0 i18n: " + r.missingInDa.concat(r.missingInEn).join(", "); b.classList.add("fail"); }
  })();
})();
