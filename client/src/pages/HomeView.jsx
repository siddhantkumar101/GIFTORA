import { useNavigate } from "react-router-dom";
import { Sparkles, ShoppingBag, Gift, Truck, ShieldCheck, ArrowRight, Heart, Star } from "lucide-react";
import CategoryCard from "../components/CategoryCard.jsx";
import Testimonials from "../components/Testimonials.jsx";
import { fallbackProducts } from "../utils/constants.js";
import { money } from "../utils/helpers.js";

const categories = [
  {
    id: "birthday",
    name: "Birthday Gifts",
    subtitle: "Make their special day unforgettable",
    image: "https://images.unsplash.com/photo-1530103043960-ef38714abb15?q=80&w=800",
    count: 124
  },
  {
    id: "anniversary",
    name: "Anniversary Gifts",
    subtitle: "Celebrate love and togetherness",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800",
    count: 89
  },
  {
    id: "personalized",
    name: "Personalized Gifts",
    subtitle: "Custom gifts with a personal touch",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800",
    count: 156
  },
  {
    id: "marriage",
    name: "Marriage Gifts",
    subtitle: "Elegant gifts for the perfect couple",
    image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800",
    count: 42
  },
  {
    id: "corporate",
    name: "Corporate Gifts",
    subtitle: "Professional gifts for valued partners",
    image: "https://images.unsplash.com/photo-1512418490979-92798ccc1380?q=80&w=800",
    count: 67
  },
  {
    id: "luxury",
    name: "Luxury Selection",
    subtitle: "Exquisite gifts for refined tastes",
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=800",
    count: 28
  }
];

export default function HomeView() {
  const navigate = useNavigate();

  // Featured products from fallback
  const featuredProducts = fallbackProducts.slice(0, 4);

  return (
    <div className="animate-fade-in pb-20">
      {/* Hero Section - Clean & High Impact */}
      <section className="relative py-32 px-4 text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.05)_0,transparent_70%)] -z-10" />
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-orange-500 mb-6">India's Premium Gifting Studio</p>
        <h1 className="text-5xl font-black tracking-tighter sm:text-8xl text-ink leading-none mb-8">
          Personalized <br />
          <span className="text-orange-500 italic">With Love.</span>
        </h1>
        <p className="mt-8 mx-auto max-w-xl text-base text-slate-400 font-medium leading-relaxed sm:text-lg mb-12">
          Design premium gifts in real-time. Handcrafted with passion, delivered with care.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => navigate("/studio")}
            className="focus-ring bg-ink text-white h-14 px-10 rounded-2xl text-base font-black hover:bg-slate-800 transition-all flex items-center gap-3 w-full sm:w-auto shadow-xl shadow-ink/20"
          >
            <Sparkles size={20} className="text-orange-500" />
            Open Studio
          </button>
          <button 
             onClick={() => {
                document.getElementById('shop-categories')?.scrollIntoView({ behavior: 'smooth' });
             }}
             className="focus-ring bg-white border border-slate-200 text-ink h-14 px-10 rounded-2xl text-base font-black hover:border-mint transition-all w-full sm:w-auto"
          >
            View Varieties
          </button>
        </div>
      </section>

      {/* Categories - Simplified Grid */}
      <section id="shop-categories" className="mb-32 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-ink mb-3">Shop by Gift Type</h2>
          <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">Handpicked Collections</p>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <CategoryCard 
              key={cat.id} 
              {...cat} 
              onClick={() => navigate("/studio")} 
            />
          ))}
        </div>
      </section>

      {/* Bestsellers - Clean & Minimal */}
      <section className="mb-32 px-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-black text-ink">Bestsellers</h2>
          <button 
             onClick={() => navigate("/studio")}
             className="text-xs font-black text-orange-500 uppercase tracking-[0.2em] hover:text-ink transition-colors"
          >
            View All Varieties
          </button>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((p) => (
            <div key={p.id} className="group cursor-pointer" onClick={() => navigate("/studio")}>
               <div className="relative aspect-square overflow-hidden rounded-[32px] bg-slate-50 mb-4 border border-slate-50">
                  <img 
                    src={p.image || "https://images.unsplash.com/photo-1594322436404-5a0526db4d13?w=400"} 
                    alt={p.name} 
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute top-4 left-4 h-7 px-2.5 rounded-full bg-white/90 backdrop-blur shadow-sm flex items-center gap-1 text-[9px] font-black uppercase tracking-widest">
                     <Star size={10} className="fill-orange-500 text-orange-500" /> {p.rating}
                  </div>
               </div>
               <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">{p.category}</p>
               <h4 className="text-base font-black text-ink mt-2 leading-tight">{p.name}</h4>
               <p className="text-mint font-black mt-1 text-sm">{money(p.price)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Bar - Compact */}
      <section className="max-w-7xl mx-auto px-4 mb-32">
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 rounded-[40px] bg-slate-50 border border-slate-100">
            {[
               { icon: Gift, label: "Premium Packaging" },
               { icon: Truck, label: "Express Delivery" },
               { icon: ShieldCheck, label: "Quality Guarantee" },
               { icon: ShoppingBag, label: "Bulk Gifting" }
            ].map((f, i) => (
               <div key={i} className="flex items-center gap-4 px-4">
                  <div className="h-10 w-10 shrink-0 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-mint">
                     <f.icon size={20} />
                  </div>
                  <p className="font-black text-xs text-ink leading-tight">{f.label}</p>
               </div>
            ))}
         </div>
      </section>

      <Testimonials />

      {/* Final CTA - Elegant */}
      <section className="mt-20 mx-4 max-w-7xl lg:mx-auto rounded-[60px] bg-mint p-16 text-center text-ink relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
        <h2 className="text-4xl font-black mb-6 leading-tight">Create your next memory.</h2>
        <p className="text-ink/60 max-w-md mx-auto mb-10 text-base font-bold">
          Step into our studio and experience real-time gift design.
        </p>
        <button 
          onClick={() => navigate("/studio")}
          className="bg-ink text-white h-14 px-10 rounded-2xl text-base font-black hover:bg-slate-800 transition-all shadow-xl shadow-ink/20"
        >
          Enter Studio
        </button>
      </section>
    </div>
  );
}
