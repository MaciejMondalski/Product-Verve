import { useCollection } from '../hooks/useCollection';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import useSelectProject from '../hooks/useSelectProject';
import DotsIcon from '../assets/dots_icon.svg';
import { useState, useRef, useEffect } from 'react';
import AddIcon from '../assets/add_icon.svg';

const ProjectsPage = ({ setNewProjectModal }) => {
  const { documents: projects } = useCollection('projectGroups');
  const { documents: tasks } = useCollection('projects');
  const { selectProject } = useSelectProject();
  const navigate = useNavigate();
  const refdropdown = useRef(null);
  const refbutton = useRef(null);
  const [activeId, setActiveId] = useState('');
  const [projectTasks, setProjectTasks] = useState([]);

  const projectHandler = (selectedProject) => {
    if (activeId == '') {
      selectProject(selectedProject);
      navigate(`/${selectedProject.projectName.replace(/\s/g, '')}/dashboard/`);
    }
  };

  const handleOptionsDropdown = (key, e) => {
    e.stopPropagation();

    setActiveId(key);
    console.log(activeId);
  };

  const closeOptions = (e) => {
    e.stopPropagation();

    console.log();
    setActiveId('');
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        activeId &&
        refdropdown.current &&
        !refdropdown.current.contains(e.target) &&
        !refbutton.current.contains(e.target)
      ) {
        closeOptions(e);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [handleOptionsDropdown, closeOptions, activeId]);

  useEffect(() => {
    const taskList =
      tasks &&
      projects &&
      projects.map((project) => {
        const tasksQuantity = tasks.filter((task) => task.projectGroup.id === project.id).length;
        return { projectId: project.id, quantity: tasksQuantity };
      });
    setProjectTasks(taskList);
  }, [tasks, projects]);

  const getTaskQuantity = (project) => {
    const specificTask = projectTasks && projectTasks.filter((list) => list.projectId === project.id)[0];
    return specificTask && specificTask.quantity;
  };

  return (
    <StyledProjects>
      <h2 className='page-title'>Projects</h2>
      <button className='btn item-wrapper' onClick={() => setNewProjectModal((prevState) => !prevState)}>
        <img src={AddIcon} alt='add project icon' />
        <span>New Project</span>
      </button>
      <ul className='container'>
        {projects &&
          projects.map((project) => (
            <li className='project-wrapper' key={project.id} onClick={() => projectHandler(project)}>
              <div className='options-wrapper'>
                <div
                  className={`options-btn ${activeId == project.id && 'active-btn'}`}
                  ref={refbutton}
                  onClick={(e) => handleOptionsDropdown(project.id, e)}
                >
                  <img className='dots' src={DotsIcon} alt='dots icon' />
                </div>
                {activeId == project.id && (
                  <ul className='options-dropdown' ref={refdropdown}>
                    <li>Edit</li>
                    <li>Star</li>
                  </ul>
                )}
              </div>
              <div className='box-content'>
                <div className='left-side'>
                  <img className='project-icon' src={project.photoURL} alt='project icon' />
                </div>
                <div className='right-side'>
                  <h2>{project.projectName} </h2>
                  <p>{getTaskQuantity(project)} tasks</p>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </StyledProjects>
  );
};

const StyledProjects = styled.div`
  position: relative;
  .page-title {
    font-size: 2.5em;
    font-weight: 500;
    margin-bottom: 0.6em;
    color: var(--heading-color);
  }

  .container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    grid-gap: 20px;
    z-index: 0;
  }

  .project-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    padding: 1.4em;
    border-radius: 0.5em;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.05);

    transition-duration: 0.2s;
    border: 1px solid var(--nice-gray);

    &:hover {
      transform: scale(1.02);
      box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.05);
      filter: brightness(0.99);
    }

    a {
      text-decoration: none;
      color: inherit;
    }

    .box-content {
      display: flex;

      .left-side {
        img {
          height: 5em;
        }
        margin-right: 1em;
      }

      .right-side {
        display: flex;
        flex-direction: column;
        justify-content: center;

        p {
          color: var(--text-color);
        }
      }
    }

    .options-wrapper {
      position: absolute;
      right: 0.6em;
      top: 0.6em;
    }

    .options-btn {
      position: relative;

      height: 2.5em;
      width: 2.5em;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      background: none;
      transition-duration: 0.1s;
      border-radius: 0.4em;

      img {
        padding: 5px;
        filter: invert(22%) sepia(0%) saturate(0%) hue-rotate(151deg) brightness(104%) contrast(85%);
      }

      &:hover {
        background: var(--nice-gray);
      }
    }

    .options-dropdown {
      width: fit-content;
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 85%;
      right: 0%;

      background: white;
      box-shadow: 3px 3px 9px 9px rgba(0, 0, 0, 0.05);
      padding: 1px;
      animation-direction: alternate;
      animation: fadeInAnimation ease-out 0.2s;
      border-radius: 0.3em;
      margin-top: 6px;
      z-index: 2;

      @keyframes fadeInAnimation {
        0% {
          opacity: 0%;
        }
        100% {
          opacity: 1;
        }
      }

      li {
        padding: 3px 6px;
        margin: 2px;
        transition: 0.1s;
        border-radius: 0.3em;
        cursor: pointer;

        &:hover {
          background-color: var(--nice-gray);
        }
      }
    }
  }

  button {
    cursor: pointer;
    display: flex;
    padding: 6px 8px 6px 4px;
    text-decoration: none;
    color: var(--darker-text-color);
    box-sizing: border-box;
    align-items: center;
    margin-bottom: 1em;
    background: var(--nice-gray);
    border: none;
    font-size: 1.2em;

    &:hover {
      filter: brightness(0.94);
    }

    img {
      margin-right: 0.3em;
      filter: invert(40%);
      width: 1.6em;
      box-sizing: border-box;
    }
  }
`;

export default ProjectsPage;
