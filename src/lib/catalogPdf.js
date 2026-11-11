const CONTENT_HEIGHT = 940;
const ROW_GAP = 12;
const TITLE_CHARS_PER_LINE = 18;
const DESC_CHARS_PER_LINE = 58;

function lineCount(text, perLine) {
  const clean = (text || '').trim();
  if (!clean) return 0;
  return Math.ceil(clean.length / perLine);
}

export function cardHeight(product) {
  const titleLines = Math.max(1, lineCount(product.name, TITLE_CHARS_PER_LINE));
  const descLines = lineCount(product.description, DESC_CHARS_PER_LINE);
  return 148 + 11 + 11 + 6 + titleLines * 17 + (descLines ? 6 + descLines * 16 : 0) + 42 + 12;
}

export function buildCatalogPages(products = []) {
  const rows = [];
  for (let index = 0; index < products.length; index += 2) {
    const items = products.slice(index, index + 2);
    rows.push({ items, height: Math.max(...items.map(cardHeight)) });
  }

  const pages = [];
  let current = null;

  rows.forEach((row) => {
    if (!current) current = { type: 'products', rows: [], used: 0 };
    const needed = row.height + (current.rows.length ? ROW_GAP : 0);

    if (current.rows.length && current.used + needed > CONTENT_HEIGHT) {
      pages.push(current);
      current = { type: 'products', rows: [], used: 0 };
    }

    current.rows.push(row);
    current.used += row.height + (current.rows.length > 1 ? ROW_GAP : 0);
  });

  if (current) pages.push(current);
  if (pages.length === 0) pages.push({ type: 'products', rows: [] });

  pages.forEach((page, index) => {
    page.index = index + 1;
  });

  pages.push({ type: 'contact', index: pages.length + 1 });
  return pages;
}

export function catalogFileName(seller) {
  const name = (seller?.display_name || 'catalogo')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return `catalogo-${name || 'tienda'}.pdf`;
}

export function initialsOf(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();
}