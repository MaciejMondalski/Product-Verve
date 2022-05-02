import { Link } from 'react-router-dom';
import '../index.css';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

import styled from 'styled-components';
import Logo from './Logo';

function Navbar() {
  const { user } = useAuthContext();

  const { logout, isPending } = useLogout();

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
                <Link to='login'>Login</Link>
              </li>
              <li>
                <Link to='signup'>Sign up</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                {!isPending && (
                  <button className='btn' onClick={logout}>
                    Logout
                  </button>
                )}
                {isPending && (
                  <button className='btn' onClick={logout}>
                    Logging out...
                  </button>
                )}
              </li>
            </>
          )}
        </ul>
      </div>
    </StyledStickyNavbar>
  );
}

const StyledStickyNavbar = styled.div`
  .nav-wrapper {
    top: 0;
    width: 100%;
    //background: var(--nice-gray);
    z-index: 0;
    padding: 30px 10px;
    box-sizing: border-box;
    height: 4.2em;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .no-user {
    justify-content: space-between;
  }

  .logo {
    margin: 0 30px;

    span {
      color: var(--primary-color);
    }

    img {
      filter: invert(18%) sepia(67%) saturate(3286%) hue-rotate(198deg)
        brightness(97%) contrast(98%);
    }
  }

  .menu-wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: 0 30px;

    a {
      text-decoration: none;
      color: #333;
      margin: 0 10px;
      font-weight: 500;
    }
  }
`;

export default Navbar;
