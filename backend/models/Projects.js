import mongoose from 'mongoose';
const ProjectSchema = new mongoose.Schema({
title: String,
description: String,
tech: [String],
repo: String,
live: String,
createdAt: { type: Date, default: Date.now }
});
export default mongoose.model('Project', ProjectSchema);