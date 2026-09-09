import { KeyboardEvent, SubmitEvent, useState } from 'react';
import { submitForm } from '@/services/api';

import styles from './Form.module.scss';

const Form = (formProps: { text: string }) => {
  const { text } = formProps;
  const [prompt, setPrompt] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedPrompt = prompt.trim();

    if (!normalizedPrompt || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      await submitForm(normalizedPrompt);
      setPrompt('');
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      event.currentTarget.form?.requestSubmit();
    }
  };

  return (
    <footer className={styles.footer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="chat-prompt" hidden>
          Message
        </label>
        <textarea
          id="chat-prompt"
          className={styles.input}
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          onKeyDown={handleKeyDown}
          name="prompt"
          rows={1}
          placeholder="Напишите, что добавить в календарь…"
        />
        <button
          className={styles.send}
          type="submit"
          aria-label={text}
          disabled={!prompt.trim() || isSubmitting}
        >
          <svg className={styles.sendIcon} viewBox="0 0 24 24" aria-hidden="true">
            <path d="m5 12 7-7 7 7" />
            <path d="M12 19V5" />
          </svg>
        </button>
      </form>
    </footer>
  );
};

export default Form;
