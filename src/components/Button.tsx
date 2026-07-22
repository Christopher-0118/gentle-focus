const Button = (props: { text: string; onClick: () => void }) => {
  const { text, onClick } = props;
  return (
    <button className="button" onClick={onClick}>
      <span className="button-text">{text}</span>
    </button>
  );
};

export default Button;
