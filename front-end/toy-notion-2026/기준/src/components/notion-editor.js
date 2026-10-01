import { BaseComponent, createTemplate } from "./base-component.js";

export class NotionEditor extends BaseComponent {
  static template = createTemplate(`
    <main>
      <article class="doc-canvas" aria-labelledby="titleInput">
        <header class="doc-header">
          <button id="iconBtn" class="doc-icon-big" type="button" title="Change icon" aria-label="문서 아이콘 변경">📄</button>
          <div class="title-wrap">
            <label class="sr-only" for="titleInput">문서 제목</label>
            <input id="titleInput" class="title-input" placeholder="Untitled" autocomplete="off">
            <div id="docMeta" class="meta">— <span id="lastEdited"></span></div>
          </div>
        </header>

        <div id="toolbar" class="toolbar" role="toolbar" aria-label="Editor toolbar">
          <button class="tbtn" type="button" data-cmd="bold" aria-label="굵게"><b>B</b></button>
          <button class="tbtn" type="button" data-cmd="italic" aria-label="기울임"><i>I</i></button>
          <button class="tbtn" type="button" data-cmd="underline" aria-label="밑줄"><u>U</u></button>
          <span class="sep" aria-hidden="true"></span>
          <button class="tbtn" type="button" data-format="P">P</button>
          <button class="tbtn" type="button" data-format="H1">H1</button>
          <button class="tbtn" type="button" data-format="H2">H2</button>
          <button class="tbtn" type="button" data-format="H3">H3</button>
          <span class="sep" aria-hidden="true"></span>
          <button id="bulletsBtn" class="tbtn" type="button">• List</button>
          <button id="numbersBtn" class="tbtn" type="button">1. List</button>
          <button id="todoBtn" class="tbtn" type="button">☐ To-do</button>
          <button id="codeBtn" class="tbtn" type="button" aria-label="코드 블록">{}</button>
          <button id="quoteBtn" class="tbtn" type="button" aria-label="인용문">❝</button>
        </div>

        <div id="editor" class="editor" contenteditable="true" role="textbox" aria-multiline="true" aria-label="문서 본문"></div>
      </article>
    </main>
  `);
}

customElements.define("notion-editor", NotionEditor);
