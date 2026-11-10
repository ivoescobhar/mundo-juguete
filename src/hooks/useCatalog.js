import { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';

function toCard(product) {
  return {
    id: product.id,
    sku: product.sku,
    name: product.name,
    category: product.category,
    price: product.price,
    age: product.age_range,
    tag: product.tag,
    description: product.description,
    image: product.image_url,
    featured: Boolean(product.featured),
  };
}

export function useCatalog() {
  const [category, setCategory] = useState('Todos');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(['Todos']);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    base44.entities.Product.list({ distinct: 'category' }).then((result) => {
      if (!alive) return;
      const values = (result.items || []).filter(Boolean);
      setCategories(['Todos', ...values]);
    });

    base44.entities.Product.count({ active: true }).then((count) => {
      if (alive) setTotal(count);
    });

    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    let alive = true;
    setLoading(true);

    const query = { active: true, seller_id: { $exists: false } };
    if (category !== 'Todos') query.category = category;

    base44.entities.Product.filter(query, { sort: 'sort_order', limit: 60 })
      .then((page) => {
        if (alive) setProducts((page.items || []).map(toCard));
      })
      .finally(() => {
        if (alive) setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, [category]);

  return { products, categories, category, setCategory, total, loading };
}