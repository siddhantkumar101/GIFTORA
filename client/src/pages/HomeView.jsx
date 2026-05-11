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
    subtitle: "Make their day special with a personal touch",
    image: "https://images.unsplash.com/photo-1530103043960-ef38714abb15?q=80&w=800&auto=format&fit=crop",
    count: 15
  },
  {
    id: "anniversary",
    name: "Anniversary Gifts",
    subtitle: "Celebrate your love with timeless memories",
    image: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=800&auto=format&fit=crop",
    count: 12
  },
  {
    id: "personalized",
    name: "Personalized Items",
    subtitle: "Unique gifts crafted specifically for you",
    image: "https://images.unsplash.com/photo-1517142089942-ba376ce32a2e?q=80&w=800&auto=format&fit=crop",
    count: 45
  },
  {
    id: "corporate",
    name: "Corporate Gifting",
    subtitle: "Professional gifts for your valued partners",
    image: "https://images.unsplash.com/photo-1512418490979-92798ccc1380?q=80&w=800&auto=format&fit=crop",
    count: 20
  },
  {
    id: "handmade",
    name: "Handmade Crafts",
    subtitle: "Artisan products made with passion",
    image: "https://images.unsplash.com/photo-1481833761820-0509d3217039?q=80&w=800&auto=format&fit=crop",
    count: 18
  },
  {
    id: "luxury",
    name: "Luxury Collection",
    subtitle: "Premium gifts for the most refined tastes",
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=800&auto=format&fit=crop",
    count: 10
  }
];

