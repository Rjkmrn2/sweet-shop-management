import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import projectsRouter from './routes/projects.js';
import authRouter from './routes/auth.js';
import dotenv from 'dotenv';
import sweetsRouter from "./routes/sweets.js";



dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());



app.use('/api/auth', authRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/sweets', sweetsRouter);

const PORT = process.env.PORT;

mongoose.connect(process.env.MONGO_URI)
.then(()=> app.listen(PORT, ()=> console.log('Server running on', PORT)))
.catch(err => console.error(err));