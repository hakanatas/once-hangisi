/* SAHNE 1 — İKİ SONUÇ (0–10 s)  3 + 4 × 5: 35 or 23?
   The whole film's drawing lives in LI.world(t); each scene only sets the camera. */
(function (LI) {
  'use strict';
  const { seg } = LI.E;
  const KD = LI.KD, F = () => LI.Film, A = LI.Ang, Ink = LI.Ink;
  const END = (t) => 1 - seg(t, 90.4, 91.4);

  function win(t, a, b, fi = 0.4, fo = 0.4) { return seg(t, a, a + fi) * (1 - seg(t, b - fo, b)); }
  function exprs(ctx, t, P, list, sz) {
    const f = F();
    list.forEach(([a, b, items, hot]) => {
      const al = win(t, a, b); if (al <= 0) return;
      f.expr(ctx, typeof items === 'string' ? [items] : items, P.x, P.y, sz ?? P.s, { alpha: al, w: P.w, halo: true, color: hot ? A.amber : undefined });
    });
  }
  const at = (P, k, y) => ({ x: P.x, y: y ?? P.y[k], s: P.s, w: P.w });
  const amber = (a) => `rgba(${LI.AMBER_RGB},${a})`;

  /** a column of steps; each step is [text, the part to do next (underlined), t0]; hot = last line in amber */
  function steps(ctx, L, col, list, t, a, head, size) {
    const f = F(), [x, y0] = L.COL[col], s = size ?? L.G.s * 1.05;
    if (head) f.T(ctx, head[0], x, y0 - s * 1.1, Object.assign({ size: s * 0.72, alpha: a * seg(t, head[1], head[1] + 0.4), halo: true }, f.AMB));
    list.forEach(([txt, part, t0, bad], i) => {
      const k = seg(t, t0, t0 + 0.4) * a; if (k <= 0) return;
      const y = y0 + i * L.DY, w = f.width(ctx, txt, s), left = x - w / 2, last = i === list.length - 1;
      f.T(ctx, txt, left, y, Object.assign({ size: s, alpha: k, align: 'left', halo: true }, last && !bad ? f.AMB : {}));
      if (part) {
        const j = txt.indexOf(part), u0 = left + f.width(ctx, txt.slice(0, j), s), u1 = u0 + f.width(ctx, part, s);
        const nextOn = i + 1 < list.length ? seg(t, list[i + 1][2] - 0.8, list[i + 1][2] - 0.2) : 0;
        if (nextOn > 0) Ink.path(ctx, [[u0, y + s * 0.62], [u1, y + s * 0.62]], { w: 5, p: nextOn, alpha: k, color: LI.AMBER_RGB, seed: 3900 + col * 10 + i, taper: [0, 0] });
      }
      if (bad && last) f.crossInk(ctx, left + w + 40, y, 18, seg(t, t0 + 0.4, t0 + 1.0), a);
    });
  }

  function context(ctx, env, t) {
    exprs(ctx, t, KD.L(env).CX, [
      [4.4, 10.2, 'Aynı işlem, iki farklı sonuç?'],
      [10.6, 27.8, 'Durumu düşünelim: 3 TL’lik silgi ve 5 TL’lik 4 defter'],
      [28.4, 45.8, 'İşlem önceliği kuralı'],
      [46.4, 63.8, 'Aynı öncelikteyse: soldan sağa'],
      [64.4, 79.8, 'Problemlerde işlem önceliği'],
    ]);
  }

  function figure(ctx, env, t) {
    const L = KD.L(env), f = F(), a = END(t);
    const s1 = win(t, 4.6, 10.2) * a;
    if (s1 > 0) {
      steps(ctx, L, 0, [['3 + 4 × 5', '3 + 4', 4.8], ['= 7 × 5', '7 × 5', 5.8], ['= 35', null, 6.8, true]], t, s1, ['Ece', 4.8]);
      steps(ctx, L, 1, [['3 + 4 × 5', '4 × 5', 5.2], ['= 3 + 20', '3 + 20', 6.2], ['= 23', null, 7.2]], t, s1, ['Can', 5.2]);
      if (t < 10.2) { const k = seg(t, 8.2, 8.6) * s1; const x = L.COL[0][0] === L.COL[1][0] ? L.COL[0][0] + 280 : (L.COL[0][0] + L.COL[1][0]) / 2; if (k > 0) f.T(ctx, '?', x, L.COL[0][1] + L.DY, Object.assign({ size: L.G.s * 2, alpha: k }, f.AMB)); }
    }
    // the shopping trip
    const s2 = win(t, 10.8, 27.8) * a;
    if (s2 > 0) {
      const S = L.SH, items = [['silgi', '3 TL', 11.0, 70, 44]].concat([0, 1, 2, 3].map((i) => ['defter', '5 TL', 11.6 + i * 0.3, 64, 86]));
      const gap = 120, x0 = S.x - (items.length - 1) * gap / 2;
      items.forEach(([name, price, t0, w, h], i) => {
        const k = seg(t, t0, t0 + 0.4) * s2; if (k <= 0) return;
        const x = x0 + i * gap, y = S.y;
        ctx.fillStyle = amber((i ? 0.35 : 0.7) * k); ctx.fillRect(x - w / 2, y - h / 2, w, h);
        Ink.path(ctx, [[x - w / 2, y - h / 2], [x + w / 2, y - h / 2], [x + w / 2, y + h / 2], [x - w / 2, y + h / 2], [x - w / 2, y - h / 2]], { w: 4, alpha: k, seed: 3950 + i, taper: [0, 0] });
        f.T(ctx, price, x, y + 80, Object.assign({ size: L.G.s * 0.7, alpha: k }, f.AMB));
        f.T(ctx, name, x, y - 72, { size: L.G.s * 0.55, alpha: k });
      });
      const b = seg(t, 15.0, 15.6) * s2;
      if (b > 0) { const xa = x0 + gap - 50, xb = x0 + 4 * gap + 50; Ink.path(ctx, [[xa, S.y + 118], [xa, S.y + 128], [xb, S.y + 128], [xb, S.y + 118]], { w: 3.5, alpha: b, color: LI.AMBER_RGB, seed: 3960, taper: [0, 0] }); f.T(ctx, '4 × 5 = 20 TL', (xa + xb) / 2, S.y + 160, Object.assign({ size: L.G.s * 0.75, alpha: b }, f.AMB)); }
      const c = seg(t, 22.0, 22.6) * s2;
      if (c > 0) { f.T(ctx, '(3 + 4) × 5 = 35 → 7 tane 5 TL’lik ürün olurdu', S.x, S.y + 230, { size: L.G.s * 0.7, alpha: c, halo: true }); }
    }
    // the rule, applied
    const s3 = win(t, 33.6, 45.8) * a;
    if (s3 > 0) {
      steps(ctx, L, 0, [['20 − 12 ÷ 4', '12 ÷ 4', 34.0], ['= 20 − 3', '20 − 3', 35.4], ['= 17', null, 36.8]], t, s3);
      steps(ctx, L, 1, [['(20 − 12) ÷ 4', '(20 − 12)', 39.0], ['= 8 ÷ 4', '8 ÷ 4', 40.4], ['= 2', null, 41.8]], t, s3);
    }
    const s4 = win(t, 46.6, 63.8) * a;
    if (s4 > 0) {
      steps(ctx, L, 0, [['18 ÷ 3 × 2', '18 ÷ 3', 47.4], ['= 6 × 2', '6 × 2', 48.8], ['= 12', null, 50.2]], t, s4);
      steps(ctx, L, 1, [['10 − 4 + 3', '10 − 4', 53.4], ['= 6 + 3', '6 + 3', 54.8], ['= 9', null, 56.2]], t, s4);
    }
    const s5 = win(t, 64.6, 79.8) * a;
    if (s5 > 0) {
      steps(ctx, L, 0, [['5 × 6 − 4', '5 × 6', 65.4], ['= 30 − 4', '30 − 4', 66.8], ['= 26 kalem', null, 68.2]], t, s5, ['5 paket, her birinde 6 kalem; 4 kalem kayıp', 65.0], L.G.s * 0.95);
      steps(ctx, L, 1, [['30 − 3 × 8', '3 × 8', 69.4], ['= 30 − 24', '30 − 24', 70.8], ['= 6 TL', null, 72.2]], t, s5, ['30 TL ile 8 TL’lik 3 kitap; para üstü?', 69.0], L.G.s * 0.95);
    }
  }

  function words(ctx, env, t) {
    const W = KD.L(env).W;
    exprs(ctx, t, at(W, 0), [[6.8, 10.2, 'Hangisi doğru: 35 mi, 23 mü?'], [11.4, 27.8, 'Silgi: 3 TL · 4 defter: 4 × 5 = 20 TL'],
      [29.0, 45.8, '1) Önce parantez içi'], [47.0, 63.8, 'Çarpma ve bölme aynı önceliktedir'], [65.0, 79.8, 'Önce paketlerdeki kalemler: 5 × 6 = 30']]);
    exprs(ctx, t, at(W, 1), [[15.0, 27.8, 'Toplam: 3 + 20 = 23 TL'], [30.4, 45.8, '2) Sonra çarpma ve bölme, soldan sağa'],
      [53.0, 63.8, 'Toplama ve çıkarma da aynı önceliktedir'], [69.0, 79.8, 'Para üstü: önce kitapların tutarı 3 × 8 = 24']]);
    exprs(ctx, t, at(W, 2), [[19.6, 27.8, '3 + 4 × 5 = 23: önce çarpma yapılır', true], [31.8, 45.8, '3) En son toplama ve çıkarma, soldan sağa'],
      [57.4, 63.8, 'Aynı öncelikte olanlar soldan sağa yapılır', true], [73.0, 79.8, 'İşlem sırası, problemin anlamına uyar', true]]);
  }

  function summary(ctx, env, t) {
    if (t < 80.4) return;
    const S = KD.L(env).SUM, f = F(), a = END(t);
    [['1) Parantez içi', 80.6], ['2) Çarpma ve bölme, soldan sağa', 81.6], ['3) Toplama ve çıkarma, soldan sağa', 82.6], ['Önce hangisi? Kurala uy!', 83.6, true]].forEach(([s, t0, hot], i) => {
      const al = seg(t, t0, t0 + 0.4) * a; if (al <= 0) return;
      f.expr(ctx, [s], S.x, S.y[i], S.s * (i === 3 ? 1.15 : 1), { alpha: al, w: S.w, halo: true, color: hot ? A.amber : undefined });
    });
  }

  LI.fireworks = function (ctx, env, t) {
    const k = seg(t, 84.4, 86.4);
    if (k <= 0 || t >= 91) return;
    const n = F().nokta(t, env), C = [n.x, n.y - 170];
    [30, 60, 90, 120, 150].forEach((d, i) => {
      const r = 150 + 30 * Math.sin(t * 2 + i);
      A.arc(ctx, C, r, d - 12, d + 12, { p: seg(k, i * 0.12, i * 0.12 + 0.4), alpha: 0.8 * (1 - seg(t, 90.2, 91)), w: 6, seed: 80 + i });
    });
  };

  LI.world = function (ctx, env, t) { context(ctx, env, t); figure(ctx, env, t); words(ctx, env, t); summary(ctx, env, t); };

  function camera(t, env) {
    const L = KD.L(env);
    return LI.Camera.breathe(LI.Camera.track([
      [0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [3.0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [4.8, KD.cam(env, { zoom: 1 })],
    ], t), t, 0.5);
  }
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.world(ctx, env, t)); }
  LI.registerScene({ id: 1, start: 0, end: 10, name: 'Two answers', nameTr: 'İki sonuç', concept: '35 or 23?', conceptTr: '35 mi, 23 mü?', render });
})(window.LI = window.LI || {});
