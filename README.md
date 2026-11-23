# Zotero Item List Expand/Collapse Buttons

**Zotero Item List Expand/Collapse Buttons** is a small, free Zotero plugin that adds two **Fold / Unfold** buttons above the **middle item list**. Expand or collapse articles, their attachments and notes, and PDF annotation rows **one level at a time**—without using keyboard shortcuts.

![Two fold/unfold buttons in the Zotero item-list toolbar](assets/zotero-toolbar.png)

## What it does

- **Unfold** (arrows pointing outward): expand items one level per click.
- **Fold** (arrows pointing inward): collapse items one level per click.
- First expansion shows PDF attachments and attached notes; further expansion reveals nested annotations where present.
- Acts on the **middle item list only**. It does **not** change the left collection tree or edit bibliographic records, notes, tags, or attachments.
- Buttons provide tooltips: *Expand item list one level* / *Collapse item list one level*.

## Install

1. Download the `.xpi` from the [Releases](../../releases) page (v1.0.3).
2. In Zotero, open **Tools → Plugins**.
3. Use the gear menu → **Install Plugin From File**, then select the downloaded `.xpi`.
4. Restart Zotero if prompted.
5. The fold/unfold buttons appear beside the other controls above the middle item list.

To update an existing v1.0.1 or v1.0.2 installation, install v1.0.3 the same way. The plugin ID is unchanged.

## Compatibility and testing

- **Confirmed working:** Zotero 10 on Windows (installation, visible toolbar icons, and one-level expansion/collapse).
- **Declared compatibility:** Zotero 8 through 10 in the current extension manifest. Other combinations have **not** been tested.
- No account, subscription, cloud service, or API key is needed.

## How it works

The extension adds toolbar buttons through Zotero's plugin bootstrap API and calls Zotero's existing item-tree methods `expandAllRows(false)` and `collapseAllRows(false)`. The `false` argument requests one hierarchy level, rather than expanding/collapsing the entire tree. The extension does not send or store library data.

## Build from source

The `.xpi` is a ZIP-format archive whose root contains `manifest.json`, `bootstrap.js`, `icon.svg`, `icons/`, and `ICON_LICENSE.txt`.

Run `python build_xpi.py` from the repository root to generate `dist/zotero_expand_and_collapse_v1_0_3.xpi`.

## Limitations

- Expansion level behavior depends on Zotero's internal item-tree API and may change in future Zotero versions.
- This is a third-party community plugin, **not affiliated with or endorsed by Zotero**.
- Automatic updates are not configured. Download updates manually from GitHub Releases.

## License and attribution

The extension's source code is offered under the [MIT License](LICENSE). The fold/unfold icons are based on [Lucide](https://lucide.dev/) artwork under the ISC License, with its attribution preserved in [`ICON_LICENSE.txt`](ICON_LICENSE.txt).

## Issues

When reporting an issue, please include your Zotero version, operating system, steps to reproduce, and whether the toolbar buttons appear or simply don't respond. Avoid sharing private library content in screenshots.
