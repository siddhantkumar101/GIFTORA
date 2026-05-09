import { UploadCloud, Type, Palette, Plus } from "lucide-react";
import { money } from "../utils/helpers.js";
import { placements, fonts } from "../utils/constants.js";

export default function CustomizerPanel({
  selectedProduct,
  customizer,
  updateCustomizer,
  handleUpload,
  addToCart,
  session
}) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-soft sm:p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-coral">Live Studio</p>
          <h3 className="text-2xl font-black">{selectedProduct.name}</h3>
          <p className="mt-1 text-sm text-slate-600">{selectedProduct.description}</p>
        </div>
        <div className="rounded-lg bg-lemon/20 px-3 py-2 text-right">
          <p className="text-xs font-bold uppercase text-slate-600">Price</p>
          <p className="text-lg font-black">{money(selectedProduct.price)}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4">
        <label className="grid gap-2">
          <span className="inline-flex items-center gap-2 text-sm font-bold text-slate-700">
            <UploadCloud size={17} aria-hidden="true" />
            Upload image
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="focus-ring w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-ink file:px-3 file:py-2 file:text-sm file:font-bold file:text-white"
          />
          {customizer.imageName ? (
            <span className="text-xs font-semibold text-teal-700">{customizer.imageName}</span>
          ) : null}
        </label>

        <label className="grid gap-2">
          <span className="inline-flex items-center gap-2 text-sm font-bold text-slate-700">
            <Type size={17} aria-hidden="true" />
            Custom text
          </span>
          <textarea
            value={customizer.text}
            onChange={(event) => updateCustomizer("text", event.target.value)}
            rows={3}
            maxLength={72}
            className="focus-ring w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none"
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2">
            <span className="inline-flex items-center gap-2 text-sm font-bold text-slate-700">
              <Palette size={17} aria-hidden="true" />
              Product color
            </span>
            <div className="flex min-h-11 flex-wrap items-center gap-2">
              {selectedProduct.colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  aria-label={`Set product color ${color}`}
                  onClick={() => updateCustomizer("productColor", color)}
                  className={`focus-ring h-9 w-9 rounded-full border ${
                    customizer.productColor === color
                      ? "border-ink ring-4 ring-mint/30"
                      : "border-slate-300"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-bold text-slate-700">Text color</span>
            <input
              type="color"
              value={customizer.textColor}
              onChange={(event) => updateCustomizer("textColor", event.target.value)}
              className="focus-ring h-11 w-full rounded-lg border border-slate-200 bg-slate-50 p-1"
            />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <label className="grid gap-2">
            <span className="text-sm font-bold text-slate-700">Placement</span>
            <select
              value={customizer.placement}
              onChange={(event) => updateCustomizer("placement", event.target.value)}
              className="focus-ring min-h-11 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm"
            >
              {placements.map((placement) => (
                <option key={placement.id} value={placement.id}>
                  {placement.label}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-bold text-slate-700">Font</span>
            <select
              value={customizer.font}
              onChange={(event) => updateCustomizer("font", event.target.value)}
              className="focus-ring min-h-11 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm"
            >
              {fonts.map((font) => (
                <option key={font} value={font}>
                  {font}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-bold text-slate-700">Quantity</span>
            <input
              type="number"
              min="1"
              value={customizer.quantity}
              onChange={(event) => updateCustomizer("quantity", Number(event.target.value))}
              className="focus-ring min-h-11 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm"
            />
          </label>
        </div>

        {session && (
          <button
            type="button"
            onPointerDown={(event) => {
              event.preventDefault();
              addToCart();
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                addToCart();
              }
            }}
            className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-coral px-4 text-sm font-black text-white shadow-lg shadow-coral/25 transition hover:bg-[#df4937]"
          >
            <Plus size={18} aria-hidden="true" />
            Add custom gift to cart
          </button>
        )}
      </div>
    </section>
  );
}
