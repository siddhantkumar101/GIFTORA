import { useRef } from "react";
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
  session 
}) {
  const customizerRef = useRef(null);

  function handleProductSelect(slug) {
    setSelectedSlug(slug);
    setTimeout(() => {
      customizerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }

  return (
    <div className="space-y-12 animate-fade-in">
      <section className="text-center py-10 px-4">
         <h2 className="text-4xl font-black tracking-tighter sm:text-7xl text-ink leading-[1.05]">Design your perfect gift.</h2>
         <p className="mt-6 mx-auto max-w-xl text-base text-slate-500 font-medium leading-relaxed sm:text-xl">
            Choose a premium item, add your personal touch, and see it come to life in real-time.
         </p>
      </section>

      <section className="grid gap-12 lg:grid-cols-[1fr_480px]">
        {/* Left Column: Product Catalog */}
        <div className="space-y-8">
           <div className="flex flex-col gap-4 border-b border-slate-100 pb-6 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-xl font-black sm:text-2xl">1. Browse Products</h3>
              <div className="relative w-full sm:w-auto">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-mint" size={18} />
                 <input 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search catalog..." 
                    className="h-12 w-full rounded-xl border-2 border-mint/30 bg-mint/5 pl-10 pr-4 text-sm font-bold outline-none focus:border-mint focus:bg-white focus:ring-4 focus:ring-mint/20 transition-all sm:w-72 shadow-sm"
                 />
              </div>
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
