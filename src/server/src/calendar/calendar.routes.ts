import { Router } from 'express';
import { google } from 'googleapis';

import { oauth2Client } from '../config/google';
import { getCurrentTokens } from '../auth/auth.store';

const router = Router();

router.get('/test', async (_, res) => {
  const tokens = getCurrentTokens();

  if (!tokens) {
    return res.status(401).send('Not authenticated. Open /auth/google first.');
  }

  oauth2Client.setCredentials(tokens);

  const calendar = google.calendar({
    version: 'v3',
    auth: oauth2Client,
  });

  const start = new Date(Date.now() + 60 * 60 * 1000);
  const end = new Date(Date.now() + 2 * 60 * 60 * 1000);

  const { data } = await calendar.events.insert({
    calendarId: 'primary',
    requestBody: {
      summary: 'Gentle Focus Test Event',
      description: 'Created from Gentle Focus backend.',
      start: {
        dateTime: start.toISOString(),
        timeZone: 'Europe/Warsaw',
      },
      end: {
        dateTime: end.toISOString(),
        timeZone: 'Europe/Warsaw',
      },
    },
  });

  res.json({
    message: 'Event created',
    id: data.id,
    summary: data.summary,
    htmlLink: data.htmlLink,
  });
});

export default router;
