export const adjustTextareaHeight = (target) => {
  target.style.height = '1px';
  target.style.height = target.scrollHeight + 'px';
};
