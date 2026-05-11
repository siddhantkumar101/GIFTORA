import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { money } from "../utils/helpers.js";
const placeholderImage = "https://via.placeholder.com/400?text=Image+Not+Found";

export default function ProductCard({ product, selected, onSelect }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <article 
      onClick={onSelect}
      className={`relative cursor-pointer overflow-hidden rounded-2xl border transition-all duration-500 ${
        selected 
          ? "border-primary bg-white ring-4 ring-primary/5 shadow-xl" 
          : "border-slate-100 bg-white hover:border-slate-200"
      }`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-50">
        <div className={`absolute inset-0 bg-slate-200 animate-pulse transition-opacity duration-500 ${loaded ? "opacity-0" : "opacity-100"}`} />
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={(e) => { e.target.src = placeholderImage; }}
          className={`relative z-10 h-full w-full object-cover transition-all duration-700 ${loaded ? "opacity-100" : "opacity-0"} ${selected ? "scale-105" : "hover:scale-105"}`}
        />
        {selected && (
          <div className="absolute right-3 top-3 z-20 grid h-6 w-6 place-items-center rounded-full bg-primary text-white shadow-lg">
             <CheckCircle2 size={14} />
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{product.category}</p>
            <h4 className="mt-1 text-lg font-black tracking-tight text-ink">{product.name}</h4>
          </div>
          <p className="text-base font-black text-ink">{money(product.price)}</p>
        </div>
      </div>
    </article>
  );
}
