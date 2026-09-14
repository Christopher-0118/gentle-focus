export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  eventLink?: string;
};

export type CreateEventResponse = {
  createdEvent: {
    message: string;
    summary?: string | null;
    htmlLink?: string | null;
  };
};
