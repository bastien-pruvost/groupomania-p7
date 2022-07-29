import IconMore from 'components/Icons/IconMore';
import { useState } from 'react';
import styles from './EditMenu.module.css';

const EditMenu = ({ handleEdit, handleDelete, iconSize }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleMenu = () => {
    if (!isMenuOpen) {
      document.addEventListener('mousedown', closeMenuOnOutsideClick);
    } else {
      document.removeEventListener('mousedown', closeMenuOnOutsideClick);
    }
    setMenuOpen(!isMenuOpen);
  };

  const closeMenuOnOutsideClick = (e) => {
    if (!e.target.closest(`.moreMenuContainer`)) {
      setMenuOpen(false);
      document.removeEventListener('mousedown', closeMenuOnOutsideClick);
    }
  };

  return (
    <div className={styles.EditMenu + ' moreMenuContainer'}>
      <button className={styles.editButton} onClick={handleMenu} onKeyDown={handleMenu}>
        <IconMore size={iconSize} />
      </button>

      {!!isMenuOpen && (
        <div className={styles.editMenu}>
          <button onClick={handleEdit}>Modifier</button>
          <button onClick={handleDelete}>Supprimer</button>
        </div>
      )}
    </div>
  );
};

export default EditMenu;
