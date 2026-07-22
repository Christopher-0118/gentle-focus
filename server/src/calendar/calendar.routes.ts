import { Router } from 'express';

const router = Router();

// router.get('/test', async (_, res) => {
//   // const { prompt } = req.body;
//   try {
//     const event = await createCalendarEvent();

//     res.json(event);
//   } catch (error) {
//     if ( error instanceof Error && error.message === 'Not authenticated') {
//       return res.status(401).send('Not authenticated. Open /auth/google first.');
//     }

//     console.error(error);
//     res.status(500).send('Failed to create test event');
//   }

// });

export default router;
