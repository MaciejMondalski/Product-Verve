import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import Avatar from './Avatar';
import Logo from './Logo';

// images
import DashboardIcon from '../assets/dashboard_icon.svg';
import AddIcon from '../assets/add_icon.svg';

function Sidebar() {
  const { user } = useAuthContext();

  return (
    <StyledSidebar>
      <div className='sidebar-content'>
        <div className='side-header'>
          <div className='logo'>
            <Logo />
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
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
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
