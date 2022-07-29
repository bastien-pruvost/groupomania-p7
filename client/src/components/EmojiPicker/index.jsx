import { useEffect, useRef } from 'react';
import axios from 'axios';
import { Picker } from 'emoji-mart';
import IconEmoji from 'components/Icons/IconEmoji';
import styles from './EmojiPicker.module.css';
import { useState } from 'react';

const EmojiPicker = (props) => {
  const ref = useRef();
  const [isOpen, setOpen] = useState(false);

  const handleEmojiPicker = () => {
    if (!isOpen) {
      document.addEventListener('mousedown', closeOnOutsideClick);
    } else {
      document.removeEventListener('mousedown', closeOnOutsideClick);
    }
    setOpen(!isOpen);
  };

  const closeOnOutsideClick = (e) => {
    if (!e.target.closest(`.emojiPicker`)) {
      setOpen(false);
      document.removeEventListener('mousedown', closeOnOutsideClick);
    }
  };

  useEffect(() => {
    const fetchEmoji = async () => {
      const response = await axios.get(
        'https://cdn.jsdelivr.net/npm/@emoji-mart/data@1.0.2/sets/14/native.json'
      );
      const data = response.data;
      new Picker({
        ...props,
        data,
        ref,
        autoFocus: false,
        previewPosition: 'none',
        locale: 'fr',
        maxFrequentRows: 3,
        perLine: 8,
        theme: 'light',
        emojiSize: 20,
        emojiButtonSize: 34,
        enableFrequentEmojiSort: true
      });
    };
    fetchEmoji();
  }, [isOpen]);

  return (
    <div className={styles.EmojiPicker + ' emojiPicker'}>
      <div onClick={handleEmojiPicker}>
        <IconEmoji size={40} />
      </div>
      {isOpen && <div ref={ref} />}
    </div>
  );
};

export default EmojiPicker;
