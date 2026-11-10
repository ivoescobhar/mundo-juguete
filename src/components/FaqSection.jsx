import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQS = [
  {
    q: '¿Cómo hago un pedido?',
    a: 'Elige el juguete en el catálogo y toca «Pedir por WhatsApp». El mensaje ya incluye nombre, SKU y precio de referencia. Confirmamos stock y cerramos la compra por chat.',
  },
  {
    q: '¿Puedo pagar con Yape o Plin?',
    a: 'Sí. Aceptamos Yape, Plin, transferencia bancaria y efectivo al recoger en tienda. Te compartimos el QR o el número al confirmar tu pedido.',
  },
  {
    q: '¿Hacen envíos fuera de Lima?',
    a: 'Llegamos a todo el Perú con Olva Courier y Shalom. Lima metropolitana en 24 a 48 horas; provincias entre 2 y 4 días hábiles.',
  },
  {
    q: '¿Qué pasa si el juguete no era lo esperado?',
    a: 'Tienes 7 días para cambiarlo sin usar y con su empaque. Los juguetes electrónicos tienen además 3 meses de garantía de fábrica.',
  },
  {
    q: '¿Venden al por mayor?',
    a: 'Sí, desde 6 unidades aplicamos precio de mayorista. Escríbenos por WhatsApp con los SKU que te interesan y te pasamos la lista.',
  },
];

export default function FaqSection() {
  return (
    <section id="preguntas" className="border-t-[3px] border-toyInk bg-white">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:py-24">
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-toyInk/50">
            Dudas frecuentes
          </p>
          <h2 className="mt-3 font-display text-3xl uppercase leading-[0.95] tracking-[-0.02em] sm:text-4xl">
            Todo claro antes de pedir
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-toyInk/60">
            Si tu pregunta no está aquí, escríbenos y te responde una persona real del equipo.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full border-t-2 border-toyInk/10">
          {FAQS.map((faq, index) => (
            <AccordionItem key={faq.q} value={`item-${index}`} className="border-b-2 border-toyInk/10">
              <AccordionTrigger className="py-5 text-left font-display text-sm uppercase leading-snug tracking-[-0.01em] hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-sm leading-relaxed text-toyInk/65">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}