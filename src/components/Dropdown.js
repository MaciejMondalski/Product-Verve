import styled from 'styled-components';
import { useEffect, useRef } from 'react';
import { useLogout } from '../hooks/useLogout';
import { Link } from 'react-router-dom';

function Dropdown({ onClickOutside, status, avatarRef }) {
  const ref = useRef(null);
  const { logout, isPending } = useLogout();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target) && !avatarRef.current.contains(e.target)) {
        onClickOutside && onClickOutside();
        console.log();
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [onClickOutside, avatarRef]);

  if (!status) return null;

  return (
    <StyledDropdown ref={ref}>
      <div className='dropdown-wrapper'>
        <ul>
          <li>Profile</li>
          <li>Settings</li>

          {!isPending && (
            <li>
              <Link className='logout' to='/login' onClick={logout}>
                Logout
              </Link>
            </li>
          )}
          {isPending && <li onClick={logout}>Logging out...</li>}
        </ul>
      </div>
    </StyledDropdown>
  );
}

const StyledDropdown = styled.div`
  z-index: 100;
  .dropdown-wrapper {
    width: 180px;
    background: white;
    position: absolute;
    top: 120%;
    left: 10%;
    box-shadow: 3px 3px 3px 5px rgba(0, 0, 0, 0.05);
    animation-direction: alternate;
    animation: fadeInAnimation ease-out 0.1s;
  }

  @keyframes fadeInAnimation {
    0% {
      opacity: 0%;
    }
    100% {
      opacity: 1;
    }
  }

  ul {
    display: flex;
    flex-direction: column;
    margin: 5px 10px;
    li {
      margin: 5px 0;

      .logout {
        text-decoration: none;
        margin: 0px;
        color: black;
        font-weight: 400;
      }
    }
  }
`;

export default Dropdown;
