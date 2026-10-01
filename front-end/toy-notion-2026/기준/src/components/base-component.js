export class BaseComponent extends HTMLElement {
  static template;

  connectedCallback() {
    if (this.dataset.mounted === "true") return;
    this.dataset.mounted = "true";
    this.render();
  }

  render() {
    if (!this.constructor.template) return;
    this.replaceChildren(this.constructor.template.content.cloneNode(true));
  }

  emit(type, detail = {}) {
    this.dispatchEvent(new CustomEvent(type, {
      bubbles: true,
      composed: true,
      detail,
    }));
  }
}

export function createTemplate(html) {
  const template = document.createElement("template");
  template.innerHTML = html;
  return template;
}
