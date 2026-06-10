import { Router } from 'express';
import { openai } from '../config/openai';

const router = Router();

router.get('/test', async (_, res) => {
  const response = await openai.responses.create({
    model: 'gpt-5',
    input: `
      Extract event information from the user request.
      Return ONLY valid JSON.
      User request:
      Создай встречу с врачом 15 июня в 10 утра.`,
  });
  const eventData = JSON.parse(response.output_text);
  res.json(eventData);
});

export default router;
