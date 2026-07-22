import Button from './Button';
import TextArea from './TextEria';

const Form = (formProps: { text: string }) => {
  const { text } = formProps;
  return (
    <div className="form">
      <TextArea />
      <Button text={text} />
    </div>
  );
};

export default Form;
