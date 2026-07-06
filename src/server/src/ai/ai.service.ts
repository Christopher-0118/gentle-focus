import { EventData } from '../calendar/calendar.types';
import { openai } from '../config/openai';

export const parseEventFromPrompt = async (prompt: string): Promise<EventData> => {
  const response = await openai.responses.create({
    model: 'gpt-5',
    input: `
      Extract event information from the user request.
      Return ONLY valid JSON.
      Use EXACTLY this schema:
      {
        title: string;
        all_day: boolean;
        start: string;
        end: string;
        location: string | null;
        description: string | null;
        attendees: {
          name?: string;
          email: string;
        }[];
      }

      User request:
      ${prompt} 
    `,
  });
  return JSON.parse(response.output_text) as EventData;
};
