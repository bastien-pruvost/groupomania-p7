import { useEffect, useRef } from 'react';
import axios from 'axios';
import { Picker } from 'emoji-mart';
import IconEmoji from 'components/Icons/IconEmoji';
import styles from './EmojiPicker.module.css';
import { useState } from 'react';

const EmojiPicker = (props) => {
  const ref = useRef();
  const [isShown, setShown] = useState(false);

  useEffect(() => {
    const fetchEmoji = async () => {
      const dataRes = await axios.get(
        'https://cdn.jsdelivr.net/npm/@emoji-mart/data@1.0.2/sets/14/native.json'
      );
      const data = dataRes.data;
      console.log(data);
      new Picker({
        ...props,
        data,
        ref,
        autoFocus: true,
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
  }, [isShown]);

  const toggleClick = (e) => {
    e.stopPropagation();
    setShown(!isShown);
  };

  return (
    <div className={styles.EmojiPicker}>
      <div onClick={toggleClick}>
        <IconEmoji size={24} />
      </div>
      {isShown && <div ref={ref} />}
    </div>
  );
};

export default EmojiPicker;
