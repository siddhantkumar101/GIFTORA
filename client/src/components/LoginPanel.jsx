import { ShieldCheck, User, LogIn } from "lucide-react";

export default function LoginPanel({ role, mode, setMode, form, setForm, selectRole, onSubmit, onClose }) {
  const isRegister = mode === "register";
  const roleCopy =
    role === "seller"
      ? {
          title: isRegister ? "Create Admin Account" : "Admin Login",
          subtitle: "Full access to product catalog, orders, and studio analytics.",
          icon: ShieldCheck
        }
      : {
          title: isRegister ? "Create Account" : "Consumer Login",
          subtitle: "Customize gifts, track orders, and manage your gift collections.",
          icon: User
        };
  const Icon = roleCopy.icon;

  return (
    <section className="mb-5 rounded-lg border border-slate-200 bg-white p-4 shadow-soft sm:p-5">
      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div className="rounded-lg bg-ink p-5 text-white">
          <div className="grid h-12 w-12 place-items-center rounded-lg bg-white/12">
            <Icon size={24} aria-hidden="true" />
          </div>
          <p className="mt-5 text-sm font-bold uppercase tracking-[0.18em] text-lemon">
            Secure Authentication
          </p>
          <h2 className="mt-2 text-3xl font-black">{roleCopy.title}</h2>
          <p className="mt-3 text-sm leading-6 text-white/75">{roleCopy.subtitle}</p>
          
          <div className="mt-8 flex flex-col gap-3">
             <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Are you new?</p>
             <div className="flex rounded-xl bg-white/5 p-1">
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className={`flex-1 rounded-lg py-2 text-xs font-black uppercase tracking-widest transition-all ${
                    mode === "login" 
                      ? "bg-white text-ink shadow-lg" 
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setMode("register")}
                  className={`flex-1 rounded-lg py-2 text-xs font-black uppercase tracking-widest transition-all ${
                    mode === "register" 
                      ? "bg-white text-ink shadow-lg" 
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  Join Now
                </button>
             </div>
          </div>
          
          <div className="mt-8 border-t border-white/10 pt-6">
             <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-3">Account Type</p>
             <div className="flex rounded-xl bg-white/5 p-1">
                <button
                  type="button"
                  onClick={() => selectRole("consumer")}
                  className={`flex-1 rounded-lg py-2 text-xs font-black uppercase tracking-widest transition-all ${
                    role === "consumer" 
                      ? "bg-coral text-white shadow-lg" 
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  Customer
                </button>
                <button
                  type="button"
                  onClick={() => selectRole("seller")}
                  className={`flex-1 rounded-lg py-2 text-xs font-black uppercase tracking-widest transition-all ${
                    role === "seller" 
                      ? "bg-coral text-white shadow-lg" 
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  Admin
                </button>
             </div>
          </div>
        </div>

        <form onSubmit={onSubmit} className="grid gap-4">
          {isRegister && (
            <div className="grid gap-3 sm:grid-cols-2">
              <Field
                label="Full Name"
                value={form.name}
                onChange={(value) => setForm({ ...form, name: value })}
              />
              <Field
                label="Phone (Optional)"
                value={form.phone}
                onChange={(value) => setForm({ ...form, phone: value })}
              />
            </div>
          )}
          
          <div className="grid gap-3 sm:grid-cols-2">
            <Field
              label="Email Address"
              type="email"
              value={form.email}
              onChange={(value) => setForm({ ...form, email: value })}
            />
            <Field
              label="Secret Password"
              type="password"
              value={form.password}
              onChange={(value) => setForm({ ...form, password: value })}
            />
          </div>
          
          <div className="flex flex-wrap gap-2 pt-2">
            <button
              type="submit"
              className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-lg bg-coral px-6 text-sm font-black text-white hover:bg-[#df4937]"
            >
              <LogIn size={17} aria-hidden="true" />
              {isRegister ? "Register Now" : `Login as ${role === "seller" ? "Admin" : "Consumer"}`}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="focus-ring min-h-11 rounded-lg border border-slate-200 px-4 text-sm font-bold text-slate-700 hover:border-mint"
            >
              Close
            </button>
          </div>
          
          <p className="mt-2 text-xs text-slate-500">
            {isRegister 
              ? "By registering, you agree to our gift-giving terms." 
              : "Welcome back to Giftora Studio."}
          </p>
        </form>
      </div>
    </section>
  );
}

function Field({ label, type = "text", value, onChange }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-bold text-slate-700">{label}</span>
      <input
        type={type}
        required
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="focus-ring min-h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm transition focus:border-mint"
      />
    </label>
  );
}
