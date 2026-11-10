import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import PanelHeader from '@/components/panel/PanelHeader';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ArrowRight, FileDown, Loader2, LogOut, Plus, Store } from 'lucide-react';

export default function Panel() {
  const navigate = useNavigate();
  const [sellers, setSellers] = useState([]);
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState({ display_name: '', whatsapp: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let alive = true;

    Promise.all([
      base44.entities.Seller.list('-created_date'),
      base44.entities.Product.aggregate({ groupBy: 'seller_id' }),
    ])
      .then(([sellerList, aggregate]) => {
        if (!alive) return;
        setSellers(Array.isArray(sellerList) ? sellerList : []);
        const map = {};
        (aggregate.rows || []).forEach((row) => {
          if (row.seller_id) map[row.seller_id] = row.count;
        });
        setCounts(map);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });

    base44.auth.me().then((record) => {
      if (alive) setUser(record);
    });

    return () => {
      alive = false;
    };
  }, []);

  const handleCreate = async (event) => {
    event.preventDefault();
    if (!draft.display_name.trim()) return;
    setSaving(true);
    try {
      const created = await base44.entities.Seller.create({
        display_name: draft.display_name.trim(),
        whatsapp: draft.whatsapp.trim(),
        note: 'Precios de referencia. Consulta stock antes de comprar.',
      });
      navigate(`/panel/${created.id}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-toyCanvas">
      <PanelHeader
        title="Tus catálogos"
        subtitle={user ? `${user.email}` : 'Prepara el PDF de cada vendedor'}
      >
        <button
          type="button"
          onClick={() => base44.auth.logout('/')}
          className="inline-flex items-center gap-2 rounded-xl border-2 border-toyInk bg-white px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.12em] transition-colors hover:bg-toySky"
        >
          <LogOut className="h-3.5 w-3.5" strokeWidth={2.5} />
          Salir
        </button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl border-[3px] border-toyInk bg-toySun px-4 py-2.5 font-display text-[11px] uppercase tracking-[0.08em] shadow-brutal-sm transition-transform hover:-translate-y-0.5"
            >
              <Plus className="h-4 w-4" strokeWidth={3} />
              Nuevo vendedor
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle className="font-display uppercase">Nuevo vendedor</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="mt-2 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new_name">Nombre de la tienda</Label>
                <Input
                  id="new_name"
                  value={draft.display_name}
                  onChange={(event) => setDraft({ ...draft, display_name: event.target.value })}
                  placeholder="Juguetería Sol"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new_whatsapp">WhatsApp</Label>
                <Input
                  id="new_whatsapp"
                  value={draft.whatsapp}
                  onChange={(event) => setDraft({ ...draft, whatsapp: event.target.value })}
                  placeholder="+51 987 654 321"
                />
              </div>
              <button
                type="submit"
                disabled={saving}
                className="flex w-full items-center justify-center gap-2 rounded-xl border-[3px] border-toyInk bg-toySun px-5 py-3 font-display text-[11px] uppercase tracking-[0.08em] shadow-brutal-sm disabled:opacity-60"
              >
                {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                Crear y cargar productos
              </button>
            </form>
          </DialogContent>
        </Dialog>
      </PanelHeader>

      <main className="mx-auto max-w-[1040px] px-5 py-8 sm:px-8">
        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((item) => (
              <div key={item} className="h-36 animate-pulse rounded-[24px] bg-toyInk/[0.06]" />
            ))}
          </div>
        ) : sellers.length === 0 ? (
          <div className="rounded-[24px] border-[3px] border-dashed border-toyInk/25 bg-white px-6 py-16 text-center">
            <Store className="mx-auto h-8 w-8" strokeWidth={2} />
            <p className="mt-4 font-display text-lg uppercase">Aún no hay vendedores</p>
            <p className="mx-auto mt-2 max-w-sm text-sm text-toyInk/55">
              Crea el primero, carga sus juguetes y descarga su catálogo en PDF. Si no ves nada,
              confirma que tu cuenta tenga rol de administrador.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sellers.map((seller) => (
              <div
                key={seller.id}
                className="flex flex-col rounded-[24px] border-[3px] border-toyInk bg-white p-5 shadow-brutal-sm"
              >
                <p className="font-display text-lg uppercase leading-tight">{seller.display_name}</p>
                <p className="mt-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-toyInk/45">
                  {counts[seller.id] || 0} juguetes
                </p>
                <p className="mt-3 text-xs text-toyInk/55">{seller.whatsapp || 'Sin WhatsApp'}</p>

                <div className="mt-5 flex items-center gap-2">
                  <Link
                    to={`/panel/${seller.id}`}
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border-[3px] border-toyInk bg-toySun px-3 py-2.5 font-display text-[10px] uppercase tracking-[0.08em]"
                  >
                    Abrir
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={3} />
                  </Link>
                  <Link
                    to={`/panel/${seller.id}/pdf`}
                    aria-label="Ver catálogo PDF"
                    className="grid h-10 w-10 place-items-center rounded-xl border-[3px] border-toyInk bg-white transition-colors hover:bg-toySky"
                  >
                    <FileDown className="h-4 w-4" strokeWidth={2.5} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}