export default function HomeView() {
  const navigate = useNavigate();

  // Featured products from fallback
  const featuredProducts = fallbackProducts.slice(0, 4);
  const corporateProducts = fallbackProducts.filter(p => p.category === "Corporate").slice(0, 3);
  const luxuryProducts = fallbackProducts.filter(p => p.category === "Luxury").slice(0, 3);

  return (
    <div className="animate-fade-in pb-20">
      {/* Hero Section */}
      <section className="relative py-24 px-4 text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-mint/5 rounded-full blur-[120px] -z-10" />
        <p className="text-xs font-black uppercase tracking-[0.4em] text-coral mb-6">India's Premium Gifting Studio</p>
        <h2 className="text-6xl font-black tracking-tighter sm:text-9xl text-ink leading-[1] mb-8">
          Personalized <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-mint to-teal-600 italic">With Love.</span>
        </h2>
        <p className="mt-8 mx-auto max-w-2xl text-lg text-slate-500 font-medium leading-relaxed sm:text-2xl mb-12">
          Design premium gifts in real-time. From corporate kits to artisan hampers, we bring your vision to life.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <button 
            onClick={() => navigate("/studio")}
            className="focus-ring bg-ink text-white h-16 px-12 rounded-2xl text-lg font-black hover:bg-slate-800 transition-all shadow-2xl shadow-ink/30 flex items-center gap-3 w-full sm:w-auto"
          >
            <Sparkles size={24} className="text-coral" />
            Open Studio
          </button>
          <button 
             onClick={() => {
                document.getElementById('shop-categories')?.scrollIntoView({ behavior: 'smooth' });
             }}
             className="focus-ring bg-white border-2 border-slate-100 text-ink h-16 px-12 rounded-2xl text-lg font-black hover:border-mint transition-all flex items-center gap-3 w-full sm:w-auto"
          >
            View Varieties
          </button>
        </div>
      </section>

      {/* Trust Features */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
        {[
          { icon: Gift, label: "Premium Packaging", sub: "Luxurious unboxing" },
          { icon: Truck, label: "Express Delivery", sub: "Fast across India" },
          { icon: ShieldCheck, label: "Quality Guarantee", sub: "Crafted with care" },
          { icon: ShoppingBag, label: "Bulk Gifting", sub: "Corporate solutions" }
        ].map((f, i) => (
          <div key={i} className="flex flex-col items-center text-center p-8 rounded-[32px] bg-white border border-slate-50 shadow-sm hover:shadow-md transition-shadow">
            <div className="h-14 w-14 rounded-2xl bg-mint/10 flex items-center justify-center text-mint mb-5">
              <f.icon size={28} />
            </div>
            <p className="font-black text-base text-ink">{f.label}</p>
            <p className="text-xs text-slate-400 font-bold mt-2 uppercase tracking-widest">{f.sub}</p>
          </div>
        ))}
      </section>

      {/* Categories Section */}
      <section id="shop-categories" className="mb-32">
        <div className="flex flex-col sm:flex-row items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-coral mb-4">The Collection</p>
            <h2 className="text-5xl font-black text-ink">Shop by Gift Type</h2>
          </div>
          <button 
             onClick={() => navigate("/studio")}
             className="group text-sm font-black text-mint hover:text-ink transition-colors flex items-center gap-2"
          >
            Explore All Varieties <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <CategoryCard 
              key={cat.id} 
              {...cat} 
              onClick={() => navigate("/studio")} 
            />
          ))}
        </div>
      </section>

      {/* Featured Collection Section */}
      <section className="mb-32">
        <div className="text-center mb-16">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-coral mb-4">Handpicked</p>
          <h2 className="text-5xl font-black text-ink">Bestsellers</h2>
        </div>
        
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((p) => (
            <div key={p.id} className="group cursor-pointer" onClick={() => navigate("/studio")}>
               <div className="relative aspect-square overflow-hidden rounded-3xl bg-slate-50 mb-4">
                  <img src={p.image} alt={p.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute top-4 left-4 h-8 px-3 rounded-full bg-white/90 backdrop-blur shadow-sm flex items-center gap-1 text-[10px] font-black uppercase tracking-widest">
                     <Star size={10} className="fill-coral text-coral" /> {p.rating}
                  </div>
                  <button className="absolute bottom-4 right-4 h-10 w-10 rounded-full bg-white text-ink shadow-lg grid place-items-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                     <Heart size={18} />
                  </button>
               </div>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{p.category}</p>
               <h4 className="text-lg font-black text-ink mt-1">{p.name}</h4>
               <p className="text-mint font-bold mt-1">{money(p.price)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Corporate Gifting Dedicated Section */}
      <section className="mb-32 p-12 rounded-[48px] bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-mint/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="grid lg:grid-cols-2 gap-16 items-center">
           <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-coral mb-6">Business Solutions</p>
              <h2 className="text-5xl font-black mb-8 leading-[1.1]">Elevate Your Corporate <br /> Identity with Style.</h2>
              <p className="text-lg text-slate-400 font-medium mb-10 max-w-lg leading-relaxed">
                 From employee welcome kits to premium client gifts, we specialize in high-quality branding and customization.
              </p>
              <div className="space-y-4 mb-10">
                 {["Bulk Customization", "Global Shipping", "Dedicated Manager", "Premium Branding"].map(f => (
                    <div key={f} className="flex items-center gap-3">
                       <div className="h-2 w-2 rounded-full bg-mint" />
                       <span className="font-bold text-slate-200">{f}</span>
                    </div>
                 ))}
              </div>
              <button 
                 onClick={() => navigate("/studio")}
                 className="h-14 px-10 rounded-xl bg-mint text-ink font-black hover:bg-teal-300 transition-all flex items-center gap-3"
              >
                 Contact Corporate Sales <ArrowRight size={20} />
              </button>
           </div>
           <div className="grid grid-cols-2 gap-4">
              {corporateProducts.map((p, i) => (
                 <div key={p.id} className={`rounded-3xl overflow-hidden aspect-[3/4] ${i === 2 ? 'col-span-2 aspect-[16/9]' : ''}`}>
                    <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                 </div>
              ))}
           </div>
        </div>
      </section>

      {/* Luxury Collection Highlight */}
      <section className="mb-32">
        <div className="flex items-center justify-between gap-6 mb-16">
          <h2 className="text-5xl font-black text-ink">Luxury Selection</h2>
          <div className="h-px flex-1 bg-slate-100 hidden sm:block" />
          <button onClick={() => navigate("/studio")} className="text-sm font-black text-coral uppercase tracking-widest">See All</button>
        </div>
        <div className="grid gap-12 lg:grid-cols-3">
           {luxuryProducts.map(p => (
              <div key={p.id} className="relative group cursor-pointer" onClick={() => navigate("/studio")}>
                 <div className="aspect-[4/5] overflow-hidden rounded-[32px] bg-slate-50 mb-6">
                    <img src={p.image} alt={p.name} className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                 </div>
                 <div className="text-center">
                    <h4 className="text-2xl font-black text-ink">{p.name}</h4>
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mt-2">{p.material}</p>
                    <div className="mt-4 flex items-center justify-center gap-4">
                       <span className="h-px w-8 bg-slate-200" />
                       <span className="text-lg font-black text-ink">{money(p.price)}</span>
                       <span className="h-px w-8 bg-slate-200" />
                    </div>
                 </div>
              </div>
           ))}
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Call to Action */}
      <section className="mt-20 rounded-[60px] bg-mint p-20 text-center text-ink relative overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-white/20 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
        <p className="text-xs font-black uppercase tracking-[0.4em] mb-6">Start Your Journey</p>
        <h2 className="text-6xl font-black mb-8 max-w-3xl mx-auto leading-tight">Ready to create your next memory?</h2>
        <p className="text-ink/60 max-w-xl mx-auto mb-12 text-xl font-bold">
          Step into our studio and experience the magic of real-time design.
        </p>
        <button 
          onClick={() => navigate("/studio")}
          className="focus-ring bg-ink text-white h-16 px-12 rounded-2xl text-lg font-black hover:bg-slate-800 transition-all shadow-2xl shadow-ink/20"
        >
          Enter Design Studio
        </button>
      </section>
    </div>
  );
}
