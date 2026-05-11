import { useState } from "react";
import { ArrowRight } from "lucide-react";

const placeholderImage = "https://images.unsplash.com/photo-1594322436404-5a0526db4d13?q=80&w=400";

export default function CategoryCard({ category, image, subtitle, count, onClick }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div 
      onClick={onClick}
      className="group relative h-64 overflow-hidden rounded-[32px] border border-slate-100 bg-white cursor-pointer shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500"
    >
      <div className="absolute inset-0 z-0 bg-slate-100 animate-pulse transition-opacity duration-500" style={{ opacity: loaded ? 0 : 1 }}>
      </div>
      <div className="absolute inset-0 z-0">
        <img 
          src={image || placeholderImage} 
          alt={category} 
          onLoad={() => setLoaded(true)}
          onError={(e) => { 
            if (e.target.src !== placeholderImage) {
              e.target.src = placeholderImage; 
              setLoaded(true); 
            }
          }}
          className={`h-full w-full object-cover transition-all duration-1000 ${loaded ? "opacity-100 scale-100" : "opacity-0 scale-110"} group-hover:scale-110`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
      </div>
      
      <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 text-white">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-400 mb-2">{count} {category}</p>
        <h3 className="text-xl font-black mb-1 group-hover:translate-x-1 transition-transform duration-300">{category}</h3>
        <p className="text-xs font-medium text-slate-300 mb-3 line-clamp-1 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-75">
          {subtitle}
        </p>
        <div className="flex items-center gap-2 text-xs font-bold text-white/80 group-hover:text-orange-400 transition-colors">
          Explore varieties <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
        </div>
      </div>
    </div>
  );
}
