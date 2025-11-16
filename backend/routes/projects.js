import express from 'express';
import Project from '../models/Projects.js';
const router = express.Router();


// public: list
router.get('/', async (req,res)=>{
const items = await Project.find().sort({createdAt:-1});
res.json(items);
});


// create (demo - no auth required for simplicity)
router.post('/', async (req,res)=>{
const p = new Project(req.body);
await p.save();
res.status(201).json(p);
});


// other CRUD omitted for brevity
export default router;