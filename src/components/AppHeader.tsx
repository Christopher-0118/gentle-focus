import Button from '@/components/Button';
import { useAuth } from '@/hooks/useAuth';
import styles from './AppHeader.module.scss';

const AppHeader = () => {
  const { isAuthenticated, isLoading, error, login, logout } = useAuth();
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <span className={styles.logo} aria-hidden="true">
          GF
        </span>
        <span className={styles.name}>Gentle Focus</span>
      </div>

      {error && <span role="alert">{error}</span>}
      <Button
        text={isAuthenticated ? 'Logout' : 'Login'}
        onClick={isAuthenticated ? logout : login}
        disabled={isLoading}
      />
    </header>
  );
};

export default AppHeader;
