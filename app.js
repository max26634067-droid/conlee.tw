/* 麥斯頻道 conlee.tw ── 畫面程式（一般不需要修改，改商品請改 products.js） */
(function () {
  const SITE = "https://conlee.tw/";
  const hasMyship = !!(SHOP.myshipUrl && SHOP.myshipUrl.trim());
  const buyUrl = () => SHOP.myshipUrl.trim();
  const ytList = (id) => `https://www.youtube.com/playlist?list=${encodeURIComponent(id)}`;
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const money = (n) => "NT$" + Number(n).toLocaleString("en-US");
  // 商品照片：images/g/id-1.webp … 沒有就用封面
  const photos = (p) => p.photos
    ? Array.from({ length: p.photos }, (_, i) => `images/g/${p.id}-${i + 1}.webp`)
    : ["images/" + p.image];

  // 購買說明文字依是否已設定賣貨便切換
  if (!hasMyship) {
    document.getElementById("step2-title").textContent = "前往賣場下單";
    document.getElementById("step2-text").textContent =
      "按「購買」會前往麥斯頻道的線上賣場，結帳時選擇 7-11 門市取貨。";
  } else if (SHOP.myshipName) {
    document.getElementById("step2-text").textContent =
      `按「購買」會前往 7-11 賣貨便「${SHOP.myshipName}」賣場。所有講義都在同一個賣場，可以一次買好幾本、合併結帳。`;
  }
  document.getElementById("year").textContent = new Date().getFullYear();

  // 分類按鈕
  const chips = document.getElementById("chips");
  const grid = document.getElementById("grid");
  let current = "all";
  const fromHash = () => {
    const m = location.hash.match(/^#cat-(.+)$/);
    return m && CATEGORIES.some((c) => c.key === m[1]) ? m[1] : null;
  };
  current = fromHash() || "all";

  function renderChips() {
    chips.innerHTML = CATEGORIES.map(
      (c) => `<button class="chip" role="tab" aria-selected="${c.key === current}" data-k="${c.key}">${esc(c.label)}</button>`
    ).join("");
  }
  chips.addEventListener("click", (e) => {
    const b = e.target.closest(".chip");
    if (!b) return;
    current = b.dataset.k;
    history.replaceState(null, "", current === "all" ? "#books" : "#cat-" + current);
    renderChips();
    renderGrid();
  });

  function card(p) {
    const vids = Object.entries(p.playlists || {})
      .map(([label, id]) => `<a class="vid" href="${ytList(id)}" target="_blank" rel="noopener">${label ? "免費影音・" + esc(label) : "免費影音"}</a>`)
      .join("");
    const vidsBlock = vids
      ? `<div class="vids">${vids}</div>`
      : `<div class="vids"><a class="vid" href="${SHOP.youtubeUrl}" target="_blank" rel="noopener">YouTube 頻道影音</a></div>`;
    const buyLabel = hasMyship ? "7-11 賣貨便購買" : "前往購買";
    const action = p.soldOut
      ? `<span class="btn btn-disabled" aria-disabled="true">售完</span>`
      : `<a class="btn btn-primary" href="${buyUrl(p)}" target="_blank" rel="noopener">${buyLabel}</a>` +
        "";
    const badge = p.soldOut
      ? `<span class="badge out">售完</span>`
      : p.hot ? `<span class="badge hot">熱銷</span>` : "";
    return `
      <article class="card${p.soldOut ? " is-out" : ""}" id="${esc(p.id)}">
        <a class="media" href="#${esc(p.id)}" aria-label="看 ${esc(p.title)} 的照片與介紹">
          <img src="images/${esc(p.image)}" alt="${esc(p.title)} 實體精編紙本講義封面" loading="lazy" width="640" height="640">
          ${badge}
          ${(p.photos || 0) > 1 ? `<span class="pcount">${p.photos} 張照片</span>` : ""}
        </a>
        <div class="body">
          <h3><a href="#${esc(p.id)}">${esc(p.title)}</a></h3>
          <p class="note">${esc(p.note)}</p>
          <div class="price">${money(p.price)}${p.id === "pen" ? "<small>起</small>" : ""}</div>
          ${vidsBlock}
          <div class="actions"><a class="btn btn-line" href="#${esc(p.id)}">看照片與介紹</a>${action}</div>
        </div>
      </article>`;
  }

  function renderGrid() {
    const list = PRODUCTS.filter((p) => current === "all" || p.cat === current);
    grid.innerHTML = list.map(card).join("");
  }

  renderChips();
  renderGrid();

  // 搜尋引擎用的商品結構化資料（Google 搜尋結果可顯示價格、是否有貨）
  const ld = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "麥斯頻道 實體精編紙本講義",
    itemListElement: PRODUCTS.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: p.cat === "other" ? p.title : `${p.title} 實體精編紙本講義`,
        description: p.note,
        image: photos(p).map((f) => SITE + f),
        url: SITE + "#" + p.id,
        brand: { "@type": "Brand", name: "麥斯頻道" },
        offers: {
          "@type": "Offer",
          price: p.price,
          priceCurrency: "TWD",
          availability: p.soldOut ? "https://schema.org/SoldOut" : "https://schema.org/InStock",
          url: buyUrl(p),
          seller: { "@type": "Organization", name: "麥斯頻道" },
        },
      },
    })),
  };
  const s = document.createElement("script");
  s.type = "application/ld+json";
  s.textContent = JSON.stringify(ld);
  document.head.appendChild(s);

  // ───────── 商品介紹頁（網址 conlee.tw/#m8a 可直接分享） ─────────
  const COMMON_BOOK = [
    "實體精編紙本講義，搭配麥斯頻道 YouTube 免費公開影音，在家就能自修。",
    "書上印有 QR Code，用手機掃描就能連到對應章節的詳細影音；記得要掃描連結上去。",
    "附「線上影音導覽網頁」：影片按章節整理好，手機、平板、電腦都能看，沒有廣告。",
    "講義只提供簡答，沒有詳細計算過程。",
    "影片都是 YouTube 免費公開資源，本站沒有販售線上課程。",
  ];
  const COMMON_BIO = ["影片都是 YouTube 免費公開資源，本站沒有販售線上課程。"];
  const BASE_TITLE = document.title;
  const pd = document.getElementById("pd");
  const pdBody = document.getElementById("pd-body");
  let openedFromSite = false;
  let lastScroll = 0;

  function detailHtml(p) {
    const imgs = photos(p);
    const slides = imgs.map((src, i) =>
      `<div class="slide"><img src="${src}" alt="${esc(p.title)} 照片 ${i + 1}"${i ? ' loading="lazy"' : ""}></div>`).join("");
    const thumbs = imgs.length > 1
      ? `<div class="thumbs">${imgs.map((src, i) => `<button class="thumb${i ? "" : " on"}" data-i="${i}" aria-label="第 ${i + 1} 張"><img src="${src}" alt="" loading="lazy"></button>`).join("")}</div>`
      : "";
    const common = p.cat === "other" ? [] : p.id.startsWith("bio") ? COMMON_BIO : COMMON_BOOK;
    const bullets = [...(p.desc || []), ...common].map((t) => `<li>${esc(t)}</li>`).join("");
    const vids = Object.entries(p.playlists || {})
      .map(([label, id]) => `<a class="vid" href="${ytList(id)}" target="_blank" rel="noopener">${label ? "免費影音・" + esc(label) : "免費影音"}</a>`).join("");
    const buy = p.soldOut
      ? `<span class="btn btn-disabled" aria-disabled="true">售完</span>`
      : `<a class="btn btn-primary" href="${buyUrl(p)}" target="_blank" rel="noopener">${hasMyship ? "到 7-11 賣貨便購買" : "前往購買"}</a>`;
    return `
      <div class="gallery">
        <div class="track" id="pd-track">${slides}</div>
        ${imgs.length > 1 ? `<button class="nav-btn prev" aria-label="上一張">‹</button><button class="nav-btn next" aria-label="下一張">›</button><span class="counter" id="pd-counter">1 / ${imgs.length}</span>` : ""}
      </div>
      ${thumbs}
      <div class="pd-info">
        <h2 id="pd-title">${esc(p.title)}</h2>
        <div class="price">${money(p.price)}${p.id === "pen" ? "<small>起</small>" : ""}</div>
        <p class="note">${esc(p.note)}</p>
        <ul class="pd-list">${bullets}</ul>
        ${vids ? `<h3>先看免費影音</h3><p class="small qr-note">這裡的 YouTube 影片僅供參考，詳細內容請掃描書上的 QR Code 連結觀看。</p><div class="vids">${vids}</div>` : ""}
        <div class="pd-buy">${buy}
          ${p.soldOut ? "" : `<p class="small">所有講義都在同一個賣場，可以一次買好幾本、合併結帳，滿 NT$2,000 免運。</p>`}
        </div>
      </div>`;
  }

  function openDetail(p) {
    if (!pd.hidden && pd.dataset.id === p.id) return;
    if (pd.hidden) lastScroll = window.scrollY;
    pd.dataset.id = p.id;
    pdBody.innerHTML = detailHtml(p);
    pd.hidden = false;
    document.body.classList.add("pd-open");
    pd.querySelector(".pd-panel").scrollTop = 0;
    document.title = `${p.title}｜麥斯頻道`;
    const track = document.getElementById("pd-track");
    const n = track.children.length;
    const cur = () => Math.round(track.scrollLeft / track.clientWidth);
    const go = (i) => track.scrollTo({ left: Math.max(0, Math.min(n - 1, i)) * track.clientWidth, behavior: "smooth" });
    pd.querySelector(".prev")?.addEventListener("click", () => go(cur() - 1));
    pd.querySelector(".next")?.addEventListener("click", () => go(cur() + 1));
    pd.querySelectorAll(".thumb").forEach((b) => b.addEventListener("click", () => go(+b.dataset.i)));
    track.addEventListener("scroll", () => {
      const i = cur();
      const c = document.getElementById("pd-counter");
      if (c) c.textContent = `${i + 1} / ${n}`;
      pd.querySelectorAll(".thumb").forEach((b) => b.classList.toggle("on", +b.dataset.i === i));
    }, { passive: true });
  }

  function closeDetail() {
    if (pd.hidden) return;
    const id = pd.dataset.id;
    pd.hidden = true;
    pdBody.innerHTML = "";
    document.body.classList.remove("pd-open");
    document.title = BASE_TITLE;
    if (lastScroll) window.scrollTo(0, lastScroll);
    else document.getElementById(id)?.scrollIntoView();
  }

  function route() {
    const p = PRODUCTS.find((x) => x.id === location.hash.slice(1));
    if (p) openDetail(p); else closeDetail();
  }
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (a && PRODUCTS.some((p) => "#" + p.id === a.getAttribute("href"))) openedFromSite = true;
  });
  function requestClose() {
    if (openedFromSite) { openedFromSite = false; history.back(); }
    else { history.replaceState(null, "", "#books"); closeDetail(); }
  }
  pd.querySelector(".pd-close").addEventListener("click", requestClose);
  pd.addEventListener("click", (e) => { if (e.target === pd) requestClose(); });
  document.addEventListener("keydown", (e) => {
    if (pd.hidden) return;
    if (e.key === "Escape") requestClose();
    if (e.key === "ArrowRight") pd.querySelector(".next")?.click();
    if (e.key === "ArrowLeft") pd.querySelector(".prev")?.click();
  });
  window.addEventListener("hashchange", route);
  route();
})();
