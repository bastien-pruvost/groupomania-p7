import { Link, NavLink } from 'react-router-dom';
import styles from './Button.module.css';

const Button = (props) => {
  const { kind, color, customClass, link, navLink, children, ...propsRest } = props;

  let kindStyle = '';
  let colorStyle = '';
  const customStyle = customStyle || '';

  if (kind === 'fill') kindStyle = styles.fill;
  if (kind === 'outline') kindStyle = styles.outline;
  if (kind === 'ghost') kindStyle = styles.ghost;

  const buttonClassName = ``;

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
