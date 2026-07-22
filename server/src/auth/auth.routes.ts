import { Router } from 'express';
import { oauth2Client } from '../config/google';
import { google } from 'googleapis';
import { clearAuth, getCurrentUser, setCurrentTokens, setCurrentUser } from './auth.store';
import { env } from '../config/env';

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
  if (!data.id || !data.email || !data.name || !data.picture) {
    return res.status(400).send('Missing user information');
  }
  setCurrentUser({
    id: data.id,
    email: data.email,
    name: data.name,
    picture: data.picture,
  });

  console.log(data);

  res.redirect(env.clientUrl);
});

authRoutes.get('/me', (_, res) => {
  const user = getCurrentUser();

  if (!user) {
    return res.json({
      authenticated: false,
      user: null,
    });
  }

  res.json({
    authenticated: true,
    user,
  });
});

authRoutes.post('/logout', (_, res) => {
  clearAuth();

  res.json({
    message: 'Logged out',
  });
});

export default authRoutes;
