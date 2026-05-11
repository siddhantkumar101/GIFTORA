import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Sparkles, ShoppingBag, Gift, Truck, ShieldCheck, ArrowRight, Heart, Star, ChevronLeft, ChevronRight } from "lucide-react";
import CategoryCard from "../components/CategoryCard.jsx";
import Testimonials from "../components/Testimonials.jsx";
import { fallbackProducts } from "../utils/constants.js";
import { money } from "../utils/helpers.js";

const categories = [
  {
    id: "birthday",
    name: "Birthday Gifts",
    subtitle: "Make their special day unforgettable",
    image: "https://images.unsplash.com/photo-1530103043960-ef38714abb15?w=500",
    count: 124
  },
  {
    id: "anniversary",
    name: "Anniversary Gifts",
    subtitle: "Celebrate love and togetherness",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=500",
    count: 89
  },
  {
    id: "personalized",
    name: "Personalized Gifts",
    subtitle: "Custom gifts with a personal touch",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500",
    count: 156
  },
  {
    id: "marriage",
    name: "Marriage Gifts",
    subtitle: "Elegant gifts for the perfect couple",
    image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=500",
    count: 42
  },
  {
    id: "corporate",
    name: "Corporate Gifts",
    subtitle: "Professional gifts for valued partners",
    image: "https://images.unsplash.com/photo-1512418490979-92798ccc1380?w=500",
    count: 67
  },
  {
    id: "luxury",
    name: "Luxury Selection",
    subtitle: "Exquisite gifts for refined tastes",
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=500",
    count: 28
  }
];

const heroImages = [
  "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1600",
  "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=1600",
  "https://images.unsplash.com/photo-1512418490979-92798ccc1380?w=1600",
  "https://images.unsplash.com/photo-1530103043960-ef38714abb15?w=1600"
];

export default function HomeView() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);

  // Featured products from fallback
  const featuredProducts = fallbackProducts.slice(0, 4);

  return (
    <div className="animate-fade-in pb-20">
      {/* Dynamic Hero Slider */}
      <section className="relative h-[500px] w-full overflow-hidden mb-20">
        {heroImages.map((img, i) => (
          <div 
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${i === currentSlide ? "opacity-100" : "opacity-0"}`}
          >
            <img src={img} className="h-full w-full object-cover" alt="Hero" />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}

        <div className="absolute inset-0 z-10 flex flex-col items-start justify-center px-8 sm:px-20 text-white">
          <h1 className="text-5xl sm:text-8xl font-serif font-bold mb-6 animate-fade-in drop-shadow-2xl max-w-4xl leading-tight">
            Perfect Gifts for <br /> Every Occasion
          </h1>
          <p className="text-xl sm:text-2xl font-medium mb-10 opacity-90 drop-shadow-lg max-w-2xl">
            Discover unique presents that tell your story
          </p>
          <button 
            onClick={() => {
              navigate("/studio");
              window.scrollTo(0, 0);
            }}
            className="bg-[#facc15] hover:bg-[#eab308] text-black h-14 px-12 rounded-xl text-lg font-black transition-all shadow-xl shadow-black/20 flex items-center gap-3"
          >
            Shop Now
          </button>
        </div>

        {/* Slider Controls */}
        <button 
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all"
        >
          <ChevronRight size={24} />
        </button>
      </section>

      {/* Categories - Simplified Grid */}
      <section id="shop-categories" className="mb-32 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-ink mb-3">Shop by Gift Type</h2>
          <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">Handpicked Collections</p>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <CategoryCard 
              key={cat.id} 
              {...cat} 
              onClick={() => {
                navigate("/studio");
                window.scrollTo(0, 0);
              }} 
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
