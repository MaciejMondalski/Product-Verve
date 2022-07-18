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
        onClickOutside();
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
    position: absolute;

    width: fit-content;
    display: flex;
    flex-direction: column;
    background: white;
    box-shadow: 3px 3px 9px 9px rgba(0, 0, 0, 0.05);
    padding: 8px;
    animation-direction: alternate;
    animation: fadeInAnimation ease-out 0.2s;
    border-radius: 0.5em;
    margin-top: 6px;
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

    li {
      padding: 6px 8px;
      transition: 0.1s;
      border-radius: 6px;
      .logout {
        text-decoration: none;
        margin: 0px;
        color: black;
        font-weight: 400;
      }

      &:hover {
        background-color: var(--nice-gray);
      }
    }
  }
`;

export default Dropdown;
