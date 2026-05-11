import { useState, useEffect } from "react";
import { Plus, Boxes, BarChart3, CreditCard, Settings, Trash2, Edit3, X, Image as ImageIcon } from "lucide-react";
import { money } from "../utils/helpers.js";
import { statusFlow } from "../utils/constants.js";

const categories = ["Mugs", "Water Bottles", "Corporate", "Hampers", "Romantic", "Handmade", "Luxury", "Stationery", "Boxes", "Gift Sets", "Phone Covers", "Photo Frames"];

export default function AdminView({ metrics, products, orders, updateProduct, addProduct, updateOrderStatus, deleteProduct }) {
  const [showPanel, setShowPanel] = useState(false);
  const [editingSlug, setEditingSlug] = useState(null);
  
  const initialForm = {
    name: "",
    category: "Mugs",
    price: "",
    image: "",
    description: "",
    material: "Mixed",
    leadTime: "3 days"
  };

  const [form, setForm] = useState(initialForm);

  async function handleSubmit(e) {
    e.preventDefault();
    if (editingSlug) {
      await updateProduct(editingSlug, form);
      setEditingSlug(null);
    } else {
      const success = await addProduct(form);
      if (success) {
        setShowPanel(false);
        setForm(initialForm);
      }
    }
  }

  function startEdit(product) {
    setEditingSlug(product.slug);
    setForm({
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.image,
      description: product.description,
      material: product.material || "Mixed",
      leadTime: product.leadTime || "3 days"
    });
    setShowPanel(true);
  }

  // Global Paste Listener
  useEffect(() => {
    const handleGlobalPaste = (e) => {
      if (!showPanel) return;
      const target = e.target;
      if (target.tagName === 'INPUT' && target.placeholder !== 'Or paste URL' && target.placeholder !== 'Unsplash URL') return;

      const items = (e.clipboardData || e.originalEvent.clipboardData).items;
      for (let index in items) {
        const item = items[index];
        if (item.kind === 'file' && item.type.includes('image')) {
          const blob = item.getAsFile();
          const reader = new FileReader();
          reader.onloadend = () => {
            setForm(prev => ({ ...prev, image: reader.result }));
          };
          reader.readAsDataURL(blob);
        }
      }
    };

    window.addEventListener("paste", handleGlobalPaste);
    return () => window.removeEventListener("paste", handleGlobalPaste);
  }, [showPanel]);

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, image: reader.result });
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="space-y-12 animate-fade-in pb-20">
      {/* Header */}
      <section className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.3em] text-coral">Administrative</p>
          <h2 className="mt-2 text-4xl font-black tracking-tight text-ink">Catalog Control</h2>
        </div>
        <button
          onClick={() => {
            if (showPanel) {
              setShowPanel(false);
              setEditingSlug(null);
              setForm(initialForm);
            } else {
              setShowPanel(true);
            }
          }}
          className="focus-ring inline-flex h-12 items-center gap-2 rounded-xl bg-ink px-6 text-sm font-black text-white hover:bg-slate-800 transition-all shadow-lg"
        >
          {showPanel ? <X size={18} /> : <Plus size={18} />}
          {showPanel ? "Cancel Changes" : "New Catalog Item"}
        </button>
      </section>

      {/* Stats */}
      <section className="grid gap-4 sm:gap-8 grid-cols-2 lg:grid-cols-4">
        <AdminMetric icon={Boxes} label="Orders" value={orders.length} />
        <AdminMetric icon={BarChart3} label="Revenue" value={money(metrics.revenue)} />
        <AdminMetric icon={ImageIcon} label="Catalog" value={products.length} />
        <AdminMetric icon={Settings} label="Status" value="Online" />
      </section>

      <section className="grid gap-12 lg:grid-cols-[1fr_420px] items-start">
        {/* Main List & Form Area */}
        <div className="space-y-10">
          {showPanel && (
            <div className="rounded-3xl border-2 border-primary/20 bg-white p-8 shadow-2xl shadow-primary/10 animate-fade-in relative">
              <div className="absolute -top-3 right-8 bg-mint text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg animate-pulse">
                Active: Paste image anywhere (Ctrl+V)
              </div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black">{editingSlug ? "Update Product" : "New Catalog Item"}</h2>
                <button onClick={() => { setShowPanel(false); setEditingSlug(null); }} className="text-slate-400 hover:text-ink"><X size={20} /></button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="Product Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="e.g. Premium Silk Mask" />
                  <label className="grid gap-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Category</span>
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="focus-ring h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold outline-none"
                    >
                      {categories.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </label>
                  <Field label="Price (Rs)" type="number" value={form.price} onChange={(v) => setForm({ ...form, price: v })} placeholder="0" />
                  <div className="grid gap-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Product Image</span>
                    <div className="flex gap-3">
                       <label className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 px-4 text-xs font-black text-slate-500 hover:border-mint hover:text-mint cursor-pointer transition-all">
                          <ImageIcon size={16} />
                          {form.image ? "Change Local Image" : "Upload Local Image"}
                          <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                       </label>
                       <div className="w-px bg-slate-100 my-2" />
                       <input 
                        type="text" 
                        value={form.image && !form.image.startsWith('data:') ? form.image : ""} 
                        onChange={(e) => setForm({ ...form, image: e.target.value })}
                        placeholder="Or paste URL"
                        className="flex-1 h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-xs font-bold outline-none"
                       />
                    </div>
                    {form.image && (
                      <p className="text-[10px] font-bold text-mint">Image attached: {form.image.startsWith('data:') ? "Local File" : "Remote URL"}</p>
                    )}
                  </div>
                </div>
                
                <Field label="Description" value={form.description} onChange={(v) => setForm({ ...form, description: v })} placeholder="Tell us about the product..." />
                
                <div className="grid gap-6 sm:grid-cols-2">
                   <Field label="Material" value={form.material} onChange={(v) => setForm({ ...form, material: v })} placeholder="e.g. Stainless Steel" />
                   <Field label="Lead Time" value={form.leadTime} onChange={(v) => setForm({ ...form, leadTime: v })} placeholder="e.g. 3 days" />
                </div>

                <div className="flex gap-4">
                  <button type="submit" className="flex-1 bg-ink text-white h-14 rounded-2xl text-base font-black hover:bg-slate-800 transition-all shadow-xl shadow-ink/20">
                    {editingSlug ? "Save Changes" : "Publish to Catalog"}
                  </button>
                  {editingSlug && (
                    <button 
                      type="button" 
                      onClick={() => deleteProduct(editingSlug)}
                      className="h-14 px-6 rounded-2xl border border-rose-100 bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-all"
                    >
                      <Trash2 size={22} />
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}

          <div className="space-y-6">
            <h3 className="text-2xl font-black">Live Inventory</h3>
            <div className="grid gap-4">
              {products.map((product) => (
                <div key={product.slug} className="group flex items-center justify-between rounded-[28px] border border-slate-100 bg-white p-5 hover:border-mint transition-all shadow-sm">
                  <div className="flex items-center gap-5">
                     <div className="relative h-16 w-16 overflow-hidden rounded-2xl bg-slate-50 border border-slate-100">
                        <img src={product.image} className="h-full w-full object-cover" alt="" />
                     </div>
                     <div>
                        <h4 className="font-black text-ink">{product.name}</h4>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{product.category}</span>
                          <span className="h-1 w-1 rounded-full bg-slate-200" />
                          <span className="text-[10px] font-black text-mint">{money(product.price)}</span>
                        </div>
                     </div>
                  </div>
                  <div className="flex items-center gap-2">
                     <button
                       onClick={() => startEdit(product)}
                       className="h-11 w-11 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:bg-ink hover:text-white transition-all"
                       title="Edit product"
                     >
                       <Edit3 size={18} />
                     </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar: Order Queue */}
        <div className="space-y-8 sticky top-32">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black">Order Queue</h3>
            <span className="h-7 px-3 rounded-full bg-mint/10 text-teal-800 text-[10px] font-black uppercase tracking-widest flex items-center">
              {orders.length} Pending
            </span>
          </div>
          
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="grid min-h-[300px] place-items-center rounded-[40px] border-2 border-dashed border-slate-100 text-center p-10">
                <div>
                   <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Boxes className="text-slate-200" size={32} />
                   </div>
                   <p className="font-bold text-slate-300">Queue is empty</p>
                </div>
              </div>
            ) : (
              orders.map((order) => (
                <div key={order.orderNumber} className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm hover:shadow-md transition-all">
                  <div className="flex flex-col gap-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-[10px] font-black text-coral uppercase tracking-widest mb-1">Order ID</p>
                        <h3 className="font-black text-ink text-lg">{order.orderNumber}</h3>
                        <p className="text-sm font-bold text-slate-400 mt-1">{order.customer?.name}</p>
                      </div>
                      <div className="text-right">
                         <p className="font-black text-ink">{money(order.totals?.grandTotal || 0)}</p>
                         <p className="text-[10px] font-bold text-slate-400">{order.items?.length} Items</p>
                      </div>
                    </div>
                    <div className="h-px bg-slate-50" />
                    <label className="grid gap-2">
                       <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Update Status</span>
                       <select
                        value={order.status}
                        onChange={(event) => updateOrderStatus(order.orderNumber, event.target.value)}
                        className="focus-ring h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-xs font-black text-ink outline-none"
                      >
                        {statusFlow.map((status) => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </label>
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

function Field({ label, value, onChange, type = "text", placeholder }) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-bold uppercase tracking-widest text-slate-500">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="focus-ring h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold outline-none placeholder:text-slate-300"
      />
    </label>
  );
}

function AdminMetric({ icon: Icon, label, value }) {
  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center gap-4 mb-4">
        <div className="h-10 w-10 shrink-0 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-ink">
          <Icon size={20} />
        </div>
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{label}</p>
      </div>
      <p className="text-3xl font-black text-ink">{value}</p>
    </div>
  );
}
