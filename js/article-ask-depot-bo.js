/* ============================================================
   Article controller: learn-ask-depot-bo.html
   ------------------------------------------------------------
   Dependency-free, no build. Loaded after js/config.js and js/i18n.js.
   Holds this article's PAGE_I18N override (namespace art_adb_*, plus the
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
      "art_adb_kicker":"Learn",
      "art_adb_h1":"ASK vs depot vs børneopsparing",
      "art_adb_lead":"Denmark hands a retail investor a few different “wrappers” to hold the same funds in — and the wrapper, not the fund, often decides the tax. Here are the three you actually choose between.",
      "art_adb_taxyear":"Tax year {yr}",
      "art_adb_verifiedNote":"Every rate and amount below is for this tax year, verified {date} against skat.dk / skm.dk. Indexed amounts change every January.",
      "art_adb_h2_intro":"Three wrappers, one decision",
      "art_adb_intro_p":"A “wrapper” is just the type of account a fund sits in. The same world ETF can be taxed in different ways depending on where you hold it. None of these is universally best; the right one depends on whether you are investing for yourself or for a child, and how much. The Money Router on the Plan page puts them in a cheapest-tax order for a given target — this article explains what each one is first.",
      "art_adb_h2_ask":"ASK — the low-rate wrapper",
      "art_adb_ask_p1":"The Aktiesparekonto (ASK) is a special account taxed on a lager [mark-to-market] basis: each year you are taxed on the increase in value, whether you sold anything or not, and the tax is paid from the account. The rate is a flat {askR}% — lower than every other wrapper here, which is the whole point of it.",
      "art_adb_ask_p2":"There is a deposit ceiling of {askC} kr ({yr}): that limits how much you can pay in, not how large the account can grow. Only stocks and funds on the positivliste are allowed inside an ASK. Internal trades within the account do not use up the deposit ceiling, and a child can have one too.",
      "art_adb_ask_p3":"Because the {askR}% applies symmetrically to good and bad years, the ASK is also a tidy home for a volatile “satellite” holding, where a flat rate handles the swings more evenly than an allowance-based account would.",
      "art_adb_h2_depot":"The ordinary depot (frit depot)",
      "art_adb_depot_p1":"An ordinary brokerage account — aktiedepot, often just “depot” — has no special wrapper rules: the fund you pick decides the tax. A fund on the positivliste is taxed as aktieindkomst [share income] at {aktieLow}% up to {aktieThr} kr of yearly share income per person ({aktieThrM} kr combined for a married couple) and {aktieHigh}% above that. A fund off the list is taxed as kapitalindkomst [capital income] at roughly {kapLow}–{kapHigh}%. Which list a fund is on is the subject of its own explainer.",
      "art_adb_depot_p2":"When the tax bill lands depends on what you hold. Investment funds are taxed yearly on the change in value (lager), the same mechanism as the ASK. Single stocks in a depot are realisation-taxed instead: nothing is due until you actually sell, so you control the timing. The depot has no ceiling, which makes it the adult workhorse for everything beyond the ASK.",
      "art_adb_h2_bo":"Børneopsparing — the child wrapper",
      "art_adb_bo_p1":"Børneopsparing [child savings] is the cheapest tax home in Denmark: 0% on every krone of return, forever. The trade-off is size and access. You can deposit at most {boY} kr per year and {boL} kr in total, there is one per child, it is opened before age 14, and it is locked until it pays out at some point between ages 14 and 21. It can hold funds and stocks at some banks, and the positivliste does not matter inside it.",
      "art_adb_bo_p2":"It helps to compare it with simply investing in the child's own depot. There, an off-list accumulating fund is kapitalindkomst, and the child's personfradrag [tax-free allowance] of {pf} kr ({yr}) absorbs that yearly gain — so it is effectively 0% until the gain grows past the allowance, with no lock and no contribution cap. That is why families typically fill the tiny, locked-but-untaxed børneopsparing first, then keep going in the child's depot using the frikort.",
      "art_adb_h2_cmp":"At a glance",
      "art_adb_cmp_corner":"",
      "art_adb_cmp_ask":"ASK",
      "art_adb_cmp_depot":"Ordinary depot",
      "art_adb_cmp_bo":"Børneopsparing",
      "art_adb_cmp_who":"Who it's for",
      "art_adb_cmp_tax":"How gains are taxed",
      "art_adb_cmp_limit":"Key limit",
      "art_adb_cmp_catch":"Main catch",
      "art_adb_cmp_ask_who":"Adults wanting the lowest rate on listed funds; children too.",
      "art_adb_cmp_depot_who":"Anyone, for anything beyond the other wrappers.",
      "art_adb_cmp_bo_who":"One per child, opened by family.",
      "art_adb_cmp_ask_tax":"Flat {askR}% a year (lager).",
      "art_adb_cmp_depot_tax":"On-list {aktieLow}/{aktieHigh}%; off-list ~{kapLow}–{kapHigh}%.",
      "art_adb_cmp_bo_tax":"0% on all returns.",
      "art_adb_cmp_ask_limit":"Deposit ceiling {askC} kr.",
      "art_adb_cmp_depot_limit":"No ceiling.",
      "art_adb_cmp_bo_limit":"{boY} kr/yr, {boL} kr lifetime.",
      "art_adb_cmp_ask_catch":"Positivliste funds and stocks only.",
      "art_adb_cmp_depot_catch":"The fund decides the tax; off-list costs adults more.",
      "art_adb_cmp_bo_catch":"Locked until paid out at age 14–21.",
      "art_adb_ta_h":"Key takeaways",
      "art_adb_ta1":"ASK: a flat {askR}% lager wrapper for listed funds, with a {askC} kr ({yr}) deposit ceiling — usually an adult's cheapest home for stock funds.",
      "art_adb_ta2":"Ordinary depot: no ceiling, but the fund decides the tax — on-list aktieindkomst {aktieLow}/{aktieHigh}% vs off-list kapitalindkomst ~{kapLow}–{kapHigh}%.",
      "art_adb_ta3":"Børneopsparing: 0% forever, but tiny ({boY} kr/yr, {boL} kr lifetime) and locked until age 14–21.",
      "art_adb_ta4":"A child's own depot with an off-list fund uses the {pf} kr ({yr}) personfradrag to reach near-0% with no lock or cap.",
      "art_adb_cta_router":"Put them in order: the Money Router",
      "art_adb_cta_pos":"Read: the positivliste",
      "art_adb_cta_gift":"Plan gifts to a child",
      "art_adb_skat_ask":"Aktiesparekonto on skat.dk →",
      "art_adb_skat_bo":"Børneopsparing in Den juridiske vejledning →",
      "art_adb_disc":"This is an educational explainer written by a private individual — not tax, legal or investment advice. Amounts are for tax year {yr} and change as the law changes. Verify on skat.dk, and ask an advokat or revisor before acting on anything here.",
      "art_adb_back":"← Back to Learn",
      "i18nReady":"i18n complete"
    },
    da: {
      "skipLink":"Spring til indhold",
      "ariaLangGroup":"Sprog",
      "ariaDisclaimer":"Vigtig ansvarsfraskrivelse",
      "ariaDismiss":"Afvis",
      "bigDisclaimer":"Dette site er et undervisningsværktøj lavet af en privatperson. Det er ikke skatte-, juridisk eller investeringsrådgivning, gemmer ingen persondata og kan være forældet dagen efter en lovændring. Beløb gælder det angivne skatteår og reguleres hver januar; positivlisten [SKATs godkendte fonde] ændres hver december. Bekræft på skat.dk eller spørg en advokat/revisor før du handler.",
      "stickyBar":"Kun til undervisning – ikke skatte-, juridisk eller investeringsrådgivning.",
      "art_adb_kicker":"Lær",
      "art_adb_h1":"ASK vs depot vs børneopsparing",
      "art_adb_lead":"Danmark giver en privat investor nogle forskellige “indpakninger” at holde de samme fonde i — og det er indpakningen, ikke fonden, der ofte afgør skatten. Her er de tre, du reelt vælger mellem.",
      "art_adb_taxyear":"Skatteår {yr}",
      "art_adb_verifiedNote":"Alle satser og beløb nedenfor gælder dette skatteår, kontrolleret {date} mod skat.dk / skm.dk. Regulerede beløb ændres hver januar.",
      "art_adb_h2_intro":"Tre indpakninger, én beslutning",
      "art_adb_intro_p":"En “indpakning” er bare den kontotype, en fond ligger i. Den samme verdens-ETF kan beskattes forskelligt afhængigt af, hvor du har den. Ingen af dem er bedst i alle tilfælde; den rigtige afhænger af, om du investerer for dig selv eller for et barn, og hvor meget. Pengerouteren på Planlæg-siden sætter dem i billigste skatterækkefølge for et givet mål — denne artikel forklarer først, hvad hver enkelt er.",
      "art_adb_h2_ask":"ASK — indpakningen med den lave sats",
      "art_adb_ask_p1":"Aktiesparekontoen (ASK) er en særlig konto, der lagerbeskattes: hvert år beskattes du af værdistigningen, uanset om du har solgt noget eller ej, og skatten betales fra kontoen. Satsen er flade {askR}% — lavere end alle de andre indpakninger her, hvilket er hele pointen med den.",
      "art_adb_ask_p2":"Der er et indskudsloft på {askC} kr ({yr}): det begrænser, hvor meget du kan indbetale, ikke hvor stor kontoen kan vokse sig. Kun aktier og fonde på positivlisten er tilladt i en ASK. Interne handler i kontoen bruger ikke af indskudsloftet, og et barn kan også have en.",
      "art_adb_ask_p3":"Fordi de {askR}% gælder symmetrisk for gode og dårlige år, er ASK også et fint hjem for en volatil “satellit”-beholdning, hvor en flad sats håndterer udsvingene mere jævnt end en fradragsbaseret konto ville.",
      "art_adb_h2_depot":"Det almindelige depot (frit depot)",
      "art_adb_depot_p1":"En almindelig depotkonto — aktiedepot, ofte bare “depot” — har ingen særlige indpakningsregler: fonden, du vælger, afgør skatten. En fond på positivlisten beskattes som aktieindkomst med {aktieLow}% op til {aktieThr} kr årlig aktieindkomst pr. person ({aktieThrM} kr samlet for et ægtepar) og {aktieHigh}% derover. En fond uden for listen beskattes som kapitalindkomst med cirka {kapLow}–{kapHigh}%. Hvilken liste en fond er på, er emnet for sin egen forklaring.",
      "art_adb_depot_p2":"Hvornår skatteregningen falder afhænger af, hvad du ejer. Investeringsfonde beskattes årligt af værdiændringen (lager), samme mekanik som ASK. Enkeltaktier i et depot er i stedet realisationsbeskattet: der skal intet betales, før du faktisk sælger, så du styrer tidspunktet. Depotet har intet loft, hvilket gør det til voksnes arbejdshest til alt ud over ASK.",
      "art_adb_h2_bo":"Børneopsparing — barneindpakningen",
      "art_adb_bo_p1":"Børneopsparing er Danmarks billigste skattemiljø: 0% af hver krone i afkast, altid. Bytteforholdet er størrelse og adgang. Du kan indbetale højst {boY} kr om året og {boL} kr i alt, der er én pr. barn, den oprettes før 14 år, og den er låst, indtil den udbetales et sted mellem 14 og 21 år. Den kan holde fonde og aktier i nogle banker, og positivlisten er ligegyldig indeni.",
      "art_adb_bo_p2":"Det hjælper at sammenligne den med simpelthen at investere i barnets eget depot. Der er en akkumulerende fond uden for listen kapitalindkomst, og barnets personfradrag på {pf} kr ({yr}) opsuger årets gevinst — så det er reelt 0%, indtil gevinsten vokser ud over fradraget, uden lås og uden indbetalingsloft. Derfor fylder familier typisk den lille, låste-men-skattefri børneopsparing først og fortsætter så i barnets depot med frikortet.",
      "art_adb_h2_cmp":"Overblik",
      "art_adb_cmp_corner":"",
      "art_adb_cmp_ask":"ASK",
      "art_adb_cmp_depot":"Almindeligt depot",
      "art_adb_cmp_bo":"Børneopsparing",
      "art_adb_cmp_who":"Hvem den er til",
      "art_adb_cmp_tax":"Hvordan gevinster beskattes",
      "art_adb_cmp_limit":"Vigtigste grænse",
      "art_adb_cmp_catch":"Hovedhagen",
      "art_adb_cmp_ask_who":"Voksne, der vil have den laveste sats på listefonde; også børn.",
      "art_adb_cmp_depot_who":"Alle, til alt ud over de andre indpakninger.",
      "art_adb_cmp_bo_who":"Én pr. barn, oprettet af familien.",
      "art_adb_cmp_ask_tax":"Flade {askR}% om året (lager).",
      "art_adb_cmp_depot_tax":"På listen {aktieLow}/{aktieHigh}%; uden for ~{kapLow}–{kapHigh}%.",
      "art_adb_cmp_bo_tax":"0% af alt afkast.",
      "art_adb_cmp_ask_limit":"Indskudsloft {askC} kr.",
      "art_adb_cmp_depot_limit":"Intet loft.",
      "art_adb_cmp_bo_limit":"{boY} kr/år, {boL} kr i alt.",
      "art_adb_cmp_ask_catch":"Kun positivliste-fonde og aktier.",
      "art_adb_cmp_depot_catch":"Fonden afgør skatten; uden for listen koster voksne mere.",
      "art_adb_cmp_bo_catch":"Låst indtil udbetaling ved 14–21 år.",
      "art_adb_ta_h":"Hovedpointer",
      "art_adb_ta1":"ASK: en flad {askR}% lager-indpakning til listefonde, med et indskudsloft på {askC} kr ({yr}) — typisk en voksens billigste hjem til aktiefonde.",
      "art_adb_ta2":"Almindeligt depot: intet loft, men fonden afgør skatten — på listen aktieindkomst {aktieLow}/{aktieHigh}% mod uden for listen kapitalindkomst ~{kapLow}–{kapHigh}%.",
      "art_adb_ta3":"Børneopsparing: 0% altid, men lille ({boY} kr/år, {boL} kr i alt) og låst indtil 14–21 år.",
      "art_adb_ta4":"Et barns eget depot med en fond uden for listen bruger personfradraget på {pf} kr ({yr}) til at nå næsten 0% uden lås eller loft.",
      "art_adb_cta_router":"Sæt dem i rækkefølge: Pengerouteren",
      "art_adb_cta_pos":"Læs: positivlisten",
      "art_adb_cta_gift":"Planlæg gaver til et barn",
      "art_adb_skat_ask":"Aktiesparekonto på skat.dk →",
      "art_adb_skat_bo":"Børneopsparing i Den juridiske vejledning →",
      "art_adb_disc":"Dette er en undervisende forklaring skrevet af en privatperson — ikke skatte-, juridisk eller investeringsrådgivning. Beløb gælder skatteåret {yr} og ændrer sig, når loven ændrer sig. Bekræft på skat.dk, og spørg en advokat eller revisor, før du handler på noget her.",
      "art_adb_back":"← Tilbage til Lær",
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
      askC: nfmt(cfg.askCeiling),
      boY: nfmt(cfg.boYearlyCap),
      boL: nfmt(cfg.boLifetimeCap),
      aktieThr: nfmt(cfg.aktieThreshold),
      aktieThrM: nfmt(cfg.aktieThresholdMarried),
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
