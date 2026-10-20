import os, re

with open('src/data/products.ts', 'r', encoding='utf-8') as f:
    products_ts = f.read()

# find each product block
blocks = products_ts.split('{\n    id:')
for b in blocks[1:]:
    name_m = re.search(r"name:\s*'([^']+)'", b)
    img_m = re.search(r"image:\s*'/images/([^']+)'", b)
    gallery_m = re.findall(r"'/images/([^']+)'", b)
    if name_m:
        name = name_m.group(1)
        img = img_m.group(1) if img_m else "none"
        print(f"{name} -> main: {img}, all: {gallery_m}")
