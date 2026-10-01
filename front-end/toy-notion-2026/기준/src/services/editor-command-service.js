const BLOCK_SELECTOR = "p,h1,h2,h3,pre,blockquote,li,div";

function selectionRangeInside(editor) {
  const selection = window.getSelection();
  if (!selection?.rangeCount) return null;
  const range = selection.getRangeAt(0);
  return editor.contains(range.commonAncestorContainer) ? range : null;
}

function selectNodeContents(node) {
  const selection = window.getSelection();
  const range = document.createRange();
  range.selectNodeContents(node);
  selection.removeAllRanges();
  selection.addRange(range);
}

function wrapInline(editor, tagName) {
  const range = selectionRangeInside(editor);
  if (!range) return false;
  const wrapper = document.createElement(tagName);

  if (range.collapsed) {
    wrapper.append(document.createTextNode("\u200b"));
    range.insertNode(wrapper);
  } else {
    wrapper.append(range.extractContents());
    range.insertNode(wrapper);
  }
  selectNodeContents(wrapper);
  return true;
}

function formatBlock(editor, tagName) {
  const range = selectionRangeInside(editor);
  if (!range) return false;
  const anchor = range.startContainer.nodeType === Node.ELEMENT_NODE
    ? range.startContainer
    : range.startContainer.parentElement;
  const current = anchor?.closest(BLOCK_SELECTOR);
  const block = current && current !== editor ? current : null;
  const replacement = document.createElement(tagName.toLowerCase());

  if (block) {
    replacement.append(...block.childNodes);
    block.replaceWith(replacement);
  } else {
    replacement.append(range.extractContents());
    range.insertNode(replacement);
  }
  selectNodeContents(replacement);
  return true;
}

function insertList(editor, ordered) {
  const range = selectionRangeInside(editor);
  if (!range) return false;
  const list = document.createElement(ordered ? "ol" : "ul");
  const item = document.createElement("li");
  const fragment = range.extractContents();
  item.append(fragment.childNodes.length ? fragment : document.createTextNode("List item"));
  list.append(item);
  range.insertNode(list);
  selectNodeContents(item);
  return true;
}

export function applyEditorCommand(editor, command, value = null) {
  editor.focus();
  switch (command) {
    case "bold":
      return wrapInline(editor, "strong");
    case "italic":
      return wrapInline(editor, "em");
    case "underline":
      return wrapInline(editor, "u");
    case "formatBlock":
      return formatBlock(editor, value || "p");
    case "insertUnorderedList":
      return insertList(editor, false);
    case "insertOrderedList":
      return insertList(editor, true);
    default:
      return false;
  }
}

export function insertTodo(editor) {
  const range = selectionRangeInside(editor);
  const block = document.createElement("div");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  const text = document.createElement("span");
  checkbox.type = "checkbox";
  text.textContent = " To-do";
  label.append(checkbox, text);
  block.append(label);

  if (range) range.insertNode(block);
  else editor.append(block);
  selectNodeContents(text);
  return true;
}
