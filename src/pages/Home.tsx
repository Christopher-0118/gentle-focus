import { useRef, useState } from 'react';
import AppHeader from '@/components/AppHeader';
import ChatMain from '@/components/ChatMain';
import Form from '@/components/Form';
import { submitForm } from '@/services/form.service';
import type { ChatMessage } from '@/types/chat';

import styles from './Home.module.scss';

export function HomePage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const requestInFlight = useRef(false);

  const handleSend = async (prompt: string) => {
    const text = prompt.trim();
    if (!text || requestInFlight.current) return;

    requestInFlight.current = true;
    setIsSubmitting(true);
    const userMessage: ChatMessage = { id: crypto.randomUUID(), role: 'user', text };
    setMessages((previous) => [...previous, userMessage]);

    try {
      const { createdEvent } = await submitForm(text);
      const reply: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        text: createdEvent.summary
          ? `Событие «${createdEvent.summary}» создано.`
          : 'Событие создано.',
        eventLink: createdEvent.htmlLink ?? undefined,
      };
      setMessages((previous) => [...previous, reply]);
    } catch {
      const reply: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        text: 'Не удалось получить подтверждение создания события. Проверьте календарь перед повторной отправкой.',
      };
      setMessages((previous) => [...previous, reply]);
    } finally {
      requestInFlight.current = false;
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <section className={styles.app} aria-label="Gentle Focus chat">
        <AppHeader />
        <ChatMain messages={messages} isSubmitting={isSubmitting} />
        <Form text="Отправить" onSend={handleSend} isSubmitting={isSubmitting} />
      </section>
    </div>
  );
}
