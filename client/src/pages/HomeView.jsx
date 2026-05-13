import { useNavigate } from "react-router-dom";
import { ShoppingBag, Gift, Truck, ShieldCheck, Search, Sparkles, Heart, Star, ChevronRight, Zap, Flame, Award } from "lucide-react";
import CategoryCard from "../components/CategoryCard.jsx";
import Testimonials from "../components/Testimonials.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { fallbackProducts } from "../utils/constants.js";
import { money, optimiseImage } from "../utils/helpers.js";

const categoriesData = [
  { id: "birthday", name: "Birthday", image: "https://images.unsplash.com/photo-1530103043960-ef38714abb15?w=400" },
  { id: "anniversary", name: "Anniversary", image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400" },
  { id: "personalized", name: "Personalized", image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400" },
  { id: "marriage", name: "Marriage", image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=400" },
];

export default function HomeView({ products = [], apiMode = "connecting" }) {
  const navigate = useNavigate();

  const displayProducts = products.length > 0 ? products : apiMode === "demo" ? fallbackProducts : [];
  const featuredProducts = [...displayProducts].sort((a, b) => (b.orders || 0) - (a.orders || 0)).slice(0, 12);

  // Dynamic Categories
  const dynamicCategories = products.length > 0 ? Object.values(products.reduce((acc, p) => {
    const cat = p.category || "Gifts";
    if (!acc[cat]) {
      acc[cat] = { id: cat.toLowerCase(), name: cat, image: p.image };
    }
    return acc;
  }, {})).slice(0, 10) : categoriesData;

  return (
    <div className="pb-24 w-full overflow-x-hidden bg-[#fafbfc]">
      
      {/* 📱 MOBILE-ONLY REFINED VIEW */}
      <div className="block sm:hidden w-full overflow-x-hidden bg-white min-h-screen">
        
        {/* TOP BAR / SEARCH */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-4 py-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 group">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-coral transition-colors" />
              <input 
                type="text" 
                placeholder="Search for your next gift..."
                className="w-full bg-slate-50 border border-slate-100 h-11 pl-11 pr-4 rounded-xl text-[13px] font-semibold focus:ring-2 focus:ring-coral/20 focus:border-coral transition-all outline-none"
              />
            </div>
            <button className="h-11 w-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-ink active:scale-90 transition-transform">
              <Heart size={18} />
            </button>
          </div>
        </div>

        <div className="space-y-10 pb-10">
          
          {/* STORIES-STYLE CATEGORIES */}
          <div className="pt-6">
            <div className="px-5 flex items-center justify-between mb-4">
              <h3 className="text-sm font-black uppercase tracking-widest text-ink/40">Categories</h3>
              <button onClick={() => navigate("/studio")} className="text-[10px] font-black uppercase tracking-widest text-coral">See All</button>
            </div>
            <div className="w-full overflow-x-auto scrollbar-none touch-pan-x">
              <div className="flex flex-nowrap gap-6 px-5 w-max">
                {dynamicCategories.map((cat) => (
                  <button 
                    key={cat.id} 
                    onClick={() => navigate(`/studio?category=${cat.name}`)} 
                    className="flex flex-col items-center gap-2.5 shrink-0 active:scale-95 transition-transform"
                  >
                    <div className="relative w-[72px] h-[72px] rounded-full p-0.5 ring-2 ring-slate-100 ring-offset-2 overflow-hidden shadow-sm">
                      <img src={cat.image} className="w-full h-full rounded-full object-cover" alt={cat.name} />
                    </div>
                    <span className="text-[11px] font-bold text-ink/80">{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* DYNAMIC HERO BANNER */}
          <div className="px-4">
            <div 
              onClick={() => navigate("/studio")}
              className="relative aspect-[16/10] w-full overflow-hidden rounded-[32px] shadow-2xl shadow-coral/10"
            >
              <img 
                src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800" 
                className="absolute inset-0 w-full h-full object-cover"
                alt="Personalized Gifts"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-ink/90 via-ink/20 to-transparent" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <span className="bg-coral/90 text-white text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-full w-fit mb-3">Trending Now</span>
                <h2 className="text-3xl font-black text-white mb-2 leading-none">Gifts that<br />Tell a Story.</h2>
                <p className="text-white/70 text-[11px] font-medium mb-5 max-w-[200px]">Create something unique in our interactive studio.</p>
                <div className="flex items-center gap-2 group">
                  <span className="text-[11px] font-black text-white uppercase tracking-widest">Start Creating</span>
                  <ChevronRight size={14} className="text-coral group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>

          {/* BESTSELLERS GRID (2-COLUMN) */}
          <div className="px-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500">
                  <Flame size={16} />
                </div>
                <h3 className="text-lg font-black text-ink">Bestsellers</h3>
              </div>
              <button onClick={() => navigate("/studio")} className="text-[10px] font-black uppercase tracking-widest text-slate-400">View All</button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {featuredProducts.slice(0, 4).map((p) => (
                <div key={p.id} className="relative group">
                   <div 
                     onClick={() => navigate("/studio")}
                     className="aspect-[4/5] rounded-[24px] overflow-hidden bg-slate-50 mb-3 relative"
                   >
                     <img src={p.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={p.name} />
                     <button className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-ink shadow-lg active:scale-90 transition-transform">
                       <Heart size={14} />
                     </button>
                     <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg">
                        <span className="text-[10px] font-black text-ink">{money(p.price)}</span>
                     </div>
                   </div>
                   <h4 className="text-[13px] font-bold text-ink px-1 truncate">{p.name}</h4>
                   <p className="text-[10px] font-medium text-slate-400 px-1">{p.category}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CURATED COLLECTIONS */}
          <div className="bg-slate-50 py-10 px-4">
            <h3 className="text-lg font-black text-ink mb-6 text-center">Curated Collections</h3>
            <div className="grid grid-cols-2 gap-3">
               {[
                 { name: "Birthdays", icon: Gift, color: "bg-coral/10 text-coral" },
                 { name: "Anniversary", icon: Award, color: "bg-orange-50 text-orange-500" },
                 { name: "Luxury", icon: Star, color: "bg-ink text-white" },
                 { name: "Handmade", icon: Heart, color: "bg-mint/20 text-teal-700" }
               ].map((col, i) => (
                 <button key={i} className="flex flex-col items-center justify-center gap-3 p-6 rounded-[24px] bg-white border border-slate-100 shadow-sm active:scale-95 transition-all">
                    <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${col.color}`}>
                      <col.icon size={20} />
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-wider text-ink">{col.name}</span>
                 </button>
               ))}
            </div>
          </div>

          {/* FEATURES / TRUST */}
          <div className="px-6 py-4">
             <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: Truck, text: "Express Delivery" },
                  { icon: ShieldCheck, text: "Secure Payment" }
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                      <f.icon size={14} />
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{f.text}</span>
                  </div>
                ))}
             </div>
          </div>

        </div>
      </div>

      {/* 🖥️ DESKTOP VIEW */}
      <div className="hidden sm:block w-full">
        <section className="relative h-[480px] lg:h-[580px] overflow-hidden mb-16 bg-slate-900 mx-4 rounded-[48px]">
          <img src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=75&w=1200" className="absolute inset-0 w-full h-full object-cover opacity-55" alt="Hero" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/20 via-slate-900/45 to-slate-900/85" />
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-5">
            <span className="inline-block bg-coral/90 text-white text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full mb-5">✦ Premium Gifting</span>
            <h1 className="text-5xl lg:text-6xl font-serif font-bold text-white leading-tight mb-4 max-w-2xl mx-auto">Perfect Gifts for Every Occasion</h1>
            <p className="text-lg font-medium text-white/80 mb-8 max-w-md mx-auto leading-relaxed">Discover unique presents that tell your story</p>
            <div className="flex flex-row gap-3 justify-center">
              <button onClick={() => navigate("/studio")} className="bg-coral text-white font-black text-base h-14 px-10 rounded-2xl hover:bg-[#e24e3c] active:scale-95 transition-all shadow-lg">Shop Now</button>
              <button onClick={() => document.getElementById("shop-categories")?.scrollIntoView({ behavior: "smooth" })} className="bg-white/15 backdrop-blur-md text-white border border-white/30 font-black text-base h-14 px-10 rounded-2xl hover:bg-white/25 active:scale-95 transition-all">Explore</button>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto mb-16 px-6 lg:px-8">
          <div className="grid grid-cols-4 gap-4 p-6 rounded-[32px] bg-slate-50 border border-slate-100">
            {[
              { icon: Gift, label: "Premium Packaging" },
              { icon: Truck, label: "Express Delivery" },
              { icon: ShieldCheck, label: "Quality Guarantee" },
              { icon: ShoppingBag, label: "Bulk Gifting" },
            ].map((f, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5 py-1">
                <div className="h-10 w-10 shrink-0 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-mint">
                  <f.icon size={16} />
                </div>
                <p className="font-black text-xs text-ink leading-tight text-center">{f.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="shop-categories" className="mb-24 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-ink mb-3">Shop by Gift Type</h2>
            <div className="h-1.5 w-20 bg-mint mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-2 gap-6">
            {(products.length > 0 ? Object.values(products.reduce((acc, p) => {
              const cat = p.category || "Other";
              if (!acc[cat]) {
                acc[cat] = { category: cat, count: 0, image: optimiseImage(p.image, 400, 70), subtitle: `Discover our ${cat} collection` };
              }
              acc[cat].count++;
              return acc;
            }, {})) : dynamicCategories).slice(0, 4).map((cat, i) => (
              <div key={i} className="min-w-0">
                <CategoryCard category={cat.category || cat.name} image={cat.image} subtitle={cat.subtitle} count={cat.count} onClick={() => navigate(`/studio?category=${cat.category || cat.id}`)} />
              </div>
            ))}
          </div>
        </section>

        <section className="mb-24 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-black text-ink">Bestsellers</h2>
            <button onClick={() => navigate("/studio")} className="text-xs font-black text-orange-500 uppercase tracking-widest hover:text-ink transition-colors py-2 pl-3">View All →</button>
          </div>
          <div className="grid grid-cols-4 gap-6">
            {featuredProducts.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} selected={false} onSelect={() => navigate("/studio")} />
            ))}
          </div>
        </section>

        <Testimonials />

        <section className="mt-16 max-w-7xl mx-auto rounded-[48px] bg-mint p-16 text-center text-ink relative overflow-hidden mb-16">
          <div className="absolute -top-8 -right-8 w-40 h-40 bg-white/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-ink/10 rounded-full blur-3xl pointer-events-none" />
          <h2 className="relative text-4xl font-black mb-5 leading-tight">Create your next memory.</h2>
          <p className="relative text-ink/60 max-w-xs mx-auto mb-8 text-base font-bold leading-relaxed">Step into our studio and experience real-time gift design.</p>
          <button onClick={() => navigate("/studio")} className="relative bg-ink text-white font-black h-14 px-10 rounded-2xl text-base hover:bg-slate-800 active:scale-95 transition-all shadow-xl shadow-ink/20">Enter Studio</button>
        </section>
      </div>

    </div>
  );
}
