import { useEffect, useMemo, useState } from "react";
import {
  BarChart3,
  Boxes,
  CheckCircle2,
  Clock3,
  CreditCard,
  ImageIcon,
  LayoutDashboard,
  LogIn,
  LogOut,
  MapPin,
  PackageCheck,
  Palette,
  Plus,
  RefreshCcw,
  Search,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Star,
  Store,
  Trash2,
  Truck,
  Type,
  UploadCloud,
  User
} from "lucide-react";

const fallbackProducts = [
  {
    id: "signature-mug",
    slug: "signature-mug",
    name: "Signature Ceramic Mug",
    category: "Mugs",
    price: 349,
    compareAt: 499,
    image: "https://images.unsplash.com/photo-1517142089942-ba376ce32a2e?q=80&w=800&auto=format&fit=crop",
    description: "Glossy 325 ml mug with wrap-around print area and gift-ready packaging.",
    leadTime: "2 days",
    rating: 4.8,
    orders: 1240,
    material: "Ceramic",
    colors: ["#ffffff", "#f97316", "#14b8a6", "#111827"],
    customizationAreas: ["front", "wrap", "handle-side"],
    active: true
  },
  {
    id: "memory-tee",
    slug: "memory-tee",
    name: "Memory Cotton T-Shirt",
    category: "T-Shirts",
    price: 599,
    compareAt: 799,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop",
    description: "Soft cotton tee with crisp DTG print support for photos and custom text.",
    leadTime: "3 days",
    rating: 4.7,
    orders: 910,
    material: "Cotton",
    colors: ["#ffffff", "#0f172a", "#facc15", "#ef4444"],
    customizationAreas: ["chest", "back"],
    active: true
  },
  {
    id: "snap-cover",
    slug: "snap-cover",
    name: "Snap Phone Cover",
    category: "Phone Covers",
    price: 449,
    compareAt: 649,
    image: "https://images.unsplash.com/photo-1586105449897-20b5efeb3233?q=80&w=800&auto=format&fit=crop",
    description: "Durable matte phone cover with edge-to-edge image personalization.",
    leadTime: "2 days",
    rating: 4.6,
    orders: 760,
    material: "Polycarbonate",
    colors: ["#111827", "#ffffff", "#7c3aed", "#22c55e"],
    customizationAreas: ["full-back", "camera-safe"],
    active: true
  },
  {
    id: "gallery-frame",
    slug: "gallery-frame",
    name: "Gallery Photo Frame",
    category: "Photo Frames",
    price: 699,
    compareAt: 999,
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop",
    description: "Premium tabletop frame with printed photo insert and message strip.",
    leadTime: "4 days",
    rating: 4.9,
    orders: 620,
    material: "Engineered wood",
    colors: ["#111827", "#ffffff", "#92400e", "#0f766e"],
    customizationAreas: ["photo", "caption"],
    active: true
  },
  {
    id: "acrylic-keychain",
    slug: "acrylic-keychain",
    name: "Acrylic Photo Keychain",
    category: "Keychains",
    price: 199,
    compareAt: 299,
    image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=800&auto=format&fit=crop",
    description: "Crystal clear acrylic keychain with double-sided photo printing.",
    leadTime: "2 days",
    rating: 4.5,
    orders: 1540,
    material: "Acrylic",
    colors: ["#ffffff", "#000000"],
    customizationAreas: ["front", "back"],
    active: true
  },
  {
    id: "comfort-cushion",
    slug: "comfort-cushion",
    name: "Comfort Photo Cushion",
    category: "Cushions",
    price: 499,
    compareAt: 749,
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=800&auto=format&fit=crop",
    description: "Soft velvet cushion with full-bleed photo print and washable cover.",
    leadTime: "3 days",
    rating: 4.7,
    orders: 830,
    material: "Velvet",
    colors: ["#ffffff", "#f8fafc", "#fef2f2"],
    customizationAreas: ["full-front"],
    active: true
  },
  {
    id: "steel-bottle",
    slug: "steel-bottle",
    name: "Steel Insulated Bottle",
    category: "Water Bottles",
    price: 899,
    compareAt: 1299,
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=800&auto=format&fit=crop",
    description: "Double-walled steel bottle with laser-engraved name or logo.",
    leadTime: "4 days",
    rating: 4.9,
    orders: 450,
    material: "Stainless Steel",
    colors: ["#1e293b", "#f1f5f9", "#ef4444", "#3b82f6"],
    customizationAreas: ["front", "vertical"],
    active: true
  },
  {
    id: "modern-clock",
    slug: "modern-clock",
    name: "Modern Wall Clock",
    category: "Wall Clocks",
    price: 999,
    compareAt: 1499,
    image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?q=80&w=800&auto=format&fit=crop",
    description: "Silent movement wall clock with custom photo dial and sleek hands.",
    leadTime: "5 days",
    rating: 4.8,
    orders: 310,
    material: "Plastic & Glass",
    colors: ["#ffffff", "#000000"],
    customizationAreas: ["dial"],
    active: true
  }
];

