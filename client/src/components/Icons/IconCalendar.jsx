// import styles from './Icon.module.css';

const IconCalendar = ({ size, color }) => {
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
      <rect x={3} y={4} width={18} height={18} rx={2} ry={2} />
      <path d='M16 2L16 6' />
      <path d='M8 2L8 6' />
      <path d='M3 10L21 10' />
    </svg>
  );
};

export default IconCalendar;
