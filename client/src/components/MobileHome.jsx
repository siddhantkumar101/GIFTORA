import { Search, Sparkles, Heart, Flame, Gift, Award, Star, ChevronRight, User, ShieldCheck } from "lucide-react";
import { money } from "../utils/helpers.js";

export default function MobileHome({ products, apiMode, navigate, session, openLogin, logout }) {
  const isLoading = apiMode === "connecting";
  const displayProducts = products.length > 0 ? products : [];
  const featured = displayProducts.slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto overflow-x-hidden pb-32">
      
      {/* 1. INTEGRATED APP HEADER */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md px-5 py-4 flex items-center justify-between border-b border-slate-50">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-xl bg-ink flex items-center justify-center shadow-lg shadow-ink/20">
            <Sparkles size={18} className="text-orange-500" />
          </div>
          <div className="leading-none">
            <p className="text-[7px] font-black uppercase tracking-widest text-orange-500">Premium</p>
            <h1 className="text-sm font-black text-ink">Giftora</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {session ? (
            <button onClick={logout} className="h-9 px-3 rounded-xl bg-slate-50 text-[10px] font-bold text-slate-400">Logout</button>
          ) : (
            <button onClick={() => openLogin()} className="h-9 w-9 rounded-xl bg-slate-50 flex items-center justify-center text-ink">
              <User size={18} />
            </button>
          )}
        </div>
      </header>

      {/* 2. SEARCH AREA (ZERO SHIFT) */}
      <div className="px-5 pt-6 pb-2">
        <div className="relative group">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search for magic..."
            className="w-full bg-slate-100/50 border-transparent h-13 pl-12 pr-4 rounded-[20px] text-sm font-semibold focus:bg-white focus:ring-2 focus:ring-coral/20 transition-all outline-none"
          />
        </div>
      </div>

      {/* 3. HERO SECTION (FIXED ASPECT) */}
      <div className="px-5 mt-6">
        <div className="relative aspect-[16/11] w-full rounded-[32px] overflow-hidden bg-slate-100 shadow-2xl shadow-coral/10">
          <img 
            src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800" 
            className="absolute inset-0 w-full h-full object-cover"
            alt="Hero"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
          <div className="absolute inset-0 p-8 flex flex-col justify-end">
            <h2 className="text-3xl font-black text-white leading-tight mb-3">Gifts that<br />wow them.</h2>
            <button onClick={() => navigate("/studio")} className="w-fit bg-coral text-white px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest active:scale-95 transition-transform">
              Enter Studio
            </button>
          </div>
        </div>
      </div>

      {/* 4. PRODUCT GRID WITH SKELETONS (ZERO SHIFT) */}
      <div className="px-5 mt-10">
        <div className="flex items-center justify-between mb-6">
           <h3 className="text-lg font-black text-ink">Trending Now</h3>
           <button onClick={() => navigate("/studio")} className="text-[10px] font-black uppercase tracking-widest text-coral">View All</button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {isLoading ? (
            [1, 2, 3, 4].map(i => (
              <div key={i} className="space-y-3">
                <div className="aspect-[4/5] rounded-[24px] bg-slate-50 animate-pulse" />
                <div className="h-4 w-3/4 bg-slate-50 rounded animate-pulse" />
                <div className="h-3 w-1/2 bg-slate-50 rounded animate-pulse" />
              </div>
            ))
          ) : (
            featured.map(p => (
              <div key={p.id} className="group" onClick={() => navigate("/studio")}>
                <div className="aspect-[4/5] rounded-[24px] overflow-hidden bg-slate-50 relative mb-3">
                  <img src={p.image} className="w-full h-full object-cover" alt={p.name} />
                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg">
                    <span className="text-[10px] font-black text-ink">{money(p.price)}</span>
                  </div>
                </div>
                <h4 className="text-[13px] font-bold text-ink truncate px-1">{p.name}</h4>
                <p className="text-[10px] font-medium text-slate-400 px-1">{p.category}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 5. QUICK LINKS */}
      <div className="mt-12 px-5">
        <h3 className="text-sm font-black uppercase tracking-widest text-ink/30 mb-6 px-1">Curated For You</h3>
        <div className="grid grid-cols-2 gap-3">
           {[
             { name: "Luxury", icon: Star, color: "bg-ink text-white" },
             { name: "Hampers", icon: Gift, color: "bg-coral/10 text-coral" },
             { name: "Express", icon: Flame, color: "bg-orange-50 text-orange-500" },
             { name: "Studio", icon: Sparkles, color: "bg-mint/10 text-teal-700" }
           ].map((col, i) => (
             <button key={i} onClick={() => navigate("/studio")} className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 active:scale-95 transition-all">
                <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${col.color}`}>
                  <col.icon size={18} />
                </div>
                <span className="text-[11px] font-black uppercase tracking-tight text-ink">{col.name}</span>
             </button>
           ))}
        </div>
      </div>

    </div>
  );
}
