import { LogIn, Truck, PackageCheck } from "lucide-react";
import { money } from "../utils/helpers.js";
import { statusFlow } from "../utils/constants.js";

export default function OrdersView({ orders, user, setUser, setActiveTab }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-soft sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-coral">Consumer tracking</p>
          <h2 className="text-3xl font-black">Your orders</h2>
        </div>
        <label className="flex min-h-11 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3">
          <LogIn size={17} className="text-slate-500" aria-hidden="true" />
          <input
            value={user.email}
            onChange={(event) => setUser({ ...user, email: event.target.value })}
            placeholder="Email for order lookup"
            className="bg-transparent text-sm outline-none"
          />
        </label>
      </div>

      <div className="mt-5 grid gap-4">
        {orders.length === 0 ? (
          <div className="grid min-h-48 place-items-center rounded-lg border border-dashed border-slate-300 text-center">
            <div>
              <Truck className="mx-auto text-slate-400" size={36} aria-hidden="true" />
              <p className="mt-3 font-bold">No orders yet.</p>
              <button
                type="button"
                onClick={() => setActiveTab("studio")}
                className="focus-ring mt-3 rounded-lg bg-coral px-4 py-2 text-sm font-black text-white"
              >
                Create one
              </button>
            </div>
          </div>
        ) : (
          orders.map((order) => <OrderCard key={order.orderNumber} order={order} />)
        )}
      </div>
    </section>
  );
}

function OrderCard({ order }) {
  const currentIndex = Math.max(statusFlow.indexOf(order.status), 0);
  return (
    <article className="glass-card bg-white/50 p-6 animate-fade-in border-slate-100">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-xl font-black tracking-tight text-slate-800">{order.orderNumber}</h3>
          <p className="mt-1 text-sm font-semibold text-slate-500">
            {order.items?.length || 0} item(s) | <span className="text-slate-800">{money(order.totals?.grandTotal || 0)}</span>
          </p>
        </div>
        <span className="inline-flex w-fit items-center gap-2 rounded-xl bg-mint/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-teal-700">
          <PackageCheck size={16} aria-hidden="true" />
          {order.status}
        </span>
      </div>
      
      <div className="mt-8 grid gap-2 sm:grid-cols-6">
        {statusFlow.map((status, index) => (
          <div
            key={status}
            className={`relative min-h-[60px] rounded-xl border p-3 transition-all duration-300 ${
              index <= currentIndex
                ? "border-mint bg-mint/5 text-teal-900 shadow-sm shadow-mint/10"
                : "border-slate-100 bg-white/30 text-slate-400"
            }`}
          >
            <p className="text-[10px] font-black uppercase tracking-tighter">{status}</p>
            {index < currentIndex && (
              <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 z-10 hidden sm:block">
                 <div className="h-3 w-3 rounded-full bg-mint shadow-glow" />
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-6 space-y-3 rounded-2xl bg-slate-50/50 p-4">
        <p className="text-xs font-black uppercase tracking-widest text-slate-400">Live Updates</p>
        {(order.tracking || []).slice(-3).map((entry, index) => (
          <div key={`${entry.label}-${index}`} className="flex gap-3 text-sm">
             <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-coral" />
             <p className="text-slate-600">
               <span className="font-bold text-slate-800">{entry.label}:</span> {entry.note}
             </p>
          </div>
        ))}
      </div>
    </article>
  );
}
