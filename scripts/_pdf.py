import sys, os
from pypdf import PdfReader

src = sys.argv[1]
out = sys.argv[2]
r = PdfReader(src)
with open(out, 'w', encoding='utf-8') as f:
    for i, pg in enumerate(r.pages):
        f.write(f"\n===== PAGE {i+1} =====\n")
        f.write(pg.extract_text() or "")
print(f"wrote {out}: {len(r.pages)} pages")
