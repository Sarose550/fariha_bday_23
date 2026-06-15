#!/usr/bin/env python3
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
IMAGES_DIR = ROOT / "images"
EXTENSIONS = {".jpeg", ".jpg", ".png", ".webp", ".gif"}


def main() -> None:
    files = sorted(
        path.name
        for path in IMAGES_DIR.iterdir()
        if path.is_file() and path.suffix.lower() in EXTENSIONS
    )
    manifest = [f"images/{name}" for name in files]
    output = IMAGES_DIR / "manifest.json"
    output.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {len(manifest)} images to {output.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
