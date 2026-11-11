import ProductCard from '@/components/ProductCard';

export default function ProductRows({ products }) {
  return products.reduce((rows, product, index) => {
    if (index % 2 === 0) {
      rows.push(
        <div key={product.id} className="catalog-product-row contents">
          {products.slice(index, index + 2).map((item) => (
            <ProductCard key={item.id} product={item} featured={item.featured} />
          ))}
        </div>,
      );
    }
    return rows;
  }, []);
}