import Order from "../models/Order.js";
import { mongoReady, memoryStore } from "../config/db.js";
import { statusFlow } from "../data/seedData.js";

function cleanOrder(order) {
  const raw = order.toObject ? order.toObject() : order;
  return {
    orderNumber: raw.orderNumber || raw._id?.toString() || "ORD-LEGACY",
    customer: raw.customer,
    address: raw.address,
    items: raw.items,
    totals: raw.totals,
    payment: raw.payment,
    status: raw.status,
    tracking: raw.tracking,
    createdAt: raw.createdAt || new Date().toISOString()
  };
}

function makeOrderNumber() {
  return `GFT-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 900 + 100)}`;
}

export const getOrders = async (req, res) => {
  const email = req.query.email?.toString();

  if (mongoReady) {
    const query = email ? { "customer.email": email } : {};
    const orders = await Order.find(query).sort({ createdAt: -1 });
    return res.json(orders.map(cleanOrder));
  }

  const orders = email
    ? memoryStore.orders.filter((order) => order.customer.email === email)
    : memoryStore.orders;
  res.json(orders.map(cleanOrder));
};

export const createOrder = async (req, res) => {
  const { customer, address, items, totals, payment } = req.body;
  if (!customer?.name || !customer?.email || !address?.line1 || !items?.length) {
    return res.status(400).json({ message: "Customer, address, and cart items are required" });
  }

  const order = {
    orderNumber: makeOrderNumber(),
    customer,
    address,
    items,
    totals,
    payment: {
      method: payment?.method || "Giftora Secure Demo Pay",
      status: "Paid in demo mode",
      transactionId: `TXN-${Date.now()}`
    },
    status: "Design approval",
    tracking: [
      {
        label: "Order confirmed",
        at: new Date(),
        note: "Custom design received by Giftora Studio."
      }
    ],
    createdAt: new Date().toISOString()
  };

  if (mongoReady) {
    const created = await Order.create(order);
    return res.status(201).json(cleanOrder(created));
  }

  memoryStore.orders.unshift(order);
  res.status(201).json(cleanOrder(order));
};

export const updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  if (!statusFlow.includes(status)) {
    return res.status(400).json({ message: "Unsupported order status" });
  }

  const trackingEntry = {
    label: status,
    at: new Date(),
    note: `Order moved to ${status}.`
  };

  if (mongoReady) {
    const order = await Order.findOneAndUpdate(
      { orderNumber: req.params.orderNumber },
      { status, $push: { tracking: trackingEntry } },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: "Order not found" });
    return res.json(cleanOrder(order));
  }

  const order = memoryStore.orders.find((item) => item.orderNumber === req.params.orderNumber);
  if (!order) return res.status(404).json({ message: "Order not found" });
  order.status = status;
  order.tracking.push(trackingEntry);
  res.json(cleanOrder(order));
};
