import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import PanelHeader from '@/components/panel/PanelHeader';
import SellerForm from '@/components/panel/SellerForm';
import SellerProducts from '@/components/panel/SellerProducts';
import { FileDown } from 'lucide-react';

export default function PanelSeller() {
  const { sellerId } = useParams();
  const [seller, setSeller] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = async () => {
    const page = await base44.entities.Product.filter(
      { seller_id: sellerId },
      { sort: 'created_date', limit: 200 },
    );
    setProducts(page.items || []);
  };

  useEffect(() => {
    let alive = true;

    base44.entities.Seller.get(sellerId).then((record) => {
      if (alive) setSeller(record);
    });

    loadProducts().finally(() => {
      if (alive) setLoading(false);
    });

    return () => {
      alive = false;
    };
  }, [sellerId]);

  const handleSave = async (values) => {
    const payload = {
      display_name: values.display_name,
      tagline: values.tagline,
      catalog_title: values.catalog_title,
      catalog_subtitle: values.catalog_subtitle,
      whatsapp: values.whatsapp,
      instagram: values.instagram,
      city: values.city,
      hours: values.hours,
      note: values.note,
      logo_url: values.logo_url,
      hero_image_url: values.hero_image_url,
    };
    await base44.entities.Seller.update(sellerId, payload);
    setSeller((prev) => ({ ...prev, ...payload }));
  };

  if (!seller) {
    return (
      <div className="min-h-screen bg-toyCanvas">
        <PanelHeader backTo="/panel" title="Cargando vendedor" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-toyCanvas">
      <PanelHeader
        backTo="/panel"
        title={seller.display_name}
        subtitle="Datos de marca y juguetes que forman parte del PDF"
      >
        <Link
          to={`/panel/${sellerId}/pdf`}
          className="inline-flex items-center gap-2 rounded-xl border-[3px] border-toyInk bg-toySun px-4 py-2.5 font-display text-[11px] uppercase tracking-[0.08em] shadow-brutal-sm transition-transform hover:-translate-y-0.5"
        >
          <FileDown className="h-4 w-4" strokeWidth={2.5} />
          Ver catálogo PDF
        </Link>
      </PanelHeader>

      <main className="mx-auto max-w-[1040px] space-y-6 px-5 py-8 sm:px-8">
        <SellerForm seller={seller} onSave={handleSave} />
        <SellerProducts
          sellerId={sellerId}
          products={products}
          onChanged={loadProducts}
          loading={loading}
        />
      </main>
    </div>
  );
}