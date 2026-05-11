import { useNavigate } from "react-router-dom";
import { ShoppingBag, Gift, Truck, ShieldCheck, Search, Sparkles, Heart, Star, ChevronRight } from "lucide-react";
import CategoryCard from "../components/CategoryCard.jsx";
import Testimonials from "../components/Testimonials.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { fallbackProducts } from "../utils/constants.js";
import { money, optimiseImage } from "../utils/helpers.js";

const categories = [
  {
    id: "birthday",
    name: "Birthday",
    subtitle: "Make their special day unforgettable",
    image: "https://images.unsplash.com/photo-1530103043960-ef38714abb15?auto=format&fit=crop&q=70&w=400",
    count: 124,
  },
  {
    id: "anniversary",
    name: "Anniversary",
    subtitle: "Celebrate love and togetherness",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=70&w=400",
    count: 89,
  },
  {
    id: "personalized",
    name: "Personalized",
    subtitle: "Custom gifts with a personal touch",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=70&w=400",
    count: 156,
  },
  {
    id: "marriage",
    name: "Marriage",
    subtitle: "Elegant gifts for the perfect couple",
    image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=70&w=400",
    count: 42,
  },
];

export default function HomeView({ products = [], apiMode = "connecting" }) {
  const navigate = useNavigate();

  const displayProducts =
    products.length > 0
      ? products
      : apiMode === "demo"
      ? fallbackProducts
      : [];

  const featuredProducts = [...displayProducts]
    .sort((a, b) => (b.orders || 0) - (a.orders || 0))
    .slice(0, 8);

  const placeholderImg =
    "https://images.unsplash.com/photo-1594322436404-5a0526db4d13?auto=format&fit=crop&q=70&w=400";

  return (
    <div className="animate-fade-in pb-24 overflow-x-hidden">
      
      {/* 📱 MOBILE-ONLY NATIVE EXPERIENCE */}
      <div className="block sm:hidden space-y-8">
        
        {/* Search Header */}
        <div className="pt-2">
          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search size={18} className="text-slate-400" />
            </div>
            <input 
              type="text" 
              placeholder="Search for 'Birthday Gifts'..."
              className="w-full bg-slate-100/80 border-none h-12 pl-12 pr-4 rounded-2xl text-sm font-medium"
            />
          </div>
        </div>

        {/* Categories Scroll */}
        <div className="-mx-4">
          <div className="flex overflow-x-auto scrollbar-none gap-5 px-4 pb-2">
            {categories.map((cat) => (
              <button 
                key={cat.id} 
                onClick={() => navigate(`/studio?category=${cat.id}`)}
                className="flex flex-col items-center gap-2 shrink-0"
              >
                <div className="w-16 h-16 rounded-full p-0.5 border-2 border-coral shadow-sm">
                  <img src={cat.image} className="w-full h-full rounded-full object-cover" alt={cat.name} />
                </div>
                <span className="text-[10px] font-black text-ink uppercase tracking-tight">{cat.name}</span>
              </button>
            ))}
            <button onClick={() => navigate("/studio")} className="flex flex-col items-center gap-2 shrink-0">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center border-2 border-dashed border-slate-300">
                <Sparkles size={20} className="text-slate-400" />
              </div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-tight">All</span>
            </button>
          </div>
        </div>

        {/* Hero Card - Removed all complex transformations/widths */}
        <div 
          onClick={() => navigate("/studio")}
          className="relative h-[420px] rounded-[32px] overflow-hidden bg-slate-900 border border-slate-100/10 shadow-lg"
        >
          <img 
            src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=75&w=800" 
            className="absolute inset-0 w-full h-full object-cover opacity-60"
            alt="Hero"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />
          <div className="absolute bottom-0 inset-x-0 p-8">
            <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-4 border border-white/30">
              <Sparkles size={12} /> Featured Gift
            </span>
            <h2 className="text-3xl font-serif font-bold text-white mb-2 leading-tight">Create your<br />perfect gift.</h2>
            <p className="text-white/80 text-xs font-medium mb-6 leading-relaxed max-w-[220px]">Step into the Giftora Studio and design a memory in real-time.</p>
            <button className="w-full bg-coral text-white h-12 rounded-2xl font-black text-sm shadow-xl shadow-coral/30">
              Start Creating Now
            </button>
          </div>
        </div>

        {/* Trust Strip - Simplified to prevent overflow */}
        <div className="-mx-4 bg-mint/10 py-3 overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap gap-10">
            {[
              { icon: Gift, label: "Premium Packaging" },
              { icon: Truck, label: "Express Delivery" },
              { icon: ShieldCheck, label: "Quality Guarantee" },
              { icon: ShoppingBag, label: "Bulk Gifting" },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-2">
                <f.icon size={14} className="text-mint" />
                <span className="text-[10px] font-black uppercase tracking-widest text-ink">{f.label}</span>
              </div>
            ))}
            {[
              { icon: Gift, label: "Premium Packaging" },
              { icon: Truck, label: "Express Delivery" },
              { icon: ShieldCheck, label: "Quality Guarantee" },
              { icon: ShoppingBag, label: "Bulk Gifting" },
            ].map((f, i) => (
              <div key={i+"-dup"} className="flex items-center gap-2">
                <f.icon size={14} className="text-mint" />
                <span className="text-[10px] font-black uppercase tracking-widest text-ink">{f.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Products Scroll */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-xl font-black text-ink">New Arrivals</h3>
            <button onClick={() => navigate("/studio")} className="flex items-center gap-1 text-[11px] font-black text-coral uppercase tracking-widest">
              See All <ChevronRight size={14} />
            </button>
          </div>
          <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-none snap-x snap-mandatory -mx-4 px-4">
            {featuredProducts.map((p) => (
              <div key={p.id} className="min-w-[170px] w-[170px] snap-start">
                <ProductCard product={p} selected={false} onSelect={() => navigate("/studio")} />
              </div>
            ))}
            <div 
              onClick={() => navigate("/studio")}
              className="min-w-[140px] w-[140px] snap-start rounded-2xl bg-slate-50 border border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 active:scale-95 transition-transform"
            >
              <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-coral">
                <Sparkles size={20} />
              </div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">View More</span>
            </div>
          </div>
        </div>
      </div>

      {/* 🖥️ DESKTOP EXPERIENCE */}
      <div className="hidden sm:block">
        {/* Hero Section */}
        <section className="relative h-[480px] lg:h-[580px] overflow-hidden mb-16 bg-slate-900 -mx-6 lg:-mx-8">
          <img
            src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=75&w=1200"
            className="absolute inset-0 w-full h-full object-cover opacity-55"
            alt="Giftora Hero"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/20 via-slate-900/45 to-slate-900/85" />
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-5">
            <span className="inline-block bg-coral/90 text-white text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full mb-5">
              ✦ Premium Gifting
            </span>
            <h1 className="text-5xl lg:text-6xl font-serif font-bold text-white leading-tight mb-4 max-w-2xl mx-auto">
              Perfect Gifts for Every Occasion
            </h1>
            <p className="text-lg font-medium text-white/80 mb-8 max-w-md mx-auto leading-relaxed">
              Discover unique presents that tell your story
            </p>
            <div className="flex flex-row gap-3 justify-center">
              <button
                onClick={() => { navigate("/studio"); window.scrollTo(0, 0); }}
                className="bg-coral text-white font-black text-base h-14 px-10 rounded-2xl hover:bg-[#e24e3c] active:scale-95 transition-all shadow-lg"
              >
                Shop Now
              </button>
              <button
                onClick={() => document.getElementById("shop-categories")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-white/15 backdrop-blur-md text-white border border-white/30 font-black text-base h-14 px-10 rounded-2xl hover:bg-white/25 active:scale-95 transition-all"
              >
                Explore
              </button>
            </div>
          </div>
        </section>

        {/* Trust Bar */}
        <section className="max-w-7xl mx-auto mb-16">
          <div className="grid grid-cols-4 gap-4 p-6 rounded-[32px] bg-slate-50 border border-slate-100">
            {[
              { icon: Gift,        label: "Premium Packaging" },
              { icon: Truck,       label: "Express Delivery"  },
              { icon: ShieldCheck, label: "Quality Guarantee" },
              { icon: ShoppingBag, label: "Bulk Gifting"      },
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

        {/* Categories Section */}
        <section id="shop-categories" className="mb-24 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-ink mb-3">Shop by Gift Type</h2>
            <div className="h-1.5 w-20 bg-mint mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-2 gap-6">
            {(products.length > 0 ? Object.values(products.reduce((acc, p) => {
              const cat = p.category || "Other";
              if (!acc[cat]) {
                acc[cat] = {
                  category: cat,
                  count: 0,
                  image: optimiseImage(p.image, 400, 70) || placeholderImg,
                  subtitle: `Discover our ${cat} collection`,
                };
              }
              acc[cat].count++;
              return acc;
            }, {})) : categories).slice(0, 4).map((cat, i) => (
              <div key={i} className="min-w-0">
                <CategoryCard
                  category={cat.category || cat.name}
                  image={cat.image || placeholderImg}
                  subtitle={cat.subtitle}
                  count={cat.count}
                  onClick={() => {
                    navigate(`/studio?category=${cat.category || cat.id}`);
                    window.scrollTo(0, 0);
                  }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Bestsellers Section */}
        <section className="mb-24 max-w-7xl mx-auto">
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

        {/* Final CTA */}
        <section className="mt-16 max-w-7xl mx-auto rounded-[48px] bg-mint p-16 text-center text-ink relative overflow-hidden">
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
