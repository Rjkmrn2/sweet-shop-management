import express from "express";
import Sweet from "../models/Sweet.js";

const router = express.Router();

/* -----------------------------------------
   CREATE SWEET
----------------------------------------- */
router.post("/", async (req, res) => {
  try {
    const sweet = await Sweet.create(req.body);
    res.status(201).json(sweet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/* -----------------------------------------
   GET ALL SWEETS
----------------------------------------- */
router.get("/", async (req, res) => {
  try {
    const sweets = await Sweet.find().sort({ createdAt: -1 });
    res.json(sweets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* -----------------------------------------
   GET ONE SWEET
----------------------------------------- */
router.get("/:id", async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) return res.status(404).json({ message: "Sweet not found" });

    res.json(sweet);
  } catch (err) {
    res.status(400).json({ message: "Invalid ID" });
  }
});

/* -----------------------------------------
   UPDATE SWEET
----------------------------------------- */
router.put("/:id", async (req, res) => {
  try {
    const updated = await Sweet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updated) return res.status(404).json({ message: "Sweet not found" });

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Invalid ID" });
  }
});

/* -----------------------------------------
   DELETE SWEET
----------------------------------------- */
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Sweet.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Sweet not found" });

    res.json({ message: "Sweet removed successfully" });
  } catch (err) {
    res.status(400).json({ message: "Invalid ID" });
  }
});

/* -----------------------------------------
   PURCHASE SWEET (INCREASE SOLD COUNT)
----------------------------------------- */
router.post("/purchase/:id", async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) return res.status(404).json({ message: "Sweet not found" });

    sweet.sold = (sweet.sold || 0) + 1;
    await sweet.save();

    res.json({ message: "Purchase successful", sweet });
  } catch (err) {
    res.status(400).json({ message: "Invalid ID" });
  }
});

export default router;
