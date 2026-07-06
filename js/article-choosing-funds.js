/* ============================================================
   Article controller: learn-choosing-funds.html
   ------------------------------------------------------------
   Dependency-free, no build. Loaded after js/i18n.js.
   Holds this article's PAGE_I18N override (fund-terms + asset-map strings
   moved verbatim from the old index page, plus art_cf_* scaffold strings
   and the per-page shell strings), merges onto I18N_BASE, and runs the
   shared render pass that also translates the injected header/footer.

   The asset map is rendered here (not static HTML) because each card mixes
   translated text with the coloured account tags ({BO}/{FRI}/{ASK}/{AKT})
   and the "warn|" prefix convention carried over from the old index.
   Unlike the old index, there is no router on this page, so the child and
   adult placements are BOTH shown statically, and the risk coupling is
   replaced by static "fits: …" risk-profile badges.
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
      "art_cf_kicker":"Learn",
      "art_cf_h1":"Choosing funds: reading the name, and what goes where",
      "art_cf_lead":"Every ETF name carries switches like ACC, DIST and hedged. In Denmark one of them changes the tax story. Once you can read the name, the next question is what belongs where: core, satellite, bonds, single stocks.",
      "art_cf_taxyear":"Tax year {yr}",
      "art_cf_verifiedNote":"Rules described here are for this tax year.",
      "ftTitle":"Reading a fund's name: ACC vs DIST, hedged vs unhedged",
      "ftSub":"Every ETF name carries these switches. In Denmark one of them changes the tax story, the other mostly doesn't.",
      "ft_accT":"ACC [accumulating]",
      "ft_acc1":"Dividends stay inside the fund and compound automatically.",
      "ft_accM":"Nothing is paid out, so there is no dividend to tax separately: everything lands in the yearly value gain (lager [mark-to-market]). For children this is the safe construction: no payout means nothing for the parent-attribution rule to catch.",
      "ft_distT":"DIST [distributing, udloddende]",
      "ft_dist1":"Dividends are paid out in cash, typically 1-4 times a year.",
      "ft_distM":"For adults the dividend is just part of the same income type, but you must reinvest it yourself. For children, dividends on parent-gifted money are taxed at the PARENT until age 18 (kildeskatteloven § 5, stk. 2). Special case: Danish distributing equity funds (IMB) are realisation-taxed aktieindkomst [share income], a different regime from ETFs.",
      "ft_unhT":"Unhedged",
      "ft_unh1":"You hold the fund's currencies as they are; exchange rates move your return.",
      "ft_unhM":"For long equity horizons many investors accept currency swings: they tend to even out over decades, and DKK is pegged to EUR, so EUR exposure behaves almost like DKK. Hedging or not has no effect on the Danish tax regime.",
      "ft_hedT":"Hedged [valutaafdækket]",
      "ft_hed1":"Built-in currency insurance smooths exchange-rate swings, for a small ongoing cost.",
      "ft_hedM":"Mostly relevant for bond funds, where currency noise can swamp the modest return. Hedging costs roughly 0.1-0.3% per year on top of the ÅOP. It does NOT change the tax regime, but see the ISIN warning below.",
      "ft_accEx":"Real example: “iShares Core MSCI World UCITS ETF (Acc)”, ISIN IE00B4L5Y983. The “Acc / (Acc)” in the name tells you dividends are reinvested automatically - for a child's account the safe default, because there is no payout for parent-attribution to catch. Illustration only: always verify the exact ISIN and its current list status yourself.",
      "ft_distEx":"Real example: the SAME index often exists as two classes - “Vanguard FTSE All-World UCITS ETF (Dist)”, ISIN IE00B3RBWM25, pays cash dividends about quarterly, while the “(Acc)” class IE00BK5BQT80 reinvests them. Note the different ISINs. An adult who wants income can use Dist; for a child it leaks parent-taxed dividends, so choose the Acc class. Illustration only - verify the ISIN yourself.",
      "ft_unhEx":"Real example: a plain “USD” world ETF held in your DKK depot moves with the USD/DKK rate. Over a 15-20 year equity horizon most investors accept this, and because DKK is pegged to the euro a EUR-denominated class barely moves versus DKK. Cheaper than hedged, and the Danish tax treatment is identical.",
      "ft_hedEx":"Real example: a bond ETF named “… EUR Hedged” or “… DKK Hedged” removes the currency swings that would otherwise swamp a bond's small return - handy for the defensive sleeve. It costs about 0.1-0.3%/yr more, and crucially the hedged class has its OWN ISIN: it can be OFF the positivliste even when the unhedged class is ON it. Check the exact ISIN before buying.",
      "adExH":"📈 Worked example: ACC vs DIST on the same fund",
      "adExS":"A world fund returns about 7% in a year: roughly 5% price growth and 2% dividends. Say you hold 100,000 kr.",
      "adAcc":"Nothing is paid out. The full ~7,000 kr (5,000 growth + 2,000 dividends) stays in the fund and compounds. A child is taxed on the yearly gain as the child, so the frikort can absorb it; nothing to reinvest, nothing to self-declare.",
      "adDist":"About 2,000 kr is paid to you as cash. For an adult it is the same tax, but you must reinvest the 2,000 kr yourself or it sits idle. For a child whose money was gifted by a parent, that 2,000 kr is taxed at the PARENT until age 18 (kildeskatteloven § 5, stk. 2), and the bank does not report it, so you must self-declare.",
      "adExNote":"For a child, accumulating avoids a parent tax bill and the paperwork; for an adult it saves the manual reinvesting. That is why children's accounts use accumulating funds only.",
      "fxExH":"📈 Worked example: shares flat, the dollar moves 5%",
      "fxExS":"You put 10,000 kr in a world fund and over the year the shares themselves go nowhere (0%). Only the dollar moves against the krone.",
      "fxCase1":"If the dollar rises 5%",
      "fxU1":"+5%, ends at 10,500 kr (you ride the currency up)",
      "fxH1":"about 0% minus the hedge fee, 9,980 kr",
      "fxCase2":"If the dollar falls 5%",
      "fxU2":"-5%, ends at 9,500 kr (you ride the currency down)",
      "fxH2":"about 0% minus the hedge fee, 9,980 kr",
      "fxExNote":"Hedged hands you the same result either way: it removes the swing, up and down, for a small certain cost (~0.1-0.3% a year, about 0.2% here). Over a long stock horizon these moves tend to even out, so many investors skip hedging on shares. On bonds, where the return is small, currency noise can swamp it, so hedging is more common there.",
      "ftTrap1":"⚠ Child trap: a distributing fund bought with parent-gifted money leaks parent-taxed dividends, even small ones, and the bank does not report this for you. Children's accounts: accumulating only.",
      "ftTrap2":"⚠ Check the exact ISIN: every share class (ACC, DIST, hedged, unhedged) has its OWN ISIN, and the positivliste [SKAT's approved-fund list] works per ISIN. The unhedged class being on the list says nothing about the hedged class. Verify your exact ISIN before buying.",
      "art_cf_checkLink":"Check a fund's exact ISIN against the positivliste →",
      "amTitle":"What goes where? Core, satellite, stocks",
      "art_cf_amSub":"The account decides the tax. The asset decides the risk. Each card below shows where an asset typically lives for a child and for an adult, and which risk profiles it fits.",
      "defTitle":"New to these words? Core, satellite, bond, single stocks",
      "art_cf_legend":"Colour = account: {BO} børneopsparing, {FRI} the child frikort strategy inside a depot, {ASK} aktiesparekonto, {AKT} ordinary depot. Red = avoid or take care.",
      "art_cf_forChild":"For a child",
      "art_cf_forAdult":"For an adult",
      "art_cf_fits":"fits:",
      "riskC":"Steady","riskB":"Mixed","riskA":"Mostly stocks",
      "risk_low":"Lower risk","risk_med":"Medium risk","risk_high":"Higher risk",
      "def_core_t":"Core - the foundation",
      "def_core_one":"One broad fund that owns a little of everything.",
      "def_core_more":"Example: a single global index fund holding ~1,500+ companies across many countries (a “world” or “all-country” ETF). Spread so wide that no single company or country can sink it. Still 100% shares, so it rises and falls with the whole market. Most people's 80-90%.",
      "def_sat_t":"Satellite - the spice",
      "def_sat_one":"A small, focused bet on one theme or sector.",
      "def_sat_more":"Example: a technology, clean-energy, robotics or single-country fund. Swings far more than the core, up AND down, because it is concentrated. Keep it a small slice (often 5-15%) so a bad year can't dominate.",
      "def_bond_t":"Bond / defensive - the ballast",
      "def_bond_one":"Lends money instead of owning companies; steadier, smaller returns.",
      "def_bond_more":"Example: a global bond fund or a money-market fund. Cushions the portfolio when shares fall, in exchange for lower long-run growth. Calmer than shares but not risk-free - long bonds can drop when interest rates rise. Steadies cautious profiles or money you'll need soon.",
      "def_stk_t":"Single stocks - one company",
      "def_stk_one":"Owning shares in one specific company.",
      "def_stk_more":"Example: holding Novo Nordisk or Apple directly. One company can soar or crash on its own news, so it is undiversified and higher risk. For most beginners a broad fund beats picking single names.",
      "a_coreOff":"Core: world ETF, accumulating, OFF the list",
      "a_coreOff_homes_child":["→ {FRI}: 0% in the early years - the personfradrag [tax-free allowance] covers the gain"],
      "a_coreOff_homes_adult":["warn|Usually skip: an off-list fund is kapitalindkomst [capital income] ~37-42%, worse than an on-list fund's 27/42%"],
      "a_coreOff_why_child":"Broad, smooth, boring on purpose. Off-list (typical Vanguard-style) means kapitalindkomst [capital income] - perfect against a child's frikort [tax-free allowance] in the early years.",
      "a_coreOff_why_adult":"Broad, smooth, boring on purpose. But off-list means kapitalindkomst [capital income] at ~37-42% for you; the same index ON the list is cheaper, so adults pick the on-list version instead.",
      "a_coreOn":"Core: world ETF ON the list",
      "a_coreOn_homes_child":["→ {AKT} only after the frikort [allowance] capacity is used (27% from the first krone)"],
      "a_coreOn_homes_adult":["→ {ASK} first (17%), then {AKT} 27/42% beyond the ceiling"],
      "a_coreOn_why_child":"On-list (typical iShares-style) means aktieindkomst [share income] 27/42%, with no personfradrag relief - so for a child it comes after the 0% and frikort buckets.",
      "a_coreOn_why_adult":"On-list (typical iShares-style) means aktieindkomst [share income] 27/42%. The adult workhorse: cheapest inside ASK, then a normal depot beyond the ceiling.",
      "a_sat":"Satellite: thematic / sector ETF (high volatility)",
      "a_sat_homes_child":["Best → {BO} or {ASK}","warn|Avoid the frikort depot: a loss year wastes that year's allowance"],
      "a_sat_homes_adult":["Best → {ASK}: the 17% flat wrapper absorbs the big swings","Or {AKT} if the ASK ceiling is full"],
      "a_sat_why_child":"Volatile assets and the frikort [tax-free allowance] mix badly: a loss year wastes that year's allowance forever, and a spike year overflows at ~37%. The 0% (BO) and 17% (ASK) wrappers absorb the swings symmetrically.",
      "a_sat_why_adult":"A small, spicy slice. Its big swings are best held where tax is symmetric: the 17% flat ASK absorbs up and down years evenly. Keep it a minority of the portfolio.",
      "a_stk":"Single stocks",
      "a_stk_homes_child":["warn|Caution → dividends on parent-gifted shares are taxed at the parent (see below)","If used → {ASK} keeps it simple"],
      "a_stk_homes_adult":["→ {AKT}: realisation-taxed, you control when to sell","Or {ASK} for the flat 17%"],
      "a_stk_why_child":"Single stocks in a depot are realisation-taxed aktieindkomst [share income] - but for a child the dividend trap below usually makes funds the simpler choice.",
      "a_stk_why_adult":"Unlike funds, single stocks in a depot are realisation-taxed aktieindkomst [share income]: no yearly lager [mark-to-market] bill, you choose when to sell.",
      "a_stk_warn":"Child trap: dividends on shares gifted by a parent are taxed at the PARENT until 18 (kildeskatteloven § 5, stk. 2). Accumulating funds avoid this entirely.",
      "a_bond":"Bond / money-market funds",
      "a_bond_homes_child":["→ {FRI}: the frikort [allowance] absorbs the modest gains"],
      "a_bond_homes_adult":["→ {AKT} as kapitalindkomst [capital income] ~37-42% (never on the list, not ASK-eligible)"],
      "a_bond_why_child":"Never on the positivliste [SKAT’s approved-fund list] and not ASK-eligible. The classic ballast for cautious profiles; for a child the frikort [tax-free allowance] covers the modest gains.",
      "a_bond_why_adult":"Never on the positivliste [SKAT’s approved-fund list] and not ASK-eligible, so bonds sit in a normal depot as kapitalindkomst [capital income] ~37-42%. The classic ballast for cautious profiles and near your goal date.",
      "art_cf_ta_h":"Key takeaways",
      "art_cf_ta1":"ACC vs DIST is the switch that matters for children: accumulating only, so no parent-taxed dividends leak.",
      "art_cf_ta2":"Hedged vs unhedged changes currency risk and cost, not the Danish tax regime - but the hedged class has its own ISIN with its own list status.",
      "art_cf_ta3":"A broad, boring core fund does the heavy lifting; satellites and single stocks stay a small slice in wrappers that absorb swings.",
      "art_cf_ta4":"Bonds are never on the positivliste and not ASK-eligible; for a child the frikort absorbs their modest gains.",
      "art_cf_cta_router":"Route your money in order",
      "art_cf_cta_check":"Check a fund's ISIN",
      "art_cf_disc":"This is an educational explainer written by a private individual, not tax, legal or investment advice - and never a fund recommendation. Fund names and ISINs appear as illustrations only. Rules change; verify with skat.dk and ask an advokat or revisor before acting on anything here.",
      "art_cf_back":"← Back to Learn",
      "i18nReady":"i18n complete"
    },
    da: {
      "skipLink":"Spring til indhold",
      "ariaLangGroup":"Sprog",
      "ariaDisclaimer":"Vigtig ansvarsfraskrivelse",
      "ariaDismiss":"Afvis",
      "bigDisclaimer":"Dette site er et undervisningsværktøj lavet af en privatperson. Det er ikke skatte-, juridisk eller investeringsrådgivning, gemmer ingen persondata og kan være forældet dagen efter en lovændring. Beløb gælder det angivne skatteår og reguleres hver januar; positivlisten [SKATs godkendte fonde] ændres hver december. Bekræft på skat.dk eller spørg en advokat/revisor før du handler.",
      "stickyBar":"Kun til undervisning, ikke skatte-, juridisk eller investeringsrådgivning.",
      "art_cf_kicker":"Lær",
      "art_cf_h1":"Valg af fonde: læs navnet, og hvad skal hvorhen",
      "art_cf_lead":"Alle ETF-navne har kontakter som ACC, DIST og hedged. I Danmark ændrer én af dem skattehistorien. Når du kan læse navnet, er næste spørgsmål, hvad der hører til hvor: kerne, satellit, obligationer, enkeltaktier.",
      "art_cf_taxyear":"Skatteår {yr}",
      "art_cf_verifiedNote":"Reglerne beskrevet her gælder dette skatteår.",
      "ftTitle":"Læs fondens navn: ACC vs DIST, hedged vs unhedged",
      "ftSub":"Alle ETF-navne har disse kontakter. I Danmark ændrer den ene skattehistorien, den anden gør stort set ikke.",
      "ft_accT":"ACC (akkumulerende)",
      "ft_acc1":"Udbytter bliver inde i fonden og forrentes automatisk.",
      "ft_accM":"Intet udbetales, så der er intet udbytte at beskatte særskilt: alt lander i årets værdistigning (lager). For børn er det den sikre konstruktion: ingen udbetaling betyder, at forældrebeskatningsreglen ikke har noget at fange.",
      "ft_distT":"DIST (udloddende)",
      "ft_dist1":"Udbytter udbetales kontant, typisk 1-4 gange om året.",
      "ft_distM":"For voksne er udbyttet blot en del af samme indkomsttype, men du skal selv geninvestere det. For børn beskattes udbytte af forældre-givne penge hos FORÆLDEREN indtil 18 år (kildeskatteloven § 5, stk. 2). Særtilfælde: danske udloddende aktiefonde (IMB) er realisationsbeskattet aktieindkomst, et andet regime end ETF'er.",
      "ft_unhT":"Unhedged (uafdækket)",
      "ft_unh1":"Du holder fondens valutaer, som de er; valutakurser påvirker dit afkast.",
      "ft_unhM":"Ved lange aktiehorisonter accepterer mange valutaudsving: de udligner sig ofte over årtier, og kronen er bundet til euroen, så EUR-eksponering opfører sig næsten som DKK. Afdækning eller ej ændrer ikke det danske skatteregime.",
      "ft_hedT":"Hedged (valutaafdækket)",
      "ft_hed1":"Indbygget valutaforsikring udjævner kursudsving, mod en lille løbende omkostning.",
      "ft_hedM":"Mest relevant for obligationsfonde, hvor valutastøj kan overdøve det beskedne afkast. Afdækning koster cirka 0,1-0,3% om året oven i ÅOP. Det ændrer IKKE skatteregimet, men se ISIN-advarslen nedenfor.",
      "ft_accEx":"Eksempel fra virkeligheden: “iShares Core MSCI World UCITS ETF (Acc)”, ISIN IE00B4L5Y983. “Acc / (Acc)” i navnet betyder, at udbytter geninvesteres automatisk - for en børnekonto den sikre standard, fordi der ikke er nogen udbetaling, forældrebeskatning kan ramme. Kun til illustration: tjek altid den præcise ISIN og dens aktuelle listestatus selv.",
      "ft_distEx":"Eksempel: det SAMME indeks findes ofte i to klasser - “Vanguard FTSE All-World UCITS ETF (Dist)”, ISIN IE00B3RBWM25, udbetaler kontant udbytte cirka kvartalsvis, mens “(Acc)”-klassen IE00BK5BQT80 geninvesterer. Bemærk de forskellige ISIN'er. En voksen, der vil have udbytte, kan bruge Dist; for et barn lækker den forældrebeskattet udbytte, så vælg Acc-klassen. Kun illustration - tjek ISIN selv.",
      "ft_unhEx":"Eksempel: en almindelig “USD”-verdens-ETF i dit DKK-depot følger USD/DKK-kursen. Over en aktiehorisont på 15-20 år accepterer de fleste det, og fordi kronen er bundet til euroen, bevæger en EUR-noteret klasse sig knap nok mod DKK. Billigere end hedged, og den danske beskatning er den samme.",
      "ft_hedEx":"Eksempel: en obligations-ETF med “… EUR Hedged” eller “… DKK Hedged” i navnet fjerner de valutaudsving, der ellers ville overdøve obligationens lille afkast - nyttigt til den defensive del. Det koster cirka 0,1-0,3%/år mere, og vigtigst: den hedgede klasse har sin EGEN ISIN: den kan være UDEN FOR positivlisten, selv når den uafdækkede er PÅ. Tjek den præcise ISIN, før du køber.",
      "adExH":"📈 Regneeksempel: ACC vs DIST på samme fond",
      "adExS":"En verdensfond giver cirka 7% på et år: omtrent 5% kursvækst og 2% udbytte. Sig, du har 100.000 kr.",
      "adAcc":"Intet udbetales. Hele ~7.000 kr (5.000 vækst + 2.000 udbytte) bliver i fonden og forrentes. Et barn beskattes af årets gevinst som barnet, så frikortet kan opsuge det; intet at geninvestere, intet at selvangive.",
      "adDist":"Cirka 2.000 kr udbetales kontant. For en voksen er det samme skat, men du skal selv geninvestere de 2.000 kr, ellers ligger de stille. For et barn, hvis penge er givet af en forælder, beskattes de 2.000 kr hos FORÆLDEREN indtil 18 år (kildeskatteloven § 5, stk. 2), og banken indberetter det ikke, så du skal selvangive det.",
      "adExNote":"For et barn undgår akkumulerende en forældreskat og papirarbejdet; for en voksen sparer det den manuelle geninvestering. Derfor bruger børnekonti kun akkumulerende fonde.",
      "fxExH":"📈 Regneeksempel: aktier flade, dollaren bevæger sig 5%",
      "fxExS":"Du lægger 10.000 kr i en verdensfond, og i løbet af året står aktierne selv stille (0%). Kun dollaren bevæger sig mod kronen.",
      "fxCase1":"Hvis dollaren stiger 5%",
      "fxU1":"+5%, ender på 10.500 kr (du følger valutaen op)",
      "fxH1":"cirka 0% minus afdækningsgebyret, 9.980 kr",
      "fxCase2":"Hvis dollaren falder 5%",
      "fxU2":"-5%, ender på 9.500 kr (du følger valutaen ned)",
      "fxH2":"cirka 0% minus afdækningsgebyret, 9.980 kr",
      "fxExNote":"Hedged giver dig det samme resultat begge veje: den fjerner udsvinget, både op og ned, mod en lille fast omkostning (~0,1-0,3% om året, cirka 0,2% her). Over en lang aktiehorisont udligner disse bevægelser sig ofte, så mange springer afdækning over på aktier. På obligationer, hvor afkastet er lille, kan valutastøj overdøve det, så afdækning er mere udbredt der.",
      "ftTrap1":"⚠ Barnefælde: en udloddende fond købt for forældre-givne penge lækker forældrebeskattede udbytter, selv små, og banken indberetter det ikke for dig. Børnekonti: kun akkumulerende.",
      "ftTrap2":"⚠ Tjek den præcise ISIN: hver andelsklasse (ACC, DIST, hedged, unhedged) har sin EGEN ISIN, og positivlisten virker pr. ISIN. At den uafdækkede klasse er på listen, siger intet om den afdækkede. Tjek din præcise ISIN, før du køber.",
      "art_cf_checkLink":"Tjek en fonds præcise ISIN mod positivlisten →",
      "amTitle":"Hvad skal hvorhen? Kerne, satellit, aktier",
      "art_cf_amSub":"Kontoen bestemmer skatten. Aktivet bestemmer risikoen. Hvert kort nedenfor viser, hvor et aktiv typisk ligger for et barn og for en voksen, og hvilke risikoprofiler det passer til.",
      "defTitle":"Ny i ordene? Kerne, satellit, obligation, enkeltaktier",
      "art_cf_legend":"Farve = konto: {BO} børneopsparing, {FRI} barnets frikort-strategi i et depot, {ASK} aktiesparekonto, {AKT} almindeligt depot. Rød = undgå eller pas på.",
      "art_cf_forChild":"For et barn",
      "art_cf_forAdult":"For en voksen",
      "art_cf_fits":"passer til:",
      "riskC":"Rolig","riskB":"Blandet","riskA":"Mest aktier",
      "risk_low":"Lavere risiko","risk_med":"Mellem risiko","risk_high":"Højere risiko",
      "def_core_t":"Kerne - fundamentet",
      "def_core_one":"Én bred fond, der ejer lidt af det hele.",
      "def_core_more":"Eksempel: én global indeksfond med ~1.500+ selskaber på tværs af mange lande (en “world”- eller “all-country”-ETF). Så bredt spredt, at intet enkelt selskab eller land kan vælte den. Stadig 100% aktier, så den stiger og falder med hele markedet. De fleste folks 80-90%.",
      "def_sat_t":"Satellit - krydderiet",
      "def_sat_one":"Et lille, fokuseret væddemål på ét tema eller én sektor.",
      "def_sat_more":"Eksempel: en teknologi-, grøn energi-, robot- eller enkeltlandsfond. Svinger meget mere end kernen, både op OG ned, fordi den er koncentreret. Hold den til en lille skive (ofte 5-15%), så et dårligt år ikke dominerer.",
      "def_bond_t":"Obligation / defensiv - ballasten",
      "def_bond_one":"Låner penge ud i stedet for at eje selskaber; mere rolig, mindre afkast.",
      "def_bond_more":"Eksempel: en global obligationsfond eller en pengemarkedsfond. Dæmper porteføljen, når aktier falder, mod lavere langsigtet vækst. Roligere end aktier, men ikke risikofri - lange obligationer kan falde, når renten stiger. Stabiliserer forsigtige profiler eller penge, du snart skal bruge.",
      "def_stk_t":"Enkeltaktier - ét selskab",
      "def_stk_one":"At eje aktier i ét bestemt selskab.",
      "def_stk_more":"Eksempel: at eje Novo Nordisk eller Apple direkte. Ét selskab kan stige eller styrte på egne nyheder, så det er uspredt og højere risiko. For de fleste begyndere slår en bred fond det at vælge enkeltaktier.",
      "a_coreOff":"Kerne: verdens-ETF, akkumulerende, UDEN FOR listen",
      "a_coreOff_homes_child":["→ {FRI}: 0% de første år, personfradraget opsuger gevinsten"],
      "a_coreOff_homes_adult":["warn|Spring oftest over: en fond uden for listen er kapitalindkomst ~37-42%, dårligere end en listefonds 27/42%"],
      "a_coreOff_why_child":"Bred, rolig, kedelig med vilje. Uden for listen (typisk Vanguard-stil) betyder kapitalindkomst - perfekt mod barnets frikort de første år.",
      "a_coreOff_why_adult":"Bred, rolig, kedelig med vilje. Men uden for listen betyder kapitalindkomst ~37-42% for dig; det samme indeks PÅ listen er billigere, så voksne vælger liste-versionen.",
      "a_coreOn":"Kerne: verdens-ETF PÅ listen",
      "a_coreOn_homes_child":["→ {AKT} først når frikort-kapaciteten er brugt (27% fra første krone)"],
      "a_coreOn_homes_adult":["→ {ASK} først (17%), så {AKT} 27/42% ud over loftet"],
      "a_coreOn_why_child":"På listen (typisk iShares-stil) betyder aktieindkomst 27/42% uden personfradrag - så for et barn kommer den efter 0%- og frikort-spandene.",
      "a_coreOn_why_adult":"På listen (typisk iShares-stil) betyder aktieindkomst 27/42%. Voksnes arbejdshest: billigst i ASK, derefter et almindeligt depot ud over loftet.",
      "a_sat":"Satellit: tema- / sektor-ETF (høj volatilitet)",
      "a_sat_homes_child":["Bedst → {BO} eller {ASK}","warn|Undgå frikort-depotet: et tabsår spilder årets fradrag"],
      "a_sat_homes_adult":["Bedst → {ASK}: den flade 17% opsuger de store udsving","Eller {AKT}, hvis ASK-loftet er fyldt"],
      "a_sat_why_child":"Volatile aktiver og frikortet er et dårligt mix: et tabsår spilder årets fradrag for altid, og et spike-år flyder over til ~37%. 0%- (BO) og 17%- (ASK) miljøerne opsuger udsving symmetrisk.",
      "a_sat_why_adult":"En lille, krydret skive. De store udsving holdes bedst, hvor skatten er symmetrisk: den flade 17% ASK opsuger op- og nedår lige. Hold den til et mindretal af porteføljen.",
      "a_stk":"Enkeltaktier",
      "a_stk_homes_child":["warn|Forsigtig → udbytte af forældre-givne aktier beskattes hos forælderen (se nedenfor)","Hvis brugt → {ASK} holder det enkelt"],
      "a_stk_homes_adult":["→ {AKT}: realisationsbeskattet, du styrer salgstidspunktet","Eller {ASK} for de flade 17%"],
      "a_stk_why_child":"Enkeltaktier i et depot er realisationsbeskattet aktieindkomst - men for et barn gør udbyttefælden nedenfor oftest fonde til det enklere valg.",
      "a_stk_why_adult":"I modsætning til fonde er enkeltaktier i et depot realisationsbeskattet aktieindkomst: ingen årlig lagerregning, du vælger selv salgstidspunktet.",
      "a_stk_warn":"Barnefælde: udbytte af aktier givet af en forælder beskattes hos FORÆLDEREN indtil 18 år (kildeskatteloven § 5, stk. 2). Akkumulerende fonde undgår det helt.",
      "a_bond":"Obligations- / pengemarkedsfonde",
      "a_bond_homes_child":["→ {FRI}: frikortet opsuger de beskedne gevinster"],
      "a_bond_homes_adult":["→ {AKT} som kapitalindkomst ~37-42% (aldrig på listen, ikke ASK-egnet)"],
      "a_bond_why_child":"Aldrig på positivlisten og ikke ASK-egnede. Klassisk ballast for forsigtige profiler; for et barn dækker frikortet de beskedne gevinster.",
      "a_bond_why_adult":"Aldrig på positivlisten og ikke ASK-egnede, så obligationer ligger i et almindeligt depot som kapitalindkomst ~37-42%. Klassisk ballast for forsigtige profiler og tæt på måldatoen.",
      "art_cf_ta_h":"Hovedpointer",
      "art_cf_ta1":"ACC vs DIST er den kontakt, der betyder noget for børn: kun akkumulerende, så ingen forældrebeskattede udbytter lækker.",
      "art_cf_ta2":"Hedged vs unhedged ændrer valutarisiko og omkostning, ikke det danske skatteregime - men den hedgede klasse har sit eget ISIN med sin egen listestatus.",
      "art_cf_ta3":"Én bred, kedelig kernefond gør det tunge arbejde; satellitter og enkeltaktier forbliver en lille skive i miljøer, der opsuger udsving.",
      "art_cf_ta4":"Obligationer er aldrig på positivlisten og ikke ASK-egnede; for et barn opsuger frikortet deres beskedne gevinster.",
      "art_cf_cta_router":"Rutér dine penge i rækkefølge",
      "art_cf_cta_check":"Tjek en fonds ISIN",
      "art_cf_disc":"Dette er en undervisende forklaring skrevet af en privatperson, ikke skatte-, juridisk eller investeringsrådgivning - og aldrig en fondsanbefaling. Fondsnavne og ISIN'er vises kun som illustration. Regler ændrer sig; bekræft på skat.dk og spørg en advokat eller revisor, før du handler på noget her.",
      "art_cf_back":"← Tilbage til Lær",
      "i18nReady":"i18n komplet"
    }
  };

  var I18N = mergeI18n(I18N_BASE, PAGE_I18N);
  var cfg = (typeof TAX_YEAR_CONFIG !== "undefined") ? TAX_YEAR_CONFIG : { taxYear: "" };

  function $(id){ return document.getElementById(id); }
  var lang = "en";
  try { var g = JSON.parse(localStorage.getItem(GLOBAL_KEY) || "{}"); if (g.lang === "da" || g.lang === "en") lang = g.lang; } catch (e) {}

  function fill(str, map){ return String(str).replace(/\{(\w+)\}/g, function(_, k){ return map[k] !== undefined ? map[k] : "{" + k + "}"; }); }
  function t(key){
    if (I18N[lang] && I18N[lang][key] !== undefined) return I18N[lang][key];
    if (I18N.en[key] !== undefined) return I18N.en[key];
    return key;
  }

  /* coloured account tags, shared convention with the old index asset map */
  var TAGS = { BO:'<i class="atag t-bo">BO</i>', FRI:'<i class="atag t-fri">AKT + frikort</i>', ASK:'<i class="atag t-ask">ASK</i>', AKT:'<i class="atag t-on">AKT</i>' };
  function tok(s){ return s.replace(/\{(BO|FRI|ASK|AKT)\}/g, function(_, k){ return TAGS[k]; }); }

  var CONCEPTS = [ {id:"core",risk:"med"}, {id:"sat",risk:"high"}, {id:"bond",risk:"low"}, {id:"stk",risk:"high"} ];
  function renderConcepts(){
    var el = $("concepts"); if(!el) return;
    el.innerHTML = CONCEPTS.map(function(c){
      return '<div class="concept">' +
        '<div class="defhead"><b>' + t("def_"+c.id+"_t") + '</b><span class="rbadge r-' + c.risk + '">' + t("risk_"+c.risk) + '</span></div>' +
        '<p class="one">' + t("def_"+c.id+"_one") + '</p>' +
        '<p class="ex">' + t("def_"+c.id+"_more") + '</p>' +
      '</div>';
    }).join("");
  }

  /* Same ASSETS metadata as the old index, but rendered statically: BOTH child and adult
     placements shown, and the router's risk coupling replaced by static risk-fit badges. */
  var ASSETS = [
    { id:"coreOff", risks:["riskC","riskB","riskA"] },
    { id:"coreOn",  risks:["riskC","riskB","riskA"] },
    { id:"sat",     risks:["riskA"] },
    { id:"stk",     risks:["riskA"] },
    { id:"bond",    risks:["riskC"] },
  ];
  function homesHTML(key){
    return t(key).map(function(h){
      var warn = h.indexOf("warn|") === 0;
      var tx = warn ? h.slice(5) : h;
      return '<span class="home' + (warn ? " h-warn" : "") + '">' + tok(tx) + '</span>';
    }).join("");
  }
  function renderAssets(){
    var leg = $("amLegend"); if (leg) leg.innerHTML = tok(t("art_cf_legend"));
    var el = $("assets"); if(!el) return;
    el.innerHTML = ASSETS.map(function(a){
      var bands = a.risks.map(function(r){
        var cls = r==="riskC" ? "r-low" : (r==="riskB" ? "r-med" : "r-high");
        return '<span class="rbadge ' + cls + '">' + t(r) + '</span>';
      }).join("");
      var warn = I18N.en["a_"+a.id+"_warn"] ? '<p class="warn">' + t("a_"+a.id+"_warn") + '</p>' : "";
      return '<div class="asset">' +
        '<div class="top"><span class="nm">' + t("a_"+a.id) + '</span>' +
          '<span class="fitbands" title="' + t("art_cf_fits") + '">' + bands + '</span></div>' +
        '<span class="wholab">' + t("art_cf_forChild") + '</span>' +
        '<div class="homes">' + homesHTML("a_"+a.id+"_homes_child") + '</div>' +
        '<p class="why">' + t("a_"+a.id+"_why_child") + '</p>' +
        '<span class="wholab">' + t("art_cf_forAdult") + '</span>' +
        '<div class="homes">' + homesHTML("a_"+a.id+"_homes_adult") + '</div>' +
        '<p class="why">' + t("a_"+a.id+"_why_adult") + '</p>' +
        warn +
      '</div>';
    }).join("");
  }

  function renderStrings(){
    document.documentElement.lang = lang;
    var map = { yr: cfg.taxYear };
    document.querySelectorAll("[data-i18n]").forEach(function(el){
      var v = t(el.getAttribute("data-i18n"));
      if (typeof v === "string") el.textContent = fill(v, map);
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function(el){ el.setAttribute("aria-label", fill(t(el.getAttribute("data-i18n-aria")), map)); });
    var en = $("lang-en"), da = $("lang-da");
    if (en) en.classList.toggle("active", lang === "en");
    if (da) da.classList.toggle("active", lang === "da");
    renderConcepts();
    renderAssets();
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
