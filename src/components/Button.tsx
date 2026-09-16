import styles from './Button.module.scss';

const Button = (props: { text: string; onClick: () => void; disabled?: boolean }) => {
  const { text, onClick, disabled = false } = props;

  return (
    <button className={styles.button} type="button" onClick={onClick} disabled={disabled}>
      <span>{text}</span>
    </button>
  );
};

export default Button;
