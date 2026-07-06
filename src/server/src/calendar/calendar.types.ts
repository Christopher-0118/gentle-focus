export type EventData = {
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
};
