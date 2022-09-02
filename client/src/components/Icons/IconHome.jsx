// import styles from './Icon.module.css';

const IconHome = ({ size, color }) => {
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
      <path d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' />
      <polyline points='9 22 9 12 15 12 15 22' />
    </svg>
  );
};

export default IconHome;
