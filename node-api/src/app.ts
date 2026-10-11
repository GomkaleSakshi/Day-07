
import cors from 'cors';
import express from 'express';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFound.js';
import employeeRoutes from './routes/employeeRoutes.js';

const app = express();

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://127.0.0.1:3000',
      'http://localhost:3001',
      'http://127.0.0.1:3001',
    ],
    credentials: true,
  }),
);

app.use(express.json());

app.get('/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running.',
  });
});

app.use('/api/employees', employeeRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;