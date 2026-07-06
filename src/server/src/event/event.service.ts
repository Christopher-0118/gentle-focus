import { parseEventFromPrompt } from '../ai/ai.service';
import { createCalendarEvent } from '../calendar/calendar.service';

export const createEventFromPrompt = async (prompt: string) => {
  const eventData = await parseEventFromPrompt(prompt);
  const createdEvent = await createCalendarEvent(eventData);

  return {
    parsedEvent: eventData,
    createdEvent,
  };
};
