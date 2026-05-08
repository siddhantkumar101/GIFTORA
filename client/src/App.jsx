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
  Search,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
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
    description: "Premium tabletop frame with printed photo insert and message strip.",
    leadTime: "4 days",
    rating: 4.9,
    orders: 620,
    material: "Engineered wood",
    colors: ["#111827", "#ffffff", "#92400e", "#0f766e"],
    customizationAreas: ["photo", "caption"],
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
  { id: "seller", label: "Seller", icon: Store, role: "seller" }
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
  const response = await fetch(`/api${path}`, {
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
    const base = demoAccounts[loginRole];
    const loginPayload = {
      role: loginRole,
      name: loginForm.name || base.name,
      email: loginForm.email || base.email,
      phone: loginForm.phone || base.phone
    };
    let nextSession = {
      id: `${loginRole}-${Date.now()}`,
      ...loginPayload
    };

    try {
      const savedUser = await api("/auth/demo", {
        method: "POST",
        body: JSON.stringify(loginPayload)
      });
      nextSession = {
        id: savedUser.id || nextSession.id,
        role: savedUser.role || loginRole,
        name: savedUser.name,
        email: savedUser.email,
        phone: savedUser.phone || ""
      };
    } catch {
      setNotice("API login unavailable, using local demo session.");
    }

    setSession(nextSession);
    setLoginOpen(false);
    setNotice(
      loginRole === "seller"
        ? "Seller logged in. Dashboard unlocked."
        : "Consumer logged in. Cart and order tracking unlocked."
    );

    if (loginRole === "seller") {
      setActiveTab("seller");
      return;
    }

    setUser({
      name: nextSession.name,
      email: nextSession.email,
      phone: nextSession.phone
    });
    setActiveTab("studio");
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

          <nav className="flex flex-wrap gap-2" aria-label="Giftora sections">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const selected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTabClick(tab)}
                  className={`focus-ring inline-flex min-h-10 items-center gap-2 rounded-lg border px-3 text-sm font-bold transition ${
                    selected
                      ? "border-ink bg-ink text-white"
                      : "border-slate-200 bg-white text-slate-700 hover:border-mint"
                  }`}
                >
                  <Icon size={17} aria-hidden="true" />
                  {tab.label}
                  {tab.id === "cart" && cart.length > 0 ? (
                    <span className="rounded-full bg-coral px-2 py-0.5 text-xs text-white">
                      {cart.length}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>

          <div className="flex flex-wrap items-center gap-2">
            {session ? (
              <>
                <span className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-mint/35 bg-mint/10 px-3 text-sm font-black text-teal-900">
                  {session.role === "seller" ? <Store size={16} aria-hidden="true" /> : <User size={16} aria-hidden="true" />}
                  {session.role === "seller" ? "Seller" : "Consumer"}: {session.name}
                </span>
                <button
                  type="button"
                  onClick={logout}
                  className="focus-ring inline-flex min-h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-bold text-slate-700 hover:border-coral hover:text-coral"
                >
                  <LogOut size={17} aria-hidden="true" />
                  Logout
                </button>
              </>
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
                  className="focus-ring inline-flex min-h-10 items-center gap-2 rounded-lg bg-ink px-3 text-sm font-bold text-white hover:bg-slate-800"
                >
                  <Store size={17} aria-hidden="true" />
                  Seller login
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
            updateOrderStatus={updateOrderStatus}
          />
        ) : null}
      </main>
    </div>
  );
}

function LoginPanel({ role, form, setForm, selectRole, onSubmit, onClose }) {
  const roleCopy =
    role === "seller"
      ? {
          title: "Seller login",
          subtitle: "Manage products, prices, customer orders, and order status.",
          icon: Store
        }
      : {
          title: "Consumer login",
          subtitle: "Customize gifts, checkout, save delivery details, and track orders.",
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
            Role based access
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
              Seller
            </button>
          </div>
        </div>

        <form onSubmit={onSubmit} className="grid gap-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field
              label="Name"
              value={form.name}
              onChange={(value) => setForm({ ...form, name: value })}
            />
            <Field
              label="Email"
              type="email"
              value={form.email}
              onChange={(value) => setForm({ ...form, email: value })}
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field
              label="Phone"
              value={form.phone}
              onChange={(value) => setForm({ ...form, phone: value })}
            />
            <Field
              label="Password"
              type="password"
              value={form.password}
              onChange={(value) => setForm({ ...form, password: value })}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="submit"
              className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-lg bg-coral px-4 text-sm font-black text-white hover:bg-[#df4937]"
            >
              <LogIn size={17} aria-hidden="true" />
              Login as {role === "seller" ? "seller" : "consumer"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="focus-ring min-h-11 rounded-lg border border-slate-200 px-4 text-sm font-bold text-slate-700 hover:border-mint"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function StudioView({
  apiMode,
  products,
  allProducts,
  selectedProduct,
  selectedSlug,
  setSelectedSlug,
  customizer,
  updateCustomizer,
  handleUpload,
  addToCart,
  search,
  setSearch
}) {
  return (
    <div className="space-y-6">
      <section className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft">
          <div className="grid min-h-[320px] gap-0 md:grid-cols-[1.08fr_0.92fr]">
            <div className="flex flex-col justify-between p-5 sm:p-7">
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 rounded-lg border border-mint/35 bg-mint/10 px-3 py-2 text-sm font-bold text-teal-900">
                  <ShieldCheck size={17} aria-hidden="true" />
                  MERN demo: {apiMode === "api" ? "API connected" : apiMode === "demo" ? "local fallback" : "connecting"}
                </div>
                <div>
                  <h2 className="max-w-xl text-4xl font-black leading-[1.02] text-ink sm:text-5xl">
                    Custom gifts made in one live studio.
                  </h2>
                  <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
                    Select a product, upload an image, style your text, preview it live, and move straight to checkout.
                  </p>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3 text-sm">
                <Metric label="Products" value={allProducts.length} />
                <Metric label="Lead time" value="2-4d" />
                <Metric label="Demo pay" value="On" />
              </div>
            </div>
            <div className="relative min-h-[280px] bg-slate-100">
              <img
                src="/images/giftora-product-studio.png"
                alt="Personalized mugs, t-shirts, phone covers, and frames"
                className="h-full min-h-[280px] w-full object-cover"
              />
            </div>
          </div>
        </div>

        <CustomizerPanel
          selectedProduct={selectedProduct}
          customizer={customizer}
          updateCustomizer={updateCustomizer}
          handleUpload={handleUpload}
          addToCart={addToCart}
        />
      </section>

      <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-soft sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-coral">Catalog</p>
              <h3 className="text-2xl font-black">Customizable products</h3>
            </div>
            <label className="focus-within:ring-mint/35 flex min-h-11 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 ring-0 transition focus-within:ring-4">
              <Search size={18} className="text-slate-500" aria-hidden="true" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search gifts"
                className="w-full bg-transparent text-sm outline-none"
              />
            </label>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
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

        <PreviewPanel product={selectedProduct} customizer={customizer} />
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
    "gallery-frame": "mockup-frame"
  }[product.slug];

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
        ) : (
          <div className="grid h-full w-full place-items-center bg-slate-100 text-center text-sm font-bold text-slate-500">
            <span className="inline-flex flex-col items-center gap-2 px-4">
              <ImageIcon size={24} aria-hidden="true" />
              Upload Image
            </span>
          </div>
        )}
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
    <button
      type="button"
      onClick={onSelect}
      className={`focus-ring rounded-lg border p-4 text-left transition ${
        selected
          ? "border-ink bg-ink text-white"
          : "border-slate-200 bg-white hover:border-mint hover:shadow-soft"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className={`text-xs font-bold uppercase tracking-[0.18em] ${selected ? "text-lemon" : "text-coral"}`}>
            {product.category}
          </p>
          <h4 className="mt-1 text-lg font-black leading-tight">{product.name}</h4>
        </div>
        <span className={`rounded-lg px-2 py-1 text-sm font-black ${selected ? "bg-white text-ink" : "bg-lemon/25 text-ink"}`}>
          {money(product.price)}
        </span>
      </div>
      <p className={`mt-3 text-sm leading-6 ${selected ? "text-white/75" : "text-slate-600"}`}>
        {product.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold">
        <span className={`rounded-md px-2 py-1 ${selected ? "bg-white/10" : "bg-slate-100"}`}>
          {product.material}
        </span>
        <span className={`rounded-md px-2 py-1 ${selected ? "bg-white/10" : "bg-slate-100"}`}>
          {product.rating} rating
        </span>
      </div>
    </button>
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
    <article className="rounded-lg border border-slate-200 bg-slate-50 p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-lg font-black">{order.orderNumber}</h3>
          <p className="mt-1 text-sm text-slate-600">
            {order.items?.length || 0} item(s) | {money(order.totals?.grandTotal || 0)}
          </p>
        </div>
        <span className="inline-flex w-fit items-center gap-2 rounded-lg bg-mint/15 px-3 py-2 text-sm font-black text-teal-900">
          <PackageCheck size={16} aria-hidden="true" />
          {order.status}
        </span>
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-6">
        {statusFlow.map((status, index) => (
          <div
            key={status}
            className={`min-h-14 rounded-lg border px-2 py-2 text-xs font-bold ${
              index <= currentIndex
                ? "border-mint bg-mint/10 text-teal-900"
                : "border-slate-200 bg-white text-slate-500"
            }`}
          >
            {status}
          </div>
        ))}
      </div>
      <div className="mt-4 grid gap-2 text-sm text-slate-600">
        {(order.tracking || []).slice(-3).map((entry, index) => (
          <p key={`${entry.label}-${index}`}>
            <span className="font-bold text-slate-800">{entry.label}:</span> {entry.note}
          </p>
        ))}
      </div>
    </article>
  );
}

function AdminView({ metrics, products, orders, saveProductPrice, updateOrderStatus }) {
  return (
    <div className="space-y-5">
      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-soft sm:p-5">
        <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-coral">
          <Store size={16} aria-hidden="true" />
          Seller portal
        </p>
        <h2 className="mt-2 text-3xl font-black">Seller dashboard</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
          Product pricing, catalog status, customer orders, fulfillment tracking, and sales analytics are locked to seller login.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminMetric icon={Boxes} label="Orders" value={metrics.placed} />
        <AdminMetric icon={BarChart3} label="Revenue" value={money(metrics.revenue)} />
        <AdminMetric icon={CreditCard} label="Avg. order" value={money(metrics.avgOrder)} />
        <AdminMetric icon={Settings} label="Preview state" value={metrics.conversion} />
      </section>

      <section className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-soft sm:p-5">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-coral">Products</p>
          <h2 className="text-3xl font-black">Catalog management</h2>
          <div className="mt-5 space-y-3">
            {products.map((product) => (
              <div key={product.slug} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-black">{product.name}</h3>
                    <p className="text-sm text-slate-600">{product.category}</p>
                  </div>
                  <label className="grid gap-1">
                    <span className="text-xs font-bold uppercase text-slate-500">Price</span>
                    <input
                      type="number"
                      min="1"
                      defaultValue={product.price}
                      onBlur={(event) => saveProductPrice(product.slug, event.target.value)}
                      className="focus-ring h-10 w-28 rounded-lg border border-slate-200 bg-white px-3 text-sm"
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-soft sm:p-5">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-coral">Orders</p>
          <h2 className="text-3xl font-black">Order management</h2>
          <div className="scrollbar-thin mt-5 max-h-[560px] space-y-3 overflow-auto pr-1">
            {orders.length === 0 ? (
              <div className="grid min-h-44 place-items-center rounded-lg border border-dashed border-slate-300 text-center">
                <p className="font-bold text-slate-600">No customer orders yet.</p>
              </div>
            ) : (
              orders.map((order) => (
                <div key={order.orderNumber} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="font-black">{order.orderNumber}</h3>
                      <p className="text-sm text-slate-600">
                        {order.customer?.name} | {money(order.totals?.grandTotal || 0)}
                      </p>
                    </div>
                    <select
                      value={order.status}
                      onChange={(event) => updateOrderStatus(order.orderNumber, event.target.value)}
                      className="focus-ring min-h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm font-bold"
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
