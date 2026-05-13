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
        <div className="order-2 lg:order-1 space-y-8 sm:space-y-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-6">
               <div className="space-y-1">
                  <h3 className="text-lg font-black sm:text-2xl text-ink">
                    1. <span className="sm:hidden">Pick a Gift</span><span className="hidden sm:inline">Browse Products</span>
                  </h3>
                  <p className="hidden sm:block text-[11px] font-bold text-slate-400 uppercase tracking-widest">Select from our premium catalog</p>
               </div>
               
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

           <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
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

        {/* Right Column: Live Studio */}
        <div className="order-1 lg:order-2 space-y-6 sm:space-y-8 sticky top-4 z-20 bg-white/95 sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none -mx-4 sm:mx-0 px-4 sm:px-0 py-4 sm:py-0 border-b border-slate-100 sm:border-none shadow-xl shadow-slate-200/50 sm:shadow-none" ref={customizerRef}>
           <div className="space-y-1">
              <h3 className="text-lg font-black sm:text-2xl text-ink">
                2. <span className="sm:hidden">Customize</span><span className="hidden sm:inline">Personalize</span>
              </h3>
              <p className="hidden sm:block text-[11px] font-bold text-slate-400 uppercase tracking-widest">Real-time product proof</p>
           </div>
           
           <div className="space-y-6 sm:space-y-8">
              {/* MOBILE PREVIEW STAGE (HIDDEN ON DESKTOP) */}
              <div className="sm:hidden relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-coral/20 to-orange-500/20 rounded-[40px] blur-xl opacity-50 transition-opacity" />
                <div className="relative aspect-square bg-gradient-to-br from-slate-50 to-slate-100 rounded-[32px] border border-white shadow-inner flex items-center justify-center p-8 overflow-hidden">
                   <div className="absolute top-5 left-5 z-10 flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-100 shadow-sm">
                      <div className="h-2 w-2 rounded-full bg-coral animate-pulse" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-ink">Live Preview</span>
                   </div>
                   <PreviewPanel product={selectedProduct} customizer={customizer} />
                </div>
              </div>
              
              <CustomizerPanel
                selectedProduct={selectedProduct}
                customizer={customizer}
                updateCustomizer={updateCustomizer}
                handleUpload={handleUpload}
                addToCart={addToCart}
                session={session}
              />

              {/* DESKTOP PREVIEW (RESTORED PARITY) */}
              <div className="hidden sm:block">
                 <div className="p-1 rounded-3xl bg-slate-50 border border-slate-100">
                    <PreviewPanel product={selectedProduct} customizer={customizer} />
                 </div>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
