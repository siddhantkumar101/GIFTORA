import { useState } from "react";
import { Plus, Boxes, BarChart3, CreditCard, Settings, Trash2 } from "lucide-react";
import { money } from "../utils/helpers.js";
import { statusFlow } from "../utils/constants.js";

export default function AdminView({ metrics, products, orders, saveProductPrice, addProduct, updateOrderStatus, deleteProduct }) {
  const [showAdd, setShowAdd] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "Mugs",
    price: "",
    description: ""
  });

  async function handleAdd(e) {
    e.preventDefault();
    const success = await addProduct(newProduct);
    if (success) {
      setShowAdd(false);
      setNewProduct({ name: "", category: "Mugs", price: "", description: "" });
    }
  }

  return (
    <div className="space-y-12 animate-fade-in pb-20">
      <section className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.3em] text-coral">Administrative</p>
          <h2 className="mt-2 text-4xl font-black tracking-tight text-ink">Dashboard</h2>
        </div>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="focus-ring inline-flex h-12 items-center gap-2 rounded-xl bg-ink px-6 text-sm font-black text-white hover:bg-slate-800 transition-all shadow-lg"
        >
          {showAdd ? <Plus className="rotate-45" size={18} /> : <Plus size={18} />}
          {showAdd ? "Close Panel" : "New Catalog Item"}
        </button>
      </section>

      {showAdd && (
        <section className="rounded-3xl border border-slate-100 bg-white p-8 animate-fade-in shadow-xl shadow-slate-200/50">
          <h2 className="text-xl font-black">Register New Product</h2>
          <form onSubmit={handleAdd} className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <Field
              label="Product Name"
              value={newProduct.name}
              onChange={(v) => setNewProduct({ ...newProduct, name: v })}
            />
            <label className="grid gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Category</span>
              <select
                value={newProduct.category}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                className="focus-ring h-12 rounded-xl border border-slate-100 bg-slate-50 px-4 text-sm font-semibold outline-none"
              >
                <option>Mugs</option>
                <option>T-Shirts</option>
                <option>Phone Covers</option>
                <option>Photo Frames</option>
                <option>Keychains</option>
              </select>
            </label>
            <Field
              label="Base Price (INR)"
              type="number"
              value={newProduct.price}
              onChange={(v) => setNewProduct({ ...newProduct, price: v })}
            />
            <div className="flex items-end">
              <button
                type="submit"
                className="focus-ring h-12 w-full rounded-xl bg-coral text-sm font-black text-white hover:bg-orange-600 shadow-lg shadow-coral/20"
              >
                Publish to Catalog
              </button>
            </div>
          </form>
        </section>
      )}

      <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <AdminMetric icon={Boxes} label="Orders" value={metrics.placed} />
        <AdminMetric icon={BarChart3} label="Revenue" value={money(metrics.revenue)} />
        <AdminMetric icon={CreditCard} label="Avg Value" value={money(metrics.avgOrder)} />
        <AdminMetric icon={Settings} label="System" value={metrics.conversion} />
      </section>

      <section className="grid gap-12 lg:grid-cols-[1fr_420px]">
        <div className="space-y-6">
          <h3 className="text-2xl font-black">Catalog Control</h3>
          <div className="scrollbar-thin max-h-[600px] space-y-4 overflow-auto pr-4">
            {products.map((product) => (
              <div key={product.slug} className="group flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-4 hover:border-primary transition-all">
                <div className="flex items-center gap-4">
                   <img src={product.image} className="w-14 h-14 rounded-xl object-cover" alt="" />
                   <div>
                      <h3 className="font-black text-slate-800">{product.name}</h3>
                      <div className="flex items-center gap-2">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{product.category}</p>
                        <span className="h-1 w-1 rounded-full bg-slate-300" />
                        <p className="text-[10px] font-black text-coral uppercase tracking-widest">
                          {orders.filter(o => o.items?.some(i => i.slug === product.slug)).length} Orders
                        </p>
                      </div>
                   </div>
                </div>
                <div className="flex items-center gap-4">
                   <input
                      type="number"
                      min="1"
                      defaultValue={product.price}
                      onBlur={(event) => saveProductPrice(product.slug, event.target.value)}
                      className="focus-ring h-10 w-20 rounded-xl border border-slate-100 bg-slate-50 px-3 text-sm font-bold text-center"
                   />
                   <button
                     onClick={() => deleteProduct(product.slug)}
                     className="focus-ring flex h-10 w-10 items-center justify-center rounded-xl border border-rose-100 bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-all"
                     title="Remove from catalog"
                   >
                     <Trash2 size={16} />
                   </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-black">Order Queue</h3>
          <div className="scrollbar-thin max-h-[600px] space-y-4 overflow-auto pr-4">
            {orders.length === 0 ? (
              <div className="grid min-h-44 place-items-center rounded-3xl border border-dashed border-slate-200 text-center">
                <p className="font-bold text-slate-300">No active orders.</p>
              </div>
            ) : (
              orders.map((order) => (
                <div key={order.orderNumber} className="rounded-2xl border border-slate-100 bg-white p-5 hover:border-primary transition-all">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-black text-slate-800">{order.orderNumber}</h3>
                        <p className="text-sm font-semibold text-slate-500">
                          {order.customer?.name}
                        </p>
                      </div>
                      <p className="font-black text-ink">{money(order.totals?.grandTotal || 0)}</p>
                    </div>
                    <select
                      value={order.status}
                      onChange={(event) => updateOrderStatus(order.orderNumber, event.target.value)}
                      className="focus-ring h-10 rounded-xl border border-slate-100 bg-slate-50 px-3 text-xs font-black text-slate-600 outline-none"
                    >
                      {statusFlow.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({ label, value, onChange, type = "text" }) {
  return (
    <label className="grid gap-1.5">
      <span className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="focus-ring min-h-11 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm outline-none"
      />
    </label>
  );
}

function AdminMetric({ icon: Icon, label, value }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-soft">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500">{label}</p>
        <span className="grid h-10 w-10 place-items-center rounded-lg bg-mint/12 text-teal-800">
          <Icon size={20} aria-hidden="true" />
        </span>
      </div>
      <p className="mt-4 text-2xl font-black">{value}</p>
    </div>
  );
}
