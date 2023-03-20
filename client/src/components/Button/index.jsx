import { Link, NavLink } from 'react-router-dom';
import styles from './Button.module.css';

const Button = (props) => {
  const { kind, color, customClass, link, navLink, children, ...propsRest } = props;

  let kindClass = '';
  let colorClass = '';

  if (kind === 'fill') kindClass = styles.fill;
  if (kind === 'outline') kindClass = styles.outline;
  if (kind === 'ghost') kindClass = styles.ghost;

  if (color === 'red') colorClass = styles.red;
  if (color === 'grey') colorClass = styles.grey;

  const buttonClassName = `${kindClass || styles.fill} ${colorClass || styles.grey} ${
    customClass || ''
  }`;

  if (link)
    return (
      <Link className={buttonClassName} {...propsRest}>
        {children}
      </Link>
    );

  if (navLink)
    return (
      <NavLink className={buttonClassName} {...propsRest}>
        {children}
      </NavLink>
    );

  return (
    <button className={buttonClassName} {...propsRest}>
      {children}
    </button>
  );
};

export default Button;
