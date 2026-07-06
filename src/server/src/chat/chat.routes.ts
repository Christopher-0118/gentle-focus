import { Router } from 'express';
import { createEventFromPrompt } from '../event/event.service';

const router = Router();

router.get('/test', async (_, res) => {
  const prompt = 'Создай встречу сегодня в 15:00 с Аней на час anna.hr@gmail.com';
  /*
   * Создай встречу завтра в 15:00 с Аней на час
   * Создай др друга в эту пятницу на весь день. Будем отмечать на Висле.
   * Создай созвон с командой завтра в 14:30 на 45 минут.
   * Создай встречу с врачом 15 июня в 10 утра.
   */

  const result = await createEventFromPrompt(prompt);

  res.json(result);
});

export default router;
