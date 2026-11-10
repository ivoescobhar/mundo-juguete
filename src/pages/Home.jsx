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
    <div id="top" className="min-h-screen bg-toyCanvas">
      <Header />
      <main>
        <Hero />
        <TickerStrip />
        <ValueStrip />
        <ProductGrid {...catalogProps} />
        <HowToBuy />
        <AboutSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}