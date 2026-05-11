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
    <div className="min-h-screen flex flex-col space-y-12 animate-fade-in">
      <section className="text-center py-10 px-4">
         <h2 className="text-4xl font-black tracking-tighter sm:text-7xl text-ink leading-[1.05]">Design your perfect gift.</h2>
         <p className="mt-6 mx-auto max-w-xl text-base text-slate-500 font-medium leading-relaxed sm:text-xl">
            Choose a premium item, add your personal touch, and see it come to life in real-time.
         </p>
      </section>

      <section className="grid gap-10 md:gap-12 grid-cols-1 lg:grid-cols-[1fr_420px]">
        {/* Left Column: Product Catalog */}
        <div className="space-y-8 overflow-y-auto col-scroll">
            <div className="flex flex-col gap-6 border-b border-slate-100 pb-6 sm:flex-row sm:items-center sm:justify-between">
               <h3 className="text-xl font-black sm:text-2xl">1. Browse Products</h3>
               <div className="flex flex-wrap items-center gap-2">
                  <Search className="text-mint sm:hidden" size={18} />
                  <div className="relative w-full sm:w-auto">
                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-mint hidden sm:block" size={18} />
                     <input 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search catalog..." 
                        className="h-11 w-full rounded-xl border-2 border-mint/20 bg-mint/5 pl-4 sm:pl-10 pr-4 text-sm font-bold outline-none focus:border-mint focus:bg-white transition-all sm:w-64 shadow-sm"
                     />
                  </div>
               </div>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
               {["All", ...new Set(allProducts.map(p => p.category))].map(cat => (
                  <button
                     key={cat}
                     onClick={() => setSelectedCategory(cat)}
                     className={`shrink-0 h-10 px-5 rounded-full text-sm font-bold transition-all ${
                        selectedCategory === cat 
                        ? "bg-mint text-white shadow-lg shadow-mint/30" 
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                     }`}
                  >
                     {cat}
                  </button>
               ))}
            </div>
           <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

        {/* Right Column: Live Studio (Customizer Top, Preview Bottom) */}
        <div className="space-y-8" ref={customizerRef}>
           <h3 className="text-xl font-black sm:text-2xl">2. Customize & Preview</h3>
           <CustomizerPanel
             selectedProduct={selectedProduct}
             customizer={customizer}
             updateCustomizer={updateCustomizer}
             handleUpload={handleUpload}
             addToCart={addToCart}
             session={session}
           />
           <div className="pt-4">
              <p className="mb-4 text-sm font-bold uppercase tracking-widest text-slate-400 text-center">Live Product Proof</p>
              <PreviewPanel product={selectedProduct} customizer={customizer} />
           </div>
        </div>
      </section>
    </div>
  );
}
