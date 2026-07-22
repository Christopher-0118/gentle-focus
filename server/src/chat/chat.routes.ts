import { Router } from 'express';
import { createEventFromPrompt } from '../event/event.service';

const router = Router();

router.post('/create-event', async (req, res) => {
  const { prompt } = req.body;

  if (typeof prompt !== 'string' || !prompt.trim()) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const result = await createEventFromPrompt(prompt);
    res.json(result);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({
      error: 'Failed to create event',
    });
  }
});

export default router;
