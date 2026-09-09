import AppHeader from '@/components/AppHeader';
import ChatMain from '@/components/ChatMain';
import Form from '@/components/Form';

import styles from './Home.module.scss';

export function HomePage() {
  return (
    <div className={styles.wrapper}>
      <section className={styles.app} aria-label="Gentle Focus chat">
        <AppHeader />
        <ChatMain />
        <Form text="Отправить" />
      </section>
    </div>
  );
}
