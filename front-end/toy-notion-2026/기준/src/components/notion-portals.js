import { BaseComponent, createTemplate } from "./base-component.js";

export class NotionPortals extends BaseComponent {
  static template = createTemplate(`
    <section id="trashPopover" class="popover" style="width:360px" aria-label="휴지통">
      <div class="search"><span aria-hidden="true">🔎</span><label class="sr-only" for="trashSearch">휴지통 검색</label><input id="trashSearch" placeholder="Filter by page title..."></div>
      <div id="trashList" class="trash-list" role="listbox"></div>
    </section>

    <section id="emojiPicker" class="popover" style="width:340px" aria-label="문서 아이콘 선택">
      <div class="emoji-grid" id="emojiGrid"></div>
    </section>

    <div id="searchOverlay" class="overlay" role="dialog" aria-modal="true" aria-label="문서 검색">
      <div class="search-modal">
        <label class="sr-only" for="searchInput">문서 검색어</label>
        <input id="searchInput" class="search-input" placeholder="Search pages..." autocomplete="off">
        <div id="searchResults" class="search-results" role="listbox"></div>
        <div class="hint">↑/↓ navigate, Enter open, ESC close</div>
      </div>
    </div>

    <div id="settingsOverlay" class="overlay" role="dialog" aria-modal="true" aria-labelledby="settingsTitle">
      <section class="settings-modal">
        <header class="settings-header">
          <div class="settings-brand">
            <img src="./assets/zeno-chatbot.png" alt="" aria-hidden="true">
            <div><h3 id="settingsTitle">Zeno Notion</h3><span>Settings</span></div>
          </div>
          <button id="settingsClose" class="btn small" type="button">Close</button>
        </header>
        <div class="settings-grid">
          <div class="settings-row"><div><div class="label">Use light theme</div><div class="sublabel">Toggle between light and dark modes</div></div><label class="switch"><input id="themeToggle" type="checkbox"><span>Light</span></label></div>
          <div class="settings-row"><div><div class="label">Export data</div><div class="sublabel">Download your notes as JSON</div></div><button id="exportBtn" class="btn small" type="button">Export</button></div>
          <div class="settings-row"><div><div class="label">Import data</div><div class="sublabel">Restore from a JSON backup</div></div><label class="btn small import-label">Import<input id="importFile" type="file" accept="application/json"></label></div>
        </div>
      </section>
    </div>

    <div id="favoritesOverlay" class="overlay" role="dialog" aria-modal="true" aria-labelledby="favoritesTitle">
      <section class="favorites-modal"><header class="row favorites-header"><h3 id="favoritesTitle">Favorites</h3><button id="favoritesClose" class="btn small" type="button">Close</button></header><div id="favoritesListModal" class="favorites-list"></div></section>
    </div>

    <div id="modalOverlay" class="modal-overlay" role="alertdialog" aria-modal="true" aria-labelledby="modalTitle" aria-describedby="modalMessage">
      <section class="modal"><h3 id="modalTitle">Confirm</h3><div id="modalMessage" class="modal-message"></div><div class="row-end"><button id="modalCancel" class="btn" type="button">Cancel</button><button id="modalConfirm" class="btn danger" type="button">Confirm</button></div></section>
    </div>

    <div id="toasts" class="toasts" aria-live="polite" aria-atomic="true"></div>
  `);
}

customElements.define("notion-portals", NotionPortals);
