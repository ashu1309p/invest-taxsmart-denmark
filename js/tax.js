/* ============================================================
   Pure tax math — SINGLE SOURCE shared by index.html and play.html.
   No DOM, node/headless testable. Loaded after js/config.js; every
   function takes cfg (TAX_YEAR_CONFIG) as a parameter.
   Verified by runRouterTests() (Plan, 9 cases) and runTests() (Play, 12 cases).
   ============================================================ */

/* ---- shared low-level rate functions ---- */
function aktieTax(gain, cfg) {
  if (gain <= 0) return 0;
  const low = Math.min(gain, cfg.aktieThreshold);
  const high = Math.max(0, gain - cfg.aktieThreshold);
  return low * cfg.aktieRateLow + high * cfg.aktieRateHigh;
}
function kapTaxAdult(gain, cfg) {
  if (gain <= 0) return 0;
  const low = Math.min(gain, cfg.kapThresholdApprox);
  const high = Math.max(0, gain - cfg.kapThresholdApprox);
  return low * cfg.kapRateLowApprox + high * cfg.kapRateHighApprox;
}
function kapTaxChild(gain, frikortAvailable, cfg) {
  if (gain <= 0) return { tax: 0, frikortUsed: 0 };
  const frikortUsed = Math.min(gain, frikortAvailable);
  return { tax: (gain - frikortUsed) * cfg.kapRateLowApprox, frikortUsed };
}
function askTax(gain, cfg) { return gain > 0 ? gain * cfg.askRate : 0; }

const RISK_PRESETS = { cautious: 0.04, balanced: 0.065, adventurous: 0.085 };

/* ---- Plan: the Money Router ---- */
function simulateRouted(params, cfg) {
  const { annualBudget, years, returnRate, isChild } = params;
  const order = isChild ? ['bo', 'frikort', 'ask', 'onlist'] : ['ask', 'onlist'];
  const B = {}; order.forEach(id => B[id] = { value: 0, deposited: 0, tax: 0, lastDepYear: 0 });
  let boLifetime = 0, totalTax = 0;
  const Vstar = returnRate > 0 ? cfg.personfradrag / returnRate : Infinity;
  const series = [{ year: 0, total: 0, tax: 0 }];
  let firstYearRoute = null;

  for (let y = 1; y <= years; y++) {
    let rem = annualBudget;
    const route = [];
    for (const id of order) {
      let dep = 0;
      if (id === 'bo') {
        dep = Math.max(0, Math.min(rem, cfg.boYearlyCap, cfg.boLifetimeCap - boLifetime));
        boLifetime += dep;
      } else if (id === 'frikort') {
        dep = Math.max(0, Math.min(rem, Vstar - B.frikort.value));
      } else if (id === 'ask') {
        dep = Math.max(0, Math.min(rem, cfg.askCeiling - B.ask.value));
      } else { dep = rem; }
      B[id].value += dep; B[id].deposited += dep; rem -= dep;
      if (dep > 0) B[id].lastDepYear = y;
      route.push({ id, amount: dep });
    }
    if (y === 1) firstYearRoute = route;

    let frikortLeft = isChild ? cfg.personfradrag : 0;
    for (const id of order) {
      const gain = B[id].value * returnRate;
      let tax = 0;
      if (id === 'ask') tax = askTax(gain, cfg);
      else if (id === 'onlist') tax = aktieTax(gain, cfg);
      else if (id === 'frikort') {
        const r = kapTaxChild(gain, frikortLeft, cfg);
        tax = r.tax; frikortLeft -= r.frikortUsed;
      }
      B[id].value += gain - tax;
      B[id].tax += tax; totalTax += tax;
    }
    const depMap = { bo:0, frikort:0, ask:0, onlist:0 };
    route.forEach(r => { depMap[r.id] = r.amount; });
    const valMap = { bo:0, frikort:0, ask:0, onlist:0 };
    order.forEach(id => { valMap[id] = B[id].value; });
    series.push({ year: y, total: order.reduce((s, id) => s + B[id].value, 0), tax: totalTax, dep: depMap, val: valMap });
  }
  return { buckets: B, series, totalTax,
    endValue: order.reduce((s, id) => s + B[id].value, 0),
    firstYearRoute, Vstar, order };
}

