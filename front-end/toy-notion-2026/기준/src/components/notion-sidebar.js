import { BaseComponent, createTemplate } from "./base-component.js";

export class NotionSidebar extends BaseComponent {
  static template = createTemplate(`
    <aside id="sidebar" class="sidebar" aria-label="Zeno Notion 문서 사이드바">
      <div class="inner">
        <button id="collapseBtn" class="collapse-btn" type="button" title="Collapse" aria-label="사이드바 접기">⟨⟨</button>

        <a class="user-box brand-box" href="#welcome" aria-label="Zeno Notion 홈으로 이동">
          <span class="avatar" aria-hidden="true"><img src="./assets/zeno-icon-512.png" alt=""></span>
          <span class="user-meta"><strong>Zeno Notion</strong><small>Vanilla workspace</small></span>
        </a>

        <nav class="nav-items" aria-label="주요 기능">
          <button class="item" id="actionSearchSidebar" type="button" data-action="open-search">
            <span>🔎 Search</span><span class="right"><kbd class="kbd">⌘</kbd><kbd class="kbd">K</kbd></span>
          </button>
          <button class="item" id="actionSettingsSidebar" type="button" data-action="open-settings"><span>⚙️ Settings</span></button>
          <button class="item" id="actionCreateRoot" type="button"><span>➕ New page</span></button>
        </nav>

        <div class="group-title" id="allPagesLabel">All pages</div>
        <div id="docListRoot" class="doc-list" role="tree" aria-labelledby="allPagesLabel"></div>
        <nav class="nav-items" aria-label="페이지 추가">
          <button class="item" id="actionAddPage" type="button"><span>➕ Add a page</span></button>
        </nav>
        <nav class="nav-items" aria-label="휴지통">
          <button class="item" id="trashTrigger" type="button" aria-haspopup="dialog"><span>🗑️ Trash</span></button>
        </nav>

        <div id="resizeHandle" class="resize-handle" role="separator" aria-orientation="vertical" aria-label="사이드바 너비 조절" tabindex="0" title="Drag to resize / Double click to reset"></div>
      </div>
    </aside>
    <button id="sidebarPeekBtn" class="peek-btn" type="button" title="Open sidebar" aria-label="사이드바 열기">☰</button>
  `);
}

customElements.define("notion-sidebar", NotionSidebar);
