/* ============================================================
   Article controller: learn-gifts-to-children.html
   ------------------------------------------------------------
   Dependency-free, no build. Loaded after js/config.js and js/i18n.js.
   Holds this article's PAGE_I18N override (namespace art_gift_*, plus the
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
      "art_gift_kicker":"Learn",
      "art_gift_h1":"Gifts to children, the tax-free way",
      "art_gift_lead":"Giving money to your kids is one of the simplest tax wins in Denmark, as long as you stay inside the yearly allowance and avoid one quiet trap.",
      "art_gift_taxyear":"Tax year {yr}",
      "art_gift_verifiedNote":"Every rate and amount below is for this tax year, verified {date} against skat.dk / skm.dk. Indexed amounts change every January.",
      "art_gift_h2_cap":"The yearly gift allowance",
      "art_gift_cap_p1":"Each giver can give each child up to a fixed amount per year completely free of gift tax. For {yr} that allowance is {giftCap} kr per giver, per child, per year. It resets every calendar year, so the same giver can give again next January.",
      "art_gift_cap_p2":"The key thing most families miss is that the allowance is per giver, not per couple. Two parents each have their own {giftCap} kr, so together they can move {giftCap2} kr to one child in a year tax-free. Grandparents have their own allowance on top of that, which is why a child's savings can be built up surprisingly quickly within the rules.",
      "art_gift_h2_tax":"When gift tax applies",
      "art_gift_tax_p1":"Gift tax (gaveafgift) only bites on the part of a gift that goes above a giver's allowance. Up to {giftCap} kr from one giver: nothing. Above it, the excess is taxed at {giftRate}%. So if a giver hands over {giftExOver} kr more than their allowance, that {giftExOver} kr is taxed at {giftRate}%, which is {giftExTax} kr.",
      "art_gift_tax_p2":"Because each giver has a separate allowance, splitting a large planned gift across both parents (and grandparents) is usually what keeps it inside the tax-free zone. The Gift Planner on the Play page works out a family's combined capacity and shows exactly how much, if any, would be taxed.",
      "art_gift_h2_attr":"The trap: parent attribution",
      "art_gift_attr_p1":"Here is the part that catches people. The return on money a parent gives can be taxed back to the parent, not the child. Interest and dividends on parent-gifted money are taxed at the parent until the year the child turns 18, and the bank does not report this for you, so you would have to self-declare it.",
      "art_gift_attr_p2":"Annual value gains on accumulating fund units, by contrast, are taxed at the child. That is the whole reason a child's gifted savings belong in accumulating funds, never in idle cash or distributing funds that throw off interest or dividends. Gifts from grandparents are not covered by this rule: their returns are taxed at the child straight away, though the same per-giver allowance still applies.",
      "art_gift_h2_gavebrev":"Why a gavebrev matters",
      "art_gift_gavebrev_p1":"A gavebrev (deed of gift) is the simple document that records who gave what, to whom, and when. No notary or special form is required, but any conditions you want only count if they exist at or before the moment of the gift, never added afterwards.",
      "art_gift_gavebrev_p2":"In practice that means one letter per giver, per child, per year, signed before the first transfer, with the money moving from the giver's own account (not a joint account) and labelled with giver, recipient and year. Two adult witnesses who are not receiving anything help prove the date. The Gift Planner includes a full gavebrev checklist, and for conditions, lock-up (båndlæggelse) or large amounts, have an advokat or revisor review it first.",
      "art_gift_h2_where":"Where the gifted money should sit",
      "art_gift_where_p1":"Giving the money tax-free is only half the job; where it then sits decides how the growth is taxed. A børneopsparing grows completely tax-free, but it is small and locked: up to {boY} kr a year and {boL} kr over its lifetime ({yr}). Most families fill it first, then keep going in the child's own depot.",
      "art_gift_where_p2":"In the child's depot, an accumulating off-list fund's yearly gain is capital income, which the child's personfradrag (tax-free allowance) of {pf} kr ({yr}) can absorb, often down to little or no tax. As always, the exact fund matters: the positivliste decides per ISIN how the holding is taxed, and whether the gain is taxed yearly (lager) or only on sale (realisation) depends on the instrument.",
      "art_gift_h2_cmp":"At a glance",
      "art_gift_cmp_corner":"",
      "art_gift_cmp_h":"In short",
      "art_gift_cmp_who":"Who can give, how much",
      "art_gift_cmp_who_a":"Each giver: {giftCap} kr per child, per year ({yr}). Two parents double it; grandparents have their own cap too.",
      "art_gift_cmp_when":"When tax applies",
      "art_gift_cmp_when_a":"Only on the amount above a giver's cap, taxed at {giftRate}% (gaveafgift).",
      "art_gift_cmp_catch":"Main structuring catch",
      "art_gift_cmp_catch_a":"Returns on parent-gifted money are taxed at the parent until the child turns 18, unless held in accumulating funds with a gavebrev.",
      "art_gift_ta_h":"Key takeaways",
      "art_gift_ta1":"Each giver can give {giftCap} kr per child, per year ({yr}) tax-free; two parents double the capacity, grandparents add their own.",
      "art_gift_ta2":"Only the amount above a giver's cap is taxed, at {giftRate}% (gaveafgift).",
      "art_gift_ta3":"Returns on parent-gifted money are taxed at the parent until the child turns 18, so gifted savings belong in accumulating funds, recorded with a gavebrev.",
      "art_gift_ta4":"After the gift, fill a børneopsparing (0%, capped) first, then use the child's depot and personfradrag of {pf} kr ({yr}).",
      "art_gift_cta_planner":"Open the Gift Planner",
      "art_gift_cta_adb":"Read: ASK vs depot vs børneopsparing",
      "art_gift_cta_pos":"Read: the positivliste",
      "art_gift_cta_lvr":"Read: lager vs realisation",
      "art_gift_skat":"Gift caps, boafgiftsloven § 22 on retsinformation.dk →",
      "art_gift_disc":"This is an educational explainer written by a private individual, not tax, legal or investment advice. Amounts are for tax year {yr} and change as the law changes. Verify on skat.dk, and ask an advokat or revisor before acting on anything here.",
      "art_gift_back":"← Back to Learn",
      "i18nReady":"i18n complete"
    },
    da: {
      "skipLink":"Spring til indhold",
      "ariaLangGroup":"Sprog",
      "ariaDisclaimer":"Vigtig ansvarsfraskrivelse",
      "ariaDismiss":"Afvis",
      "bigDisclaimer":"Dette site er et undervisningsværktøj lavet af en privatperson. Det er ikke skatte-, juridisk eller investeringsrådgivning, gemmer ingen persondata og kan være forældet dagen efter en lovændring. Beløb gælder det angivne skatteår og reguleres hver januar; positivlisten [SKATs godkendte fonde] ændres hver december. Bekræft på skat.dk eller spørg en advokat/revisor før du handler.",
      "stickyBar":"Kun til undervisning, ikke skatte-, juridisk eller investeringsrådgivning.",
      "art_gift_kicker":"Lær",
      "art_gift_h1":"Gaver til børn, den skattefri måde",
      "art_gift_lead":"At give penge til dine børn er en af de enkleste skattegevinster i Danmark, så længe du holder dig inden for det årlige bundfradrag og undgår én stille fælde.",
      "art_gift_taxyear":"Skatteår {yr}",
      "art_gift_verifiedNote":"Alle satser og beløb nedenfor gælder dette skatteår, kontrolleret {date} mod skat.dk / skm.dk. Regulerede beløb ændres hver januar.",
      "art_gift_h2_cap":"Det årlige gavebundfradrag",
      "art_gift_cap_p1":"Hver giver kan give hvert barn op til et fast beløb om året helt uden gaveafgift. For {yr} er bundfradraget {giftCap} kr pr. giver, pr. barn, pr. år. Det nulstilles hvert kalenderår, så den samme giver kan give igen til januar.",
      "art_gift_cap_p2":"Det, de fleste familier overser, er, at bundfradraget er pr. giver, ikke pr. par. To forældre har hver deres egne {giftCap} kr, så de kan tilsammen flytte {giftCap2} kr til ét barn på et år uden afgift. Bedsteforældre har deres eget bundfradrag oveni, og derfor kan et barns opsparing bygges op overraskende hurtigt inden for reglerne.",
      "art_gift_h2_tax":"Hvornår der er gaveafgift",
      "art_gift_tax_p1":"Gaveafgift rammer kun den del af en gave, der overstiger giverens bundfradrag. Op til {giftCap} kr fra én giver: intet. Derover beskattes det overskydende med {giftRate}%. Så hvis en giver overdrager {giftExOver} kr mere end sit bundfradrag, beskattes de {giftExOver} kr med {giftRate}%, hvilket er {giftExTax} kr.",
      "art_gift_tax_p2":"Fordi hver giver har sit eget bundfradrag, er det normalt det, der holder en stor planlagt gave inden for det afgiftsfri felt, at fordele den på begge forældre (og bedsteforældre). Gaveberegneren på Leg-siden regner en families samlede kapacitet ud og viser præcis, hvor meget der eventuelt ville blive beskattet.",
      "art_gift_h2_attr":"Fælden: forældrebeskatning af afkast",
      "art_gift_attr_p1":"Her er den del, der fanger folk. Afkastet af penge, en forælder giver, kan beskattes hos forælderen, ikke barnet. Renter og udbytter af forældregivne penge beskattes hos forælderen, indtil det år barnet fylder 18, og banken indberetter det ikke for dig, så du selv skal oplyse det.",
      "art_gift_attr_p2":"Årlige værdistigninger på akkumulerende fondsandele beskattes derimod hos barnet. Det er hele grunden til, at et barns gaveopsparing hører hjemme i akkumulerende fonde, aldrig i kontanter eller udloddende fonde, der kaster renter eller udbytter af sig. Gaver fra bedsteforældre er ikke omfattet af denne regel: deres afkast beskattes hos barnet med det samme, men det samme bundfradrag pr. giver gælder stadig.",
      "art_gift_h2_gavebrev":"Hvorfor et gavebrev betyder noget",
      "art_gift_gavebrev_p1":"Et gavebrev er det simple dokument, der noterer, hvem der gav hvad, til hvem og hvornår. Der kræves ingen notar eller særlig form, men de vilkår, du ønsker, gælder kun, hvis de findes på eller før selve gavetidspunktet, aldrig tilføjet bagefter.",
      "art_gift_gavebrev_p2":"I praksis betyder det ét brev pr. giver, pr. barn, pr. år, underskrevet før den første overførsel, hvor pengene flyttes fra giverens egen konto (ikke en fælleskonto) og mærkes med giver, modtager og år. To voksne vidner, der ikke selv modtager noget, hjælper med at bevise datoen. Gaveberegneren har en fuld gavebrev-tjekliste, og ved vilkår, båndlæggelse eller store beløb bør du få en advokat eller revisor til at gennemgå det først.",
      "art_gift_h2_where":"Hvor de givne penge bør ligge",
      "art_gift_where_p1":"At give pengene afgiftsfrit er kun det halve arbejde; hvor de derefter ligger, afgør, hvordan væksten beskattes. En børneopsparing vokser helt skattefrit, men den er lille og låst: op til {boY} kr om året og {boL} kr i alt over dens levetid ({yr}). De fleste familier fylder den først og fortsætter så i barnets eget depot.",
      "art_gift_where_p2":"I barnets depot er en akkumulerende fond uden for listen kapitalindkomst, som barnets personfradrag på {pf} kr ({yr}) kan opsuge, ofte ned til lidt eller ingen skat. Som altid betyder den præcise fond noget: positivlisten afgør pr. ISIN, hvordan beholdningen beskattes, og om gevinsten beskattes årligt (lager) eller først ved salg (realisation) afhænger af instrumentet.",
      "art_gift_h2_cmp":"Overblik",
      "art_gift_cmp_corner":"",
      "art_gift_cmp_h":"Kort sagt",
      "art_gift_cmp_who":"Hvem kan give, hvor meget",
      "art_gift_cmp_who_a":"Hver giver: {giftCap} kr pr. barn, pr. år ({yr}). To forældre fordobler det; bedsteforældre har deres eget loft.",
      "art_gift_cmp_when":"Hvornår der er afgift",
      "art_gift_cmp_when_a":"Kun på beløbet over en givers loft, beskattet med {giftRate}% (gaveafgift).",
      "art_gift_cmp_catch":"Vigtigste struktur-fælde",
      "art_gift_cmp_catch_a":"Afkast af forældregivne penge beskattes hos forælderen, til barnet fylder 18, medmindre det ligger i akkumulerende fonde med et gavebrev.",
      "art_gift_ta_h":"Hovedpointer",
      "art_gift_ta1":"Hver giver kan give {giftCap} kr pr. barn, pr. år ({yr}) afgiftsfrit; to forældre fordobler kapaciteten, bedsteforældre lægger deres eget oveni.",
      "art_gift_ta2":"Kun beløbet over en givers loft beskattes, med {giftRate}% (gaveafgift).",
      "art_gift_ta3":"Afkast af forældregivne penge beskattes hos forælderen, til barnet fylder 18, så gaveopsparing hører hjemme i akkumulerende fonde, noteret med et gavebrev.",
      "art_gift_ta4":"Efter gaven: fyld en børneopsparing (0%, med loft) først, og brug så barnets depot og personfradrag på {pf} kr ({yr}).",
      "art_gift_cta_planner":"Åbn Gaveberegneren",
      "art_gift_cta_adb":"Læs: ASK vs depot vs børneopsparing",
      "art_gift_cta_pos":"Læs: positivlisten",
      "art_gift_cta_lvr":"Læs: lager vs realisation",
      "art_gift_skat":"Gavelofter, boafgiftsloven § 22 på retsinformation.dk →",
      "art_gift_disc":"Dette er en undervisende forklaring skrevet af en privatperson, ikke skatte-, juridisk eller investeringsrådgivning. Beløb gælder skatteåret {yr} og ændrer sig, når loven ændrer sig. Bekræft på skat.dk, og spørg en advokat eller revisor, før du handler på noget her.",
      "art_gift_back":"← Tilbage til Lær",
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
    var exOver = 20000;   // illustrative excess above a giver's cap (rate-driven example)
    return {
      yr: cfg.taxYear,
      date: cfg.verifiedDate,
      giftCap: nfmt(cfg.giftCapPerGiver),
      giftCap2: nfmt(cfg.giftCapPerGiver * 2),
      giftRate: Math.round(cfg.giftTaxRate * 100),
      giftExOver: nfmt(exOver),
      giftExTax: nfmt(exOver * cfg.giftTaxRate),
      boY: nfmt(cfg.boYearlyCap),
      boL: nfmt(cfg.boLifetimeCap),
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
