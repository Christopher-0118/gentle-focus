import type { CreateEventResponse, EventConfirmation } from '@/types/chat.types';

export const formatEventConfirmation = (
  event: CreateEventResponse['createdEvent'],
): EventConfirmation => {
  const confirmation: EventConfirmation = { title: event.summary?.trim() || 'Событие' };

  if (!event.start?.dateTime || !event.end?.dateTime) return confirmation;

  const start = new Date(event.start.dateTime);
  const end = new Date(event.end.dateTime);
  if (!Number.isFinite(start.getTime()) || !Number.isFinite(end.getTime()) || end < start) {
    return confirmation;
  }

  const timeZone = event.start.timeZone || event.end.timeZone || 'Europe/Warsaw';

  try {
    const dateFormat = new Intl.DateTimeFormat('ru-RU', {
      timeZone,
      day: 'numeric',
      month: 'long',
      ...(start.getFullYear() !== new Date().getFullYear() ||
      end.getFullYear() !== new Date().getFullYear()
        ? { year: 'numeric' as const }
        : {}),
    });
    const timeFormat = new Intl.DateTimeFormat('ru-RU', {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    });
    const startDate = dateFormat.format(start);
    const endDate = dateFormat.format(end);
    const startTime = timeFormat.format(start);
    const endTime = timeFormat.format(end);
    const schedule =
      startDate === endDate
        ? `${startDate} · ${startTime}–${endTime}`
        : `${startDate}, ${startTime} — ${endDate}, ${endTime}`;

    return { ...confirmation, schedule };
  } catch (error) {
    // Invalid calendar time zones must not hide a successful creation confirmation.
    if (error instanceof RangeError) return confirmation;
    throw error;
  }
};
