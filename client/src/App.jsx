import { useEffect, useMemo, useState } from "react";
import { Routes, Route, useNavigate, useLocation, Navigate } from "react-router-dom";
import {
  CheckCircle2,
  Package,
  RefreshCcw,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  User
} from "lucide-react";

// Utilities
import { api } from "./utils/api.js";
import { money, getSaved } from "./utils/helpers.js";
import { 
  fallbackProducts, 
  defaultCustomizer, 
  blankUser, 
  blankAddress 
} from "./utils/constants.js";

// Pages
import HomeView from "./pages/HomeView.jsx";
import StudioView from "./pages/StudioView.jsx";
import CartView from "./pages/CartView.jsx";
import OrdersView from "./pages/OrdersView.jsx";
import AdminView from "./pages/AdminView.jsx";

// Components
import LoginPanel from "./components/LoginPanel.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [apiMode, setApiMode] = useState("connecting");
  const [products, setProducts] = useState([]);
  const [session, setSession] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);

  const tabs = useMemo(() => {
    if (session?.role === "seller") {
      return [{ id: "admin", label: "Admin", icon: ShieldCheck, path: "/admin" }];
    }
    return [
      { id: "home", label: "Home", icon: Sparkles, path: "/" },
      { id: "studio", label: "Studio", icon: Sparkles, path: "/studio" },
      ...(session ? [
        { id: "cart", label: "Cart", icon: ShoppingCart, path: "/cart" },
        { id: "orders", label: "Orders", icon: Package, path: "/orders" },
      ] : [])
    ];
  }, [session]);

  const [selectedSlug, setSelectedSlug] = useState(fallbackProducts[0].slug);
  const [customizer, setCustomizer] = useState(defaultCustomizer);
  const [cart, setCart] = useState(() => getSaved("giftora-cart", []));
  const [orders, setOrders] = useState([]);
  const [adminOrders, setAdminOrders] = useState([]);
  const [loginOpen, setLoginOpen] = useState(false);
  const [loginMode, setLoginMode] = useState("login");
  const [loginRole, setLoginRole] = useState("consumer");
  const [loginForm, setLoginForm] = useState({ name: "", email: "", password: "", phone: "" });
  const [user, setUser] = useState(() => getSaved("giftora-user", blankUser));
  const [address, setAddress] = useState(() => getSaved("giftora-address", blankAddress));
  const [paymentMethod, setPaymentMethod] = useState("Giftora Secure Demo Pay");
  const [notice, setNotice] = useState("");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const selectedProduct =
    products.find((product) => product.slug === selectedSlug) || products[0] || fallbackProducts[0];

  const filteredProducts = products.filter((product) => {
    const term = search.trim().toLowerCase();
    const categoryMatch = selectedCategory === "All" || product.category === selectedCategory;
    const searchMatch = !term || `${product.name} ${product.category} ${product.description}`.toLowerCase().includes(term);
    return categoryMatch && searchMatch;
  });

  const subtotal = useMemo(
    () => cart.reduce((total, item) => total + item.price * item.quantity, 0),
    [cart]
  );
  const delivery = subtotal > 999 || subtotal === 0 ? 0 : 79;
  const discount = subtotal > 1499 ? 150 : 0;
  const grandTotal = Math.max(subtotal + delivery - discount, 0);

  const metrics = useMemo(() => {
    const placed = adminOrders.length;
    const revenue = adminOrders.reduce((sum, order) => sum + (order.totals?.grandTotal || 0), 0);
    const avgOrder = placed ? Math.round(revenue / placed) : 0;
    return {
      placed,
      revenue,
      avgOrder,
      conversion: cart.length ? "Ready" : "Preview"
    };
  }, [adminOrders, cart.length]);

  // Initial Load: Session and Products
  useEffect(() => {
    async function init() {
      // 1. Check session
      try {
        const user = await api("/auth/me");
        setSession(user);
        if (user.role === "consumer") {
          setUser({ name: user.name, email: user.email, phone: user.phone || "" });
        }
      } catch (err) {
        setSession(null);
      } finally {
        setCheckingSession(false);
      }

      // 2. Load products
      try {
        const data = await api("/products");
        if (data && data.length > 0) {
          setProducts(data);
          setApiMode("api");
        } else {
          setProducts(fallbackProducts);
          setApiMode("demo");
        }
      } catch (err) {
        setProducts(fallbackProducts);
        setApiMode("demo");
      }
    }

    init();
  }, []);

  // Sync Orders
  useEffect(() => {
    if (session?.role === "seller") {
      api("/orders").then(setAdminOrders).catch(() => setAdminOrders([]));
    } else if (session?.role === "consumer" && session.email) {
      api(`/orders?email=${session.email}`).then(setOrders).catch(() => setOrders([]));
    }
  }, [session]);

  // Persistence
  useEffect(() => { localStorage.setItem("giftora-cart", JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem("giftora-user", JSON.stringify(user)); }, [user]);
  useEffect(() => { localStorage.setItem("giftora-address", JSON.stringify(address)); }, [address]);

  useEffect(() => {
    setCustomizer((current) => ({
      ...current,
      productColor: selectedProduct?.colors?.[0] || current.productColor
    }));
  }, [selectedProduct?.slug]);

  // Handlers
  function updateCartQuantity(cartId, value) {
    const quantity = parseInt(value, 10);
    if (isNaN(quantity) || quantity < 1) return;
    setCart((current) =>
      current.map((item) => (item.cartId === cartId ? { ...item, quantity } : item))
    );
  }

  function removeFromCart(cartId) {
    setCart((current) => current.filter((item) => item.cartId !== cartId));
  }

  function handleTabClick(tab) {
    if (tab.id === "admin" && session?.role !== "seller") {
      openLogin("seller");
      return;
    }
    setLoginOpen(false);
    navigate(tab.path);
  }

  function openLogin(role = "consumer", mode = "login") {
    setLoginRole(role);
    setLoginMode(mode);
    setLoginForm({ name: "", email: "", password: "", phone: "" });
    setLoginOpen(true);
  }

  async function handleLogin(event) {
    event?.preventDefault();
    const isRegister = loginMode === "register";
    try {
      const savedUser = await api(isRegister ? "/auth/register" : "/auth/login", {
        method: "POST",
        body: JSON.stringify({ ...loginForm, role: loginRole })
      });
      
      setSession(savedUser);
      setLoginOpen(false);
      setNotice(isRegister ? `Account created! Welcome, ${savedUser.name}.` : `Welcome back, ${savedUser.name}!`);

      if (savedUser.role === "seller") {
        navigate("/admin");
      } else {
        setUser({ name: savedUser.name, email: savedUser.email, phone: savedUser.phone });
        navigate("/");
      }
    } catch (error) {
      setNotice(error.message);
    }
  }

  async function logout() {
    try {
      await api("/auth/logout", { method: "POST" });
      setSession(null);
      setNotice("Logged out successfully.");
      navigate("/");
    } catch (error) {
      setNotice("Logout failed.");
    }
  }

  function updateCustomizer(key, value) {
    setCustomizer((current) => ({ ...current, [key]: value }));
  }

  function handleUpload(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      updateCustomizer("image", reader.result);
      updateCustomizer("imageName", file.name);
    };
    reader.readAsDataURL(file);
  }

  function addToCart() {
    if (session?.role !== "consumer") {
      openLogin("consumer");
      setNotice("Login as customer to save designs.");
      return;
    }

    const item = {
      cartId: `${selectedProduct.slug}-${Date.now()}`,
      productSlug: selectedProduct.slug,
      name: selectedProduct.name,
      category: selectedProduct.category,
      price: selectedProduct.price,
      quantity: customizer.quantity,
      previewImage: customizer.image,
      customization: {
        text: customizer.text,
        textColor: customizer.textColor,
        productColor: customizer.productColor,
        placement: customizer.placement,
        font: customizer.font,
        size: customizer.size,
        imageName: customizer.imageName,
        hasImage: Boolean(customizer.image)
      }
    };
    setCart((current) => [item, ...current]);
    setNotice(`${selectedProduct.name} added to cart`);
    navigate("/cart");
  }

  async function checkout() {
    if (session?.role !== "consumer") { openLogin("consumer"); return; }
    if (!cart.length) { setNotice("Cart is empty."); return; }
    if (!user.name || !user.email) { setNotice("Details required."); return; }
    if (!address.line1 || !address.city) { setNotice("Address required."); return; }

    const payload = {
      customer: user,
      address,
      items: cart.map(({ previewImage, cartId, ...item }) => item),
      totals: { subtotal, delivery, discount, grandTotal },
      payment: { method: paymentMethod }
    };

    try {
      const created = await api("/orders", { method: "POST", body: JSON.stringify(payload) });
      setOrders((current) => [created, ...current]);
      setCart([]);
      setNotice(`Order ${created.orderNumber} placed!`);
      navigate("/orders");
    } catch (error) {
      setNotice(`Checkout failed: ${error.message}`);
    }
  }

  // Admin Functions
  async function updateProduct(slug, updates) {
    try {
      const updated = await api(`/products/${slug}`, { method: "PATCH", body: JSON.stringify(updates) });
      setProducts((current) => current.map((p) => (p.slug === slug ? updated : p)));
      setNotice("Product updated successfully!");
    } catch (error) { setNotice(error.message); }
  }

  async function addProduct(productData) {
    try {
      const created = await api("/products", { method: "POST", body: JSON.stringify(productData) });
      setProducts((current) => [created, ...current]);
      return true;
    } catch (error) { setNotice(error.message); return false; }
  }

  async function deleteProduct(slug) {
    if (!window.confirm("Remove item permanently?")) return;
    try {
      await api(`/products/${slug}`, { method: "DELETE" });
      setProducts((current) => current.filter((p) => p.slug !== slug));
      setNotice("Product removed.");
    } catch (error) { setNotice(error.message); }
  }

  async function updateOrderStatus(orderNumber, status) {
    try {
      const updated = await api(`/orders/${orderNumber}/status`, { method: "PATCH", body: JSON.stringify({ status }) });
      setAdminOrders((current) => current.map((o) => (o.orderNumber === orderNumber ? updated : o)));
      setNotice(`Status: ${status}`);
    } catch (error) { setNotice(error.message); }
  }

  return (
    <div className="min-h-screen flex flex-col bg-bg-main overflow-x-hidden pb-20 lg:pb-0">
      <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 lg:flex-nowrap">
            {/* Logo Group */}
            <div className="flex items-center gap-2 sm:gap-3 cursor-pointer" onClick={() => navigate("/")}>
              <div className="grid h-8 w-8 sm:h-11 sm:w-11 place-items-center rounded-lg bg-ink text-white ring-2 sm:ring-4 ring-orange-500/10 transition-all hover:ring-orange-500/20">
                <Sparkles size={16} className="text-orange-500 sm:size-[22px]" aria-hidden="true" />
              </div>
              <div>
                <p className="text-[8px] font-bold uppercase tracking-[0.22em] text-orange-500 sm:text-xs">Premium</p>
                <h1 className="text-sm font-black leading-tight sm:text-2xl">Giftora Studio</h1>
              </div>
            </div>

            {/* Auth/User Group - Order 2 on mobile, Order 3 on Desktop */}
            <div className="flex items-center gap-2 sm:gap-4 order-2">
              {checkingSession ? (
                <RefreshCcw className="animate-spin text-slate-300" size={18} />
              ) : session ? (
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="flex items-center gap-2">
                     <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center">
                        {session.role === "seller" ? <ShieldCheck size={14} /> : <User size={14} />}
                     </div>
                     <span className="hidden sm:inline text-sm font-bold text-slate-700">{session.name}</span>
                  </div>
                  <button onClick={logout} className="text-[10px] sm:text-sm font-bold text-slate-400 hover:text-coral transition-colors">
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 sm:gap-3">
                  <button onClick={() => openLogin("consumer")} className="focus-ring bg-ink text-white h-8 sm:h-11 px-3 sm:px-6 rounded-lg sm:rounded-xl text-[10px] sm:text-sm font-black hover:bg-slate-800 transition-all flex items-center gap-1 sm:gap-2">
                    <User size={12} className="text-coral sm:size-[18px]" />
                    Login
                  </button>
                  <button onClick={() => openLogin("seller")} className="focus-ring border border-slate-200 bg-white h-8 sm:h-11 px-2 sm:px-5 rounded-lg sm:rounded-xl text-[10px] sm:text-sm font-bold text-slate-700 hover:border-ink transition-all flex items-center gap-1 sm:gap-2">
                    <ShieldCheck size={12} className="sm:size-[18px]" />
                    Admin
                  </button>
                </div>
              )}
            </div>

            {/* Desktop Nav Group */}
            <nav className="hidden lg:flex items-center gap-1 order-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const selected = location.pathname === tab.path;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab)}
                    className={`nav-link flex items-center gap-2 text-sm font-bold ${selected ? "active" : ""}`}
                  >
                    <Icon size={16} aria-hidden="true" />
                    {tab.label}
                    {tab.id === "cart" && cart.length > 0 && (
                      <span className="ml-1 rounded-full bg-coral px-1.5 py-0.5 text-[9px] text-white">
                        {cart.length}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-2.5 py-6 sm:px-6 lg:px-8">
        {notice && (
          <div className="mb-5 flex items-center gap-3 rounded-lg border border-mint/30 bg-mint/10 px-4 py-3 text-sm font-semibold text-teal-900">
            <CheckCircle2 size={18} aria-hidden="true" />
            {notice}
          </div>
        )}

        {loginOpen && (
          <LoginPanel
            role={loginRole}
            mode={loginMode}
            setMode={setLoginMode}
            form={loginForm}
            setForm={setLoginForm}
            selectRole={setLoginRole}
            onSubmit={handleLogin}
            onClose={() => setLoginOpen(false)}
          />
        )}

        <Routes>
          <Route path="/" element={<HomeView products={products} apiMode={apiMode} />} />
          <Route path="/studio" element={
            products.length === 0 ? (
              <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
                <RefreshCcw className="mb-4 animate-spin text-coral" size={32} />
                <p className="text-sm font-black uppercase tracking-widest text-slate-400">Syncing with studio...</p>
              </div>
            ) : (
              <StudioView
                products={filteredProducts}
                allProducts={products}
                selectedProduct={selectedProduct}
                selectedSlug={selectedSlug}
                setSelectedSlug={setSelectedSlug}
                customizer={customizer}
                updateCustomizer={updateCustomizer}
                handleUpload={handleUpload}
                addToCart={addToCart}
                search={search}
                setSearch={setSearch}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                session={session}
              />
            )
          } />
          
          <Route path="/cart" element={
            <CartView
              cart={cart}
              user={user}
              address={address}
              paymentMethod={paymentMethod}
              subtotal={subtotal}
              delivery={delivery}
              discount={discount}
              grandTotal={grandTotal}
              updateCartQuantity={updateCartQuantity}
              removeFromCart={removeFromCart}
              setUser={setUser}
              setAddress={setAddress}
              setPaymentMethod={setPaymentMethod}
              checkout={checkout}
              setActiveTab={(tab) => navigate(tab === "studio" ? "/" : `/${tab}`)}
            />
          } />

          <Route path="/orders" element={
            session?.role === "consumer" ? (
              <OrdersView orders={orders} user={user} setUser={setUser} setActiveTab={(tab) => navigate(tab === "studio" ? "/" : `/${tab}`)} />
            ) : <Navigate to="/" />
          } />

          <Route path="/admin" element={
            session?.role === "seller" ? (
              <AdminView
                metrics={metrics}
                products={products}
                orders={adminOrders}
                updateProduct={updateProduct}
                addProduct={addProduct}
                updateOrderStatus={updateOrderStatus}
                deleteProduct={deleteProduct}
              />
            ) : <Navigate to="/" />
          } />
        </Routes>
      </main>
      <Footer />

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-4 left-4 right-4 lg:hidden z-[100] bg-white/80 backdrop-blur-2xl border border-slate-200/50 rounded-[28px] py-3 shadow-2xl shadow-ink/10">
        <div className="flex justify-around items-center px-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const selected = location.pathname === tab.path;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab)}
                className={`relative flex flex-col items-center gap-1 transition-all duration-300 ${
                  selected ? "text-coral scale-110" : "text-slate-400"
                }`}
              >
                <div className={`p-1.5 rounded-xl transition-colors ${selected ? "bg-coral/10" : "bg-transparent"}`}>
                  <Icon size={20} strokeWidth={selected ? 2.5 : 2} />
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest">{tab.label}</span>
                {tab.id === "cart" && cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-coral text-[8px] font-bold text-white ring-2 ring-white">
                    {cart.length}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
