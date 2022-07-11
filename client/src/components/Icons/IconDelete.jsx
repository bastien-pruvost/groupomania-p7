// import styles from './Icon.module.css';

const IconDelete = ({ size, color }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
      stroke={color ? color : 'currentColor'}
      fill='none'
      width={size}
      height={size}
    >
      <path d='M3 6L5 6 21 6' />
      <path d='M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2' />
      <path d='M10 11L10 17' />
      <path d='M14 11L14 17' />
    </svg>
  );
};

export default IconDelete;
