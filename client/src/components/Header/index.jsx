import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from 'contexts/UserContext';
import styles from './Header.module.css';
import { signoutRequest } from 'services/auth.services';
import Wrapper from 'components/Wrapper';
import Logo from 'components/Logo';

const Header = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignout = () => {
    signoutRequest()
      .then(() => {
        setCurrentUser({
          id: null,
          isAdmin: false,
          firstname: '',
          lastname: '',
          profilePicUrl: 'defaultProfilePic.jpg'
        });
        navigate('/landing');
      })
      .catch((err) => console.log(err));
  };

  return (
    <header className={styles.Header}>
      <Wrapper>
        <div className={styles.flex_container}>
          <Link to='/'>
            <Logo />
          </Link>

          {!!currentUser.id && (
            <button onClick={handleSignout}>Disconnect</button>
          )}
        </div>
      </Wrapper>
    </header>
  );
};
export default Header;
