/* ==========================================================
   麥斯頻道 conlee.tw ── 商品與賣場設定檔
   之後要改價格、售完、連結，只要改這個檔案就好。
   改完存檔、上傳到 GitHub，網站就會自動更新。
   ========================================================== */

const SHOP = {
  // ① 7-11 賣貨便賣場網址（一個賣場放全部講義）
  //    貼上後，所有「購買」按鈕都會改連到賣貨便。
  myshipUrl: "https://myship.7-11.com.tw/general/detail/GM2611149611846",

  // ② 賣貨便賣場名稱（會顯示在按鈕和購物說明上）
  myshipName: "麥斯頻道商行",


  // 頻道與社團
  youtubeUrl: "https://www.youtube.com/@cornlee",
  facebookGroupUrl: "https://www.facebook.com/groups/conlee.tw",
};

/* 每一項講義的欄位說明
   id        : 不要改（網址錨點用）
   cat       : 分類，只能是 "elem-math"、"jh-math"、"jh-sci"、"other"
   title     : 顯示名稱
   price     : 價格（數字）
   soldOut   : 售完填 true，有貨填 false
   hot       : 熱銷標籤 true / false
   image     : images 資料夾裡的圖片檔名
   note      : 一句簡介
   playlists : 對應的 YouTube 播放清單 { "顯示文字": "播放清單 ID" }
*/
const PRODUCTS = [
  // ───────── 國小數學 ─────────
  {
    id: "p5a", cat: "elem-math", title: "小五數學（上）", price: 1200, soldOut: false, hot: false,
    image: "p5a.webp",
    note: "康軒、南一、翰林三個版本可選，108 課綱。",
    playlists: { "康軒版": "PLKHqRb2SM4i59jIM8qnMLVyKgKNzR7SJM", "南一版": "PLKHqRb2SM4i4SGKrxOaQ2w1DSXeUufGJl", "翰林版": "PLKHqRb2SM4i5pSY7ZTVRzu1b5huby9U17" },
  },
  {
    id: "p5b", cat: "elem-math", title: "小五數學（下）", price: 1200, soldOut: false, hot: false,
    image: "p5b.webp",
    note: "康軒、南一、翰林三個版本可選，108 課綱。",
    playlists: { "康軒版": "PLKHqRb2SM4i6PV7w1Q6nLP5YqNNzv-gIX", "南一版": "PLKHqRb2SM4i6Nrb2aWmDhix8A3Dc5gc15", "翰林版": "PLKHqRb2SM4i4dfpuHj6zsWvaaGMj7bfIb" },
  },
  {
    id: "p6a", cat: "elem-math", title: "小六數學（上）", price: 1200, soldOut: false, hot: true,
    image: "p6a.webp",
    note: "康軒、南一、翰林三個版本可選，108 課綱。",
    playlists: { "康軒版": "PLKHqRb2SM4i4vRegtllCqo6qZp2mAiXmq", "南一版": "PLKHqRb2SM4i4g1pKcM1YMDDhbt0IKRg-U", "翰林版": "PLKHqRb2SM4i5oqIDzCyCmTv0prwFBVQW-" },
  },
  {
    id: "p6b", cat: "elem-math", title: "小六數學（下）", price: 1000, soldOut: true, hot: false,
    image: "p6b.webp",
    note: "康軒、南一、翰林三個版本，108 課綱。",
    playlists: { "康軒版": "PLKHqRb2SM4i6a3Ze4OdOQUKHi4npsAYDv", "南一版": "PLKHqRb2SM4i4rI85-s1PP8FfFPpH8U_24", "翰林版": "PLKHqRb2SM4i52nCgK78OyALkpIZBCi_sM" },
  },

  // ───────── 國中數學 ─────────
  {
    id: "m8a", cat: "jh-math", title: "國一數學（上）", price: 1400, soldOut: false, hot: true,
    image: "m8a.webp",
    note: "各版本綜合編排，108 課綱。",
    playlists: { "綜合版": "PLKHqRb2SM4i7hfktD9aGqx_TvAYFShDEa" },
  },
  {
    id: "m8b", cat: "jh-math", title: "國一數學（下）", price: 1400, soldOut: false, hot: false,
    image: "m8b.webp",
    note: "各版本綜合編排，108 課綱。",
    playlists: { "綜合版": "PLKHqRb2SM4i7b8YAx7rPnE-2XS0_pppIm" },
  },
  {
    id: "m9a", cat: "jh-math", title: "國二數學（上）", price: 1400, soldOut: false, hot: true,
    image: "m9a.webp",
    note: "各版本綜合編排，108 課綱。",
    playlists: { "綜合版": "PLKHqRb2SM4i76u1Hy7WifV-_HjTDEgIO_" },
  },
  {
    id: "m9b", cat: "jh-math", title: "國二數學（下）", price: 1490, soldOut: false, hot: false,
    image: "m9b.webp",
    note: "各版本綜合編排，108 課綱。",
    playlists: { "綜合版": "PLKHqRb2SM4i7XtZozbChRRRYF4Vs3Vyn2" },
  },
  {
    id: "m10a", cat: "jh-math", title: "國三數學（上）", price: 1490, soldOut: false, hot: false,
    image: "m10a.webp",
    note: "各版本綜合編排，108 課綱。",
    playlists: { "綜合版": "PLKHqRb2SM4i7hCZ2r3E1KwDP3Y0azn-Ao" },
  },

  // ───────── 國中自然 ─────────
  {
    id: "bio8a", cat: "jh-sci", title: "國一生物（上）麥斯加工升級版", price: 1400, soldOut: false, hot: false,
    image: "bio8a.webp",
    note: "含代購指定參考書＋專屬影音導覽貼紙。",
    playlists: {},
  },
  {
    id: "bio8b", cat: "jh-sci", title: "國一生物（下）麥斯加工升級版", price: 1400, soldOut: false, hot: false,
    image: "bio8b.webp",
    note: "含代購指定參考書＋專屬影音導覽貼紙。",
    playlists: {},
  },
  {
    id: "phy9a", cat: "jh-sci", title: "國二理化（上）", price: 1590, soldOut: false, hot: false,
    image: "phy9a.webp",
    note: "108 課綱。",
    playlists: { "": "PLKHqRb2SM4i5aoxQWl0u8fiSjPAnbDQz4" },
  },
  {
    id: "phy9b", cat: "jh-sci", title: "國二理化（下）", price: 1590, soldOut: false, hot: false,
    image: "phy9b.webp",
    note: "108 課綱。",
    playlists: { "綜合版": "PLKHqRb2SM4i4VhqUvsQadDCKnjR_FUwwO" },
  },
  {
    id: "phy10a", cat: "jh-sci", title: "國三理化（上）", price: 1400, soldOut: false, hot: false,
    image: "phy10a.webp",
    note: "理化單冊，地科另外販售。",
    playlists: { "": "PLKHqRb2SM4i7tDD5txACrG5zaJ8bWW8Al" },
  },
  {
    id: "geo10a", cat: "jh-sci", title: "國三地科（上）", price: 1000, soldOut: false, hot: false,
    image: "geo10a.webp",
    note: "地科單冊，理化另外販售。",
    playlists: { "": "PLKHqRb2SM4i78XseUkoSGjCHMYOdPA6Tc" },
  },

  // ───────── 其他 ─────────
  {
    id: "pen", cat: "other", title: "超靜音觸控筆（電子白板用）", price: 250, soldOut: true, hot: false,
    image: "pen.webp",
    note: "相容 ViewSonic ViewBoard 等紅外線電子白板，NT$250 起。",
    playlists: {},
  },
];

const CATEGORIES = [
  { key: "all", label: "全部" },
  { key: "elem-math", label: "國小數學" },
  { key: "jh-math", label: "國中數學" },
  { key: "jh-sci", label: "國中自然" },
  { key: "other", label: "其他" },
];
