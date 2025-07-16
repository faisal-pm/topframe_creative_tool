// backend/src/server.ts

import dotenv from 'dotenv';
dotenv.config(); // Load environment variables FIRST

import app from './app';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});
