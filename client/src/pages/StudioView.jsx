import { useRef, useEffect } from "react";
import { Search, Sparkles } from "lucide-react";
import ProductCard from "../components/ProductCard.jsx";
import CustomizerPanel from "../components/CustomizerPanel.jsx";
import PreviewPanel from "../components/PreviewPanel.jsx";

export default function StudioView({ 
  apiMode, 
  products, 
  allProducts, 
  selectedProduct, 
  selectedSlug, 
  setSelectedSlug, 
  customizer, 
  updateCustomizer, 
  handleUpload, 
  addToCart, 
  search, 
  setSearch, 
  selectedCategory,
  setSelectedCategory,
  session 
}) {
  const customizerRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  function handleProductSelect(slug) {
    setSelectedSlug(slug);
    setTimeout(() => {
      customizerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }

  return (
    <div className="min-h-screen flex flex-col space-y-8 sm:space-y-16 animate-fade-in bg-white sm:bg-transparent">
       {/* 📱 MOBILE-ONLY STUDIO HEADER */}
       <section className="sm:hidden text-center py-8 px-5 bg-ink text-white -mx-4 rounded-b-[40px] shadow-2xl shadow-ink/10">
          <div className="inline-flex items-center gap-2 bg-coral/20 text-coral px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-coral/10">
            <Sparkles size={12} />
            Creative Studio
          </div>
          <h2 className="text-4xl font-black tracking-tight leading-[0.95]">Design Your<br />Own Magic.</h2>
          <p className="mt-5 mx-auto max-w-xl text-xs text-white/60 font-medium leading-relaxed">
             Pick a premium gift, add your personal touch, and see it come to life instantly.
          </p>
       </section>

       {/* 🖥️ DESKTOP-ONLY STUDIO HEADER (RESTORED) */}
       <section className="hidden sm:block text-center py-10 sm:py-16 px-4">
          <h2 className="text-3xl font-black tracking-tighter sm:text-7xl text-ink leading-[1.05]">Design your perfect gift.</h2>
          <p className="mt-4 sm:mt-6 mx-auto max-w-xl text-sm sm:text-base text-slate-500 font-medium leading-relaxed sm:text-xl">
             Choose a premium item, add your personal touch, and see it come to life in real-time.
          </p>
       </section>

       <section className="grid gap-10 md:gap-12 grid-cols-1 lg:grid-cols-[1fr_420px] px-4 sm:px-6 lg:px-8">
        {/* Left Column: Product Catalog */}
        <div className="order-2 lg:order-1 space-y-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-6">
               <h3 className="text-lg font-black sm:text-2xl text-ink">1. Browse Products</h3>
               <div className="relative w-full sm:w-auto">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-mint" size={16} />
                  <input 
                     value={search}
                     onChange={(e) => setSearch(e.target.value)}
                     placeholder="Search catalog..." 
                     className="h-10 w-full rounded-xl border-2 border-mint/20 bg-mint/5 pl-10 pr-4 text-sm font-bold outline-none focus:border-mint focus:bg-white transition-all sm:w-64"
                  />
               </div>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none touch-pan-x">
               {["All", ...new Set(allProducts.map(p => p.category))].map(cat => (
                  <button
                     key={cat}
                     onClick={() => setSelectedCategory(cat)}
                     className={`shrink-0 h-9 px-4 rounded-full text-xs font-bold transition-all ${
                        selectedCategory === cat 
                        ? "bg-mint text-white shadow-lg" 
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                     }`}
                  >
                     {cat}
                  </button>
               ))}
            </div>

           {/* Grid: 4 columns on desktop for smaller images */}
           <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
             {products.map((product) => (
               <ProductCard
                 key={product.slug}
                 product={product}
                 selected={selectedSlug === product.slug}
                 onSelect={() => handleProductSelect(product.slug)}
               />
             ))}
           </div>
        </div>

        {/* Right Column: Live Studio (Sticky Customizer + Preview) */}
        <div className="order-1 lg:order-2 space-y-8 sticky top-[90px] z-20" ref={customizerRef}>
           <div className="sm:hidden bg-white/95 backdrop-blur-md p-4 -mx-4 mb-4 border-b border-slate-100 shadow-sm">
              <h3 className="text-lg font-black text-ink">2. Customize</h3>
           </div>
           
           <div className="hidden sm:block">
              <h3 className="text-2xl font-black text-ink">2. Personalize</h3>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">Real-time product proof</p>
           </div>

           <div className="space-y-8">
              <CustomizerPanel
                selectedProduct={selectedProduct}
                customizer={customizer}
                updateCustomizer={updateCustomizer}
                handleUpload={handleUpload}
                addToCart={addToCart}
                session={session}
              />

              <div className="pt-4 border-t border-slate-50">
                 <p className="mb-4 text-[10px] sm:text-sm font-bold uppercase tracking-widest text-slate-400 text-center">Live Preview Proof</p>
                 <div className="bg-slate-50 rounded-3xl p-2 border border-slate-100">
                    <PreviewPanel product={selectedProduct} customizer={customizer} />
                 </div>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