const statusFlow = [
  "Design approval",
  "Printing",
  "Quality check",
  "Packed",
  "Shipped",
  "Delivered"
];

const tabs = [
  { id: "studio", label: "Studio", icon: Sparkles },
  { id: "cart", label: "Cart", icon: ShoppingCart, role: "consumer" },
  { id: "orders", label: "Orders", icon: PackageCheck, role: "consumer" },
  { id: "seller", label: "Admin Panel", icon: ShieldCheck, role: "seller" }
];

const placements = [
  { id: "top", label: "Top" },
  { id: "center", label: "Center" },
  { id: "bottom", label: "Bottom" }
];

const fonts = ["Sans", "Serif", "Mono", "Script"];

const defaultCustomizer = {
  image: "",
  imageName: "",
  text: "Best Gift Ever",
  textColor: "#172033",
  productColor: "#ffffff",
  placement: "center",
  font: "Sans",
  quantity: 1,
  size: "Standard"
};

const blankUser = {
  name: "",
  email: "",
  phone: ""
};

const demoAccounts = {
  consumer: {
    name: "Siddhant Consumer",
    email: "consumer@giftora.test",
    phone: "9876543210"
  },
  seller: {
    name: "Giftora Seller",
    email: "seller@giftora.test",
    phone: "9000000000"
  }
};

const blankAddress = {
  line1: "",
  city: "",
  state: "",
  pincode: ""
};

