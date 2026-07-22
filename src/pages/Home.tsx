import Form from '@/components/Form';
import styles from './Home.module.scss';
import Button from '@/components/Button';
import { getCurrentUser, loginWithGoogle, logOut } from '@/services/api';
import { useEffect, useState } from 'react';

export function HomePage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const handleLogOut = async () => {
    await logOut();
    setAuthenticated(false);
  };

  useEffect(() => {
    const checkAuthorization = async () => {
      const response = await getCurrentUser();
      setAuthenticated(response.authenticated);
    };

    checkAuthorization();
  }, []);

  const authButtonProps = authenticated
    ? {
        text: 'Logout',
        onClick: handleLogOut,
      }
    : {
        text: 'Login with Google',
        onClick: loginWithGoogle,
      };

  return (
    <main className={styles.page}>
      <Button {...authButtonProps} />
      <section className={styles.panel}>
        <p className={styles.eyebrow}>Gentle Focus</p>
        <h1 className={styles.title}>Plan calmly. Focus clearly.</h1>
        <p className={styles.description}>
          A simple React, TypeScript, Vite starter for the AI-assisted focus planner.
        </p>
      </section>

      <Form text="Generate" />
    </main>
  );
}
