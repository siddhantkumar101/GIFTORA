import { useNavigate } from "react-router-dom";
import { ShoppingBag, Gift, Truck, ShieldCheck } from "lucide-react";
import CategoryCard from "../components/CategoryCard.jsx";
import Testimonials from "../components/Testimonials.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { fallbackProducts } from "../utils/constants.js";
import { money, optimiseImage } from "../utils/helpers.js";

const categories = [
  {
    id: "birthday",
    name: "Birthday Gifts",
    subtitle: "Make their special day unforgettable",
    image: "https://images.unsplash.com/photo-1530103043960-ef38714abb15?auto=format&fit=crop&q=70&w=400",
    count: 124
  },
  {
    id: "anniversary",
    name: "Anniversary Gifts",
    subtitle: "Celebrate love and togetherness",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=70&w=400",
    count: 89
  },
  {
    id: "personalized",
    name: "Personalized Gifts",
    subtitle: "Custom gifts with a personal touch",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=70&w=400",
    count: 156
  },
  {
    id: "marriage",
    name: "Marriage Gifts",
    subtitle: "Elegant gifts for the perfect couple",
    image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=70&w=400",
    count: 42
  }
];

export default function HomeView({ products = [], apiMode = "connecting" }) {
  const navigate = useNavigate();

  const displayProducts = products.length > 0 ? products : (apiMode === "demo" ? fallbackProducts : []);
  const featuredProducts = [...displayProducts]
    .sort((a, b) => (b.orders || 0) - (a.orders || 0))
    .slice(0, 4);

  const placeholderImg = "https://images.unsplash.com/photo-1594322436404-5a0526db4d13?auto=format&fit=crop&q=70&w=400";

  return (
    <div className="animate-fade-in pb-16 sm:pb-24 overflow-x-hidden">

      {/* ─── Hero ─────────────────────────────────────────────────────
          Mobile: 280px tall, tight copy, single-column CTA stack
          Desktop: 580px, large type, side-by-side buttons
      ──────────────────────────────────────────────────────────────── */}
      <section
        className="
          relative overflow-hidden mb-5 sm:mb-16 bg-slate-900
          -mx-4 sm:-mx-6 lg:-mx-8
          h-[280px] xs:h-[320px] sm:h-[480px] lg:h-[580px]
        "
      >
        {/* Background image */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=75&w=800"
            srcSet={[
              "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=60&w=480 480w",
              "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=70&w=800 800w",
              "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=75&w=1200 1200w",
              "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=75&w=1600 1600w",
            ].join(", ")}
            sizes="100vw"
            className="h-full w-full object-cover opacity-55"
            alt="Giftora Hero"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/20 via-slate-900/40 to-slate-900/80" />
        </div>

        {/* Content */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6">
          {/* Badge — hidden on the smallest screens to save vertical space */}
          <span className="hidden xs:inline-block bg-coral/90 text-white text-[10px] sm:text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3 sm:mb-5">
            ✦ Premium Gifting
          </span>

          <h1 className="
            text-[1.6rem] xs:text-3xl sm:text-5xl lg:text-6xl
            font-serif font-bold text-white
            leading-[1.15] sm:leading-tight
            mb-2 sm:mb-4
            max-w-[260px] xs:max-w-xs sm:max-w-2xl
          ">
            Perfect Gifts for Every Occasion
          </h1>

          <p className="
            text-xs xs:text-sm sm:text-lg
            font-medium text-white/80
            mb-5 sm:mb-8
            max-w-[220px] xs:max-w-xs sm:max-w-md
            leading-snug sm:leading-relaxed
          ">
            Discover unique presents that tell your story
          </p>

          {/* CTA buttons — full-width on mobile, auto-width on desktop */}
          <div className="flex flex-col xs:flex-row gap-2 xs:gap-3 w-full max-w-[260px] xs:max-w-none xs:w-auto justify-center">
            <button
              onClick={() => { navigate("/studio"); window.scrollTo(0, 0); }}
              className="
                bg-coral text-white font-black text-sm sm:text-base
                h-11 sm:h-14 px-6 sm:px-10
                rounded-xl sm:rounded-2xl
                hover:bg-[#e24e3c] active:scale-95
                transition-all shadow-lg shadow-coral/30
                w-full xs:w-auto
              "
            >
              Shop Now
            </button>
            <button
              onClick={() => document.getElementById("shop-categories")?.scrollIntoView({ behavior: "smooth" })}
              className="
                bg-white/15 backdrop-blur-md text-white
                border border-white/30 font-black text-sm sm:text-base
                h-11 sm:h-14 px-6 sm:px-10
                rounded-xl sm:rounded-2xl
                hover:bg-white/25 active:scale-95
                transition-all
                w-full xs:w-auto
              "
            >
              Explore
            </button>
          </div>
        </div>
      </section>

      {/* ─── Trust Bar (mobile-first: moved up, compact) ──────────────
          On mobile show 4 icons in a single scrollable row so they
          never wrap oddly; on md+ use a 4-col grid.
      ──────────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto mb-8 sm:mb-16">
        <div className="
          flex md:grid md:grid-cols-4
          gap-2 sm:gap-4
          overflow-x-auto sm:overflow-visible
          -mx-1 px-1           /* tiny bleed so shadows aren't clipped */
          pb-1                 /* room for scrollbar on some browsers  */
          p-3 sm:p-6
          rounded-2xl sm:rounded-[32px]
          bg-slate-50 border border-slate-100
          scrollbar-none
        ">
          {[
            { icon: Gift,         label: "Premium Packaging" },
            { icon: Truck,        label: "Express Delivery"  },
            { icon: ShieldCheck,  label: "Quality Guarantee" },
            { icon: ShoppingBag,  label: "Bulk Gifting"      },
          ].map((f, i) => (
            <div
              key={i}
              className="
                flex flex-col items-center gap-1.5 py-1
                min-w-[72px] sm:min-w-0 flex-1
              "
            >
              <div className="h-9 w-9 shrink-0 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-mint">
                <f.icon size={16} />
              </div>
              <p className="font-black text-[10px] sm:text-xs text-ink leading-tight text-center whitespace-nowrap sm:whitespace-normal">
                {f.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Categories ──────────────────────────────────────────────── */}
      <section id="shop-categories" className="mb-8 sm:mb-24 max-w-7xl mx-auto">
        <div className="text-center mb-5 sm:mb-12">
          <h2 className="text-lg sm:text-4xl font-black text-ink mb-1.5 sm:mb-3">Shop by Gift Type</h2>
          <div className="h-1 w-10 sm:h-1.5 sm:w-20 bg-mint mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-2 gap-2.5 sm:gap-6 w-full">
          {(products.length > 0
            ? Object.values(
                products.reduce((acc, p) => {
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
                }, {})
              )
            : categories
          ).slice(0, 4).map((cat, i) => (
            <div key={i} className="min-w-0 w-full">
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

      {/* ─── Bestsellers ─────────────────────────────────────────────── */}
      <section className="mb-8 sm:mb-24 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4 sm:mb-8">
          <h2 className="text-lg sm:text-3xl font-black text-ink">Bestsellers</h2>
          <button
            onClick={() => navigate("/studio")}
            className="
              text-[11px] sm:text-xs font-black text-orange-500
              uppercase tracking-widest
              hover:text-ink transition-colors
              /* larger tap target */
              py-2 -my-2 pl-2 -ml-2
            "
          >
            View All →
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2.5 sm:gap-6 lg:grid-cols-4 w-full">
          {featuredProducts.length > 0 ? (
            featuredProducts.map((p) => (
              <div key={p.id} className="min-w-0 w-full">
                <ProductCard
                  product={p}
                  selected={false}
                  onSelect={() => { navigate("/studio"); window.scrollTo(0, 0); }}
                />
              </div>
            ))
          ) : (
            [1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square rounded-2xl bg-slate-100 animate-pulse" />
            ))
          )}
        </div>
      </section>

      {/* ─── Testimonials ────────────────────────────────────────────── */}
      <Testimonials />

      {/* ─── Final CTA ───────────────────────────────────────────────── */}
      <section className="
        mt-6 sm:mt-16 max-w-7xl mx-auto
        rounded-2xl sm:rounded-[48px]
        bg-mint p-6 sm:p-16
        text-center text-ink
        relative overflow-hidden
      ">
        <div className="absolute -top-8 -right-8 w-32 h-32 sm:w-40 sm:h-40 bg-white/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 sm:w-40 sm:h-40 bg-ink/10 rounded-full blur-3xl pointer-events-none" />

        <h2 className="relative text-xl sm:text-4xl font-black mb-2 sm:mb-5 leading-snug sm:leading-tight">
          Create your next memory.
        </h2>
        <p className="relative text-ink/60 max-w-xs mx-auto mb-5 sm:mb-8 text-sm sm:text-base font-bold leading-relaxed">
          Step into our studio and experience real-time gift design.
        </p>
        <button
          onClick={() => navigate("/studio")}
          className="
            relative bg-ink text-white font-black
            h-12 sm:h-14 px-8 sm:px-10
            rounded-xl sm:rounded-2xl text-sm sm:text-base
            hover:bg-slate-800 active:scale-95
            transition-all shadow-xl shadow-ink/20
            w-full xs:w-auto max-w-[240px]
          "
        >
          Enter Studio
        </button>
      </section>
    </div>
  );
}
