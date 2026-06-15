/* ============================================================
   TAX_YEAR_CONFIG — the ONLY place annual amounts live.
   SINGLE SOURCE shared by index.html and play.html (loaded by both),
   so the two pages can never drift apart.
   Verified 2026-06-12 against skat.dk / skm.dk.

   >>> UPDATE EACH JANUARY <<< (see MAINTENANCE):
   taxYear, verifiedDate, personfradrag, askCeiling, aktieThreshold,
   aktieThresholdMarried, giftCapPerGiver, kapThresholdApprox, kapThresholdMarriedApprox.
   Usually law-only (rarely change): the *Rate fields and boYearlyCap / boLifetimeCap.
   ============================================================ */
const TAX_YEAR_CONFIG = {
  taxYear: 2026, verifiedDate: "2026-06-12",
  giftCapPerGiver: 80600, giftTaxRate: 0.15,
  personfradrag: 54100,
  askCeiling: 174200, askRate: 0.17,
  aktieThreshold: 79400, aktieThresholdMarried: 158800, aktieRateLow: 0.27, aktieRateHigh: 0.42,
  kapThresholdApprox: 55000, kapThresholdMarriedApprox: 110000, kapRateLowApprox: 0.37, kapRateHighApprox: 0.42,
  boYearlyCap: 6000, boLifetimeCap: 72000,
};
