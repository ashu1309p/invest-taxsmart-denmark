/* ============================================================
   I18N - shared BASE (keys identical in both pages) + helpers.
   Each page loads this after js/config.js, defines its own PAGE_I18N
   overrides (page-specific + keys whose wording differs), and builds
   const I18N = mergeI18n(I18N_BASE, PAGE_I18N). Single source for the
   shared strings so the two pages cannot drift.
   ============================================================ */
const I18N_BASE = { en: {"brand":"Tax-smart investing in Denmark","tabPlan":"Plan","tabPlay":"Play","tabLearn":"Learn","plLearnMore":"Read the full explainer →","ariaBackTop":"Back to top","feedbackTitle":"💬 What worked, what didn't? Tell me","feedbackSub":"A 1-minute form: what helped, what confused you, anything wrong or missing. This is a personal project and your input shapes it.","privacyNote":"Privacy: anonymous visit counts via GoatCounter (cookieless, no personal data, no cross-site tracking). Your slider and language choices stay in your browser only.","srcTitle":"Sources & legal references","verifiedLine":"All amounts are for tax year {yr}, verified {date} against skat.dk / skm.dk. Indexed amounts change every January; the positivliste [SKAT’s approved-fund list] every December.","stickyLink":"Sources","tests":"self-checks passed","kr":"kr"}, da: {"brand":"Skattesmart investering i Danmark","tabPlan":"Planlæg","tabPlay":"Leg","tabLearn":"Lær","plLearnMore":"Læs hele forklaringen →","ariaBackTop":"Til toppen","feedbackTitle":"💬 Hvad virkede, hvad gjorde ikke? Sig til","feedbackSub":"Et 1-minuts skema: hvad hjalp, hvad forvirrede dig, og hvad er forkert eller mangler. Dette er et personligt projekt, og din feedback former det.","privacyNote":"Privatliv: anonym besøgstælling via GoatCounter (uden cookies, ingen persondata, ingen sporing på tværs af sider). Dine skyder- og sprogvalg bliver kun i din browser.","srcTitle":"Kilder & juridiske henvisninger","verifiedLine":"Alle beløb gælder skatteåret {yr}, kontrolleret {date} mod skat.dk / skm.dk. Regulerede beløb ændres hver januar; positivlisten hver december.","stickyLink":"Kilder","tests":"selvtest bestået","kr":"kr"} };

function mergeI18n(base, ov) {
  return { en: Object.assign({}, base.en, (ov && ov.en) || {}),
           da: Object.assign({}, base.da, (ov && ov.da) || {}) };
}

/* EN/DA completeness: ok when key sets match (no missing translations).
   Byte-identical EN==DA values are reported for review (many are intentional: "kr", "ASK", numbers). */
function checkI18nComplete(dict) {
  const en = Object.keys(dict.en), da = Object.keys(dict.da);
  const missingInDa = en.filter(k => !(k in dict.da));
  const missingInEn = da.filter(k => !(k in dict.en));
  const identical = en.filter(k => (k in dict.da) && typeof dict.en[k] === 'string' && dict.en[k] === dict.da[k]);
  return { ok: missingInDa.length === 0 && missingInEn.length === 0, missingInDa, missingInEn, identical };
}
