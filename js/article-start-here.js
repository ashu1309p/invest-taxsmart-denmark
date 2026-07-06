/* ============================================================
   Article controller: learn-start-here.html (Beginner 101)
   ------------------------------------------------------------
   Dependency-free, no build. Loaded after js/config.js, js/tax.js and
   js/i18n.js. Holds this article's PAGE_I18N (namespace art_sh_* / gb_*),
   merges onto I18N_BASE, runs the shared render pass, and drives the
   one-slider compound-growth mini-chart.

   The mini-chart REUSES the shared engine: simulateWrapper('onlist', …)
   from js/tax.js (an on-list fund in an ordinary depot, tax paid yearly).
   No tax math is defined in this file. Every kr amount is interpolated
   from TAX_YEAR_CONFIG and the copy carries the tax-year tag.
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
      "art_sh_kicker":"Learn · Beginner 101",
      "art_sh_h1":"Never invested before? Start here",
      "art_sh_lead":"Ten minutes, no jargon left unexplained. What you are actually buying, why the account you use decides the tax, the three Danish rules that matter, and exactly what to do in your first hour.",
      "art_sh_taxyear":"Tax year {yr}",
      "art_sh_verifiedNote":"Every amount below is for this tax year.",
      "art_sh_h2_buy":"What you're actually buying",
      "art_sh_buy_p1":"A share [aktie] is a tiny slice of one company. A fund is a basket that owns thousands of those slices at once; an ETF [exchange-traded fund] is simply a fund you can buy like a share. When you buy one unit of a world fund, you own a sliver of roughly 1,500+ companies across the planet.",
      "art_sh_buy_p2":"That is why beginners are usually told to start with one broad world fund instead of picking companies: no single company's bad year can sink you, and there is nothing to monitor daily. The other half of the magic is time. Returns earn returns of their own - compounding [renters rente] - and the curve bends upward the longer you stay in. Try it:",
      "gb_lab":"Save 1,000 kr a month - for how many years?",
      "gb_aria":"Years of saving",
      "gb_legDep":"What you put in",
      "gb_legVal":"What it grows to",
      "gb_readout":"After {n} years: you put in {dep} kr, it is worth ≈ {val} kr - the extra {gain} kr is growth (after yearly tax).",
      "gb_note":"Generic illustration: a steady ~6.5%/yr average return in a fund ON the positivliste in an ordinary depot, tax paid yearly, no fees or inflation. Real markets swing year to year.",
      "gb_yearsUnit":"years",
      "art_sh_h2_acct":"The account decides the tax",
      "art_sh_acct_p1":"Before you buy anything, you choose which account [wrapper] the money sits in - and in Denmark that choice, not the fund itself, largely decides how your gains are taxed. The same fund can be taxed three different ways depending on where it lives. These are the four homes:",
      "art_sh_home1_t":"Børneopsparing [child savings account]",
      "art_sh_home1_d":"0% tax on everything, forever - but tiny caps ({boY} kr/yr, {boL} kr lifetime) and child-only.",
      "art_sh_home2_t":"Aktiesparekonto (ASK) [share savings account]",
      "art_sh_home2_d":"A flat {askR}% of each year's gain, deposit ceiling {askC} kr ({yr}) - the cheapest unlimited-purpose wrapper for adults.",
      "art_sh_home3_t":"Depot [ordinary brokerage account] + off-list fund",
      "art_sh_home3_d":"Taxed as kapitalindkomst [capital income] ~37-42% - but a child's personfradrag [tax-free allowance] ({pf} kr, {yr}) can absorb it, the “frikort trick”.",
      "art_sh_home4_t":"Depot + on-list fund",
      "art_sh_home4_d":"Taxed as aktieindkomst [share income]: 27% up to {aktieT} kr of yearly gain, 42% above. No ceiling - the adult workhorse.",
      "art_sh_acct_link":"Read the full account explainer: ASK vs depot vs børneopsparing →",
      "art_sh_h2_rules":"The three Danish rules that matter",
      "art_sh_rule1_t":"When you pay: lager vs realisation",
      "art_sh_rule1_p":"Most funds here are taxed lager [mark-to-market]: you pay tax on each year's paper gain even if you sell nothing. Single stocks (and some Danish funds) are realisation-taxed: you pay only when you sell. This changes how fast your money compounds.",
      "art_sh_rule1_link":"Read: lager vs realisation →",
      "art_sh_rule2_t":"Which tax: the positivliste decides",
      "art_sh_rule2_p":"SKAT keeps an official list of approved equity funds, the positivliste. On the list → aktieindkomst [share income] 27/42%. Off the list → kapitalindkomst [capital income] ~37-42%. Every share class has its own ISIN [fund ID code], and the list works per ISIN.",
      "art_sh_rule2_link":"Check any fund's ISIN in 10 seconds →",
      "art_sh_rule3_t":"For children: the frikort and gift rules",
      "art_sh_rule3_p":"A child's personfradrag [tax-free allowance] ({pf} kr, {yr}) can soak up fund gains - but dividends on parent-gifted money are taxed at the PARENT until 18, and gifts above {giftCap} kr per giver per year ({yr}) trigger gift tax. The safe pattern: accumulating funds only, and mind the caps.",
      "art_sh_rule3_link":"Read: gifts to children, the tax-free way →",
      "art_sh_h2_hour":"Your first hour, step by step",
      "art_sh_hour_p":"No fund names here on purpose - this site never recommends specific funds. The generic categories are enough to act on:",
      "art_sh_step1":"Pick a broker or your bank's investing platform. Compare costs on two things: what a purchase costs [kurtage] and any yearly custody fee. For monthly small amounts, low or zero purchase fees matter most.",
      "art_sh_step2":"Open the right account type BEFORE buying: an aktiesparekonto (ASK) or an ordinary depot for yourself; for a child, see the Money Router's child mode for the typical order.",
      "art_sh_step3":"Choose your fund CATEGORY: one broad, accumulating world index fund is the classic beginner core. Then verify the exact ISIN of the share class you intend to buy on the Check a fund page - its list status decides the tax.",
      "art_sh_step4":"Set up an automatic monthly transfer, even a small one. Regularity beats timing: you buy in good months and bad, and never wait in cash for a “better moment”.",
      "art_sh_step5":"Once a year (December/January): re-check your fund's ISIN against the fresh positivliste and note the new year's amounts. That is the whole maintenance job.",
      "art_sh_h2_try":"Now try it",
      "art_sh_cta_plan":"Route your first kroner: the Money Router",
      "art_sh_cta_play":"Race the four tax homes",
      "art_sh_ta_h":"Key takeaways",
      "art_sh_ta1":"One broad world fund + time does the heavy lifting; picking stocks is optional spice, not the foundation.",
      "art_sh_ta2":"The account decides the tax: børneopsparing 0%, ASK flat {askR}%, depot 27/42% or ~37-42% depending on the fund's list status.",
      "art_sh_ta3":"Verify the exact ISIN before every purchase - the positivliste works per share class.",
      "art_sh_ta4":"Children: accumulating funds only, and respect the {giftCap} kr per-giver gift cap ({yr}).",
      "art_sh_disc":"This is an educational explainer written by a private individual, not tax, legal or investment advice - and never a fund recommendation. Amounts are for tax year {yr} and change every January. Verify with skat.dk, and ask an advokat or revisor before acting on anything here.",
      "art_sh_back":"← Back to Learn",
      "i18nReady":"i18n complete"
    },
    da: {
      "skipLink":"Spring til indhold",
      "ariaLangGroup":"Sprog",
      "ariaDisclaimer":"Vigtig ansvarsfraskrivelse",
      "ariaDismiss":"Afvis",
      "bigDisclaimer":"Dette site er et undervisningsværktøj lavet af en privatperson. Det er ikke skatte-, juridisk eller investeringsrådgivning, gemmer ingen persondata og kan være forældet dagen efter en lovændring. Beløb gælder det angivne skatteår og reguleres hver januar; positivlisten [SKATs godkendte fonde] ændres hver december. Bekræft på skat.dk eller spørg en advokat/revisor før du handler.",
      "stickyBar":"Kun til undervisning, ikke skatte-, juridisk eller investeringsrådgivning.",
      "art_sh_kicker":"Lær · Begynder 101",
      "art_sh_h1":"Aldrig investeret før? Start her",
      "art_sh_lead":"Ti minutter, ingen uforklarede fagord. Hvad du faktisk køber, hvorfor kontoen du bruger afgør skatten, de tre danske regler der betyder noget, og præcis hvad du skal gøre i din første time.",
      "art_sh_taxyear":"Skatteår {yr}",
      "art_sh_verifiedNote":"Alle beløb nedenfor gælder dette skatteår.",
      "art_sh_h2_buy":"Hvad du faktisk køber",
      "art_sh_buy_p1":"En aktie er en lillebitte del af ét selskab. En fond er en kurv, der ejer tusindvis af de dele på én gang; en ETF (børshandlet fond) er blot en fond, du kan købe som en aktie. Når du køber én andel i en verdensfond, ejer du en flig af cirka 1.500+ selskaber over hele kloden.",
      "art_sh_buy_p2":"Derfor får begyndere som regel rådet at starte med én bred verdensfond i stedet for at plukke selskaber: intet enkelt selskabs dårlige år kan vælte dig, og der er intet at overvåge dagligt. Den anden halvdel af magien er tid. Afkast giver deres egne afkast - renters rente - og kurven bøjer opad, jo længere du bliver. Prøv selv:",
      "gb_lab":"Spar 1.000 kr op om måneden - i hvor mange år?",
      "gb_aria":"Antal opsparingsår",
      "gb_legDep":"Det du lægger ind",
      "gb_legVal":"Det det vokser til",
      "gb_readout":"Efter {n} år: du har lagt {dep} kr ind, det er cirka {val} kr værd - de ekstra {gain} kr er vækst (efter årlig skat).",
      "gb_note":"Generisk illustration: et jævnt gennemsnitsafkast på ~6,5%/år i en fond PÅ positivlisten i et almindeligt depot, skat betalt årligt, ingen gebyrer eller inflation. Rigtige markeder svinger år for år.",
      "gb_yearsUnit":"år",
      "art_sh_h2_acct":"Kontoen afgør skatten",
      "art_sh_acct_p1":"Før du køber noget, vælger du hvilken konto (indpakning) pengene ligger i - og i Danmark er det i høj grad dét valg, ikke fonden selv, der afgør hvordan dine gevinster beskattes. Den samme fond kan beskattes på tre forskellige måder afhængigt af, hvor den bor. Her er de fire hjem:",
      "art_sh_home1_t":"Børneopsparing",
      "art_sh_home1_d":"0% skat af alt, altid - men små lofter ({boY} kr/år, {boL} kr i alt) og kun for børn.",
      "art_sh_home2_t":"Aktiesparekonto (ASK)",
      "art_sh_home2_d":"Flade {askR}% af årets gevinst, indskudsloft {askC} kr ({yr}) - den billigste indpakning til frie midler for voksne.",
      "art_sh_home3_t":"Depot (almindelig handelskonto) + fond uden for listen",
      "art_sh_home3_d":"Beskattes som kapitalindkomst ~37-42% - men et barns personfradrag ({pf} kr, {yr}) kan opsuge det, “frikort-tricket”.",
      "art_sh_home4_t":"Depot + fond på listen",
      "art_sh_home4_d":"Beskattes som aktieindkomst: 27% op til {aktieT} kr af årets gevinst, 42% derover. Intet loft - voksnes arbejdshest.",
      "art_sh_acct_link":"Læs hele konto-forklaringen: ASK vs depot vs børneopsparing →",
      "art_sh_h2_rules":"De tre danske regler, der betyder noget",
      "art_sh_rule1_t":"Hvornår du betaler: lager vs realisation",
      "art_sh_rule1_p":"De fleste fonde her lagerbeskattes: du betaler skat af årets papirgevinst, selv om du intet sælger. Enkeltaktier (og nogle danske fonde) er realisationsbeskattede: du betaler først, når du sælger. Det ændrer, hvor hurtigt dine penge forrentes.",
      "art_sh_rule1_link":"Læs: lager vs realisation →",
      "art_sh_rule2_t":"Hvilken skat: positivlisten afgør",
      "art_sh_rule2_p":"SKAT fører en officiel liste over godkendte aktiefonde, positivlisten. På listen → aktieindkomst 27/42%. Uden for listen → kapitalindkomst ~37-42%. Hver andelsklasse har sit eget ISIN (fondens ID-kode), og listen virker pr. ISIN.",
      "art_sh_rule2_link":"Tjek en fonds ISIN på 10 sekunder →",
      "art_sh_rule3_t":"For børn: frikortet og gavereglerne",
      "art_sh_rule3_p":"Et barns personfradrag ({pf} kr, {yr}) kan opsuge fondsgevinster - men udbytte af forældre-givne penge beskattes hos FORÆLDEREN indtil 18 år, og gaver over {giftCap} kr pr. giver pr. år ({yr}) udløser gaveafgift. Det sikre mønster: kun akkumulerende fonde, og hold øje med lofterne.",
      "art_sh_rule3_link":"Læs: gaver til børn, den skattefri måde →",
      "art_sh_h2_hour":"Din første time, trin for trin",
      "art_sh_hour_p":"Ingen fondsnavne her, med vilje - dette site anbefaler aldrig konkrete fonde. De generiske kategorier er nok at handle på:",
      "art_sh_step1":"Vælg en broker eller din banks investeringsplatform. Sammenlign omkostninger på to ting: hvad et køb koster (kurtage) og et eventuelt årligt depotgebyr. Ved små månedlige beløb betyder lave eller ingen købsgebyrer mest.",
      "art_sh_step2":"Opret den rigtige kontotype FØR du køber: en aktiesparekonto (ASK) eller et almindeligt depot til dig selv; for et barn, se Pengerouterens barne-tilstand for den typiske rækkefølge.",
      "art_sh_step3":"Vælg din fonds-KATEGORI: én bred, akkumulerende verdensindeksfond er den klassiske begynder-kerne. Tjek derefter den præcise ISIN på den andelsklasse, du vil købe, på Tjek en fond-siden - dens listestatus afgør skatten.",
      "art_sh_step4":"Opret en automatisk månedlig overførsel, også en lille. Regelmæssighed slår timing: du køber i gode måneder og dårlige, og venter aldrig i kontanter på et “bedre tidspunkt”.",
      "art_sh_step5":"Én gang om året (december/januar): tjek din fonds ISIN mod den friske positivliste igen og notér det nye års beløb. Det er hele vedligeholdelsen.",
      "art_sh_h2_try":"Prøv det nu",
      "art_sh_cta_plan":"Rutér dine første kroner: Pengerouteren",
      "art_sh_cta_play":"Lad de fire skattemiljøer kappes",
      "art_sh_ta_h":"Hovedpointer",
      "art_sh_ta1":"Én bred verdensfond + tid gør det tunge arbejde; aktiepluk er valgfrit krydderi, ikke fundamentet.",
      "art_sh_ta2":"Kontoen afgør skatten: børneopsparing 0%, ASK flade {askR}%, depot 27/42% eller ~37-42% afhængigt af fondens listestatus.",
      "art_sh_ta3":"Tjek den præcise ISIN før hvert køb - positivlisten virker pr. andelsklasse.",
      "art_sh_ta4":"Børn: kun akkumulerende fonde, og respektér gaveloftet på {giftCap} kr pr. giver ({yr}).",
      "art_sh_disc":"Dette er en undervisende forklaring skrevet af en privatperson, ikke skatte-, juridisk eller investeringsrådgivning - og aldrig en fondsanbefaling. Beløb gælder skatteåret {yr} og ændres hver januar. Bekræft på skat.dk, og spørg en advokat eller revisor, før du handler på noget her.",
      "art_sh_back":"← Tilbage til Lær",
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
      boY: nfmt(cfg.boYearlyCap), boL: nfmt(cfg.boLifetimeCap),
      askR: Math.round(cfg.askRate * 100), askC: nfmt(cfg.askCeiling),
      pf: nfmt(cfg.personfradrag),
      aktieT: nfmt(cfg.aktieThreshold),
      giftCap: nfmt(cfg.giftCapPerGiver)
    };
  }
  function fill(str, map){ return String(str).replace(/\{(\w+)\}/g, function(_, k){ return map[k] !== undefined ? map[k] : "{" + k + "}"; }); }
  function t(key){
    if (I18N[lang] && I18N[lang][key] !== undefined) return I18N[lang][key];
    if (I18N.en[key] !== undefined) return I18N.en[key];
    return key;
  }

  /* ---------- compound-growth mini-chart (engine: simulateWrapper from js/tax.js) ---------- */
  var gbYears = 15;
  var GB_MONTHLY = 1000;                       // fixed, generic (not a year-indexed amount)
  var GB_RATE = RISK_PRESETS.balanced;         // ~6.5%/yr, same preset as the tools
  function renderChart(){
    var host = $("gb-chart"); if(!host) return;
    var sim = simulateWrapper('onlist', { annualDeposit: GB_MONTHLY*12, years: gbYears, returnRate: GB_RATE, isChild: false }, cfg);
    var W=640, H=200, padL=8, padR=8, padT=16, padB=20;
    var plotW=W-padL-padR, plotH=H-padT-padB;
    var maxV = sim.endValue || 1;
    function pt(y, v){ return (padL + y/gbYears*plotW).toFixed(1) + "," + (padT + plotH - (v/maxV)*plotH).toFixed(1); }
    var valPts = sim.series.map(function(s){ return pt(s.year, s.total); }).join(" ");
    var depPts = sim.series.map(function(s){ return pt(s.year, s.year*GB_MONTHLY*12); }).join(" ");
    var deposited = gbYears*GB_MONTHLY*12;
    var axis = '<line x1="'+padL+'" y1="'+(padT+plotH)+'" x2="'+(W-padR)+'" y2="'+(padT+plotH)+'" stroke="#DBE2EB" stroke-width="1"></line>' +
      '<text x="'+padL+'" y="'+(H-6)+'" font-size="10" fill="#64748B">0</text>' +
      '<text x="'+(W-padR)+'" y="'+(H-6)+'" font-size="10" fill="#64748B" text-anchor="end">'+gbYears+' '+t("gb_yearsUnit")+'</text>';
    var readout = fill(t("gb_readout"), { n: gbYears, dep: nfmt(deposited), val: nfmt(sim.endValue), gain: nfmt(sim.endValue - deposited) });
    host.innerHTML = '<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="'+readout.replace(/"/g,"&quot;")+'">' + axis +
      '<polyline points="'+depPts+'" fill="none" stroke="#94A3B8" stroke-width="2.5" stroke-dasharray="5 4"></polyline>' +
      '<polyline points="'+valPts+'" fill="none" stroke="#0F766E" stroke-width="3"></polyline>' +
      '</svg>';
    var ro = $("gb-readout"); if(ro) ro.innerHTML = readout;
    var out = $("gb-out"); if(out) out.textContent = gbYears + " " + t("gb_yearsUnit");
  }
  (function initSlider(){
    var sl = $("gb-years"); if(!sl) return;
    function syncFill(){ sl.style.setProperty("--fill", ((sl.value-sl.min)/(sl.max-sl.min)*100)+"%"); }
    sl.addEventListener("input", function(){ gbYears = +sl.value; syncFill(); renderChart(); });
    syncFill();
  })();

  function renderStrings(){
    document.documentElement.lang = lang;
    var map = numMap();
    document.querySelectorAll("[data-i18n]").forEach(function(el){
      var v = t(el.getAttribute("data-i18n"));
      if (typeof v === "string") el.textContent = fill(v, map);
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function(el){ el.setAttribute("aria-label", fill(t(el.getAttribute("data-i18n-aria")), map)); });
    var en = $("lang-en"), da = $("lang-da");
    if (en) en.classList.toggle("active", lang === "en");
    if (da) da.classList.toggle("active", lang === "da");
    renderChart();
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
    if (r.ok) { b.textContent = "✓ " + t("i18nReady"); }
    else { b.textContent = "⚠ i18n: " + r.missingInDa.concat(r.missingInEn).join(", "); b.classList.add("fail"); }
  })();
})();
