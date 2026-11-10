import { WHATSAPP_NUMBER } from '@/data/siteConfig';
import { formatPrice } from '@/lib/format';

export function buildInquiryLink(product) {
  const lines = [
    '¡Hola Mundo Juguete! 👋',
    `Quiero consultar por: ${product.name}`,
    `SKU: ${product.sku}`,
    `Precio de referencia: S/ ${formatPrice(product.price)}`,
    '¿Está disponible?',
  ];
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
}

export function buildGeneralLink(message = '¡Hola Mundo Juguete! Quiero información sobre el catálogo.') {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}