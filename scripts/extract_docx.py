import sys, zipfile, re, os
from xml.etree import ElementTree as ET

NS = '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'

def extract(path):
    out = []
    with zipfile.ZipFile(path) as z:
        xml = z.read('word/document.xml').decode('utf-8', 'ignore')
    root = ET.fromstring(xml)
    for p in root.iter(NS + 'p'):
        texts = []
        for t in p.iter(NS + 't'):
            texts.append(t.text or '')
        line = ''.join(texts)
        out.append(line)
    return '\n'.join(out)

if __name__ == '__main__':
    paths = sys.argv[1:]
    dest = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'docs_text')
    os.makedirs(dest, exist_ok=True)
    for p in paths:
        if not os.path.exists(p):
            print('MISSING', p, file=sys.stderr)
            continue
        txt = extract(p)
        name = os.path.splitext(os.path.basename(p))[0] + '.txt'
        with open(os.path.join(dest, name), 'w', encoding='utf-8') as f:
            f.write(txt)
        print('OK', name, len(txt), 'chars')
