import express from 'express';
import cors from 'cors';
import authRoutes from './auth/auth.routes';
import { env } from './config/env';

const app = express();

app.use(
  cors({
    origin: env.clientUrl,
    credentials: true,
  }),
);

app.get('/', (_, res) => {
  res.json({ status: 'ok', service: 'gentle-focus-api' });
});

app.use('/auth', authRoutes);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
