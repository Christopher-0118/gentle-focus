import { useEffect, useRef } from 'react';
import type { ChatMessage } from '@/types/chat';
import styles from './ChatMain.module.scss';

type ChatMainProps = {
  messages: ChatMessage[];
  isSubmitting: boolean;
};

const ChatMain = ({ messages, isSubmitting }: ChatMainProps) => {
  const listRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [messages, isSubmitting]);

  return (
    <main className={styles.main}>
      <p className={styles.historyHint}>История чата хранится до обновления страницы.</p>
      <section ref={listRef} className={styles.messages} role="log" aria-label="Переписка">
        {messages.map((message) => (
          <article
            key={message.id}
            aria-label={message.role === 'user' ? 'Вы' : 'Gentle Focus'}
            className={`${styles.message} ${
              message.role === 'user' ? styles.messageUser : styles.messageAssistant
            }`}
          >
            <p className={styles.messageText}>{message.text}</p>
            {message.eventLink?.startsWith('https://') && (
              <a
                className={styles.eventLink}
                href={message.eventLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Открыть в календаре ↗
              </a>
            )}
          </article>
        ))}
        {isSubmitting && (
          <p className={styles.pending} role="status">
            Обрабатываю запрос…
          </p>
        )}
      </section>
    </main>
  );
};

export default ChatMain;
