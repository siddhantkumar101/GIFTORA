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
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-ink/60 backdrop-blur-sm animate-fade-in">
      <section className="w-full max-w-4xl overflow-y-auto max-h-[90vh] rounded-[32px] border border-slate-200 bg-white p-3 sm:p-6 shadow-2xl">
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="rounded-[24px] bg-ink p-5 sm:p-8 text-white relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-coral/20 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-white/10 backdrop-blur-md">
                <Icon size={24} className="text-coral" aria-hidden="true" />
              </div>
              <p className="mt-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                Member Access
              </p>
              <h2 className="mt-2 text-3xl font-black leading-none">{roleCopy.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-white/60 font-medium">{roleCopy.subtitle}</p>
              
              <div className="mt-10">
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30 mb-3">Action</p>
                <div className="flex rounded-xl bg-white/5 p-1 border border-white/5">
                  <button
                    type="button"
                    onClick={() => setMode("login")}
                    className={`flex-1 rounded-lg py-2.5 text-[10px] font-black uppercase tracking-widest transition-all ${
                      mode === "login" 
                        ? "bg-white text-ink shadow-lg" 
                        : "text-white/40 hover:text-white"
                    }`}
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode("register")}
                    className={`flex-1 rounded-lg py-2.5 text-[10px] font-black uppercase tracking-widest transition-all ${
                      mode === "register" 
                        ? "bg-white text-ink shadow-lg" 
                        : "text-white/40 hover:text-white"
                    }`}
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="p-2 sm:p-4">
            <div className="flex items-center justify-between mb-8">
               <div>
                  <h3 className="text-xl font-black text-ink">{isRegister ? "Start your journey" : "Welcome back"}</h3>
                  <p className="text-xs font-bold text-slate-400">Please enter your credentials</p>
               </div>
               <button onClick={onClose} className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-ink transition-colors">
                  <LogIn size={18} className="rotate-180" />
               </button>
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
              
              <div className="flex flex-col gap-3 pt-4">
                <button
                  type="submit"
                  className="w-full h-14 rounded-2xl bg-coral text-white text-sm font-black uppercase tracking-widest shadow-xl shadow-coral/20 hover:scale-[1.02] active:scale-95 transition-all"
                >
                  {isRegister ? "Create Account" : "Access Studio"}
                </button>
                <button
                  type="button"
                  onClick={() => selectRole(role === "seller" ? "consumer" : "seller")}
                  className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 hover:text-coral transition-colors py-2"
                >
                  Switch to {role === "seller" ? "Customer" : "Admin"} Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
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
