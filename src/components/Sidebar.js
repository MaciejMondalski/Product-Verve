import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { usePaginationContext } from '../hooks/usePaginationContext';
import ArrowIcon from '../assets/arrow_icon.svg';

import Logo from './Logo';

// images
import DashboardIcon from '../assets/dashboard_icon.svg';
import AddIcon from '../assets/add_icon.svg';
import ProjectsIcon from '../assets/projects_icon.svg';
import { useProjectContext } from '../hooks/useProjectContext';
import { useEffect, useState } from 'react';
import { useCollection } from '../hooks/useCollection';

function Sidebar({ setCreateModal }) {
  const { currentPage, setCurrentPage } = usePaginationContext();
  const { currentProject, setCurrentProject, urlCurrentProject, setUrlCurrentProject, projectObject } =
    useProjectContext();
  const { documents } = useCollection('projectGroups');
  const [filteredProjects, setFilteredProjects] = useState();
  const [selectorStatus, setSelectorStatus] = useState(false);

  useEffect(() => {
    const filteredDocuments = documents && documents.filter((project) => project.projectName !== currentProject);
    setFilteredProjects(filteredDocuments);
  }, [documents]);
  console.log(filteredProjects);

  const selectProject = (project) => {};

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
              <div className='project-selector' onClick={() => setSelectorStatus(!selectorStatus)}>
                <div className='left-wrapper'>
                  {projectObject && <img className='project-icon' src={projectObject.photoURL} alt='user avatar' />}

                  <div className='project-title'>
                    <p>PROJECT</p>
                    <span>{currentProject}</span>
                  </div>
                </div>
                <img className={` arrow-right ${selectorStatus && 'arrow-active'}`} src={ArrowIcon} alt='arrow icon' />
              </div>
              {selectorStatus && (
                <ul>
                  {filteredProjects &&
                    filteredProjects.map((project) => (
                      <li key={project} onClick={() => selectProject(project)}>
                        {project.projectName}
                      </li>
                    ))}
                </ul>
              )}
            </li>
            <span className='line'></span>
            <li>
              <NavLink end to={`${urlCurrentProject}/dashboard/`}>
                <img src={DashboardIcon} alt='dashboard icon' onClick={() => setCurrentPage(1)} />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink end to={`${urlCurrentProject}/tasks/${'page-' + currentPage}`}>
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
      background: var(--lighter-primary);
      border-radius: 0.6em;
    }
    li {
      margin-top: 10px;
    }

    a {
      cursor: pointer;
      display: flex;
      padding: 10px;
      text-decoration: none;
      width: 100%;
      color: #fff;
      box-sizing: border-box;
      align-items: center;
      font-weight: 400;
      font-size: 1.1em;
    }

    .project-selector {
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      padding: 10px 0 10px 10px;
      text-decoration: none;
      width: 100%;
      color: #fff;
      border-radius: 0.6em;
      box-sizing: border-box;
      align-items: center;
      font-weight: 500;
      font-size: 1.4em;
      transition-duration: 0.2s;
      box-sizing: border-box;
      border: 1px solid #12323f00;

      .arrow-right {
        transition-duration: 0.2s;
        transform: rotate(-90deg);
      }

      .arrow-active {
        transform: rotate(90deg);
      }

      &:hover {
        border: 1px solid var(--nice-gray);
        background: var(--lighter-primary);
      }

      .left-wrapper {
        display: flex;
        align-items: center;
      }

      .project-icon {
        filter: invert(0%);
        width: 2.2em;
        height: 2.2em;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 0.8em;
        border: 1px solid var(--nice-gray);
      }

      .project-title {
        p {
          font-size: 0.6em;
          color: var(--text-color);
        }
      }
    }

    .line {
      height: 0.1em;
      width: 100%;
      background-color: var(--lighter-primary);
      display: flex;
      align-items: center;
      margin: 15px 0;
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
