import { exportAppToPdf } from '@/lib/appPdfExport';

export const PAGE_WIDTH = 794;
export const PAGE_HEIGHT = 1123;

async function readAsDataUrl(url) {
  const response = await fetch(url, { mode: 'cors' });
  if (!response.ok) throw new Error('No se pudo leer la imagen');
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export async function preloadImages(urls) {
  const unique = [...new Set(urls.filter(Boolean))];
  const pairs = await Promise.all(
    unique.map(async (url) => {
      try {
        return [url, await readAsDataUrl(url)];
      } catch {
        return [url, url];
      }
    }),
  );
  return Object.fromEntries(pairs);
}

export async function exportNodesToPdf(nodes, filename) {
  const root = nodes[0]?.closest('[data-pdf-root]');
  await exportAppToPdf(root, { filename });
}