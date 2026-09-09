import Button from '@/components/Button';
import { loginWithGoogle } from '@/services/api';

import styles from './AppHeader.module.scss';

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <span className={styles.logo} aria-hidden="true">
          GF
        </span>
        <span className={styles.name}>Gentle Focus</span>
      </div>

      <Button text="Sign up" onClick={loginWithGoogle} />
    </header>
  );
};

export default AppHeader;
