/* ============================================================
   Quiz controller: quiz.html - the Trap Gallery
   ------------------------------------------------------------
   Dependency-free, no build. Loaded after js/i18n.js. A card-based
   "which statement is correct?" quiz: 8 scenarios, one per card, each
   revealing the rule + fix and linking the relevant existing article.

   Score is kept in memory only (no backend, no localStorage beyond the
   shared language key). "Share your score" copies a text line to the
   clipboard. Every rule text is lifted from the matching article's own
   wording (learn-positivliste / learn-gifts-to-children /
   learn-lager-vs-realisation / learn-ask-depot-bo / learn-start-here),
   not restated from memory.

   The CORRECT answer index lives here in TRAPS, never in the i18n dict,
   so a translation can reorder wording without ever desyncing which
   option is right. Options are stored as arrays under q_<id>_opts.
   ============================================================ */
(function () {
  var GLOBAL_KEY = "dkie_global_v1";   // lang shared across pages

  /* correct = index into the q_<id>_opts array; href = the article the reveal links to.
     Correct indices are deliberately spread (1,0,1,2,0,1,2,0) so there is no positional tell. */
  var TRAPS = [
    { id:"distKid",       correct:1, href:"learn-gifts-to-children.html" },
    { id:"onlistFrikort", correct:0, href:"learn-positivliste.html" },
    { id:"offlistAsk",    correct:1, href:"learn-ask-depot-bo.html" },
    { id:"cashKid",       correct:2, href:"learn-gifts-to-children.html" },
    { id:"jointGift",     correct:0, href:"learn-gifts-to-children.html" },
    { id:"stopLoss",      correct:1, href:"learn-lager-vs-realisation.html" },
    { id:"waitDip",       correct:2, href:"learn-start-here.html" },
    { id:"bankReport",    correct:0, href:"learn-gifts-to-children.html" }
  ];

  var PAGE_I18N = {
    en: {
      "skipLink":"Skip to content",
      "ariaLangGroup":"Language",
      "ariaDisclaimer":"Important disclaimer",
      "ariaDismiss":"Dismiss",
      "bigDisclaimer":"This site is an educational tool built by a private individual. It is not tax, legal or investment advice, it stores no personal data, and it can be outdated the day after a law changes. Amounts are for the tagged tax year, adjusted every January; the positivliste [SKAT’s fund list] changes every December. Verify with skat.dk or ask an advokat/revisor before acting.",
      "stickyBar":"Educational only, not tax, legal or investment advice.",
      "quizKicker":"Learn · Quiz",
      "quizH1":"The Trap Gallery",
      "quizLead":"Eight everyday setups, each with one quiet Danish-tax trap. Spot the right call, then see the rule and the fix. No score is stored anywhere.",
      "quizAsk":"Which statement is correct?",
      "quizStart":"Card {n} of {total}",
      "quizPickPrompt":"Tap the statement you think is right.",
      "quizCorrect":"Correct",
      "quizWrong":"Not quite",
      "quizReadMore":"Read the full rule →",
      "quizNext":"Next card →",
      "quizSeeResult":"See my score →",
      "quizResultH":"Your score",
      "quizResultScore":"{s} / {n} traps spotted",
      "quizResult3":"Nicely done - you can smell a Danish-tax trap coming.",
      "quizResult2":"Solid. A couple of these catch almost everyone.",
      "quizResult1":"Good start - the reveals are where the learning is. Try again?",
      "quizShare":"Copy my score",
      "quizShared":"Copied to clipboard ✓",
      "quizRestart":"Play again",
      "quizShareText":"I spotted {s}/{n} Danish investment-tax traps in the Trap Gallery. Can you beat it? {url}",
      "quizToPlan":"Put it into practice: the Money Router",

      "q_distKid_scenario":"A parent gifts money to their child and buys a DISTRIBUTING (DIST) world ETF in the child's own depot.",
      "q_distKid_opts":[
        "Fine - the dividends and the gains are all taxed at the child.",
        "Trap: dividends on parent-gifted money are taxed at the PARENT until the child turns 18, and the bank doesn't report it. Use an ACCUMULATING (ACC) fund instead.",
        "Distributing funds simply aren't allowed in a child's depot."
      ],
      "q_distKid_reveal":"Interest and dividends on parent-gifted money are taxed at the parent until the year the child turns 18, and the bank does not report this for you, so you would have to self-declare it. Annual value gains on accumulating fund units, by contrast, are taxed at the child - which is the whole reason a child's gifted savings belong in accumulating funds, never distributing ones.",

      "q_onlistFrikort_scenario":"To use a child's frikort, a parent puts an ON-list world ETF in the child's depot, expecting the personfradrag to wipe out the tax.",
      "q_onlistFrikort_opts":[
        "Trap: an on-list fund is share income (aktieindkomst) with NO personfradrag relief, so the child pays 27% from the first krone. It's an OFF-list accumulating fund the frikort absorbs.",
        "Correct setup - the personfradrag covers the yearly gain, so 0% tax.",
        "On-list funds can't be held in a child's account at all."
      ],
      "q_onlistFrikort_reveal":"An on-list fund is taxed as aktieindkomst [share income], and the personfradrag [tax-free allowance] does NOT offset it, so the child pays 27% from the very first krone. It is capital income - an off-list fund's kapitalindkomst - that the frikort absorbs, which is why the child's frikort bucket wants an off-list accumulating fund.",

      "q_offlistAsk_scenario":"An adult wants to hold an OFF-list accumulating world ETF inside their Aktiesparekonto (ASK).",
      "q_offlistAsk_opts":[
        "Fine - any fund you like can go inside an ASK.",
        "Trap: off-list funds are NOT ASK-eligible. Only stocks and funds ON the positivliste are allowed in an ASK.",
        "It works, but the ASK then taxes it at 42%."
      ],
      "q_offlistAsk_reveal":"Only stocks and funds on the positivliste are allowed inside an ASK; off-list funds cannot sit there. An ASK is taxed lager at a flat 17% a year - but that wrapper is simply not available for an off-list fund, so an off-list holding lives in an ordinary depot instead.",

      "q_cashKid_scenario":"Grandparents gift a child some money, and the family leaves it sitting in the child's bank savings account for years, 'until they're older'.",
      "q_cashKid_opts":[
        "Smart and safe - cash can't fall in value.",
        "No problem - interest on a child's bank account is always tax-free.",
        "Trap: idle cash earns taxable interest and misses years of compounding. Gifted savings belong in a børneopsparing and then accumulating funds, not idle cash."
      ],
      "q_cashKid_reveal":"A child's gifted savings belong in accumulating funds, never in idle cash or distributing funds that throw off interest or dividends. Cash also skips the compounding that does the heavy lifting over a long horizon: most families fill a børneopsparing (0%, but capped) first, then keep going in the child's own depot.",

      "q_jointGift_scenario":"Two parents give their child the yearly maximum. They transfer it from their JOINT account, write no gavebrev, and add a condition by text message a week later.",
      "q_jointGift_opts":[
        "Trap: move the money from each giver's OWN account with a gavebrev signed BEFORE the transfer. Conditions only count if they exist at or before the gift - never added afterwards.",
        "Fine - it's under the combined cap, so the paperwork doesn't matter.",
        "Invalid - a gavebrev has to be notarised to count."
      ],
      "q_jointGift_reveal":"In practice: one gavebrev per giver, per child, per year, signed before the first transfer, with the money moving from the giver's own account (not a joint one) and labelled with giver, recipient and year. No notary or special form is required, but any conditions only count if they exist at or before the moment of the gift, never added afterwards.",

      "q_stopLoss_scenario":"An investor sets stop-loss sell orders on a lager-taxed ETF, hoping to 'avoid the tax on paper gains'.",
      "q_stopLoss_opts":[
        "Good plan - selling before year-end sidesteps the lager tax.",
        "Trap: lager taxes the yearly change in value whether or not you sell, so the stop-loss doesn't defer it - it just locks in the loss (and can waste a child's frikort year).",
        "Stop-loss orders aren't allowed on ETFs in Denmark."
      ],
      "q_stopLoss_reveal":"Lager [mark-to-market] means you are taxed on the increase in value each year, whether you sold anything or not. A stop-loss sale doesn't change that year's lager bill; it only realises the loss. For a child, a loss year also wastes that year's frikort allowance, which cannot be carried forward.",

      "q_waitDip_scenario":"A beginner keeps every month's savings in cash, waiting for a market dip before finally investing.",
      "q_waitDip_opts":[
        "Sensible - you should never buy at the top.",
        "You have to invest a big lump sum or not bother at all.",
        "Trap: timing the market rarely beats regularity. An automatic monthly transfer buys in good months and bad, and cash left waiting misses the compounding."
      ],
      "q_waitDip_reveal":"Set up an automatic monthly transfer, even a small one. Regularity beats timing: you buy in good months and bad, and never wait in cash for a 'better moment'. Cash sitting on the sidelines also misses the compounding that bends the curve upward the longer you stay invested.",

      "q_bankReport_scenario":"A parent assumes the bank will automatically report and settle the tax on dividends from the child's parent-gifted fund.",
      "q_bankReport_opts":[
        "Trap: the bank does NOT report parent-attributed dividends for you - you must self-declare them. Another reason to use accumulating funds, which pay no dividend.",
        "Right - banks report everything to SKAT automatically.",
        "Dividends under 1,000 kr never need to be declared."
      ],
      "q_bankReport_reveal":"Dividends on parent-gifted money are taxed at the parent until the child turns 18, and the bank does not report this for you, so you would have to self-declare it. Accumulating funds pay nothing out, so there is no dividend for the rule to catch and nothing to self-declare - the safe construction for a child's account.",

      "i18nReady":"i18n complete"
    },
    da: {
      "skipLink":"Spring til indhold",
      "ariaLangGroup":"Sprog",
      "ariaDisclaimer":"Vigtig ansvarsfraskrivelse",
      "ariaDismiss":"Afvis",
      "bigDisclaimer":"Dette site er et undervisningsværktøj lavet af en privatperson. Det er ikke skatte-, juridisk eller investeringsrådgivning, gemmer ingen persondata og kan være forældet dagen efter en lovændring. Beløb gælder det angivne skatteår og reguleres hver januar; positivlisten [SKATs godkendte fonde] ændres hver december. Bekræft på skat.dk eller spørg en advokat/revisor før du handler.",
      "stickyBar":"Kun til undervisning, ikke skatte-, juridisk eller investeringsrådgivning.",
      "quizKicker":"Lær · Quiz",
      "quizH1":"Fælde-galleriet",
      "quizLead":"Otte helt almindelige opsætninger, hver med én stille dansk skattefælde. Find det rigtige valg, og se så reglen og løsningen. Ingen score gemmes nogen steder.",
      "quizAsk":"Hvilket udsagn er rigtigt?",
      "quizStart":"Kort {n} af {total}",
      "quizPickPrompt":"Tryk på det udsagn, du tror er rigtigt.",
      "quizCorrect":"Rigtigt",
      "quizWrong":"Ikke helt",
      "quizReadMore":"Læs hele reglen →",
      "quizNext":"Næste kort →",
      "quizSeeResult":"Se min score →",
      "quizResultH":"Din score",
      "quizResultScore":"{s} / {n} fælder fanget",
      "quizResult3":"Flot - du kan lugte en dansk skattefælde på lang afstand.",
      "quizResult2":"Solidt. Et par af dem fanger næsten alle.",
      "quizResult1":"God start - det er i forklaringerne, læringen ligger. Prøv igen?",
      "quizShare":"Kopiér min score",
      "quizShared":"Kopieret ✓",
      "quizRestart":"Spil igen",
      "quizShareText":"Jeg fangede {s}/{n} danske investeringsskat-fælder i Fælde-galleriet. Kan du slå det? {url}",
      "quizToPlan":"Før det ud i livet: Pengerouteren",

      "q_distKid_scenario":"En forælder giver sit barn penge og køber en UDLODDENDE (DIST) verdens-ETF i barnets eget depot.",
      "q_distKid_opts":[
        "Fint - både udbytter og gevinster beskattes hos barnet.",
        "Fælde: udbytte af forældregivne penge beskattes hos FORÆLDEREN, indtil barnet fylder 18, og banken indberetter det ikke. Brug en AKKUMULERENDE (ACC) fond i stedet.",
        "Udloddende fonde er simpelthen ikke tilladt i et barns depot."
      ],
      "q_distKid_reveal":"Renter og udbytter af forældregivne penge beskattes hos forælderen, indtil det år barnet fylder 18, og banken indberetter det ikke for dig, så du selv skal oplyse det. Årlige værdistigninger på akkumulerende fondsandele beskattes derimod hos barnet - det er hele grunden til, at et barns gaveopsparing hører hjemme i akkumulerende fonde, aldrig udloddende.",

      "q_onlistFrikort_scenario":"For at bruge et barns frikort lægger en forælder en verdens-ETF PÅ listen i barnets depot og forventer, at personfradraget fjerner skatten.",
      "q_onlistFrikort_opts":[
        "Fælde: en fond på listen er aktieindkomst UDEN personfradrag, så barnet betaler 27% fra første krone. Det er en akkumulerende fond UDEN FOR listen, frikortet opsuger.",
        "Rigtig opsætning - personfradraget dækker årets gevinst, så 0% skat.",
        "Fonde på listen må slet ikke ligge i et barns konto."
      ],
      "q_onlistFrikort_reveal":"En fond på listen beskattes som aktieindkomst, og personfradraget modregnes IKKE, så barnet betaler 27% fra første krone. Det er kapitalindkomst - en fond uden for listens kapitalindkomst - som frikortet opsuger, og derfor vil barnets frikort-spand have en akkumulerende fond uden for listen.",

      "q_offlistAsk_scenario":"En voksen vil have en akkumulerende verdens-ETF UDEN FOR listen i sin Aktiesparekonto (ASK).",
      "q_offlistAsk_opts":[
        "Fint - enhver fond, du vil, kan ligge i en ASK.",
        "Fælde: fonde uden for listen er IKKE ASK-egnede. Kun aktier og fonde PÅ positivlisten må ligge i en ASK.",
        "Det virker, men så beskatter ASK'en den med 42%."
      ],
      "q_offlistAsk_reveal":"Kun aktier og fonde på positivlisten må ligge i en ASK; fonde uden for listen kan ikke. En ASK lagerbeskattes med flade 17% om året - men den indpakning er simpelthen ikke til rådighed for en fond uden for listen, så en sådan beholdning ligger i et almindeligt depot i stedet.",

      "q_cashKid_scenario":"Bedsteforældre giver et barn nogle penge, og familien lader dem ligge på barnets bankopsparing i årevis, 'til barnet bliver ældre'.",
      "q_cashKid_opts":[
        "Klogt og sikkert - kontanter kan ikke falde i værdi.",
        "Intet problem - renter på et barns bankkonto er altid skattefri.",
        "Fælde: kontanter giver skattepligtige renter og misser års renters rente. Gaveopsparing hører hjemme i en børneopsparing og derefter akkumulerende fonde, ikke kontanter."
      ],
      "q_cashKid_reveal":"Et barns gaveopsparing hører hjemme i akkumulerende fonde, aldrig i kontanter eller udloddende fonde, der kaster renter eller udbytter af sig. Kontanter springer også den renters rente over, der gør det tunge arbejde over en lang horisont: de fleste familier fylder en børneopsparing (0%, men med loft) først og fortsætter så i barnets eget depot.",

      "q_jointGift_scenario":"To forældre giver deres barn det årlige maksimum. De overfører fra deres FÆLLESKONTO, skriver intet gavebrev og tilføjer et vilkår pr. sms en uge senere.",
      "q_jointGift_opts":[
        "Fælde: flyt pengene fra hver givers EGEN konto med et gavebrev underskrevet FØR overførslen. Vilkår gælder kun, hvis de findes på eller før gaven - aldrig tilføjet bagefter.",
        "Fint - det er under det samlede loft, så papirarbejdet er ligegyldigt.",
        "Ugyldigt - et gavebrev skal notariseres for at tælle."
      ],
      "q_jointGift_reveal":"I praksis: ét gavebrev pr. giver, pr. barn, pr. år, underskrevet før den første overførsel, hvor pengene flyttes fra giverens egen konto (ikke en fælleskonto) og mærkes med giver, modtager og år. Der kræves ingen notar eller særlig form, men vilkår gælder kun, hvis de findes på eller før selve gavetidspunktet, aldrig tilføjet bagefter.",

      "q_stopLoss_scenario":"En investor sætter stop-loss-salgsordrer på en lagerbeskattet ETF i håb om at 'undgå skatten på papirgevinster'.",
      "q_stopLoss_opts":[
        "God plan - at sælge før årsskiftet undgår lagerskatten.",
        "Fælde: lager beskatter årets værdiændring, uanset om du sælger, så stop-loss'en udskyder den ikke - den låser bare tabet (og kan spilde et barns frikort-år).",
        "Stop-loss-ordrer er ikke tilladt på ETF'er i Danmark."
      ],
      "q_stopLoss_reveal":"Lager betyder, at du beskattes af værdistigningen hvert år, uanset om du solgte noget eller ej. Et stop-loss-salg ændrer ikke årets lagerregning; det realiserer kun tabet. For et barn spilder et tabsår desuden årets frikort-fradrag, som ikke kan overføres til næste år.",

      "q_waitDip_scenario":"En begynder holder hver måneds opsparing i kontanter og venter på et markedsfald, før der endelig investeres.",
      "q_waitDip_opts":[
        "Fornuftigt - man skal aldrig købe på toppen.",
        "Man skal investere et stort engangsbeløb eller lade være helt.",
        "Fælde: at time markedet slår sjældent regelmæssighed. En automatisk månedlig overførsel køber i gode måneder og dårlige, og kontanter, der venter, misser renters rente."
      ],
      "q_waitDip_reveal":"Opret en automatisk månedlig overførsel, også en lille. Regelmæssighed slår timing: du køber i gode måneder og dårlige, og venter aldrig i kontanter på et 'bedre tidspunkt'. Kontanter på sidelinjen misser også den renters rente, der bøjer kurven opad, jo længere du bliver investeret.",

      "q_bankReport_scenario":"En forælder går ud fra, at banken automatisk indberetter og afregner skatten på udbytter fra barnets forældregivne fond.",
      "q_bankReport_opts":[
        "Fælde: banken indberetter IKKE forældrebeskattede udbytter for dig - du skal selv oplyse dem. Endnu en grund til akkumulerende fonde, der ikke udbetaler udbytte.",
        "Rigtigt - banker indberetter alt til SKAT automatisk.",
        "Udbytter under 1.000 kr skal aldrig oplyses."
      ],
      "q_bankReport_reveal":"Udbytte af forældregivne penge beskattes hos forælderen, indtil barnet fylder 18, og banken indberetter det ikke for dig, så du selv skal oplyse det. Akkumulerende fonde udbetaler intet, så der er intet udbytte, reglen kan fange, og intet at selvangive - den sikre konstruktion for et barns konto.",

      "i18nReady":"i18n komplet"
    }
  };

  var I18N = mergeI18n(I18N_BASE, PAGE_I18N);
  function $(id){ return document.getElementById(id); }
  var lang = "en";
  try { var g = JSON.parse(localStorage.getItem(GLOBAL_KEY) || "{}"); if (g.lang === "da" || g.lang === "en") lang = g.lang; } catch (e) {}

  function t(key){
    if (I18N[lang] && I18N[lang][key] !== undefined) return I18N[lang][key];
    if (I18N.en[key] !== undefined) return I18N.en[key];
    return key;
  }
  function fill(str, map){ return String(str).replace(/\{(\w+)\}/g, function(_, k){ return map[k] !== undefined ? map[k] : "{" + k + "}"; }); }
  function esc(s){ return String(s).replace(/[&<>"']/g, function(c){ return ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[c]; }); }

  /* ---------- quiz state (memory only) ---------- */
  var idx = 0, score = 0, answered = false, picked = -1;

  function renderDots(){
    var dots = $("quiz-dots"); if(!dots) return;
    var html = "";
    for (var i = 0; i < TRAPS.length; i++){
      var cls = "qdot" + (i < idx ? " done" : "") + (i === idx ? " current" : "");
      html += '<span class="' + cls + '" aria-hidden="true"></span>';
    }
    dots.innerHTML = html;
    dots.setAttribute("aria-label", fill(t("quizStart"), { n: Math.min(idx+1, TRAPS.length), total: TRAPS.length }));
  }

  function renderCard(){
    var card = $("quiz-card"); if(!card) return;
    var trap = TRAPS[idx];
    var opts = t("q_" + trap.id + "_opts") || [];
    renderDots();
    var optHTML = opts.map(function(o, i){
      var state = "";
      if (answered){
        if (i === trap.correct) state = " correct";
        else if (i === picked) state = " wrong";
        else state = " dim";
      }
      return '<button type="button" class="qopt' + state + '" data-i="' + i + '"' +
        (answered ? ' disabled' : '') + '>' +
        '<span class="qmark" aria-hidden="true"></span><span class="qtx">' + esc(o) + '</span></button>';
    }).join("");

    var reveal = "";
    if (answered){
      var right = picked === trap.correct;
      reveal =
        '<div class="qreveal ' + (right ? "ok" : "no") + '" role="status">' +
          '<div class="qverdict">' + (right ? t("quizCorrect") : t("quizWrong")) + '</div>' +
          '<p class="qexpl">' + esc(t("q_" + trap.id + "_reveal")) + '</p>' +
          '<a class="qlink" href="' + trap.href + '">' + t("quizReadMore") + '</a>' +
        '</div>' +
        '<div class="qnav">' +
          '<button type="button" id="quiz-next" class="qbtn">' +
            (idx + 1 < TRAPS.length ? t("quizNext") : t("quizSeeResult")) +
          '</button>' +
        '</div>';
    }

    card.innerHTML =
      '<p class="qcount">' + fill(t("quizStart"), { n: idx+1, total: TRAPS.length }) + '</p>' +
      '<p class="qscenario">' + esc(t("q_" + trap.id + "_scenario")) + '</p>' +
      '<p class="qask">' + t("quizAsk") + '</p>' +
      '<div class="qopts">' + optHTML + '</div>' +
      (answered ? "" : '<p class="qhint">' + t("quizPickPrompt") + '</p>') +
      reveal;

    if (!answered){
      card.querySelectorAll(".qopt").forEach(function(b){
        b.addEventListener("click", function(){ onPick(+b.getAttribute("data-i")); });
      });
    } else {
      var nx = $("quiz-next");
      if (nx) nx.addEventListener("click", onNext);
    }
  }

  function onPick(i){
    if (answered) return;
    answered = true; picked = i;
    if (i === TRAPS[idx].correct) score++;
    renderCard();
  }
  function onNext(){
    if (idx + 1 < TRAPS.length){ idx++; answered = false; picked = -1; renderCard(); }
    else { renderResult(); }
  }

  function renderResult(){
    var card = $("quiz-card"); if(!card) return;
    renderDots();
    var msgKey = score >= 7 ? "quizResult3" : (score >= 4 ? "quizResult2" : "quizResult1");
    card.innerHTML =
      '<div class="qresult">' +
        '<p class="qcount">' + t("quizResultH") + '</p>' +
        '<p class="qscore">' + fill(t("quizResultScore"), { s: score, n: TRAPS.length }) + '</p>' +
        '<p class="qmsg">' + t(msgKey) + '</p>' +
        '<div class="qnav qnav-wrap">' +
          '<button type="button" id="quiz-share" class="qbtn">' + t("quizShare") + '</button>' +
          '<button type="button" id="quiz-restart" class="qbtn ghost">' + t("quizRestart") + '</button>' +
        '</div>' +
        '<p class="qshared" id="quiz-shared" aria-live="polite"></p>' +
        '<a class="qplan" href="plan.html">' + t("quizToPlan") + '</a>' +
      '</div>';
    var sh = $("quiz-share"); if (sh) sh.addEventListener("click", shareScore);
    var rs = $("quiz-restart"); if (rs) rs.addEventListener("click", function(){ idx=0; score=0; answered=false; picked=-1; renderCard(); });
  }

  function shareScore(){
    var text = fill(t("quizShareText"), { s: score, n: TRAPS.length, url: location.href });
    var done = function(){ var m = $("quiz-shared"); if (m) m.textContent = t("quizShared"); };
    if (navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(text).then(done, function(){ fallbackCopy(text, done); });
    } else { fallbackCopy(text, done); }
  }
  function fallbackCopy(text, done){
    try {
      var ta = document.createElement("textarea");
      ta.value = text; ta.setAttribute("readonly",""); ta.style.position="absolute"; ta.style.left="-9999px";
      document.body.appendChild(ta); ta.select(); document.execCommand("copy"); document.body.removeChild(ta);
      done();
    } catch (e) { var m = $("quiz-shared"); if (m) m.textContent = text; }
  }

  function renderStrings(){
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(function(el){ el.textContent = t(el.getAttribute("data-i18n")); });
    document.querySelectorAll("[data-i18n-aria]").forEach(function(el){ el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria"))); });
    var en = $("lang-en"), da = $("lang-da");
    if (en) en.classList.toggle("active", lang === "en");
    if (da) da.classList.toggle("active", lang === "da");
    // re-render the current quiz view in the new language, preserving progress/answered state.
    // The result screen is the only view with #quiz-share; everything else is a scenario card.
    if ($("quiz-share")) renderResult(); else renderCard();
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
