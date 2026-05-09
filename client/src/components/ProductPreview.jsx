import { ImageIcon } from "lucide-react";

export default function ProductPreview({ product, customizer }) {
  const mockupClass = {
    "signature-mug": "mockup-mug",
    "memory-tee": "mockup-tee",
    "snap-cover": "mockup-phone",
    "gallery-frame": "mockup-frame",
    "acrylic-keychain": "mockup-keychain",
    "comfort-cushion": "mockup-cushion",
    "steel-bottle": "mockup-bottle",
    "modern-clock": "mockup-clock"
  }[product.slug] || "mockup-generic";

  const fontClass = {
    Sans: "font-sans",
    Serif: "font-serif",
    Mono: "font-mono",
    Script: "font-serif italic"
  }[customizer.font];

  return (
    <div className={`mockup ${mockupClass}`} style={{ "--product-color": customizer.productColor }}>
      <div className="print-area">
        {customizer.image ? (
          <img
            src={customizer.image}
            alt="Uploaded custom design preview"
            className="h-full w-full object-cover"
          />
        ) : !customizer.text ? (
          <div className="grid h-full w-full place-items-center bg-slate-50 text-center text-[10px] font-black uppercase tracking-widest text-slate-300">
            <span className="inline-flex flex-col items-center gap-2 px-4">
              <ImageIcon size={20} aria-hidden="true" />
              Design Area
            </span>
          </div>
        ) : null}
        <span
          className={`custom-text placement-${customizer.placement} ${fontClass} text-lg font-black sm:text-xl`}
          style={{ color: customizer.textColor }}
        >
          {customizer.text}
        </span>
      </div>
    </div>
  );
}
