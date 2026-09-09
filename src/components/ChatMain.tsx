import styles from './ChatMain.module.scss';

const ChatMain = () => {
  return (
    <main className={styles.main}>
      <section className={styles.messages} aria-label="Conversation" aria-live="polite" />
    </main>
  );
};

export default ChatMain;
