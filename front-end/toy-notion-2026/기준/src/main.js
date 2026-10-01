import "./components/zeno-notion-app.js";

await customElements.whenDefined("zeno-notion-app");
await customElements.whenDefined("notion-sidebar");
await customElements.whenDefined("notion-navbar");
await customElements.whenDefined("notion-editor");
await customElements.whenDefined("notion-portals");

await import("./core/app-controller.js");
