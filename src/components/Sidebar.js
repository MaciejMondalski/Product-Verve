import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { usePaginationContext } from '../hooks/usePaginationContext';
import ArrowIcon from '../assets/arrow_icon.svg';

import Logo from './Logo';

// images
import DashboardIcon from '../assets/dashboard_icon.svg';
import TasksIcon from '../assets/tasks_icon.svg';
import ProjectsIcon from '../assets/projects_icon.svg';
import { useProjectContext } from '../hooks/useProjectContext';
import { useEffect, useState, useRef } from 'react';
import { useCollection } from '../hooks/useCollection';
import useSelectProject from '../hooks/useSelectProject';

function Sidebar({}) {
  const { currentPage, setCurrentPage } = usePaginationContext();
  const { urlCurrentProject, projectObject } = useProjectContext();

  const { documents } = useCollection('projectGroups');
  const [filteredProjects, setFilteredProjects] = useState();
  const [selectorStatus, setSelectorStatus] = useState(false);
  const ref = useRef(null);

  // new
  const { selectProject } = useSelectProject();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (selectorStatus && ref.current && !ref.current.contains(e.target)) {
        closeFilterPicker();
        console.log(ref);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [selectorStatus]);

  const closeFilterPicker = () => {
    setSelectorStatus(false);
    console.log(selectorStatus);
  };

  useEffect(() => {
    const filteredDocuments =
      documents && projectObject && documents.filter((project) => project.id !== projectObject.id);
    setFilteredProjects(filteredDocuments);
  }, [documents, projectObject]);

  const projectHandler = (selectedProject) => {
    selectProject(selectedProject);
    setSelectorStatus(false);
  };

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
            <li ref={ref}>
              <div
                className={`project-selector ${selectorStatus && 'btn-active'}`}
                onClick={() => setSelectorStatus(!selectorStatus)}
              >
                <div className='left-wrapper'>
                  {projectObject && <img className='project-icon' src={projectObject.photoURL} alt='project icon' />}

                  {projectObject ? (
                    <div className='project-title'>
                      <p>PROJECT</p>
                      <span>{projectObject && projectObject.projectName}</span>
                    </div>
                  ) : (
                    <p>Select Project</p>
                  )}
                </div>
                <img className={` arrow-right ${selectorStatus && 'arrow-active'}`} src={ArrowIcon} alt='arrow icon' />
              </div>
              {selectorStatus && (
                <ul className='list-buttons'>
                  {filteredProjects
                    ? filteredProjects.map((selectedProject) => (
                        <li key={selectedProject.id} onClick={() => projectHandler(selectedProject)}>
                          <NavLink to={`${selectedProject.projectName.replace(/\s/g, '')}/dashboard/`}>
                            {selectedProject.projectName}
                          </NavLink>
                        </li>
                      ))
                    : documents.map((selectedProject) => (
                        <li key={selectedProject.id} onClick={() => projectHandler(selectedProject)}>
                          <NavLink to={`${selectedProject.projectName.replace(/\s/g, '')}/dashboard/`}>
                            {selectedProject.projectName}
                          </NavLink>
                        </li>
                      ))}
                </ul>
              )}
            </li>
            <span className='line'></span>
            <li className='nav-item'>
              <NavLink end to={`${urlCurrentProject}/dashboard/`}>
                <img src={DashboardIcon} alt='dashboard icon' onClick={() => setCurrentPage(1)} />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink end to={`${urlCurrentProject}/tasks/${'page-' + currentPage}`}>
                <img className='projects-img' src={TasksIcon} alt='projects icon' onClick={() => setCurrentPage(1)} />
                <span>Tasks</span>
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink end to={'/projects'}>
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
    margin: 20px 10px;

    li.nav-item {
      margin-top: 10px;
      .active {
        color: #fff;
        background: var(--lighter-primary);
        border-radius: 0.6em;
      }
    }

    .list-buttons {
      background: var(--bg-color);
      box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.05);
      border: 1px solid var(--nice-gray);
      border-radius: 0.5em;
      margin-top: 10px;
      animation: fadeInAnimation ease-out 0.2s;

      li {
        padding: 3px 3px;
        a {
          padding: 5px 10px;
          transition-duration: 0.2s;
          border-radius: 0.5em;
          color: var(--primary-color);

          &:hover {
            background-color: var(--nice-gray);
          }
        }
      }

      @keyframes fadeInAnimation {
        0% {
          opacity: 0%;
        }
        100% {
          opacity: 1;
        }
      }
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
    .btn-active {
      border: 1px solid var(--nice-gray);
      background: var(--lighter-primary);
    }
    .project-selector {
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      padding: 10px 0 10px 6px;
      text-decoration: none;
      width: 100%;
      border-radius: 0.6em;
      box-sizing: border-box;
      align-items: center;
      font-weight: 500;
      font-size: 1.3em;
      transition-duration: 0.2s;
      box-sizing: border-box;
      border: 1px solid #12323f00;

      .arrow-right {
        transition-duration: 0.2s;
        transform: rotate(-90deg);
        margin-right: 3px;
      }

      .arrow-active {
        transform: rotate(90deg);
      }

      .btn-active {
        border: 1px solid var(--nice-gray);
        background: var(--lighter-primary);
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
        margin-right: 0.5em;
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
