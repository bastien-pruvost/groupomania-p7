export const adjustTextareaHeight = (e) => {
  e.target.style.height = '1px';
  e.target.style.height = e.target.scrollHeight + 'px';
};
