import { useMemo } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import TickerStrip from '@/components/TickerStrip';
import ValueStrip from '@/components/ValueStrip';
import ProductGrid from '@/components/ProductGrid';
import HowToBuy from '@/components/HowToBuy';
import AboutSection from '@/components/AboutSection';
import FaqSection from '@/components/FaqSection';
import Footer from '@/components/Footer';
import ExportPdfButton from '@/components/ExportPdfButton';
import { useCatalog } from '@/hooks/useCatalog';

export default function Home() {
  const { products, categories, category, setCategory, total, loading } = useCatalog();

  const catalogProps = useMemo(
    () => ({
      products,
      categories,
      activeCategory: category,
      onCategoryChange: setCategory,
      totalItems: total,
      loading,
    }),
    [products, categories, category, setCategory, total, loading],
  );

  return (
    <div id="top" data-pdf-root className="catalog-print-root min-h-screen bg-toyCanvas">
      <Header />
      <main>
        <div data-pdf-block>
          <Hero />
        </div>
        <div data-pdf-block>
          <TickerStrip />
        </div>
        <div data-pdf-block>
          <ValueStrip />
        </div>
        <div data-pdf-block>
          <ProductGrid {...catalogProps} />
        </div>
        <div data-pdf-block>
          <HowToBuy />
        </div>
        <div data-pdf-block>
          <AboutSection />
        </div>
        <div data-pdf-block>
          <FaqSection />
        </div>
      </main>
      <div data-pdf-block>
        <Footer />
      </div>
      <ExportPdfButton />
    </div>
  );
}