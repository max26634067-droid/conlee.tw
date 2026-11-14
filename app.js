/* 麥斯頻道 conlee.tw ── 畫面程式（一般不需要修改，改商品請改 products.js） */
(function () {
  const SITE = "https://conlee.tw/";
  const hasMyship = !!(SHOP.myshipUrl && SHOP.myshipUrl.trim());
  const buyUrl = () => SHOP.myshipUrl.trim();
  const ytList = (id) => `https://www.youtube.com/playlist?list=${encodeURIComponent(id)}`;
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const money = (n) => "NT$" + Number(n).toLocaleString("en-US");

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
        <div class="media">
          <img src="images/${esc(p.image)}" alt="${esc(p.title)} 實體精編紙本講義封面" loading="lazy" width="640" height="640">
          ${badge}
        </div>
        <div class="body">
          <h3>${esc(p.title)}</h3>
          <p class="note">${esc(p.note)}</p>
          <div class="price">${money(p.price)}${p.id === "pen" ? "<small>起</small>" : ""}</div>
          ${vidsBlock}
          <div class="actions">${action}</div>
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
        image: SITE + "images/" + p.image,
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

  // 從分享連結（例如 conlee.tw/#m8a）進來時，捲到那本講義
  const target = location.hash.slice(1);
  if (target && PRODUCTS.some((p) => p.id === target)) {
    requestAnimationFrame(() => document.getElementById(target)?.scrollIntoView());
  }
})();
