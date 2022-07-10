import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { usePaginationContext } from '../hooks/usePaginationContext';

import Logo from './Logo';

// images
import DashboardIcon from '../assets/dashboard_icon.svg';
import AddIcon from '../assets/add_icon.svg';

function Sidebar({ setCreateModal }) {
  const { currentPage, setCurrentPage } = usePaginationContext();
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
              <NavLink end to={`dashboard/${'page-' + currentPage}`}>
                <img src={DashboardIcon} alt='dashboard icon' onClick={() => setCurrentPage(1)} />
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
      border-radius: 0.5em 0 0 0.5em;
      img {
        filter: invert(40%);
      }
    }
    li {
      margin-top: 10px;
    }

    a,
    .item-wrapper {
      cursor: pointer;
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
