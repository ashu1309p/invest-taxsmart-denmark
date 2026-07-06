/* ============================================================
   Article controller: learn-positivliste.html
   ------------------------------------------------------------
   Dependency-free, no build. Loaded after js/config.js and js/i18n.js.
   Holds this article's PAGE_I18N override (namespace art_pos_*, plus the
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
      "art_pos_kicker":"Learn",
      "art_pos_h1":"The positivliste: the list that sets your fund's tax",
      "art_pos_lead":"Two almost identical world ETFs can be taxed in completely different ways in Denmark. The deciding factor is a single official list, and knowing how it works is one of the highest-leverage things a retail investor here can learn.",
      "art_pos_taxyear":"Tax year {yr}",
      "art_pos_verifiedNote":"Every rate and amount below is for this tax year, verified {date} against skat.dk / skm.dk. Indexed amounts change every January; the list itself changes every December.",
      "art_pos_h2_what":"What the positivliste actually is",
      "art_pos_what_p1":"SKAT keeps an official list of equity-based investment funds, formally the ABIS list (aktiebaserede investeringsselskaber). In everyday language people call it the positivliste, the “positive list”. Whether a given fund is on it or off it decides which kind of income its gains are taxed as, and the list is refreshed every year.",
      "art_pos_what_p2":"That single yes-or-no fact ripples through everything else: the tax rate you pay, whether you can hold the fund inside an Aktiesparekonto (ASK), and whether it is a smart pick for an adult or for a child. None of it is about the fund being “good” or “bad” as an investment; it is purely about how Denmark labels it for tax.",
      "art_pos_h2_rate":"On the list vs off the list: the tax flips",
      "art_pos_rate_intro":"Here is the core of it. The same gain is taxed under one of two regimes, depending on the list:",
      "art_pos_on_t":"On the list → aktieindkomst (share income)",
      "art_pos_on_d":"Gains are taxed as share income at {aktieLow}% up to {aktieThr} kr per person ({aktieThrM} kr for a married couple) and {aktieHigh}% above that. On-list funds are allowed inside an ASK. For most adults this is the cheaper outcome.",
      "art_pos_off_t":"Off the list → kapitalindkomst (capital income)",
      "art_pos_off_d":"Gains are taxed as capital income at roughly {kapLow}-{kapHigh}%, calculated yearly on the change in value (lager). Off-list funds cannot sit inside an ASK. For a child using the frikort, this is often the better outcome.",
      "art_pos_rate_p":"So an on-list and an off-list fund holding nearly the same shares can land in different income types with different rates. That is why checking the list is worth the two minutes it takes.",
      "art_pos_h2_ac":"What it means for an adult vs a child",
      "art_pos_ac_p1":"For an adult, on-list share income is usually the goal. The {aktieLow}% rate is low, the ASK wrapper (which only accepts on-list funds) is taxed even more gently at a flat {askRate}% a year, and the step up to {aktieHigh}% only begins above {aktieThr} kr of share income in a year.",
      "art_pos_ac_p2":"For a child the logic often flips. A child has a personal allowance (personfradrag) of {personfradrag} kr for {yr}, and it is capital income that this allowance (used as a frikort) soaks up. An off-list fund's kapitalindkomst can therefore be taxed at very little, or nothing, inside the allowance. An on-list fund taxed as aktieindkomst gets no personfradrag relief, so the child pays {aktieLow}% from the very first krone and the frikort trick stops working for it.",
      "art_pos_h2_isin":"It is per-ISIN, not per-fund",
      "art_pos_isin_p1":"The list works per ISIN (the unique identifier of one specific share class), not per fund family. A single fund can have several share classes: accumulating (ACC) and distributing (DIST), currency-hedged and unhedged, and each has its own ISIN. The unhedged class being on the list tells you nothing about the hedged class.",
      "art_pos_isin_p2":"Always check the exact ISIN of the share class you actually intend to buy, before you buy. You can paste it straight into the ISIN checker on the Check a fund page.",
      "art_pos_h2_timing":"How and when the list changes",
      "art_pos_timing_p":"SKAT publishes the list around 15 December for the coming year, and can amend it during the year. Funds are added and removed, which flips a fund's tax from one January to the next. A fund you bought as on-list share income can become off-list capital income the next year, or the other way around, without you doing anything.",
      "art_pos_h2_scen":"Two quick scenarios",
      "art_pos_scen_note":"Illustration only. These describe the mechanism, not a claim that any specific fund changed status. Always verify the current list yourself.",
      "art_pos_scen1_t":"A fund drops off the list",
      "art_pos_scen1_p":"Suppose a world ETF you hold is on the list this year and SKAT drops it next December. From 1 January, in a normal depot, its yearly gain switches from share income to capital income, and it can no longer sit in an ASK. An adult holding it inside an ASK would typically sell it there and buy a still-listed world ETF instead (an internal ASK trade does not use up your deposit ceiling). For a child's frikort depot the drop is often fine, even better, because capital income is exactly what the allowance absorbs.",
      "art_pos_scen2_t":"A fund is added to the list",
      "art_pos_scen2_p":"Now the reverse: an off-list accumulating world ETF that a child holds for the frikort gets added next December. From January its gain becomes share income with no personfradrag relief, so the child pays {aktieLow}% from the first krone. The fix is to point the child's new contributions at a fund that is still off the list. For an adult the same change is good news: the fund is now cheaper and can go inside an ASK.",
      "art_pos_h2_habit":"Your yearly habit",
      "art_pos_habit_p":"Every December or January, and before any new purchase, look up the exact ISIN of each fund you hold or plan to buy on skat.dk. If a holding has changed status, note its new tax and ask an advokat or revisor before any sizeable move.",
      "art_pos_ta_h":"Key takeaways",
      "art_pos_ta1":"The positivliste (ABIS list) decides whether a fund's gains are share income ({aktieLow}/{aktieHigh}%) or capital income (~{kapLow}-{kapHigh}%).",
      "art_pos_ta2":"On-list is usually best for an adult and can go in an ASK; off-list is often best for a child's frikort and cannot.",
      "art_pos_ta3":"It works per ISIN, so every share class differs, so check the exact one.",
      "art_pos_ta4":"The list changes around 15 December and can change mid-year, so re-check before every purchase.",
      "art_pos_cta_check":"Check a fund's ISIN",
      "art_pos_cta_router":"See the routed order",
      "art_pos_skat":"Open the current positivliste on skat.dk →",
      "art_pos_disc":"This is an educational explainer written by a private individual, not tax, legal or investment advice. Amounts are for tax year {yr} and change as the law and the list change. Verify the current positivliste on skat.dk, and ask an advokat or revisor before acting on anything here.",
      "art_pos_back":"← Back to Learn",
      "i18nReady":"i18n complete"
    },
    da: {
      "skipLink":"Spring til indhold",
      "ariaLangGroup":"Sprog",
      "ariaDisclaimer":"Vigtig ansvarsfraskrivelse",
      "ariaDismiss":"Afvis",
      "bigDisclaimer":"Dette site er et undervisningsværktøj lavet af en privatperson. Det er ikke skatte-, juridisk eller investeringsrådgivning, gemmer ingen persondata og kan være forældet dagen efter en lovændring. Beløb gælder det angivne skatteår og reguleres hver januar; positivlisten [SKATs godkendte fonde] ændres hver december. Bekræft på skat.dk eller spørg en advokat/revisor før du handler.",
      "stickyBar":"Kun til undervisning, ikke skatte-, juridisk eller investeringsrådgivning.",
      "art_pos_kicker":"Lær",
      "art_pos_h1":"Positivlisten: listen der afgør din fonds skat",
      "art_pos_lead":"To næsten identiske verdens-ETF'er kan beskattes på helt forskellige måder i Danmark. Det afgørende er én enkelt officiel liste, og at forstå, hvordan den virker, er noget af det mest værdifulde, en privat investor her kan lære.",
      "art_pos_taxyear":"Skatteår {yr}",
      "art_pos_verifiedNote":"Alle satser og beløb nedenfor gælder dette skatteår, kontrolleret {date} mod skat.dk / skm.dk. Regulerede beløb ændres hver januar; selve listen ændres hver december.",
      "art_pos_h2_what":"Hvad positivlisten egentlig er",
      "art_pos_what_p1":"SKAT fører en officiel liste over aktiebaserede investeringsforeninger og -selskaber, formelt ABIS-listen (aktiebaserede investeringsselskaber). I daglig tale kalder man den positivlisten. Om en given fond er på den eller ej, afgør hvilken type indkomst dens gevinster beskattes som, og listen opdateres hvert år.",
      "art_pos_what_p2":"Det ene ja-eller-nej forplanter sig til alt det andet: skattesatsen du betaler, om du må have fonden i en Aktiesparekonto (ASK), og om den er et klogt valg for en voksen eller for et barn. Intet af det handler om, at fonden er “god” eller “dårlig” som investering; det handler udelukkende om, hvordan Danmark mærker den skattemæssigt.",
      "art_pos_h2_rate":"På listen vs uden for listen: skatten vender",
      "art_pos_rate_intro":"Her er kernen. Den samme gevinst beskattes efter ét af to regelsæt, afhængigt af listen:",
      "art_pos_on_t":"På listen → aktieindkomst",
      "art_pos_on_d":"Gevinster beskattes som aktieindkomst med {aktieLow}% op til {aktieThr} kr pr. person ({aktieThrM} kr for et ægtepar) og {aktieHigh}% derover. Fonde på listen må ligge i en ASK. For de fleste voksne er det den billigste løsning.",
      "art_pos_off_t":"Uden for listen → kapitalindkomst",
      "art_pos_off_d":"Gevinster beskattes som kapitalindkomst med cirka {kapLow}-{kapHigh}%, opgjort årligt på ændringen i værdi (lager). Fonde uden for listen kan ikke ligge i en ASK. For et barn med frikort er det ofte den bedre løsning.",
      "art_pos_rate_p":"Så en fond på listen og en uden for listen, der ejer næsten de samme aktier, kan ende i forskellige indkomsttyper med forskellige satser. Derfor er de to minutter værd at tjekke listen.",
      "art_pos_h2_ac":"Hvad det betyder for en voksen vs et barn",
      "art_pos_ac_p1":"For en voksen er aktieindkomst på listen normalt målet. De {aktieLow}% er lavt, ASK-indpakningen (som kun accepterer fonde på listen) beskattes endnu mildere med flade {askRate}% om året, og trinnet op til {aktieHigh}% begynder først over {aktieThr} kr aktieindkomst på et år.",
      "art_pos_ac_p2":"For et barn vender logikken ofte. Et barn har et personfradrag på {personfradrag} kr for {yr}, og det er kapitalindkomst, som dette fradrag (brugt som frikort) opsluger. En fond uden for listen kan derfor få sin kapitalindkomst beskattet meget lidt, eller slet ikke, inden for fradraget. En fond på listen, der beskattes som aktieindkomst, får intet personfradrag, så barnet betaler {aktieLow}% fra første krone, og frikort-tricket holder op med at virke for den.",
      "art_pos_h2_isin":"Det gælder pr. ISIN, ikke pr. fond",
      "art_pos_isin_p1":"Listen virker pr. ISIN (den entydige identifikator for én bestemt andelsklasse), ikke pr. fondsfamilie. En enkelt fond kan have flere andelsklasser: akkumulerende (ACC) og udloddende (DIST), valutaafdækket og ikke-afdækket, og hver har sit eget ISIN. At den ikke-afdækkede klasse er på listen, siger intet om den afdækkede klasse.",
      "art_pos_isin_p2":"Tjek altid det præcise ISIN på den andelsklasse, du faktisk vil købe, før du køber. Du kan indsætte det direkte i ISIN-tjekkeren på Tjek en fond-siden.",
      "art_pos_h2_timing":"Hvordan og hvornår listen ændrer sig",
      "art_pos_timing_p":"SKAT offentliggør listen omkring 15. december for det kommende år og kan ændre den i løbet af året. Fonde tilføjes og fjernes, hvilket vender en fonds skat fra én januar til den næste. En fond, du købte som aktieindkomst på listen, kan blive til kapitalindkomst uden for listen året efter (eller omvendt), uden at du gør noget.",
      "art_pos_h2_scen":"To hurtige scenarier",
      "art_pos_scen_note":"Kun til illustration. De beskriver mekanismen, ikke en påstand om, at en bestemt fond har skiftet status. Bekræft altid den aktuelle liste selv.",
      "art_pos_scen1_t":"En fond ryger af listen",
      "art_pos_scen1_p":"Antag at en verdens-ETF, du ejer, er på listen i år, og SKAT fjerner den til december. Fra 1. januar skifter dens årlige gevinst i et almindeligt depot fra aktieindkomst til kapitalindkomst, og den kan ikke længere ligge i en ASK. En voksen, der har den i en ASK, ville typisk sælge den der og købe en stadig-listet verdens-ETF i stedet (en intern ASK-handel bruger ikke af dit indskudsloft). For et barns frikort-depot er fjernelsen ofte fin, endda bedre, fordi kapitalindkomst er præcis det, fradraget opsluger.",
      "art_pos_scen2_t":"En fond kommer på listen",
      "art_pos_scen2_p":"Nu det omvendte: en akkumulerende verdens-ETF uden for listen, som et barn ejer for frikortets skyld, kommer på til december. Fra januar bliver dens gevinst til aktieindkomst uden personfradrag, så barnet betaler {aktieLow}% fra første krone. Løsningen er at rette barnets nye indbetalinger mod en fond, der stadig er uden for listen. For en voksen er den samme ændring godt nyt: fonden er nu billigere og kan komme i en ASK.",
      "art_pos_h2_habit":"Din årlige vane",
      "art_pos_habit_p":"Hver december eller januar, og før ethvert nyt køb, slå den præcise ISIN op for hver fond, du ejer eller planlægger at købe, på skat.dk. Hvis en beholdning har skiftet status, så notér dens nye skat og spørg en advokat eller revisor før større ændringer.",
      "art_pos_ta_h":"Hovedpointer",
      "art_pos_ta1":"Positivlisten (ABIS-listen) afgør, om en fonds gevinster er aktieindkomst ({aktieLow}/{aktieHigh}%) eller kapitalindkomst (~{kapLow}-{kapHigh}%).",
      "art_pos_ta2":"På listen er normalt bedst for en voksen og må ligge i en ASK; uden for listen er ofte bedst for et barns frikort og må ikke.",
      "art_pos_ta3":"Det gælder pr. ISIN, så hver andelsklasse er forskellig, så tjek den præcise.",
      "art_pos_ta4":"Listen ændres omkring 15. december og kan ændres midt på året, så tjek igen før hvert køb.",
      "art_pos_cta_check":"Tjek en fonds ISIN",
      "art_pos_cta_router":"Se den routede rækkefølge",
      "art_pos_skat":"Åbn den aktuelle positivliste på skat.dk →",
      "art_pos_disc":"Dette er en undervisende forklaring skrevet af en privatperson, ikke skatte-, juridisk eller investeringsrådgivning. Beløb gælder skatteåret {yr} og ændrer sig, når loven og listen ændrer sig. Bekræft den aktuelle positivliste på skat.dk, og spørg en advokat eller revisor, før du handler på noget her.",
      "art_pos_back":"← Tilbage til Lær",
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
      askRate: Math.round(cfg.askRate * 100),
      aktieThr: nfmt(cfg.aktieThreshold),
      aktieThrM: nfmt(cfg.aktieThresholdMarried),
      personfradrag: nfmt(cfg.personfradrag)
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
