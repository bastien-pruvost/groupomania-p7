import { useEffect, useRef } from 'react';
import axios from 'axios';
import { Picker } from 'emoji-mart';

// import styles from './EmojiPicker.module.css';

const EmojiPicker = (props) => {
  const ref = useRef();

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
        perLine: 9,
        theme: 'light',
        emojiSize: 20
      });
    };
    fetchEmoji();
  }, []);

  return <div ref={ref}></div>;
};

export default EmojiPicker;
