import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

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
  const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait', compress: true });

  if (document.fonts && document.fonts.ready) {
    await document.fonts.ready;
  }
  await new Promise((resolve) => setTimeout(resolve, 250));

  for (let index = 0; index < nodes.length; index += 1) {
    const canvas = await html2canvas(nodes[index], {
      scale: 2,
      useCORS: true,
      backgroundColor: '#F8F9FA',
      logging: false,
      width: PAGE_WIDTH,
      height: PAGE_HEIGHT,
    });
    const image = canvas.toDataURL('image/jpeg', 0.94);
    if (index > 0) pdf.addPage();
    pdf.addImage(image, 'JPEG', 0, 0, 210, 297);
  }

  pdf.save(filename);
}