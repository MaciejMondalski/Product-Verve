import { Link } from 'react-router-dom';
import '../index.css';

import styled from 'styled-components';
import Temple from '../assets/temple.svg';

function Navbar() {
  return (
    <StyledStickyNavbar>
      <div className='ghost-nav'>fdsfs</div>
      <div className='nav-wrapper'>
        <ul>
          <li className='logo'>
            <Link to='/'>
              {' '}
              <img src={Temple} alt='verve logo' />
              <span>Product Verve</span>
            </Link>
          </li>
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
  .ghost-nav {
    height: 3.6em;
    margin-bottom: 30px;
  }
  .nav-wrapper {
    position: fixed;
    top: 0;
    width: 100%;
    background: #d1e9ffff;
    z-index: 0;
    padding: 15px 10px;
    box-sizing: border-box;
    height: 3.6em;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  ul {
    display: flex;
    justify-content: space-between;
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

    li {
      margin: 0 16px;
    }

    a {
      text-decoration: none;
      color: #333;
      margin-right: 20px;
    }
  }
`;

export default Navbar;
