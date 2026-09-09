import styles from './Button.module.scss';

const Button = (props: { text: string; onClick: () => void }) => {
  const { text, onClick } = props;

  return (
    <button className={styles.button} type="button" onClick={onClick}>
      <span>{text}</span>
    </button>
  );
};

export default Button;
