import { Clock3 } from "lucide-react";
import ProductPreview from "./ProductPreview.jsx";

export default function PreviewPanel({ product, customizer }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-soft sm:p-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-coral">Preview</p>
          <h3 className="text-2xl font-black">Live product proof</h3>
        </div>
        <div className="inline-flex w-fit items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-sm font-bold text-slate-700">
          <Clock3 size={16} aria-hidden="true" />
          {product.leadTime}
        </div>
      </div>
      <div className="preview-stage mt-4 grid place-items-center rounded-lg border border-slate-200 p-5">
        <ProductPreview product={product} customizer={customizer} />
      </div>
    </section>
  );
}
