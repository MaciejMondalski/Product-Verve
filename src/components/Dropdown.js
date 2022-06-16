import styled from 'styled-components';
import { useEffect, useRef } from 'react';

function Dropdown({ onClickOutside, status }) {
  const ref = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClickOutside();
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    if (!status) {
      document.removeEventListener('click', handleClickOutside, true);
    }
  }, [onClickOutside, status]);

  return (
    <StyledDropdown ref={ref}>
      <div className='dropdown-wrapper'>
        <ul>
          <li>Profile</li>
          <li>Settings</li>
          <li>Logout</li>
          <li></li>
        </ul>
      </div>
    </StyledDropdown>
  );
}

const StyledDropdown = styled.div`
  .dropdown-wrapper {
    height: 220px;
    width: 200px;
    background: white;
    position: absolute;
    top: 9%;
    right: 1%;
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
    }
  }
`;

export default Dropdown;
