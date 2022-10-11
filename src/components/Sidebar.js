import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { usePaginationContext } from '../hooks/usePaginationContext';

import Logo from './Logo';

// images
import DashboardIcon from '../assets/dashboard_icon.svg';
import AddIcon from '../assets/add_icon.svg';
import ProjectsIcon from '../assets/projects_icon.svg';
import { useProjectContext } from '../hooks/useProjectContext';

function Sidebar({ setCreateModal }) {
  const { currentPage, setCurrentPage } = usePaginationContext();
  const { currentProject } = useProjectContext();

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
              <NavLink end to={`${currentProject}/dashboard/`}>
                <img src={DashboardIcon} alt='dashboard icon' onClick={() => setCurrentPage(1)} />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink end to={`${currentProject}/tasks/${'page-' + currentPage}`}>
                <img
                  className='projects-img'
                  src={ProjectsIcon}
                  alt='projects icon'
                  onClick={() => setCurrentPage(1)}
                />
                <span>Projects</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </StyledSidebar>
  );
}

const StyledSidebar = styled.div`
  min-width: 220px;
  background: var(--primary-color);
  min-height: 100vh;
  box-sizing: border-box;
  color: #fff;

  .sidebar-content {
    width: inherit;
  }

  .links {
    margin: 40px 10px;
    .active {
      color: #fff;
      background: #4f42c7;
      border-radius: 0.6em;
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
      align-items: center;
      font-weight: 500;
      font-size: 1.1em;
    }

    img {
      margin-right: 10px;
      filter: invert(100%);
      width: 1.7em;
      box-sizing: border-box;
    }

    .projects-img {
      padding: 0.1em;
    }
  }
`;

export default Sidebar;
