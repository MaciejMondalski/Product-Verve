import { Link } from 'react-router-dom';
import '../index.css';
import { useAuthContext } from '../hooks/useAuthContext';
import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Logo from './Logo';
import Avatar from './Avatar';
import Dropdown from './Dropdown';

function Navbar() {
  const { user } = useAuthContext();
  const [dropdownStatus, setDropdownStatus] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!user) setDropdownStatus(false);
  }, [user]);

  const handleDropdownClose = () => {
    setDropdownStatus(!dropdownStatus);
  };

  return (
    <StyledStickyNavbar>
      <div className={user ? 'nav-wrapper' : 'nav-wrapper no-user'}>
        {!user && (
          <div className='logo'>
            <Logo />
          </div>
        )}
        <ul className='menu-wrapper'>
          {!user ? (
            <>
              <li>
                <Link className='before-log' to='login'>
                  Login
                </Link>
              </li>
              <li>
                <Link className='before-log' to='signup'>
                  Sign up
                </Link>
              </li>
            </>
          ) : (
            <>
              <div className='user'>
                <p>Hello {user.displayName}</p>
                <div ref={ref} className='avatar-wrapper' onClick={handleDropdownClose}>
                  <Avatar src={user.photoURL} />
                </div>
                {dropdownStatus && (
                  <Dropdown avatarRef={ref} status={dropdownStatus} onClickOutside={handleDropdownClose} />
                )}
              </div>
            </>
          )}
        </ul>
      </div>
    </StyledStickyNavbar>
  );
}

// !dropdownStatus &&

const StyledStickyNavbar = styled.div`
  .nav-wrapper {
    top: 0;
    width: 100%;
    background: white;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.05);

    z-index: 0;
    padding: 30px 10px;
    box-sizing: border-box;
    height: 4.2em;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .user {
    display: flex;
    align-items: center;
  }

  .no-user {
    justify-content: space-between;
    background: none;
    box-shadow: none;
  }

  .avatar-wrapper {
    margin-left: 15px;
    position: relative;
  }

  .logo {
    margin: 0 30px;

    span {
      color: var(--primary-color);
    }

    img {
      filter: invert(18%) sepia(67%) saturate(3286%) hue-rotate(198deg) brightness(97%) contrast(98%);
    }
  }

  .menu-wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: 0 30px;

    .before-log {
      color: #333;
    }

    a {
      text-decoration: none;
      margin: 0 10px;
      font-weight: 500;
    }
  }
`;

export default Navbar;
