import { google } from 'googleapis';
import { getCurrentTokens } from '../auth/auth.store';
import { oauth2Client } from '../config/google';
import type { EventData } from './calendar.types';

export const createCalendarEvent = async (eventData: EventData) => {
  const tokens = getCurrentTokens();

  if (!tokens) {
    throw new Error('Not authenticated. Open /auth/google first.');
  }

  oauth2Client.setCredentials(tokens);

  const calendar = google.calendar({
    version: 'v3',
    auth: oauth2Client,
  });

  const { data } = await calendar.events.insert({
    calendarId: 'primary',
    requestBody: {
      summary: eventData.title,
      description: eventData.description ?? undefined,
      location: eventData.location ?? undefined,
      start: {
        dateTime: eventData.start,
        timeZone: 'Europe/Warsaw',
      },
      end: {
        dateTime: eventData.end,
        timeZone: 'Europe/Warsaw',
      },
    },
  });

  return {
    message: 'Event created',
    id: data.id,
    summary: data.summary,
    htmlLink: data.htmlLink,
  };
};
