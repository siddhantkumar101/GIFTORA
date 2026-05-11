import { useState } from "react";
import { ArrowRight } from "lucide-react";

const placeholderImage = "https://images.unsplash.com/photo-1594322436404-5a0526db4d13?q=80&w=400";

export default function CategoryCard({ category, image, subtitle, count, onClick }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div 
      onClick={onClick}
      className="group relative h-80 overflow-hidden rounded-[40px] border border-slate-100 bg-white cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-700"
    >
      <div className="absolute inset-0 z-0">
        <img 
          src={image || placeholderImage} 
          alt={category} 
          className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity" />
      </div>
      
      <div className="absolute inset-0 z-10 flex flex-col justify-end p-8 text-white">
        <div className="flex items-end justify-between">
          <div className="flex-1">
            <h3 className="text-4xl font-serif font-medium mb-2 leading-tight">{category}</h3>
            <p className="text-sm font-medium text-white/90 mb-4 line-clamp-1 group-hover:opacity-100 transition-opacity">
              {subtitle}
            </p>
            <p className="text-xs font-bold text-white/60 tracking-wider">
              {count} items
            </p>
          </div>
          <div className="h-10 w-10 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
            <ArrowRight size={20} />
          </div>
        </div>
      </div>
    </div>
  );
}
