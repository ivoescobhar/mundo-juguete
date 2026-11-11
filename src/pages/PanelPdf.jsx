import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import PanelHeader from '@/components/panel/PanelHeader';
import PdfPageFrame from '@/components/pdf/PdfPageFrame';
import ProductsPage from '@/components/pdf/ProductsPage';
import ContactPage from '@/components/pdf/ContactPage';
import BookReader from '@/components/book/BookReader';
import { buildCatalogPages, catalogFileName } from '@/lib/catalogPdf';
import { preloadImages, exportNodesToPdf } from '@/lib/pdfExport';
import { BookOpen, Download, Loader2 } from 'lucide-react';

export default function PanelPdf() {
  const { sellerId } = useParams();
  const [seller, setSeller] = useState(null);
  const [products, setProducts] = useState([]);
  const [images, setImages] = useState(null);
  const [busy, setBusy] = useState(false);
  const [readerOpen, setReaderOpen] = useState(false);
  const [error, setError] = useState('');
  const pageRefs = useRef({});

  useEffect(() => {
    let alive = true;

    (async () => {
      const record = await base44.entities.Seller.get(sellerId);
      const page = await base44.entities.Product.filter(
        { seller_id: sellerId },
        { sort: 'created_date', limit: 200 },
      );
      if (!alive) return;

      const items = page.items || [];
      setSeller(record);
      setProducts(items);

      const urls = [record.hero_image_url, record.logo_url, ...items.map((item) => item.image_url)];
      const loaded = await preloadImages(urls);
      if (alive) setImages(loaded);
    })();

    return () => {
      alive = false;
    };
  }, [sellerId]);

  const pages = useMemo(() => buildCatalogPages(products), [products]);
  const productPageCount = pages.filter((page) => page.type === 'products').length;

  const handleDownload = async () => {
    setError('');
    setBusy(true);
    try {
      const nodes = pages.map((_, index) => pageRefs.current[index]).filter(Boolean);
      await exportNodesToPdf(nodes, catalogFileName(seller));
    } catch (err) {
      setError('No pudimos generar el PDF. Vuelve a intentarlo.');
    } finally {
      setBusy(false);
    }
  };

  const ready = seller && images;

  return (
    <div className="min-h-screen bg-toyCanvas">
      <PanelHeader
        backTo={`/panel/${sellerId}`}
        title={seller ? `Catálogo · ${seller.display_name}` : 'Catálogo'}
        subtitle="Léelo como un libro digital o descárgalo en PDF, con las descripciones completas"
      >
        <button
          type="button"
          onClick={() => setReaderOpen(true)}
          disabled={!ready}
          className="inline-flex items-center gap-2 rounded-xl border-[3px] border-toyInk bg-toySun px-4 py-2.5 font-display text-[11px] uppercase tracking-[0.08em] shadow-brutal-sm transition-transform hover:-translate-y-0.5 disabled:opacity-50"
        >
          <BookOpen className="h-4 w-4" strokeWidth={2.5} />
          Leer libro
        </button>
        <button
          type="button"
          onClick={handleDownload}
          disabled={!ready || busy}
          className="inline-flex items-center gap-2 rounded-xl border-[3px] border-toyInk bg-white px-4 py-2.5 font-display text-[11px] uppercase tracking-[0.08em] shadow-brutal-sm transition-transform hover:-translate-y-0.5 disabled:opacity-50"
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" strokeWidth={2.5} />}
          {busy ? 'Generando…' : 'Descargar PDF'}
        </button>
      </PanelHeader>

      <main className="overflow-x-auto px-5 py-8 sm:px-8">
        {error && (
          <p className="mx-auto mb-4 max-w-[794px] rounded-xl border-2 border-toyCoral bg-toyCoral/10 px-4 py-3 text-sm font-semibold text-toyInk">
            {error}
          </p>
        )}

        {!ready ? (
          <div className="mx-auto flex h-[420px] w-[794px] items-center justify-center rounded-[24px] border-[3px] border-dashed border-toyInk/20 bg-white">
            <Loader2 className="h-6 w-6 animate-spin text-toyInk/40" />
          </div>
        ) : (
          <div className="mx-auto flex w-[794px] flex-col gap-8">
            {pages.map((page, index) => (
              <div key={index} className="w-[794px] shadow-[0_18px_50px_rgba(5,5,5,0.16)]">
                <PdfPageFrame
                  ref={(node) => {
                    pageRefs.current[index] = node;
                  }}
                >
                  {page.type === 'products' ? (
                    <ProductsPage
                      seller={seller}
                      rows={page.rows}
                      images={images}
                      pageNumber={page.index}
                      totalPages={productPageCount}
                    />
                  ) : (
                    <ContactPage seller={seller} />
                  )}
                </PdfPageFrame>
              </div>
            ))}
          </div>
        )}
      </main>

      <BookReader
        open={readerOpen}
        pages={pages}
        seller={seller}
        images={images}
        productPageCount={productPageCount}
        onClose={() => setReaderOpen(false)}
        onDownload={handleDownload}
        busy={busy}
      />
    </div>
  );
}