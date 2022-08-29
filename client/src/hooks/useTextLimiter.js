import { useEffect, useState } from 'react';

const useTextLimiter = ({ text, paragraphsLimit, charactersLimit }) => {
  const [isContentLimited, setContentLimited] = useState(false);
  const [textContent, setTextContent] = useState(text);
  const numberOfParagraphs = text?.split(/\r/).length;
  const numberOfCharacters = text?.length;

  const limitCharacters = () => {
    const dots = '...';
    const newString = text.substring(0, charactersLimit) + dots;
    return newString;
  };

  const limitParagraphs = () => {
    const newString = text.split(/\r/);
    newString.length = paragraphsLimit;
    newString.join('\r');
    newString.push('...');
    return newString;
  };

  const limitText = () => {
    if (numberOfCharacters > charactersLimit + 80) {
      setTextContent(limitCharacters());
      setContentLimited(true);
    } else if (numberOfParagraphs > paragraphsLimit + 2) {
      setTextContent(limitParagraphs());
      setContentLimited(true);
    } else {
      setTextContent(text);
      setContentLimited(false);
    }
  };

  const handleLimitedText = () => {
    if (isContentLimited) {
      setTextContent(text);
      setContentLimited(false);
    }
  };

  useEffect(() => {
    limitText();
  }, [text]);

  return { isContentLimited, textContent, handleLimitedText };
};

export default useTextLimiter;
