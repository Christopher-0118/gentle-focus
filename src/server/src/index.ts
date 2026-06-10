import express from 'express';
import cors from 'cors';
import authRoutes from './auth/auth.routes';
import calendarRoutes from './calendar/calendar.routes';
import { env } from './config/env';
import chatRoutes from './chat/chat.routes';

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
app.use('/calendar', calendarRoutes);
app.use('/chat', chatRoutes);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
