import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import Logo from './Logo';

// images
import DashboardIcon from '../assets/dashboard_icon.svg';
import AddIcon from '../assets/add_icon.svg';

function Sidebar({ setCreateModal }) {
  return (
    <StyledSidebar>
      <div className='sidebar-content'>
        <div className='side-header'>
          <div className='logo'>
            <Logo />
          </div>
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
              <div className='item-wrapper' onClick={() => setCreateModal((prevState) => !prevState)}>
                <img src={AddIcon} alt='add project icon' />
                <span>New Project</span>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </StyledSidebar>
  );
}

const StyledSidebar = styled.div`
  min-width: 260px;
  background: var(--primary-color);
  min-height: 100vh;
  box-sizing: border-box;
  color: #fff;

  .sidebar-content {
    width: inherit;
  }

  .side-header {
    background: var(--darker-color);
  }

  .logo {
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
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

    a,
    .item-wrapper {
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
