import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import ingestRouter from './routes/ingest.js';
import chatRouter from './routes/chat.js';

const app = express();

// Basic middleware
app.use(cors({ origin: '*', methods: ['GET', 'POST', 'OPTIONS'] }));
app.use(express.json({ limit: '2mb' }));

// Health
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'cmp-library-merns-ai', time: new Date().toISOString() });
});

// Routes
app.use('/api/ingest', ingestRouter);
app.use('/api/chat', chatRouter);

const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI || '';

async function start() {
  if (!MONGODB_URI) {
    // Start server anyway to allow healthcheck and to surface clear error
    console.warn('Warning: MONGODB_URI not set. Server will run but DB operations will fail.');
  } else {
    try {
      await mongoose.connect(MONGODB_URI, {
        dbName: process.env.MONGODB_DB || 'cmp_library_ai',
      });
      console.log('Connected to MongoDB');
    } catch (err) {
      console.error('MongoDB connection error:', err.message);
    }
  }

  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  console.error('Fatal startup error:', err);
  process.exit(1);
});


