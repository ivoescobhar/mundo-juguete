export async function exportAppToPdf(root, { filename = 'mundo-juguete.pdf' } = {}) {
  if (!root) return;

  // Native printing is required for @page and @media print to take effect.
  await document.fonts?.ready;
  const images = Array.from(root.querySelectorAll('img'));
  const loadingModes = images.map((image) => image.getAttribute('loading'));
  const previousTitle = document.title;

  try {
    images.forEach((image) => { image.loading = 'eager'; });
    await Promise.all(images.map((image) => image.decode().catch(() => undefined)));
    document.title = filename.replace(/\.pdf$/i, '');
    window.print();
  } finally {
    document.title = previousTitle;
    images.forEach((image, index) => {
      if (loadingModes[index] === null) image.removeAttribute('loading');
      else image.setAttribute('loading', loadingModes[index]);
    });
  }
}