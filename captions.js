/* ─────────────────────────────────────────────────────────────
   ALTYAZILAR / CAPTIONS — düzenlenebilir.
   Kısa, tek fikir, 5. sınıf dili. start/end saniye cinsinden.
   note: öğretmen için önerilen seslendirme cümlesi.
   ───────────────────────────────────────────────────────────── */
(function (root) {
  const CAPTIONS = [
    { scene: 1, start: 4.4, end: 10.2, tr: '3 + 4 × 5: 35 mi, 23 mü?', en: '3 + 4 × 5: 35 or 23?',
      note: 'Ece ile Can aynı işlemi yaptı: 3 artı 4 çarpı 5. Ece önce topladı ve 35 buldu; Can önce çarptı ve 23 buldu. Hangisi doğru?' },
    { scene: 2, start: 10.8, end: 19.2, tr: 'Silgi 3 TL, 4 defter 4 × 5 = 20 TL', en: 'A 3 TL rubber, 4 notebooks: 4 × 5 = 20 TL',
      note: 'Bu işlem bir alışverişi anlatıyor olsun: 3 liralık bir silgi ve 5 liralık 4 defter. Defterler 4 çarpı 5, 20 lira. Toplam 3 artı 20, 23 lira.' },
    { scene: 2, start: 19.6, end: 27.8, tr: 'Önce çarpma: 23', en: 'Multiply first: 23',
      note: 'Doğru cevap 23: önce çarpma yapılır. 35 bulmak için 3 ile 4’ü toplamak gerekirdi; bu 7 tane 5 liralık ürün demek olurdu.' },
    { scene: 3, start: 28.6, end: 38.6, tr: 'Parantez, çarpma-bölme, toplama-çıkarma', en: 'Brackets, × and ÷, + and −',
      note: 'İşlem önceliği kuralı: önce parantez içi, sonra çarpma ve bölme, en son toplama ve çıkarma. 20 eksi 12 bölü 4: önce bölme, 3; sonra 20 eksi 3, 17.' },
    { scene: 3, start: 39.0, end: 45.8, tr: 'Parantez önce: (20 − 12) ÷ 4 = 2', en: 'Brackets first: (20 − 12) ÷ 4 = 2',
      note: 'Parantez varsa önce parantez içi yapılır: 20 eksi 12, 8; 8 bölü 4, 2. Parantez sonucu değiştirdi.' },
    { scene: 4, start: 46.6, end: 57.0, tr: '18 ÷ 3 × 2 = 12', en: '18 ÷ 3 × 2 = 12',
      note: 'Çarpma ve bölme aynı önceliktedir; soldan sağa yapılır. 18 bölü 3, 6; 6 çarpı 2, 12. Toplama ve çıkarma da öyle: 10 eksi 4, 6; 6 artı 3, 9.' },
    { scene: 4, start: 57.4, end: 63.8, tr: 'Aynı öncelik: soldan sağa', en: 'Same level: left to right',
      note: 'Aynı öncelikte olan işlemleri soldan sağa yaparız.' },
    { scene: 5, start: 64.6, end: 72.6, tr: '5 × 6 − 4 = 26 kalem', en: '5 × 6 − 4 = 26 pencils',
      note: 'Problemlerde de işlem önceliğini kullanırız. 5 paket, her birinde 6 kalem, 4 kalem kayıp: 5 çarpı 6, 30; 30 eksi 4, 26 kalem.' },
    { scene: 5, start: 73.0, end: 79.8, tr: '30 − 3 × 8 = 6 TL para üstü', en: '30 − 3 × 8 = 6 TL change',
      note: '30 lirayla 8 liralık 3 kitap: önce kitapların tutarı, 3 çarpı 8, 24; para üstü 30 eksi 24, 6 lira. İşlem sırası problemin anlamına uyar.' },
    { scene: 6, start: 80.6, end: 86.4, tr: 'Parantez, × ÷, + −', en: 'Brackets, × ÷, + −',
      note: 'Aklında kalsın: önce parantez içi, sonra çarpma ve bölme, en son toplama ve çıkarma; aynı öncelikte soldan sağa.' },
    { scene: 6, start: 86.8, end: 91.0, tr: 'Önce hangisi? Kurala uy!', en: 'Which comes first? Follow the rule!',
      note: 'Önce hangisi? Kurala uy!' },
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = CAPTIONS;
  else { root.LI = root.LI || {}; root.LI.CAPTIONS = CAPTIONS; }
})(typeof window !== 'undefined' ? window : globalThis);
