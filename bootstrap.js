/*
 * Zotero Item List Expand/Collapse Buttons - a minimal Zotero 8-10 extension (v1.0.3).
 *
 * Adds fold/unfold icon buttons to Zotero's middle-pane item toolbar. The buttons
 * delegate to Zotero's built-in one-level ItemTree methods, just as
 * the native '+' and '-' keyboard commands do. This extension does
 * not query, save, edit, or transmit reference data.
 */

var ItemListLevelButtons = {
  windows: new Map(),
  resourceRoot: "",

  addToWindow(win) {
    if (!win || this.windows.has(win)) return;
    const toolbar = win.document.getElementById("zotero-items-toolbar");
    if (!toolbar) {
      Zotero.debug("Zotero Item List Expand/Collapse Buttons: items toolbar not found", 2);
      return;
    }

    const makeButton = (id, iconFile, tooltip) => {
      const button = win.document.createXULElement("toolbarbutton");
      button.id = id;
      button.classList.add("zotero-tb-button");
      // Standard XUL image attribute displays our bundled SVG toolbar icon.
      // Leave label empty to avoid confusing the controls with Add/Remove.
      button.label = "";
      const iconURL = this.resourceRoot + "icons/" + iconFile;
      button.setAttribute("image", iconURL);
      button.style.setProperty("list-style-image", `url("${iconURL}")`);
      // Firefox context color allows SVGs to follow Zotero's light/dark theme.
      button.style.setProperty("-moz-context-properties", "stroke, fill");
      button.style.setProperty("stroke", "currentColor");
      button.setAttribute("tooltiptext", tooltip);
      button.setAttribute("title", tooltip);
      button.setAttribute("aria-label", tooltip);
      button.setAttribute("tabindex", "-1");
      button.style.setProperty("display", "flex", "important");
      button.style.setProperty("align-items", "center", "important");
      button.style.setProperty("justify-content", "center", "important");
      button.style.setProperty("min-width", "28px", "important");
      button.style.setProperty("width", "28px", "important");
      button.style.setProperty("height", "28px", "important");
      button.style.setProperty("padding", "0", "important");
      // The image attribute, not a text glyph, determines button appearance.
      button.style.setProperty("margin-inline-start", "3px", "important");
      return button;
    };

    const expand = makeButton(
      "zotero-item-level-expand", "unfold-vertical.svg", "Expand item list one level"
    );
    const collapse = makeButton(
      "zotero-item-level-collapse", "fold-vertical.svg", "Collapse item list one level"
    );

    const changeLevel = (direction) => {
      try {
        if (Zotero.locked) return;
        const tree = win.ZoteroPane?.itemsView;
        if (!tree || !tree.rowCount) return;
        if (direction === "expand" && typeof tree.expandAllRows === "function") {
          tree.expandAllRows(false); // false = exactly one level, not full tree
        }
        if (direction === "collapse" && typeof tree.collapseAllRows === "function") {
          tree.collapseAllRows(false);
        }
      }
      catch (error) {
        Zotero.logError(error);
      }
    };
    const onExpand = () => changeLevel("expand");
    const onCollapse = () => changeLevel("collapse");
    expand.addEventListener("command", onExpand);
    collapse.addEventListener("command", onCollapse);

    // Place the controls beside Zotero's built-in add/lookup/note buttons.
    const spacer = toolbar.querySelector("spacer[flex='1']");
    toolbar.insertBefore(expand, spacer || null);
    toolbar.insertBefore(collapse, spacer || null);
    this.windows.set(win, { expand, collapse, onExpand, onCollapse });
  },

  removeFromWindow(win) {
    const entry = this.windows.get(win);
    if (!entry) return;
    entry.expand.removeEventListener("command", entry.onExpand);
    entry.collapse.removeEventListener("command", entry.onCollapse);
    entry.expand.remove();
    entry.collapse.remove();
    this.windows.delete(win);
  },

  removeFromAllWindows() {
    for (const win of Array.from(this.windows.keys())) {
      this.removeFromWindow(win);
    }
  }
};

function install() {}
function uninstall() {}

function startup({ rootURI } = {}) {
  ItemListLevelButtons.resourceRoot = rootURI || "";
  for (const win of Zotero.getMainWindows()) {
    ItemListLevelButtons.addToWindow(win);
  }
}

function onMainWindowLoad({ window }) {
  ItemListLevelButtons.addToWindow(window);
}

function onMainWindowUnload({ window }) {
  ItemListLevelButtons.removeFromWindow(window);
}

function shutdown() {
  ItemListLevelButtons.removeFromAllWindows();
}
