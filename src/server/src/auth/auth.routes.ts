import { Router } from 'express';
import { oauth2Client } from '../config/google';
import { google } from 'googleapis';
import { setCurrentTokens } from './auth.store';

const authRoutes = Router();

authRoutes.get('/google', (_, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['openid', 'profile', 'email', 'https://www.googleapis.com/auth/calendar'],
  });

  res.redirect(url);
});

authRoutes.get('/google/callback', async (req, res) => {
  const code = req.query.code as string;

  if (!code) {
    return res.status(400).send('Missing authorization code');
  }

  const { tokens } = await oauth2Client.getToken(code);

  oauth2Client.setCredentials(tokens);
  setCurrentTokens(tokens);
  const oauth2 = google.oauth2({
    auth: oauth2Client,
    version: 'v2',
  });

  const { data } = await oauth2.userinfo.get();

  console.log(data);

  res.json(data);
});

export default authRoutes;
