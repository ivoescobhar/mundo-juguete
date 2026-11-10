export const PRODUCTS_PER_PAGE = 6;

export function clip(text, max = 86) {
  const clean = (text || '').trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max).trimEnd()}…`;
}

export function buildCatalogPages(products) {
  const pages = [{ type: 'cover' }];
  for (let index = 0; index < products.length; index += PRODUCTS_PER_PAGE) {
    pages.push({
      type: 'products',
      items: products.slice(index, index + PRODUCTS_PER_PAGE),
      index: index / PRODUCTS_PER_PAGE + 1,
    });
  }
  if (products.length === 0) {
    pages.push({ type: 'products', items: [], index: 1 });
  }
  pages.push({ type: 'contact' });
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