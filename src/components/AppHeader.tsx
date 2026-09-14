import Button from '@/components/Button';
import { useAuth } from '@/hooks/useAuth';
import styles from './AppHeader.module.scss';
import { logOut, loginWithGoogle } from '@/services/api';

const AppHeader = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  const handleClick = async () => {
    if (isAuthenticated) {
      await logOut();
      setIsAuthenticated(false);
    } else {
      loginWithGoogle();
    }
  };
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <span className={styles.logo} aria-hidden="true">
          GF
        </span>
        <span className={styles.name}>Gentle Focus</span>
      </div>

      <Button text={isAuthenticated ? 'Logout' : 'Login'} onClick={handleClick} />
    </header>
  );
};

export default AppHeader;
