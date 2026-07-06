/* ============================================================================
   CORE-FORGE — SHARED SITE BEHAVIOR
   ============================================================================ */

function cfRenderNav(activePage) {
  const nav = document.getElementById("cf-nav");
  if (!nav) return;

  const links = [
    { href: "index.html", label: "Home", key: "home" },
    { href: "scripts.html", label: "Scripts", key: "scripts" },
    { href: "./site/index.html", label: "Docs", key: "docs" },   // ← Add this
    { href: CF_CONFIG.BRAND.discord, label: "Discord", key: "discord", external: true },
  ];

  nav.innerHTML = `
    <div class="container nav__inner">
      <a href="index.html" class="nav__brand">
        <span class="nav__brand-mark">CF</span>
        ${CF_CONFIG.BRAND.name}
      </a>
      <ul class="nav__links">
        ${links
          .map(
            (l) => `
          <li>
            <a href="${l.href}" ${l.external ? 'target="_blank" rel="noopener"' : ""} class="${l.key === activePage ? "is-active" : ""}">
              ${l.label}
            </a>
          </li>`
          )
          .join("")}
      </ul>
      <div class="nav__actions">
        <a href="scripts.html" class="btn btn--primary btn--sm">Browse Scripts</a>
        <button class="nav__toggle" aria-label="Menu">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
      </div>
    </div>
  `;
}

function cfRenderFooter() {
  const footer = document.getElementById("cf-footer");
  if (!footer) return;

  footer.innerHTML = `
    <div class="container">
      <div class="footer__grid">
        <div>
          <div class="footer__brand">
            <span class="nav__brand-mark">CF</span>
            ${CF_CONFIG.BRAND.name}
          </div>
          <p class="footer__desc">${CF_CONFIG.BRAND.tagline} Built for QBCore, QBox, and ESX — engineered for FiveM servers that expect more.</p>
        </div>
        <div>
          <div class="footer__col-title">Store</div>
          <ul class="footer__links">
            <li><a href="scripts.html">All Scripts</a></li>
            <li><a href="${CF_CONFIG.BRAND.tebex}" target="_blank" rel="noopener">Tebex Storefront</a></li>
          </ul>
        </div>
        <div>
          <div class="footer__col-title">Resources</div>
          <ul class="footer__links">
            <li><a href="${CF_CONFIG.BRAND.github}" target="_blank" rel="noopener">GitHub</a></li>
            <li><a href="${CF_CONFIG.BRAND.youtube}" target="_blank" rel="noopener">YouTube</a></li>
          </ul>
        </div>
        <div>
          <div class="footer__col-title">Community</div>
          <ul class="footer__links">
            <li><a href="${CF_CONFIG.BRAND.discord}" target="_blank" rel="noopener">Discord</a></li>
          </ul>
        </div>
      </div>
      <div class="footer__bottom">
        <span>© ${new Date().getFullYear()} ${CF_CONFIG.BRAND.name}. All rights reserved.</span>
        <div class="footer__socials">
          <a href="${CF_CONFIG.BRAND.discord}" target="_blank" rel="noopener" aria-label="Discord">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.076.076 0 0 0-.04.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>
          </a>
          <a href="${CF_CONFIG.BRAND.github}" target="_blank" rel="noopener" aria-label="GitHub">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
          </a>
        </div>
      </div>
    </div>
  `;
}

function cfBadgeHtml(badge) {
  return `<span class="badge badge--${badge.type}">${badge.label}</span>`;
}

function cfScriptCardHtml(script) {
  const media = script.image
    ? `<img src="${script.image}" alt="${script.name}" loading="lazy" />`
    : `<div class="script-card__media-fallback">${script.name}</div>`;

  return `
    <a href="script.html?id=${encodeURIComponent(script.id)}" class="script-card">
      <div class="script-card__media">
        ${media}
        ${script.badges.length ? `<div class="script-card__badges">${script.badges.map(cfBadgeHtml).join("")}</div>` : ""}
      </div>
      <div class="script-card__body">
        <div>
          <div class="script-card__title">${script.name}</div>
          <div class="tag" style="margin-top:6px;display:inline-block;">${script.category}</div>
        </div>
        <p class="script-card__desc">${script.tagline}</p>
        <div class="script-card__tags">
          ${script.frameworks.map((f) => `<span class="tag">${f}</span>`).join("")}
        </div>
        <div class="script-card__footer">
          <div class="script-card__price">$${script.price.toFixed(2)} <small>USD</small></div>
          <span class="btn btn--secondary btn--sm">View</span>
        </div>
      </div>
    </a>
  `;
}

document.addEventListener("click", (e) => {
  const toggle = e.target.closest(".nav__toggle");
  if (toggle) {
    const links = document.querySelector(".nav__links");
    links.style.display = links.style.display === "flex" ? "none" : "flex";
    links.style.cssText += "flex-direction:column; position:absolute; top:72px; left:0; right:0; background:var(--color-surface); padding:24px; border-bottom:1px solid var(--color-border-subtle); z-index:200;";
  }
});
