/* ============================================================
   Article controller: learn-lager-vs-realisation.html
   ------------------------------------------------------------
   Dependency-free, no build. Loaded after js/config.js and js/i18n.js.
   Holds this article's PAGE_I18N override (namespace art_lvr_*, plus the
   per-page shell strings), merges it onto I18N_BASE, and runs the shared
   render pass that also translates the injected header/footer.

   Every tax number is interpolated from TAX_YEAR_CONFIG with a {placeholder}
   and carries the tax year via the "Tax year {yr}" tag + verified line, so
   nothing is hard-coded here. The static text in the HTML is only an
   English fallback for no-JS / crawlers and is overwritten on load.
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
      "art_lvr_kicker":"Learn",
      "art_lvr_h1":"Lager vs realisation: when the tax bill lands",
      "art_lvr_lead":"Two investments can earn exactly the same return and still be taxed at different times. In Denmark the timing is set by the instrument, not by you.",
      "art_lvr_taxyear":"Tax year {yr}",
      "art_lvr_verifiedNote":"Every rate and amount below is for this tax year, verified {date} against skat.dk / skm.dk. Indexed amounts change every January.",
      "art_lvr_h2_intro":"Two ways Denmark times the tax",
      "art_lvr_intro_p":"Most of this site is about how much tax you pay. This article is about when you pay it. Denmark uses two timing methods: lagerbeskatning, where you are taxed every year on the change in value, and realisationsbeskatning, where you are taxed only when you actually sell. The rate can be the same; what differs is whether the tax bill arrives yearly or waits until you cash out.",
      "art_lvr_h2_lager":"Lagerbeskatning: taxed every year",
      "art_lvr_lager_p1":"Lager [mark-to-market] means you are taxed on the increase in value each year, whether you sold anything or not, and the tax is paid from the account. A purely paper gain still counts: if the holding is worth more on 31 December than it was a year earlier, that rise is taxed for the year.",
      "art_lvr_lager_p2":"The practical catch is cash flow. You can owe tax in a year when you sold nothing, so the money to pay it has to come from somewhere. Inside an ASK the tax is simply taken from the account at a flat {askR}% ({yr}); in an ordinary depot a lager-taxed fund's yearly gain lands on your tax return.",
      "art_lvr_lager_p3":"Lager is the method for investment funds and investeringsselskaber [investment companies], which is what most ETFs are, and for everything held inside an ASK. The rate then depends on the fund: a positivliste fund is aktieindkomst [share income] at {aktieLow}% up to {aktieThr} kr and {aktieHigh}% above; an off-list fund is kapitalindkomst [capital income] at roughly {kapLow}-{kapHigh}%.",
      "art_lvr_lager_p4":"For a child, the yearly lager method is the whole point of the frikort setup. An off-list accumulating fund's yearly gain is kapitalindkomst, and the child's personfradrag [tax-free allowance] of {pf} kr ({yr}) absorbs it, so the tax is effectively 0% until the yearly gain grows past the allowance.",
      "art_lvr_h2_real":"Realisationsbeskatning: taxed only when you sell",
      "art_lvr_real_p1":"Realisation means nothing is due until you actually sell. Until then the whole amount, including the part that is really a gain, keeps compounding untaxed. The deferral is the advantage: tax paid later leaves more invested in the meantime.",
      "art_lvr_real_p2":"Realisation is the method for individual shares: single stocks in a depot are realisation-taxed aktieindkomst [share income], with no yearly lager bill, so you choose when to sell. It also applies to certain Danish equity-based investment funds: Danish distributing equity funds (IMB) are realisation-taxed aktieindkomst, a different regime from the lager-taxed ETFs above.",
      "art_lvr_h2_choice":"It is the instrument, not a choice",
      "art_lvr_choice_p":"You do not pick the method; the instrument decides it. An ETF or investeringsselskab is lager, a single stock is realisation, and an ASK is lager by construction. Whether a lager-taxed fund's gain counts as aktieindkomst or kapitalindkomst is in turn set by the positivliste. So before you buy, two separate questions matter: when am I taxed (the instrument), and at what rate (the positivliste status and the wrapper).",
      "art_lvr_h2_cmp":"At a glance",
      "art_lvr_cmp_corner":"",
      "art_lvr_cmp_lager":"Lager",
      "art_lvr_cmp_real":"Realisation",
      "art_lvr_cmp_when":"When you are taxed",
      "art_lvr_cmp_what":"What it applies to",
      "art_lvr_cmp_cons":"Main practical consequence",
      "art_lvr_cmp_lager_when":"Every year on the change in value, sold or not.",
      "art_lvr_cmp_real_when":"Only when you actually sell.",
      "art_lvr_cmp_lager_what":"Investment funds / ETFs, and everything inside an ASK.",
      "art_lvr_cmp_real_what":"Individual shares; certain Danish equity funds (IMB).",
      "art_lvr_cmp_lager_cons":"Tax can be due with no sale; a child's frikort absorbs the yearly gain.",
      "art_lvr_cmp_real_cons":"Gains compound untaxed until you sell; you control the timing.",
      "art_lvr_ta_h":"Key takeaways",
      "art_lvr_ta1":"Lager taxes the yearly change in value whether or not you sell, so tax can fall due without a sale.",
      "art_lvr_ta2":"Realisation taxes only when you sell, so gains compound untaxed until then.",
      "art_lvr_ta3":"Funds and ETFs (and everything in an ASK) are lager; single stocks and Danish IMB equity funds are realisation.",
      "art_lvr_ta4":"The method is fixed by the instrument; the rate ({aktieLow}/{aktieHigh}% vs ~{kapLow}-{kapHigh}%) is set by the positivliste and the wrapper.",
      "art_lvr_cta_play":"See it compound: the Wrapper Race",
      "art_lvr_cta_pos":"Read: the positivliste",
      "art_lvr_cta_adb":"Read: ASK vs depot vs børneopsparing",
      "art_lvr_skat":"Aktiesparekonto (a lager example) on skat.dk →",
      "art_lvr_disc":"This is an educational explainer written by a private individual, not tax, legal or investment advice. Amounts are for tax year {yr} and change as the law changes. Verify on skat.dk, and ask an advokat or revisor before acting on anything here.",
      "art_lvr_back":"← Back to Learn",
      "i18nReady":"i18n complete"
    },
    da: {
      "skipLink":"Spring til indhold",
      "ariaLangGroup":"Sprog",
      "ariaDisclaimer":"Vigtig ansvarsfraskrivelse",
      "ariaDismiss":"Afvis",
      "bigDisclaimer":"Dette site er et undervisningsværktøj lavet af en privatperson. Det er ikke skatte-, juridisk eller investeringsrådgivning, gemmer ingen persondata og kan være forældet dagen efter en lovændring. Beløb gælder det angivne skatteår og reguleres hver januar; positivlisten [SKATs godkendte fonde] ændres hver december. Bekræft på skat.dk eller spørg en advokat/revisor før du handler.",
      "stickyBar":"Kun til undervisning, ikke skatte-, juridisk eller investeringsrådgivning.",
      "art_lvr_kicker":"Lær",
      "art_lvr_h1":"Lager vs realisation: hvornår skatteregningen falder",
      "art_lvr_lead":"To investeringer kan give præcis det samme afkast og alligevel blive beskattet på forskellige tidspunkter. I Danmark afgøres tidspunktet af instrumentet, ikke af dig.",
      "art_lvr_taxyear":"Skatteår {yr}",
      "art_lvr_verifiedNote":"Alle satser og beløb nedenfor gælder dette skatteår, kontrolleret {date} mod skat.dk / skm.dk. Regulerede beløb ændres hver januar.",
      "art_lvr_h2_intro":"To måder Danmark tidsfastsætter skatten på",
      "art_lvr_intro_p":"Det meste af dette site handler om, hvor meget skat du betaler. Denne artikel handler om, hvornår du betaler den. Danmark bruger to metoder: lagerbeskatning, hvor du beskattes hvert år af værdiændringen, og realisationsbeskatning, hvor du først beskattes, når du faktisk sælger. Satsen kan være den samme; det, der adskiller dem, er, om regningen kommer årligt eller venter, til du sælger.",
      "art_lvr_h2_lager":"Lagerbeskatning: beskattet hvert år",
      "art_lvr_lager_p1":"Lager [mark-to-market] betyder, at du beskattes af værdistigningen hvert år, uanset om du har solgt noget eller ej, og skatten betales fra kontoen. En ren papirgevinst tæller stadig: hvis beholdningen er mere værd 31. december end et år tidligere, beskattes den stigning for året.",
      "art_lvr_lager_p2":"Den praktiske hage er likviditet. Du kan komme til at skylde skat i et år, hvor du intet solgte, så pengene til at betale den skal komme et sted fra. I en ASK tages skatten simpelthen fra kontoen med flade {askR}% ({yr}); i et almindeligt depot lander en lagerbeskattet fonds årlige gevinst på din selvangivelse.",
      "art_lvr_lager_p3":"Lager er metoden for investeringsfonde og investeringsselskaber, hvilket de fleste ETF'er er, og for alt, der ligger i en ASK. Satsen afhænger så af fonden: en fond på positivlisten er aktieindkomst med {aktieLow}% op til {aktieThr} kr og {aktieHigh}% derover; en fond uden for listen er kapitalindkomst med cirka {kapLow}-{kapHigh}%.",
      "art_lvr_lager_p4":"For et barn er den årlige lager-metode hele pointen med frikort-opsætningen. En akkumulerende fond uden for listen har en årlig gevinst, der er kapitalindkomst, og barnets personfradrag på {pf} kr ({yr}) opsuger den, så skatten reelt er 0%, indtil årets gevinst vokser ud over fradraget.",
      "art_lvr_h2_real":"Realisationsbeskatning: beskattet kun når du sælger",
      "art_lvr_real_p1":"Realisation betyder, at intet skal betales, før du faktisk sælger. Indtil da bliver hele beløbet, inklusive den del der reelt er en gevinst, ved med at forrentes ubeskattet. Udskydelsen er fordelen: skat betalt senere efterlader mere investeret i mellemtiden.",
      "art_lvr_real_p2":"Realisation er metoden for enkeltaktier: enkeltaktier i et depot er realisationsbeskattet aktieindkomst, uden årlig lager-regning, så du vælger selv, hvornår du sælger. Den gælder også for visse danske aktiebaserede investeringsforeninger: danske udloddende aktiefonde (IMB) er realisationsbeskattet aktieindkomst, et andet regime end de lagerbeskattede ETF'er ovenfor.",
      "art_lvr_h2_choice":"Det er instrumentet, ikke et valg",
      "art_lvr_choice_p":"Du vælger ikke metoden; instrumentet afgør den. En ETF eller et investeringsselskab er lager, en enkeltaktie er realisation, og en ASK er lager af konstruktion. Om en lagerbeskattet fonds gevinst tæller som aktieindkomst eller kapitalindkomst afgøres til gengæld af positivlisten. Så før du køber, er der to separate spørgsmål: hvornår beskattes jeg (instrumentet), og med hvilken sats (positivliste-status og indpakningen).",
      "art_lvr_h2_cmp":"Overblik",
      "art_lvr_cmp_corner":"",
      "art_lvr_cmp_lager":"Lager",
      "art_lvr_cmp_real":"Realisation",
      "art_lvr_cmp_when":"Hvornår du beskattes",
      "art_lvr_cmp_what":"Hvad det gælder for",
      "art_lvr_cmp_cons":"Vigtigste praktiske konsekvens",
      "art_lvr_cmp_lager_when":"Hvert år af værdiændringen, solgt eller ej.",
      "art_lvr_cmp_real_when":"Kun når du faktisk sælger.",
      "art_lvr_cmp_lager_what":"Investeringsfonde / ETF'er, og alt i en ASK.",
      "art_lvr_cmp_real_what":"Enkeltaktier; visse danske aktiefonde (IMB).",
      "art_lvr_cmp_lager_cons":"Skat kan forfalde uden salg; et barns frikort opsuger årets gevinst.",
      "art_lvr_cmp_real_cons":"Gevinster forrentes ubeskattet, til du sælger; du styrer tidspunktet.",
      "art_lvr_ta_h":"Hovedpointer",
      "art_lvr_ta1":"Lager beskatter årets værdiændring, uanset om du sælger, så skat kan forfalde uden et salg.",
      "art_lvr_ta2":"Realisation beskatter kun, når du sælger, så gevinster forrentes ubeskattet indtil da.",
      "art_lvr_ta3":"Fonde og ETF'er (og alt i en ASK) er lager; enkeltaktier og danske IMB-aktiefonde er realisation.",
      "art_lvr_ta4":"Metoden er fastlagt af instrumentet; satsen ({aktieLow}/{aktieHigh}% mod ~{kapLow}-{kapHigh}%) afgøres af positivlisten og indpakningen.",
      "art_lvr_cta_play":"Se det forrentes: Wrapper-løbet",
      "art_lvr_cta_pos":"Læs: positivlisten",
      "art_lvr_cta_adb":"Læs: ASK vs depot vs børneopsparing",
      "art_lvr_skat":"Aktiesparekonto (et lager-eksempel) på skat.dk →",
      "art_lvr_disc":"Dette er en undervisende forklaring skrevet af en privatperson, ikke skatte-, juridisk eller investeringsrådgivning. Beløb gælder skatteåret {yr} og ændrer sig, når loven ændrer sig. Bekræft på skat.dk, og spørg en advokat eller revisor, før du handler på noget her.",
      "art_lvr_back":"← Tilbage til Lær",
      "i18nReady":"i18n komplet"
    }
  };

  var I18N = mergeI18n(I18N_BASE, PAGE_I18N);
  var cfg = TAX_YEAR_CONFIG;

  function $(id){ return document.getElementById(id); }
  var lang = "en";
  try { var g = JSON.parse(localStorage.getItem(GLOBAL_KEY) || "{}"); if (g.lang === "da" || g.lang === "en") lang = g.lang; } catch (e) {}

  function nfmt(n){ return new Intl.NumberFormat(lang === "da" ? "da-DK" : "en-GB", { maximumFractionDigits:0 }).format(Math.round(n)); }
  function numMap(){
    return {
      yr: cfg.taxYear,
      date: cfg.verifiedDate,
      aktieLow: Math.round(cfg.aktieRateLow * 100),
      aktieHigh: Math.round(cfg.aktieRateHigh * 100),
      kapLow: Math.round(cfg.kapRateLowApprox * 100),
      kapHigh: Math.round(cfg.kapRateHighApprox * 100),
      askR: Math.round(cfg.askRate * 100),
      aktieThr: nfmt(cfg.aktieThreshold),
      pf: nfmt(cfg.personfradrag)
    };
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
