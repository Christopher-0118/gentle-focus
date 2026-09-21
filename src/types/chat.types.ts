export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  eventLink?: string;
  event?: EventConfirmation;
};

export type CreateEventResponse = {
  createdEvent: {
    message: string;
    summary?: string | null;
    htmlLink?: string | null;
    start?: EventDateTime | null;
    end?: EventDateTime | null;
  };
};

type EventDateTime = {
  dateTime?: string | null;
  timeZone?: string | null;
};

export type EventConfirmation = {
  title: string;
  schedule?: string;
};
