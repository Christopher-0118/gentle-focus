import styles from './Home.module.scss';

export function HomePage() {
  return (
    <main className={styles.page}>
      <section className={styles.panel}>
        <p className={styles.eyebrow}>Gentle Focus</p>
        <h1 className={styles.title}>Plan calmly. Focus clearly.</h1>
        <p className={styles.description}>
          A simple React, TypeScript, Vite starter for the AI-assisted focus planner.
        </p>
      </section>
    </main>
  );
}
