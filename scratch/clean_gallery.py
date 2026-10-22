import re

with open('src/data/products.ts', 'r', encoding='utf-8') as f:
    content = f.read()

products = re.split(r'(\s*\{\s*id:\s*[\'\"]hamper-\d+[\'\"])', content)
print(f'Split into {len(products)} parts')
new_parts = []
for part in products:
    if 'galleryImages:' in part:
        img_match = re.search(r'image:\s*([\'\"][^\'\"]+[\'\"])', part)
        if img_match:
            primary_img = img_match.group(1)
            part = re.sub(r'galleryImages:\s*\[.*?\]', f'galleryImages: [\n      {primary_img},\n    ]', part, flags=re.DOTALL)
    new_parts.append(part)

new_content = ''.join(new_parts)
with open('src/data/products.ts', 'w', encoding='utf-8') as f:
    f.write(new_content)

print('Successfully updated src/data/products.ts')
