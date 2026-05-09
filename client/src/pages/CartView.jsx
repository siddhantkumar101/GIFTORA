import { Plus, ShoppingCart, ImageIcon, Trash2, User, CreditCard, ShieldCheck } from "lucide-react";
import { money } from "../utils/helpers.js";

export default function CartView({
  cart,
  user,
  address,
  paymentMethod,
  subtotal,
  delivery,
  discount,
  grandTotal,
  updateCartQuantity,
  removeFromCart,
  setUser,
  setAddress,
  setPaymentMethod,
  checkout,
  setActiveTab
}) {
  return (
    <section className="grid gap-5 lg:grid-cols-[1fr_0.78fr]">
      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-soft sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-coral">Cart</p>
            <h2 className="text-3xl font-black">Custom gift bag</h2>
          </div>
          <button
            type="button"
            onPointerDown={(event) => {
              event.preventDefault();
              setActiveTab("studio");
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setActiveTab("studio");
              }
            }}
            className="focus-ring inline-flex min-h-10 items-center gap-2 rounded-lg border border-slate-200 px-3 text-sm font-bold hover:border-mint"
          >
            <Plus size={17} aria-hidden="true" />
            Add items
          </button>
        </div>

        <div className="mt-5 space-y-3">
          {cart.length === 0 ? (
            <div className="grid min-h-48 place-items-center rounded-lg border border-dashed border-slate-300 text-center">
              <div>
                <ShoppingCart className="mx-auto text-slate-400" size={34} aria-hidden="true" />
                <p className="mt-3 font-bold">Your cart is empty.</p>
              </div>
            </div>
          ) : (
            cart.map((item) => (
              <CartLine
                key={item.cartId}
                item={item}
                updateCartQuantity={updateCartQuantity}
                removeFromCart={removeFromCart}
              />
            ))
          )}
        </div>
      </div>

      <div className="space-y-5">
        <ProfilePanel user={user} address={address} setUser={setUser} setAddress={setAddress} />
        <CheckoutPanel
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          subtotal={subtotal}
          delivery={delivery}
          discount={discount}
          grandTotal={grandTotal}
          checkout={checkout}
        />
      </div>
    </section>
  );
}

function CartLine({ item, updateCartQuantity, removeFromCart }) {
  return (
    <div className="grid gap-4 rounded-lg border border-slate-200 bg-slate-50 p-3 sm:grid-cols-[96px_1fr_auto] sm:items-center">
      <div className="h-24 w-24 overflow-hidden rounded-lg border border-slate-200 bg-white">
        {item.previewImage ? (
          <img src={item.previewImage} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="grid h-full place-items-center text-slate-400">
            <ImageIcon aria-hidden="true" />
          </div>
        )}
      </div>
      <div>
        <h3 className="font-black">{item.name}</h3>
        <p className="mt-1 text-sm text-slate-600">
          {item.customization.text || "No text"} | {item.customization.font} | {item.customization.placement}
        </p>
        <p className="mt-1 text-sm font-bold text-slate-700">{money(item.price)} each</p>
      </div>
      <div className="flex items-center gap-2 sm:justify-end">
        <input
          type="number"
          min="1"
          value={item.quantity}
          onChange={(event) => updateCartQuantity(item.cartId, event.target.value)}
          className="focus-ring h-10 w-20 rounded-lg border border-slate-200 bg-white px-3 text-sm"
        />
        <button
          type="button"
          onClick={() => removeFromCart(item.cartId)}
          className="focus-ring grid h-10 w-10 place-items-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:border-coral hover:text-coral"
          aria-label={`Remove ${item.name}`}
        >
          <Trash2 size={17} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

function ProfilePanel({ user, address, setUser, setAddress }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-soft sm:p-5">
      <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-coral">
        <User size={16} aria-hidden="true" />
        Consumer account
      </p>
      <div className="mt-4 grid gap-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Name" value={user.name} onChange={(value) => setUser({ ...user, name: value })} />
          <Field label="Email" type="email" value={user.email} onChange={(value) => setUser({ ...user, email: value })} />
        </div>
        <Field label="Phone" value={user.phone} onChange={(value) => setUser({ ...user, phone: value })} />
        <Field label="Address" value={address.line1} onChange={(value) => setAddress({ ...address, line1: value })} />
        <div className="grid gap-3 sm:grid-cols-3">
          <Field label="City" value={address.city} onChange={(value) => setAddress({ ...address, city: value })} />
          <Field label="State" value={address.state} onChange={(value) => setAddress({ ...address, state: value })} />
          <Field label="Pincode" value={address.pincode} onChange={(value) => setAddress({ ...address, pincode: value })} />
        </div>
      </div>
    </section>
  );
}

function Field({ label, value, onChange, type = "text" }) {
  return (
    <label className="grid gap-1.5">
      <span className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">{label}</span>
      <input
        type={type === "email" ? "text" : type}
        inputMode={type === "email" ? "email" : undefined}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="focus-ring min-h-11 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm outline-none"
      />
    </label>
  );
}

function CheckoutPanel({
  paymentMethod,
  setPaymentMethod,
  subtotal,
  delivery,
  discount,
  grandTotal,
  checkout
}) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-soft sm:p-5">
      <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-coral">
        <CreditCard size={16} aria-hidden="true" />
        Checkout
      </p>
      <div className="mt-4 grid gap-3 text-sm">
        <label className="grid gap-2">
          <span className="font-bold text-slate-700">Payment method</span>
          <select
            value={paymentMethod}
            onChange={(event) => setPaymentMethod(event.target.value)}
            className="focus-ring min-h-11 rounded-lg border border-slate-200 bg-slate-50 px-3"
          >
            <option>Giftora Secure Demo Pay</option>
            <option>Card test payment</option>
            <option>UPI test payment</option>
          </select>
        </label>
        <SummaryRow label="Subtotal" value={money(subtotal)} />
        <SummaryRow label="Delivery" value={delivery ? money(delivery) : "Free"} />
        <SummaryRow label="Discount" value={discount ? `-${money(discount)}` : money(0)} />
        <div className="border-t border-slate-200 pt-3">
          <SummaryRow label="Total" value={money(grandTotal)} strong />
        </div>
      </div>
      <button
        type="button"
        onClick={checkout}
        className="focus-ring mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-ink px-4 text-sm font-black text-white transition hover:bg-slate-800"
      >
        <ShieldCheck size={18} aria-hidden="true" />
        Confirm secure demo order
      </button>
    </section>
  );
}

function SummaryRow({ label, value, strong = false }) {
  return (
    <div className={`flex items-center justify-between gap-3 ${strong ? "text-lg font-black" : "font-semibold"}`}>
      <span className="text-slate-600">{label}</span>
      <span>{value}</span>
    </div>
  );
}
