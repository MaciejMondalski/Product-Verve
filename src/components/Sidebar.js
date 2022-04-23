import styled from 'styled-components';
import { NavLink, Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import Avatar from './Avatar';

// images
import DashboardIcon from '../assets/dashboard_icon.svg';
import AddIcon from '../assets/add_icon.svg';
import Logo from '../assets/pv_logo.svg';

function Sidebar() {
  const { user } = useAuthContext();

  return (
    <StyledSidebar>
      <div className='sidebar-content'>
        <div className='side-header'>
          <div className='logo'>
            <Link to='/'>
              <img src={Logo} alt='verve logo' />
              <span>Product Verve</span>
            </Link>
          </div>

          {user && (
            <div className='user'>
              <Avatar src={user.photoURL} />
              <p>Hello {user.displayName}</p>
            </div>
          )}
        </div>
        <nav className='links'>
          <ul>
            <li>
              <NavLink end to='/'>
                <img src={DashboardIcon} alt='dashboard icon' />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to='/create'>
                <img src={AddIcon} alt='add project icon' />
                <span>New Project</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </StyledSidebar>
  );
}

const StyledSidebar = styled.div`
  width: 300px;
  min-width: 300px;
  background: var(--primary-color);
  min-height: 100vh;
  box-sizing: border-box;
  position: relative;
  color: #fff;

  .sidebar-content {
    position: fixed;
    width: inherit;
  }

  .side-header {
    background: var(--darker-color);
  }

  .logo {
    //padding: 20px 30px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    height: 4.2em;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      letter-spacing: 1px;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
    }

    span {
      color: var(--bg-color);
      font-size: 1.6em;
      font-family: 'Chakra Petch', sans-serif;
      font-weight: 700;
    }

    img {
      margin-right: 5px;
      filter: invert(95%);
      width: 32px;
      margin-top: -2px;
    }
  }

  .user {
    display: flex;
    align-items: center;
    font-weight: medium;
    letter-spacing: 1px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    padding: 10px 30px;

    p {
      padding: 0 15px;
    }
  }

  .links {
    margin-top: 40px;
    margin-left: 20px;
    .active {
      color: #555;
      background: var(--bg-color);
      border-radius: 20px 0 0 20px;
      img {
        filter: invert(40%);
      }
    }
    li {
      margin-top: 10px;
    }

    a {
      display: flex;
      padding: 10px;
      text-decoration: none;
      width: 100%;
      color: #fff;
      box-sizing: border-box;
    }

    img {
      margin-right: 10px;
      filter: invert(100%);
    }
  }
`;

export default Sidebar;
