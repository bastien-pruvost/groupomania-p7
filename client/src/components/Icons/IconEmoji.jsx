// import styles from './Icon.module.css';

const IconEmoji = ({ size, color }) => {
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
      <path d='M8 14s1.5 2 4 2 4-2 4-2' />
      <line x1={9} y1={9} x2='9.01' y2={9} />
      <line x1={15} y1={9} x2='15.01' y2={9} />
    </svg>
  );
};

export default IconEmoji;
