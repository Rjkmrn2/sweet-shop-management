import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

// SIGNUP
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "User already exists" });

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({ name, email, password: hashed });

  res.json({ message: "Signup successful", user });
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid email" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ message: "Invalid password" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });

  res.json({ message: "Login successful", token, user });
});

// PROTECTED ROUTE (example)
router.get("/me", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    res.json(user);
  } catch (e) {
    res.status(401).json({ message: "Invalid token" });
  }
});

export default router;
