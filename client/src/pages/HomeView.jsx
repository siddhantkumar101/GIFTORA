import { useNavigate } from "react-router-dom";
import { Sparkles, ShoppingBag, Gift, Truck, ShieldCheck, ArrowRight, Heart, Star } from "lucide-react";
import CategoryCard from "../components/CategoryCard.jsx";
import Testimonials from "../components/Testimonials.jsx";
import ProductCard from "../components/ProductCard.jsx";
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
  }
];

export default function HomeView({ products = [], apiMode = "connecting" }) {
  const navigate = useNavigate();
  
  // Use live products if available, otherwise fallback to static data ONLY if in demo mode
  const displayProducts = products.length > 0 ? products : (apiMode === "demo" ? fallbackProducts : []);
  const featuredProducts = [...displayProducts]
    .sort((a, b) => (b.orders || 0) - (a.orders || 0))
    .slice(0, 4);

  const placeholderImg = "https://images.unsplash.com/photo-1594322436404-5a0526db4d13?q=80&w=600";

  return (
    <div className="animate-fade-in pb-20">
      {/* Hero Section - Restored to Static Elegant Version */}
      <section className="relative h-[450px] sm:h-[600px] w-full overflow-hidden mb-16 sm:mb-24 bg-slate-900">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=90&w=1600" 
            className="h-full w-full object-cover opacity-60" 
            alt="Giftora Hero" 
          />
        </div>
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4 text-white">
          <h1 className="text-4xl sm:text-7xl font-serif font-bold mb-6 drop-shadow-2xl max-w-4xl leading-tight">
            Perfect Gifts for <br /> Every Occasion
          </h1>
          <p className="text-xl sm:text-2xl font-medium mb-10 opacity-90 drop-shadow-lg max-w-2xl">
            Discover unique presents that tell your story
          </p>
          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
            <button 
              onClick={() => {
                navigate("/studio");
                window.scrollTo(0, 0);
              }}
              className="bg-[#facc15] hover:bg-[#eab308] text-black h-12 sm:h-14 px-8 sm:px-12 rounded-xl text-base sm:text-lg font-black transition-all shadow-xl shadow-black/20"
            >
              Shop Now
            </button>
            <button 
              onClick={() => {
                const el = document.getElementById('shop-categories');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-white/10 backdrop-blur hover:bg-white/20 text-white border border-white/30 h-12 sm:h-14 px-6 sm:px-10 rounded-xl text-base sm:text-lg font-bold transition-all"
            >
              Explore All
            </button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="shop-categories" className="mb-32 px-4 max-w-full lg:max-w-7xl mx-auto overflow-hidden">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-ink mb-3 text-center">Shop by Gift Type</h2>
          <div className="h-1.5 w-24 bg-mint mx-auto rounded-full" />
        </div>
        
        <div className="grid gap-4 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {(products.length > 0 ? 
            // Derive categories from products
            Object.values(products.reduce((acc, p) => {
              const cat = p.category || "Other";
              if (!acc[cat]) {
                acc[cat] = {
                  id: cat.toLowerCase(),
                  name: cat,
                  subtitle: `Discover our ${cat} collection`,
                  image: p.image,
                  count: 0
                };
              }
              acc[cat].count++;
              return acc;
            }, {}))
            : categories // Fallback to static if no products
          ).slice(0, 4).map((cat) => (
            <CategoryCard 
              key={cat.id} 
              category={cat.name}
              image={cat.image || placeholderImg}
              subtitle={cat.subtitle}
              count={cat.count}
              onClick={() => {
                navigate("/studio");
                window.scrollTo(0, 0);
              }} 
            />
          ))}
        </div>
      </section>

      {/* Bestsellers Section */}
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
        
        <div className="grid gap-4 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.length > 0 ? (
            featuredProducts.map((p) => (
              <ProductCard 
                key={p.id || p.slug} 
                product={p} 
                selected={false} 
                onSelect={() => {
                  navigate("/studio");
                  window.scrollTo(0, 0);
                }} 
              />
            ))
          ) : (
            // Skeleton / Loading state
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="aspect-square rounded-2xl bg-slate-100 animate-pulse" />
            ))
          )}
        </div>
      </section>

      {/* Trust Bar */}
      <section className="max-w-7xl mx-auto px-4 mb-32">
         <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-8 rounded-[30px] sm:rounded-[40px] bg-slate-50 border border-slate-100">
            {[
               { icon: Gift, label: "Premium Packaging" },
               { icon: Truck, label: "Express Delivery" },
               { icon: ShieldCheck, label: "Quality Guarantee" },
               { icon: ShoppingBag, label: "Bulk Gifting" }
            ].map((f, i) => (
               <div key={i} className="flex items-center gap-4 px-4 text-center justify-center flex-col md:flex-row">
                  <div className="h-10 w-10 shrink-0 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-mint">
                     <f.icon size={20} />
                  </div>
                  <p className="font-black text-xs text-ink leading-tight">{f.label}</p>
               </div>
            ))}
         </div>
      </section>

      <Testimonials />

      {/* Final CTA */}
      <section className="mt-20 mx-4 max-w-7xl lg:mx-auto rounded-[40px] sm:rounded-[60px] bg-mint p-10 sm:p-16 text-center text-ink relative overflow-hidden">
        <h2 className="text-3xl sm:text-4xl font-black mb-6 leading-tight">Create your next memory.</h2>
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
