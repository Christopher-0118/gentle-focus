import { Link } from 'react-router-dom';

import styles from './NotFound.module.scss';

export function NotFoundPage() {
  return (
    <main className={styles.page}>
      <section className={styles.content}>
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>Page not found</h1>
        <Link className={styles.link} to="/">
          Back home
        </Link>
      </section>
    </main>
  );
}
