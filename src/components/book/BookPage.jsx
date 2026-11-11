import PdfPageFrame from '@/components/pdf/PdfPageFrame';
import ProductsPage from '@/components/pdf/ProductsPage';
import ContactPage from '@/components/pdf/ContactPage';

export default function BookPage({ page, seller, images, productPageCount }) {
  return (
    <PdfPageFrame>
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
  );
}