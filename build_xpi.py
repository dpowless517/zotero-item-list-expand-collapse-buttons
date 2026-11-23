"""Package extension source as Zotero XPI (ZIP) without development docs."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
root = Path(__file__).resolve().parent
dist = root / "dist"
dist.mkdir(exist_ok=True)
output = dist / "zotero-item-list-expand-collapse-buttons-v1.0.3.xpi"
files = ["manifest.json", "bootstrap.js", "icon.svg", "ICON_LICENSE.txt",
         "icons/fold-vertical.svg", "icons/unfold-vertical.svg"]
with ZipFile(output, "w", ZIP_DEFLATED) as z:
    for filename in files:
        z.write(root / filename, filename)
print(output)