function simulateNaive(params, cfg) {
  let value = 0, totalTax = 0;
  for (let y = 1; y <= params.years; y++) {
    value += params.annualBudget;
    const gain = value * params.returnRate;
    const tax = aktieTax(gain, cfg);
    value += gain - tax; totalTax += tax;
  }
  return { endValue: value, totalTax };
}

function compareSmartVsNaive(params, cfg) {
  const smart = simulateRouted(params, cfg);
  const naive = simulateNaive(params, cfg);
  return { smart, naive, taxSaved: naive.totalTax - smart.totalTax, endDiff: smart.endValue - naive.endValue };
}

/* ---- Play: the Wrapper Race + Gift Planner ---- */
function simulateWrapper(strategy, params, cfg) {
  const { annualDeposit, years, returnRate, isChild } = params;
  const swing = params.swing || 0;
  let primary = 0, spill = 0, totalTax = 0, boLifetime = 0, lossP = 0, lossS = 0;
  const series = [{ year: 0, total: 0 }];
  for (let y = 1; y <= years; y++) {
    let toPrimary = annualDeposit, toSpill = 0;
    if (strategy === 'bo') {
      const room = Math.min(cfg.boYearlyCap, cfg.boLifetimeCap - boLifetime);
      toPrimary = Math.max(0, Math.min(annualDeposit, room));
      boLifetime += toPrimary;
      toSpill = annualDeposit - toPrimary;
    } else if (strategy === 'ask') {
      const room = Math.max(0, cfg.askCeiling - primary);
      toPrimary = Math.min(annualDeposit, room);
      toSpill = annualDeposit - toPrimary;
    }
    primary += toPrimary; spill += toSpill;
    // alternating good/bad years around the average (deterministic, replayable)
    const rate = returnRate + (swing ? (y % 2 === 1 ? swing : -swing) : 0);
    const gP = primary * rate, gS = spill * rate;
    let frikortLeft = isChild ? cfg.personfradrag : 0;
    let taxP = 0, taxS = 0;
    // primary bucket: loss carryforward offsets later gains before tax
    if (strategy !== 'bo') {
      if (gP < 0) { lossP += -gP; }
      else {
        const off = Math.min(gP, lossP); lossP -= off;
        const tg = gP - off;
        if (strategy === 'ask') taxP = askTax(tg, cfg);
        else if (strategy === 'offlist') {
          if (isChild) { const r = kapTaxChild(tg, frikortLeft, cfg); taxP = r.tax; frikortLeft -= r.frikortUsed; }
          else taxP = kapTaxAdult(tg, cfg);
        }
        else if (strategy === 'onlist') taxP = aktieTax(tg, cfg);
      }
    }
    // spill bucket (always an off-list depot)
    if (spill > 0) {
      if (gS < 0) { lossS += -gS; }
      else {
        const off = Math.min(gS, lossS); lossS -= off;
        const tg = gS - off;
        taxS = isChild ? kapTaxChild(tg, frikortLeft, cfg).tax : kapTaxAdult(tg, cfg);
      }
    }
    primary += gP - taxP; spill += gS - taxS;
    totalTax += taxP + taxS;
    series.push({ year: y, total: primary + spill });
  }
  return { series, endValue: primary + spill, totalTax, primaryEnd: primary, spillEnd: spill };
}

function simulateRace(params, cfg) {
  const strategies = params.isChild ? ['bo','ask','offlist','onlist'] : ['ask','offlist','onlist'];
  const out = {};
  for (const s of strategies) out[s] = simulateWrapper(s, params, cfg);
  return out;
}

function giftPlan(plannedTotalPerYear, giverCount, cfg) {
  const capacity = giverCount * cfg.giftCapPerGiver;
  const excess = Math.max(0, plannedTotalPerYear - capacity);
  return { capacity, excess, giftTax: excess * cfg.giftTaxRate, withinCap: excess === 0 };
}
