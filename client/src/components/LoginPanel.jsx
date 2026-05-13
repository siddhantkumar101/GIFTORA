import { ShieldCheck, User, LogIn } from "lucide-react";

export default function LoginPanel({ role, mode, setMode, form, setForm, selectRole, onSubmit, onClose }) {
  const isRegister = mode === "register";
  const roleCopy =
    role === "seller"
      ? {
          title: isRegister ? "Join the Studio" : "Admin Login",
          subtitle: "Manage your catalog and track orders in real-time.",
          icon: ShieldCheck
        }
      : {
          title: isRegister ? "Create Account" : "Welcome Back",
          subtitle: "Customize gifts and manage your personal collections.",
          icon: User
        };
  const Icon = roleCopy.icon;

  return (
    <section className="mb-8 rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 shadow-soft animate-fade-in">
      <div className="grid gap-6 sm:gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div className="rounded-xl sm:rounded-2xl bg-ink p-5 sm:p-8 text-white relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-coral/10 rounded-full blur-2xl" />
          <div className="relative z-10">
            <div className="grid h-12 w-12 place-items-center rounded-lg bg-white/10">
              <Icon size={24} className="text-white" aria-hidden="true" />
            </div>
            <p className="mt-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
              Authentication
            </p>
            <h2 className="mt-2 text-3xl font-black">{roleCopy.title}</h2>
            <p className="mt-3 text-sm leading-6 text-white/70">{roleCopy.subtitle}</p>
            
            <div className="mt-10 flex flex-col gap-3">
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Account Type</p>
               <div className="flex rounded-xl bg-white/5 p-1 border border-white/5">
                  <button
                    type="button"
                    onClick={() => selectRole("consumer")}
                    className={`flex-1 rounded-lg py-2 text-[11px] font-black uppercase tracking-widest transition-all ${
                      role === "consumer" 
                        ? "bg-white text-ink shadow-lg" 
                        : "text-white/40 hover:text-white"
                    }`}
                  >
                    Customer
                  </button>
                  <button
                    type="button"
                    onClick={() => selectRole("seller")}
                    className={`flex-1 rounded-lg py-2 text-[11px] font-black uppercase tracking-widest transition-all ${
                      role === "seller" 
                        ? "bg-white text-ink shadow-lg" 
                        : "text-white/40 hover:text-white"
                    }`}
                  >
                    Admin
                  </button>
               </div>
            </div>
          </div>
        </div>

        <div className="p-2 sm:p-4">
          <div className="flex flex-col gap-2 mb-8">
             <div className="flex rounded-xl bg-slate-50 p-1 w-fit border border-slate-100">
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className={`px-6 py-2 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all ${
                    mode === "login" 
                      ? "bg-white text-ink shadow-sm" 
                      : "text-slate-400 hover:text-ink"
                  }`}
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => setMode("register")}
                  className={`px-6 py-2 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all ${
                    mode === "register" 
                      ? "bg-white text-ink shadow-sm" 
                      : "text-slate-400 hover:text-ink"
                  }`}
                >
                  Join Now
                </button>
             </div>
          </div>

          <form onSubmit={onSubmit} className="grid gap-5">
            {isRegister && (
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Full Name"
                  value={form.name}
                  onChange={(value) => setForm({ ...form, name: value })}
                />
                <Field
                  label="Phone"
                  value={form.phone}
                  onChange={(value) => setForm({ ...form, phone: value })}
                />
              </div>
            )}
            
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Email"
                type="email"
                value={form.email}
                onChange={(value) => setForm({ ...form, email: value })}
              />
              <Field
                label="Password"
                type="password"
                value={form.password}
                onChange={(value) => setForm({ ...form, password: value })}
              />
            </div>
            
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <button
                type="submit"
                className="inline-flex h-12 items-center gap-2 rounded-xl bg-coral px-10 text-[11px] font-black uppercase tracking-widest text-white hover:bg-[#df4937] transition-all shadow-lg shadow-coral/10 active:scale-95"
              >
                <LogIn size={16} />
                {isRegister ? "Join Giftora" : "Access Studio"}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="h-12 px-6 rounded-xl border border-slate-200 text-[11px] font-black uppercase tracking-widest text-slate-500 hover:border-ink hover:text-ink transition-all"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, type = "text", value, onChange }) {
  return (
    <label className="grid gap-2">
      <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">{label}</span>
      <input
        type={type}
        required
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold transition-all focus:border-ink focus:bg-white outline-none"
      />
    </label>
  );
}

