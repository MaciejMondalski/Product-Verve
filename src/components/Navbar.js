import { Link } from 'react-router-dom';
import '../index.css';

import styled from 'styled-components';
import Temple from '../assets/temple.svg';

function Navbar() {
  return (
    <StyledStickyNavbar>
      <div className='nav-wrapper'>
        <ul>
          <div className='menu-wrapper'>
            <li>
              <Link to='login'>Login</Link>
            </li>
            <li>
              <Link to='signup'>Sign up</Link>
            </li>

            <li>
              <button className='btn'>Logout</button>
            </li>
          </div>
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
    justify-content: center;
  }

  ul {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 0 auto;
    width: 90%;

    .logo {
      a {
        letter-spacing: 1px;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      span {
        color: var(--heading-color);
        font-size: 1.3em;
      }

      img {
        margin-right: 10px;
        filter: invert(25%);
        width: 36px;
        margin-top: -10px;
      }
    }

    .menu-wrapper {
      display: flex;
      align-items: center;
    }

    a {
      text-decoration: none;
      color: #333;
      margin-right: 20px;
    }
  }
`;

export default Navbar;