async function api(path, options = {}) {
  const baseUrl = import.meta.env.VITE_API_URL || "/api";
  const response = await fetch(`${baseUrl}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Request failed" }));
    throw new Error(error.message || "Request failed");
  }

  return response.json();
}

function money(amount) {
  return `Rs. ${Number(amount || 0).toLocaleString("en-IN")}`;
}

function getSaved(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [products, setProducts] = useState(fallbackProducts);
  const [selectedSlug, setSelectedSlug] = useState(fallbackProducts[0].slug);
  const [customizer, setCustomizer] = useState(defaultCustomizer);
  const [cart, setCart] = useState(() => getSaved("giftora-cart", []));
  const [orders, setOrders] = useState([]);
  const [adminOrders, setAdminOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("studio");
  const [session, setSession] = useState(() => getSaved("giftora-session", null));
  const [loginOpen, setLoginOpen] = useState(false);
  const [loginMode, setLoginMode] = useState("login"); // "login" or "register"
  const [loginRole, setLoginRole] = useState("consumer");
  const [loginForm, setLoginForm] = useState({
    ...demoAccounts.consumer,
    password: "demo123"
  });
  const [user, setUser] = useState(() => getSaved("giftora-user", blankUser));
  const [address, setAddress] = useState(() => getSaved("giftora-address", blankAddress));
  const [paymentMethod, setPaymentMethod] = useState("Giftora Secure Demo Pay");
  const [notice, setNotice] = useState("");
  const [search, setSearch] = useState("");
  const [apiMode, setApiMode] = useState("connecting");

  const selectedProduct =
    products.find((product) => product.slug === selectedSlug) || products[0] || fallbackProducts[0];

  const filteredProducts = products.filter((product) => {
    const term = search.trim().toLowerCase();
    if (!term) return true;
    return `${product.name} ${product.category} ${product.description}`.toLowerCase().includes(term);
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

  useEffect(() => {
    api("/products")
      .then((data) => {
        setProducts(data);
        setApiMode("api");
      })
      .catch(() => {
        setProducts(fallbackProducts);
        setApiMode("demo");
      });

    api("/orders")
      .then((data) => setAdminOrders(data))
      .catch(() => setAdminOrders([]));
  }, []);

  useEffect(() => {
    setCustomizer((current) => ({
      ...current,
      productColor: selectedProduct?.colors?.[0] || current.productColor
    }));
  }, [selectedProduct?.slug]);

  useEffect(() => {
    localStorage.setItem("giftora-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (session) {
      localStorage.setItem("giftora-session", JSON.stringify(session));
      if (session.role === "consumer") {
        setUser({
          name: session.name,
          email: session.email,
          phone: session.phone || ""
        });
      }
      return;
    }
    localStorage.removeItem("giftora-session");
  }, [session]);

  useEffect(() => {
    localStorage.setItem("giftora-user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem("giftora-address", JSON.stringify(address));
  }, [address]);

  useEffect(() => {
    if (!user.email) return;
    api(`/orders?email=${encodeURIComponent(user.email)}`)
      .then((data) => setOrders(data))
      .catch(() => {});
  }, [user.email]);

  function selectLoginRole(role) {
    setLoginRole(role);
    setLoginForm({ ...demoAccounts[role], password: "demo123" });
  }

  function openLogin(role = "consumer") {
    selectLoginRole(role);
    setLoginOpen(true);
  }

  async function handleLogin(event) {
    event?.preventDefault();
    const isRegister = loginMode === "register";
    const base = demoAccounts[loginRole];
    const authPayload = {
      role: loginRole,
      name: loginForm.name || base.name,
      email: loginForm.email || base.email,
      password: loginForm.password || "demo123",
      phone: loginForm.phone || base.phone
    };

    try {
      const savedUser = await api(isRegister ? "/auth/register" : "/auth/login", {
        method: "POST",
        body: JSON.stringify(authPayload)
      });
      
      const nextSession = {
        id: savedUser.id,
        role: savedUser.role || loginRole,
        name: savedUser.name,
        email: savedUser.email,
        phone: savedUser.phone || ""
      };

      setSession(nextSession);
      setLoginOpen(false);
      setNotice(
        isRegister
          ? `Admin account created! Dashboard unlocked.`
          : `Admin access granted. Welcome back.`
      );

      if (nextSession.role === "seller") {
        setActiveTab("seller");
      } else {
        setUser({
          name: nextSession.name,
          email: nextSession.email,
          phone: nextSession.phone
        });
        setActiveTab("studio");
      }
    } catch (error) {
      setNotice(error.message);
    }
  }

  function logout() {
    const role = session?.role;
    setSession(null);
    setLoginOpen(false);
    setNotice(role === "seller" ? "Seller logged out." : "Consumer logged out.");
    if (activeTab === "seller" || activeTab === "cart" || activeTab === "orders") {
      setActiveTab("studio");
    }
  }

  function handleTabClick(tab) {
    if (tab.role && session?.role !== tab.role) {
      openLogin(tab.role);
      setNotice(
        tab.role === "seller"
          ? "Login as seller to access the seller dashboard."
          : "Login as consumer to access cart and orders."
      );
      return;
    }
    
    if (tab.id === "orders" && session?.email) {
      api(`/orders?email=${encodeURIComponent(session.email)}`)
        .then((data) => setOrders(data))
        .catch(() => {});
    }
    
    if (tab.id === "seller") {
      api("/orders")
        .then((data) => setAdminOrders(data))
        .catch(() => {});
    }

    setActiveTab(tab.id);
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
      setNotice("Login as consumer before adding custom gifts to cart.");
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
    setActiveTab("cart");
  }

  function updateCartQuantity(cartId, quantity) {
    const safeQuantity = Math.max(1, Number(quantity) || 1);
    setCart((current) =>
      current.map((item) => (item.cartId === cartId ? { ...item, quantity: safeQuantity } : item))
    );
  }

  function removeFromCart(cartId) {
    setCart((current) => current.filter((item) => item.cartId !== cartId));
  }

  async function checkout() {
    setNotice("");
    if (session?.role !== "consumer") {
      openLogin("consumer");
      setNotice("Login as consumer before checkout.");
      return;
    }
    if (!cart.length) {
      setNotice("Add at least one custom gift before checkout.");
      return;
    }
    if (!user.name || !user.email) {
      setNotice("Add your name and email to continue.");
      return;
    }
    if (!address.line1 || !address.city || !address.state || !address.pincode) {
      setNotice("Complete the delivery address.");
      return;
    }

    const payload = {
      customer: user,
      address,
      items: cart.map(({ previewImage, cartId, ...item }) => item),
      totals: {
        subtotal,
        delivery,
        discount,
        grandTotal
      },
      payment: {
        method: paymentMethod
      }
    };

    try {
      await api("/auth/demo", {
        method: "POST",
        body: JSON.stringify({ ...user, role: "consumer", address })
      });
      const created = await api("/orders", {
        method: "POST",
        body: JSON.stringify(payload)
      });
      setOrders((current) => [created, ...current]);
      setAdminOrders((current) => [created, ...current]);
      setCart([]);
      setActiveTab("orders");
      setNotice(`Order ${created.orderNumber} confirmed.`);
    } catch {
      const localOrder = {
        orderNumber: `LOCAL-${Date.now()}`,
        ...payload,
        status: "Design approval",
        payment: {
          method: paymentMethod,
          status: "Paid in demo mode",
          transactionId: `LOCAL-TXN-${Date.now()}`
        },
        tracking: [
          {
            label: "Order confirmed",
            at: new Date().toISOString(),
            note: "Stored locally because the API is offline."
          }
        ],
        createdAt: new Date().toISOString()
      };
      setOrders((current) => [localOrder, ...current]);
      setAdminOrders((current) => [localOrder, ...current]);
      setCart([]);
      setActiveTab("orders");
      setNotice(`Order ${localOrder.orderNumber} confirmed in local mode.`);
    }
  }

  async function saveProductPrice(slug, value) {
    const price = Number(value);
    if (!price || price < 1) return;

    setProducts((current) =>
      current.map((product) => (product.slug === slug ? { ...product, price } : product))
    );

    try {
      const updated = await api(`/products/${slug}`, {
        method: "PATCH",
        body: JSON.stringify({ price })
      });
      setProducts((current) =>
        current.map((product) => (product.slug === slug ? updated : product))
      );
    } catch {
      setNotice("Price saved locally. Start the API for database persistence.");
    }
  }

  async function addProduct(productData) {
    try {
      const created = await api("/products", {
        method: "POST",
        body: JSON.stringify(productData)
      });
      setProducts((current) => [created, ...current]);
      setNotice(`New product "${created.name}" added to catalog.`);
      return true;
    } catch (error) {
      setNotice(`Failed to add product: ${error.message}`);
      return false;
    }
  }

  async function updateOrderStatus(orderNumber, status) {
    const localUpdate = (order) =>
      order.orderNumber === orderNumber
        ? {
            ...order,
            status,
            tracking: [
              ...(order.tracking || []),
              {
                label: status,
                at: new Date().toISOString(),
                note: `Order moved to ${status}.`
              }
            ]
          }
        : order;

    setAdminOrders((current) => current.map(localUpdate));
    setOrders((current) => current.map(localUpdate));

    try {
      const updated = await api(`/orders/${orderNumber}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status })
      });
      const replace = (order) => (order.orderNumber === orderNumber ? updated : order);
      setAdminOrders((current) => current.map(replace));
      setOrders((current) => current.map(replace));
    } catch {
      setNotice("Order status saved locally. Start the API for database persistence.");
    }
  }

  return (
    <div className="min-h-screen text-ink">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/92 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-lg bg-ink text-white">
              <Sparkles size={22} aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-coral">Giftora</p>
              <h1 className="text-xl font-black leading-tight sm:text-2xl">Giftora Studio</h1>
            </div>
          </div>

          <nav className="flex items-center gap-1 overflow-x-auto pb-2 scrollbar-none lg:overflow-visible" aria-label="Giftora sections">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const selected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTabClick(tab)}
                  className={`nav-link flex shrink-0 items-center gap-2 text-sm font-bold ${selected ? "active" : ""}`}
                >
                  <Icon size={16} aria-hidden="true" />
                  {tab.label}
                  {tab.id === "cart" && cart.length > 0 ? (
                    <span className="ml-1 rounded-full bg-coral px-2 py-0.5 text-[10px] text-white">
                      {cart.length}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>

          <div className="flex flex-wrap items-center gap-2">
            {session ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                   <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center">
                      {session.role === "seller" ? <ShieldCheck size={14} /> : <User size={14} />}
                   </div>
                   <span className="text-sm font-bold text-slate-700">{session.name}</span>
                </div>
                <button
                  type="button"
                  onClick={logout}
                  className="text-sm font-bold text-slate-400 hover:text-coral transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => openLogin("consumer")}
                  className="focus-ring inline-flex min-h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-bold text-slate-700 hover:border-mint"
                >
                  <User size={17} aria-hidden="true" />
                  Consumer login
                </button>
                <button
                  type="button"
                  onClick={() => openLogin("seller")}
                  className="focus-ring inline-flex min-h-10 items-center gap-2 rounded-lg bg-ink px-4 text-sm font-black text-white hover:bg-slate-800"
                >
                  <ShieldCheck size={17} aria-hidden="true" />
                  Admin Login
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {notice ? (
          <div className="mb-5 flex items-center gap-3 rounded-lg border border-mint/30 bg-mint/10 px-4 py-3 text-sm font-semibold text-teal-900">
            <CheckCircle2 size={18} aria-hidden="true" />
            {notice}
          </div>
        ) : null}

        {loginOpen ? (
          <LoginPanel
            role={loginRole}
            mode={loginMode}
            setMode={setLoginMode}
            form={loginForm}
            setForm={setLoginForm}
            selectRole={selectLoginRole}
            onSubmit={handleLogin}
            onClose={() => setLoginOpen(false)}
          />
        ) : null}

        {activeTab === "studio" ? (
          <StudioView
            apiMode={apiMode}
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
          />
        ) : null}

        {activeTab === "cart" ? (
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
            setActiveTab={setActiveTab}
          />
        ) : null}

        {activeTab === "orders" ? (
          <OrdersView orders={orders} user={user} setUser={setUser} setActiveTab={setActiveTab} />
        ) : null}

        {activeTab === "seller" ? (
          <AdminView
            metrics={metrics}
            products={products}
            orders={adminOrders}
            saveProductPrice={saveProductPrice}
            addProduct={addProduct}
            updateOrderStatus={updateOrderStatus}
          />
        ) : null}
      </main>
    </div>
  );
}

function LoginPanel({ role, mode, setMode, form, setForm, selectRole, onSubmit, onClose }) {
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
          
          <div className="mt-5 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => selectRole("consumer")}
              className={`focus-ring min-h-11 rounded-lg border px-3 text-sm font-black ${
                role === "consumer"
                  ? "border-white bg-white text-ink"
                  : "border-white/20 bg-white/5 text-white"
              }`}
            >
              Consumer
            </button>
            <button
              type="button"
              onClick={() => selectRole("seller")}
              className={`focus-ring min-h-11 rounded-lg border px-3 text-sm font-black ${
                role === "seller"
                  ? "border-white bg-white text-ink"
                  : "border-white/20 bg-white/5 text-white"
              }`}
            >
              Admin
            </button>
          </div>
          
          <div className="mt-6 border-t border-white/10 pt-4">
             <p className="text-xs font-bold text-white/50 uppercase tracking-widest">Auth Mode</p>
             <div className="mt-2 flex gap-4">
                <button 
                  onClick={() => setMode("login")}
                  className={`text-sm font-black ${mode === "login" ? "text-lemon underline underline-offset-4" : "text-white/70 hover:text-white"}`}
                >
                  Sign In
                </button>
                <button 
                  onClick={() => setMode("register")}
                  className={`text-sm font-black ${mode === "register" ? "text-lemon underline underline-offset-4" : "text-white/70 hover:text-white"}`}
                >
                  Create Account
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

function StudioView({ apiMode, products, allProducts, selectedProduct, selectedSlug, setSelectedSlug, customizer, updateCustomizer, handleUpload, addToCart, search, setSearch }) {
  return (
    <div className="space-y-12 animate-fade-in">
      <section className="text-center py-8 px-4">
         <p className="text-[10px] font-black uppercase tracking-[0.3em] text-coral sm:text-xs">Personalization Studio</p>
         <h2 className="mt-4 text-4xl font-black tracking-tighter sm:text-6xl text-ink leading-[1.1]">Design your perfect gift.</h2>
         <p className="mt-6 mx-auto max-w-2xl text-base text-slate-500 font-medium leading-relaxed sm:text-lg">
            Choose a premium blank from our collection and transform it into a meaningful memory using our live 3D preview engine.
         </p>
      </section>

      <section className="grid gap-12 lg:grid-cols-[1fr_420px]">
        <div className="space-y-8">
           <div className="flex flex-col gap-4 border-b border-slate-100 pb-6 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-xl font-black sm:text-2xl">1. Choose a Product</h3>
              <div className="relative w-full sm:w-auto">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                 <input 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search catalog..." 
                    className="h-11 w-full rounded-xl border border-slate-100 bg-white pl-10 pr-4 text-sm font-semibold outline-none focus:border-mint transition-all sm:w-64"
                 />
              </div>
           </div>
           <div className="grid gap-6 sm:grid-cols-2">
             {products.map((product) => (
               <ProductCard
                 key={product.slug}
                 product={product}
                 selected={selectedSlug === product.slug}
                 onSelect={() => setSelectedSlug(product.slug)}
               />
             ))}
           </div>
        </div>

        <div className="space-y-8">
           <h3 className="text-xl font-black sm:text-2xl">2. Customize & Preview</h3>
           <PreviewPanel product={selectedProduct} customizer={customizer} />
           <CustomizerPanel
             selectedProduct={selectedProduct}
             customizer={customizer}
             updateCustomizer={updateCustomizer}
             handleUpload={handleUpload}
             addToCart={addToCart}
           />
        </div>
      </section>
    </div>
  );
}

function CustomizerPanel({
  selectedProduct,
  customizer,
  updateCustomizer,
  handleUpload,
  addToCart
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
      </div>
    </section>
  );
}

function PreviewPanel({ product, customizer }) {
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

function ProductPreview({ product, customizer }) {
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

function ProductCard({ product, selected, onSelect }) {
  return (
    <article 
      onClick={onSelect}
      className={`relative cursor-pointer overflow-hidden rounded-2xl border transition-all duration-500 ${
        selected 
          ? "border-primary bg-white ring-4 ring-primary/5 shadow-xl" 
          : "border-slate-100 bg-white hover:border-slate-200"
      }`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-50">
        <img
          src={product.image}
          alt={product.name}
          className={`h-full w-full object-cover transition-transform duration-700 ${selected ? "scale-105" : "hover:scale-105"}`}
        />
        {selected && (
          <div className="absolute right-3 top-3 grid h-6 w-6 place-items-center rounded-full bg-primary text-white shadow-lg">
             <CheckCircle2 size={14} />
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{product.category}</p>
            <h4 className="mt-1 text-lg font-black tracking-tight text-ink">{product.name}</h4>
          </div>
          <p className="text-base font-black text-ink">{money(product.price)}</p>
        </div>
      </div>
    </article>
  );
}

function CartView({
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

function OrdersView({ orders, user, setUser, setActiveTab }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-soft sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-coral">Consumer tracking</p>
          <h2 className="text-3xl font-black">Your orders</h2>
        </div>
        <label className="flex min-h-11 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3">
          <LogIn size={17} className="text-slate-500" aria-hidden="true" />
          <input
            value={user.email}
            onChange={(event) => setUser({ ...user, email: event.target.value })}
            placeholder="Email for order lookup"
            className="bg-transparent text-sm outline-none"
          />
        </label>
      </div>

      <div className="mt-5 grid gap-4">
        {orders.length === 0 ? (
          <div className="grid min-h-48 place-items-center rounded-lg border border-dashed border-slate-300 text-center">
            <div>
              <Truck className="mx-auto text-slate-400" size={36} aria-hidden="true" />
              <p className="mt-3 font-bold">No orders yet.</p>
              <button
                type="button"
                onClick={() => setActiveTab("studio")}
                className="focus-ring mt-3 rounded-lg bg-coral px-4 py-2 text-sm font-black text-white"
              >
                Create one
              </button>
            </div>
          </div>
        ) : (
          orders.map((order) => <OrderCard key={order.orderNumber} order={order} />)
        )}
      </div>
    </section>
  );
}

function OrderCard({ order }) {
  const currentIndex = Math.max(statusFlow.indexOf(order.status), 0);
  return (
    <article className="glass-card bg-white/50 p-6 animate-fade-in border-slate-100">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-xl font-black tracking-tight text-slate-800">{order.orderNumber}</h3>
          <p className="mt-1 text-sm font-semibold text-slate-500">
            {order.items?.length || 0} item(s) | <span className="text-slate-800">{money(order.totals?.grandTotal || 0)}</span>
          </p>
        </div>
        <span className="inline-flex w-fit items-center gap-2 rounded-xl bg-mint/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-teal-700">
          <PackageCheck size={16} aria-hidden="true" />
          {order.status}
        </span>
      </div>
      
      <div className="mt-8 grid gap-2 sm:grid-cols-6">
        {statusFlow.map((status, index) => (
          <div
            key={status}
            className={`relative min-h-[60px] rounded-xl border p-3 transition-all duration-300 ${
              index <= currentIndex
                ? "border-mint bg-mint/5 text-teal-900 shadow-sm shadow-mint/10"
                : "border-slate-100 bg-white/30 text-slate-400"
            }`}
          >
            <p className="text-[10px] font-black uppercase tracking-tighter">{status}</p>
            {index < currentIndex && (
              <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 z-10 hidden sm:block">
                 <div className="h-3 w-3 rounded-full bg-mint shadow-glow" />
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-6 space-y-3 rounded-2xl bg-slate-50/50 p-4">
        <p className="text-xs font-black uppercase tracking-widest text-slate-400">Live Updates</p>
        {(order.tracking || []).slice(-3).map((entry, index) => (
          <div key={`${entry.label}-${index}`} className="flex gap-3 text-sm">
             <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-coral" />
             <p className="text-slate-600">
               <span className="font-bold text-slate-800">{entry.label}:</span> {entry.note}
             </p>
          </div>
        ))}
      </div>
    </article>
  );
}

function AdminView({ metrics, products, orders, saveProductPrice, addProduct, updateOrderStatus }) {
  const [showAdd, setShowAdd] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "Mugs",
    price: "",
    description: ""
  });

  async function handleAdd(e) {
    e.preventDefault();
    const success = await addProduct(newProduct);
    if (success) {
      setShowAdd(false);
      setNewProduct({ name: "", category: "Mugs", price: "", description: "" });
    }
  }

  return (
    <div className="space-y-12 animate-fade-in pb-20">
      <section className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.3em] text-coral">Administrative</p>
          <h2 className="mt-2 text-4xl font-black tracking-tight text-ink">Dashboard</h2>
        </div>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="focus-ring inline-flex h-12 items-center gap-2 rounded-xl bg-ink px-6 text-sm font-black text-white hover:bg-slate-800 transition-all shadow-lg"
        >
          {showAdd ? <Plus className="rotate-45" size={18} /> : <Plus size={18} />}
          {showAdd ? "Close Panel" : "New Catalog Item"}
        </button>
      </section>

      {showAdd && (
        <section className="rounded-3xl border border-slate-100 bg-white p-8 animate-fade-in shadow-xl shadow-slate-200/50">
          <h2 className="text-xl font-black">Register New Product</h2>
          <form onSubmit={handleAdd} className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <Field
              label="Product Name"
              value={newProduct.name}
              onChange={(v) => setNewProduct({ ...newProduct, name: v })}
            />
            <label className="grid gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Category</span>
              <select
                value={newProduct.category}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                className="focus-ring h-12 rounded-xl border border-slate-100 bg-slate-50 px-4 text-sm font-semibold outline-none"
              >
                <option>Mugs</option>
                <option>T-Shirts</option>
                <option>Phone Covers</option>
                <option>Photo Frames</option>
                <option>Keychains</option>
              </select>
            </label>
            <Field
              label="Base Price (INR)"
              type="number"
              value={newProduct.price}
              onChange={(v) => setNewProduct({ ...newProduct, price: v })}
            />
            <div className="flex items-end">
              <button
                type="submit"
                className="focus-ring h-12 w-full rounded-xl bg-coral text-sm font-black text-white hover:bg-orange-600 shadow-lg shadow-coral/20"
              >
                Publish to Catalog
              </button>
            </div>
          </form>
        </section>
      )}

      <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <AdminMetric icon={Boxes} label="Orders" value={metrics.placed} />
        <AdminMetric icon={BarChart3} label="Revenue" value={money(metrics.revenue)} />
        <AdminMetric icon={CreditCard} label="Avg Value" value={money(metrics.avgOrder)} />
        <AdminMetric icon={Settings} label="System" value={metrics.conversion} />
      </section>

      <section className="grid gap-12 lg:grid-cols-[1fr_420px]">
        <div className="space-y-6">
          <h3 className="text-2xl font-black">Catalog Control</h3>
          <div className="scrollbar-thin max-h-[600px] space-y-4 overflow-auto pr-4">
            {products.map((product) => (
              <div key={product.slug} className="group flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-4 hover:border-primary transition-all">
                <div className="flex items-center gap-4">
                   <img src={product.image} className="w-14 h-14 rounded-xl object-cover" alt="" />
                   <div>
                      <h3 className="font-black text-slate-800">{product.name}</h3>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{product.category}</p>
                   </div>
                </div>
                <div className="flex items-center gap-4">
                   <input
                      type="number"
                      min="1"
                      defaultValue={product.price}
                      onBlur={(event) => saveProductPrice(product.slug, event.target.value)}
                      className="focus-ring h-10 w-20 rounded-xl border border-slate-100 bg-slate-50 px-3 text-sm font-bold text-center"
                   />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-black">Order Queue</h3>
          <div className="scrollbar-thin max-h-[600px] space-y-4 overflow-auto pr-4">
            {orders.length === 0 ? (
              <div className="grid min-h-44 place-items-center rounded-3xl border border-dashed border-slate-200 text-center">
                <p className="font-bold text-slate-300">No active orders.</p>
              </div>
            ) : (
              orders.map((order) => (
                <div key={order.orderNumber} className="rounded-2xl border border-slate-100 bg-white p-5 hover:border-primary transition-all">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-black text-slate-800">{order.orderNumber}</h3>
                        <p className="text-sm font-semibold text-slate-500">
                          {order.customer?.name}
                        </p>
                      </div>
                      <p className="font-black text-ink">{money(order.totals?.grandTotal || 0)}</p>
                    </div>
                    <select
                      value={order.status}
                      onChange={(event) => updateOrderStatus(order.orderNumber, event.target.value)}
                      className="focus-ring h-10 rounded-xl border border-slate-100 bg-slate-50 px-3 text-xs font-black text-slate-600 outline-none"
                    >
                      {statusFlow.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white/80 p-3">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">{label}</p>
      <p className="mt-1 text-xl font-black">{value}</p>
    </div>
  );
}

function AdminMetric({ icon: Icon, label, value }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-soft">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500">{label}</p>
        <span className="grid h-10 w-10 place-items-center rounded-lg bg-mint/12 text-teal-800">
          <Icon size={20} aria-hidden="true" />
        </span>
      </div>
      <p className="mt-4 text-2xl font-black">{value}</p>
    </div>
  );
}
