// import styles from './Icon.module.css';

const IconSend = ({ size, color }) => {
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
      <circle cx={12} cy={12} r={10} />
      <polyline points='12 16 16 12 12 8' />
      <line x1={8} y1={12} x2={16} y2={12} />
    </svg>
  );
};

export default IconSend;
