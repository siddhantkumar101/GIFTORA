import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { mongoReady, memoryStore } from "../config/db.js";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";

const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: "7d" });
};

export const register = async (req, res) => {
  const { name, email, password, phone, role = "consumer" } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email, and password are required" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  if (mongoReady) {
    try {
      const existing = await User.findOne({ email });
      if (existing) return res.status(409).json({ message: "Email already registered" });
      
      const user = await User.create({ 
        name, 
        email, 
        password: hashedPassword, 
        phone, 
        role 
      });

      const token = generateToken(user._id);
      res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        secure: true, // Always true for production/cross-site
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      });

      return res.status(201).json({ 
        id: user._id, 
        role: user.role, 
        name: user.name, 
        email: user.email, 
        phone: user.phone 
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // In-memory fallback
  const existing = memoryStore.users.find((user) => user.email === email);
  if (existing) return res.status(409).json({ message: "Email already registered" });
  
  const user = { id: `usr-${Date.now()}`, role, name, email, password: hashedPassword, phone };
  memoryStore.users.push(user);
  
  const token = generateToken(user.id);
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  res.status(201).json({ id: user.id, role: user.role, name: user.name, email: user.email, phone: user.phone });
};

export const login = async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  let user;
  if (mongoReady) {
    user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } else {
    user = memoryStore.users.find((u) => u.email === email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  }

  if (role && user.role !== role) {
    return res.status(403).json({ message: `Access denied. Account is registered as ${user.role}.` });
  }

  const token = generateToken(user._id || user.id);
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  res.json({ 
    id: user._id || user.id, 
    role: user.role, 
    name: user.name, 
    email: user.email, 
    phone: user.phone 
  });
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0)
  });
  res.status(200).json({ message: "Logged out successfully" });
};

export const getMe = async (req, res) => {
  // This will be used by the frontend to verify session on refresh
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    let user;
    if (mongoReady) {
      user = await User.findById(decoded.id);
    } else {
      user = memoryStore.users.find(u => u.id === decoded.id);
    }

    if (!user) return res.status(401).json({ message: "User not found" });

    res.json({ 
      id: user._id || user.id, 
      role: user.role, 
      name: user.name, 
      email: user.email, 
      phone: user.phone 
    });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
