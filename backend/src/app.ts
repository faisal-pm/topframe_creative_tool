// backend/src/app.ts

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

// Correctly import the named router
import { authRouter } from './routes/auth';
// const creativeRoutes = require('./routes/creatives'); // keep this commented for now

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/auth', authRouter); // This now uses the named import
// app.use('/api/creatives', creativeRoutes);

// ... (rest of the file is the same) ...

export default app;