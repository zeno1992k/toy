import { BaseComponent, createTemplate } from "./base-component.js";

export class NotionNavbar extends BaseComponent {
  static template = createTemplate(`
    <header class="navbar">
      <div class="row">
        <button id="menuBtn" class="menu-btn" type="button" title="Open sidebar" aria-label="사이드바 열기">☰</button>
        <nav id="breadcrumbs" class="breadcrumbs" aria-label="현재 문서 경로">Zeno Notion</nav>
      </div>
      <div class="row-end">
        <button id="openFavoritesModal" class="btn small" type="button" title="Favorites">★ Favorites</button>
        <button id="starBtn" class="btn small" type="button" title="Star/Unstar" aria-label="즐겨찾기 추가 또는 해제">☆</button>
        <button id="newChildBtn" class="btn small" type="button" title="New subpage">＋ Subpage</button>
        <button id="actionSearchNavbar" class="btn small" type="button" data-action="open-search" title="Search" aria-label="검색">🔎</button>
        <button id="actionSettingsNavbar" class="btn small" type="button" data-action="open-settings" title="Settings" aria-label="설정">⚙️</button>
      </div>
    </header>
  `);
}

customElements.define("notion-navbar", NotionNavbar);
