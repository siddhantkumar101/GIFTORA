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
       {/* 1. STUDIO HEADER */}
       <section className="text-center py-8 sm:py-16 px-5 bg-ink sm:bg-transparent text-white sm:text-ink -mx-4 sm:mx-0 sm:rounded-none rounded-b-[40px] shadow-2xl shadow-ink/10 sm:shadow-none">
          <div className="inline-flex items-center gap-2 bg-coral/20 text-coral px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-coral/10">
            <Sparkles size={12} />
            Creative Studio
          </div>
          <h2 className="text-4xl font-black tracking-tight sm:text-7xl leading-[0.95]">Design Your<br />Own Magic.</h2>
          <p className="mt-5 mx-auto max-w-xl text-xs sm:text-base text-white/60 sm:text-slate-500 font-medium leading-relaxed sm:text-xl">
             Pick a premium gift, add your personal touch, and see it come to life instantly.
          </p>
       </section>

      <section className="grid gap-10 md:gap-16 grid-cols-1 lg:grid-cols-[1fr_420px] px-4 sm:px-0">
        {/* Left Column: Product Catalog */}
        <div className="order-2 lg:order-1 space-y-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
               <div className="space-y-1">
                  <h3 className="text-2xl font-black text-ink leading-none">1. Pick a Gift</h3>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Select from our premium catalog</p>
               </div>
               
               <div className="relative w-full sm:w-auto">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input 
                     value={search}
                     onChange={(e) => setSearch(e.target.value)}
                     placeholder="Search products..." 
                     className="h-12 w-full rounded-2xl border border-slate-100 bg-slate-50 pl-11 pr-4 text-[13px] font-bold outline-none focus:ring-2 focus:ring-coral/10 focus:border-coral focus:bg-white transition-all sm:w-64"
                  />
               </div>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none touch-pan-x">
               {["All", ...new Set(allProducts.map(p => p.category))].map(cat => (
                  <button
                     key={cat}
                     onClick={() => setSelectedCategory(cat)}
                     className={`shrink-0 h-10 px-6 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${
                        selectedCategory === cat 
                        ? "bg-ink text-white shadow-xl shadow-ink/20" 
                        : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                     }`}
                  >
                     {cat}
                  </button>
               ))}
            </div>

           <div className="grid gap-4 grid-cols-2 lg:grid-cols-3">
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
        <div className="order-1 lg:order-2 space-y-8 sticky top-[20px] lg:static z-20 bg-white/95 sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none -mx-4 sm:mx-0 px-4 sm:px-0 py-6 sm:py-0 border-b border-slate-100 sm:border-none shadow-xl shadow-slate-200/50 sm:shadow-none" ref={customizerRef}>
           <div className="space-y-1 hidden sm:block">
              <h3 className="text-2xl font-black text-ink leading-none">2. Personalize</h3>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Real-time product proof</p>
           </div>
           
           <div className="space-y-6">
              <div className="p-2 bg-slate-50 rounded-[32px] border border-slate-100 sm:bg-white sm:p-0 sm:border-none">
                 <PreviewPanel product={selectedProduct} customizer={customizer} />
              </div>
              
              <CustomizerPanel
                selectedProduct={selectedProduct}
                customizer={customizer}
                updateCustomizer={updateCustomizer}
                handleUpload={handleUpload}
                addToCart={addToCart}
                session={session}
              />
           </div>
        </div>
      </section>

    </div>
  );
}
