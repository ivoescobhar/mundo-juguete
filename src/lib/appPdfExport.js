import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const PAGE_W = 210;
const PAGE_H = 297;
const FOOTER_H = 7;
const CONTENT_H = PAGE_H - FOOTER_H;
const BACKGROUND = '#F8F9FA';
const MIN_SPACE_MM = 45;

function toDataUrl(url) {
  return fetch(url, { mode: 'cors' })
    .then((response) => {
      if (!response.ok) throw new Error('No se pudo leer la imagen');
      return response.blob();
    })
    .then(
      (blob) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        }),
    );
}

async function inlineImages(root) {
  const backup = Array.from(root.querySelectorAll('img')).map((img) => ({
    img,
    src: img.getAttribute('src'),
    srcset: img.getAttribute('srcset'),
  }));

  await Promise.all(
    backup.map(async (item) => {
      const url = item.img.currentSrc || item.img.src;
      if (!url || url.startsWith('data:')) return;
      try {
        const dataUrl = await toDataUrl(url);
        item.img.removeAttribute('srcset');
        item.img.setAttribute('src', dataUrl);
        await new Promise((resolve) => {
          if (item.img.complete) {
            resolve();
            return;
          }
          const done = () => resolve();
          item.img.addEventListener('load', done, { once: true });
          item.img.addEventListener('error', done, { once: true });
        });
      } catch {
        // se conserva la imagen original si no se puede leer
      }
    }),
  );

  return () =>
    backup.forEach(({ img, src, srcset }) => {
      if (src) img.setAttribute('src', src);
      if (srcset) img.setAttribute('srcset', srcset);
      else img.removeAttribute('srcset');
    });
}

function cropCanvas(canvas, startY, height) {
  const out = document.createElement('canvas');
  out.width = canvas.width;
  out.height = height;
  const ctx = out.getContext('2d');
  ctx.fillStyle = BACKGROUND;
  ctx.fillRect(0, 0, out.width, out.height);
  ctx.drawImage(canvas, 0, startY, canvas.width, height, 0, 0, canvas.width, height);
  return out;
}

function drawFooter(pdf, pageNumber) {
  const top = PAGE_H - FOOTER_H;
  pdf.setFillColor(5, 5, 5);
  pdf.rect(0, top, PAGE_W, FOOTER_H, 'F');
  pdf.setTextColor(255, 234, 0);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(7);
  pdf.text('MUNDO JUGUETE', 10, top + 4.6);
  pdf.text(`${pageNumber}`, PAGE_W - 10, top + 4.6, { align: 'right' });
}

export async function exportAppToPdf(root, { filename = 'mundo-juguete.pdf' } = {}) {
  if (!root) return;

  if (document.fonts && document.fonts.ready) {
    await document.fonts.ready;
  }
  const previousScrollBehavior = document.documentElement.style.scrollBehavior;
  document.documentElement.style.scrollBehavior = 'auto';
  window.scrollTo(0, 0);
  document.body.classList.add('pdf-capturing');
  const restore = await inlineImages(root);

  try {
    await new Promise((resolve) => setTimeout(resolve, 180));

    const blocks = Array.from(root.querySelectorAll('[data-pdf-block]'));
    const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait', compress: true });
    let pageNumber = 1;
    let cursor = 0;

    const nextPage = () => {
      drawFooter(pdf, pageNumber);
      pdf.addPage();
      pageNumber += 1;
      cursor = 0;
    };

    for (const node of blocks) {
      const canvas = await html2canvas(node, {
        scale: 2,
        useCORS: true,
        backgroundColor: BACKGROUND,
        logging: false,
      });
      if (!canvas.height) continue;

      const mmPerPx = PAGE_W / canvas.width;
      let offset = 0;

      while (offset < canvas.height) {
        const spaceLeft = CONTENT_H - cursor;
        const spacePx = Math.floor(spaceLeft / mmPerPx);
        const missingPx = canvas.height - offset;

        if (missingPx > spacePx && spaceLeft < MIN_SPACE_MM && cursor > 0) {
          nextPage();
          continue;
        }
        if (spacePx <= 0) {
          nextPage();
          continue;
        }

        const piecePx = Math.min(missingPx, spacePx);
        const piece = cropCanvas(canvas, offset, piecePx);
        pdf.addImage(piece.toDataURL('image/jpeg', 0.95), 'JPEG', 0, cursor, PAGE_W, piecePx * mmPerPx);
        cursor += piecePx * mmPerPx;
        offset += piecePx;

        if (offset < canvas.height) {
          nextPage();
        }
      }
    }

    drawFooter(pdf, pageNumber);
    pdf.save(filename);
  } finally {
    document.body.classList.remove('pdf-capturing');
    document.documentElement.style.scrollBehavior = previousScrollBehavior;
    restore();
  }
}