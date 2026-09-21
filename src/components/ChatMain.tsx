import { useEffect, useRef } from 'react';
import type { ChatMessage } from '@/types/chat.types';
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
            className={`${styles.message} ${message.event ? styles['event-card'] : ''} ${
              message.role === 'user' ? styles.messageUser : styles.messageAssistant
            }`}
          >
            {message.event ? (
              <div className={styles['event-header']}>
                <span className={styles['event-icon']} aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M13 21H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7M7 2v4M17 2v4M3 10h18M16 19l2 2 4-4" />
                  </svg>
                </span>
                <div className={styles['event-details']}>
                  <p className={styles['event-title']}>{message.event.title}</p>
                  {message.event.schedule && (
                    <p className={styles['event-schedule']}>{message.event.schedule}</p>
                  )}
                </div>
              </div>
            ) : (
              <p className={styles.messageText}>{message.text}</p>
            )}
            {message.eventLink?.startsWith('https://') && (
              <a
                className={styles.eventLink}
                href={message.eventLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Открыть в календаре
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
