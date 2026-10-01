import { BaseComponent, createTemplate } from "./base-component.js";
import "./notion-sidebar.js";
import "./notion-navbar.js";
import "./notion-editor.js";
import "./notion-portals.js";

export class ZenoNotionApp extends BaseComponent {
  static template = createTemplate(`
    <div class="app">
      <notion-sidebar></notion-sidebar>
      <notion-navbar></notion-navbar>
      <notion-editor></notion-editor>
    </div>
    <notion-portals></notion-portals>
  `);
}

customElements.define("zeno-notion-app", ZenoNotionApp);
