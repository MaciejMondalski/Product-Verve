import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Avatar from '../../components/Avatar';
import { useFirestore } from '../../hooks/useFirestore';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import DotsIcon from '../../assets/dots_icon.svg';
import StatusButton from './StatusButton';

const TaskSummary = ({ project }) => {
  const { deleteDocument } = useFirestore('projects');
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const ref = useRef(null);
  const refbutton = useRef(null);
  const [optionsStatus, setOptionsStatus] = useState(false);

  const handleDeleteTask = () => {
    console.log('delete was activated');
    deleteDocument(project.id);
    navigate('/tasks/page-1');
  };

  const handleOptionsDropdown = () => {
    setOptionsStatus(!optionsStatus);
    console.log(optionsStatus);
  };

  const closeOptions = () => {
    setOptionsStatus(false);
    console.log(optionsStatus);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (optionsStatus && ref.current && !ref.current.contains(e.target) && !refbutton.current.contains(e.target)) {
        closeOptions();
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [handleOptionsDropdown, closeOptions, optionsStatus]);

  return (
    <StyledTaskSummary>
      <div className='options-wrapper'>
        <button ref={refbutton} className={`options ${optionsStatus && 'active'}`} onClick={handleOptionsDropdown}>
          <img className='dots' src={DotsIcon} alt='dots icon' />
        </button>
        {optionsStatus && (
          <ul className='options-dropdown' ref={ref}>
            <li>Edit</li>
            {user.uid === project.createdBy.id && (
              <li onClick={handleDeleteTask} className='option'>
                Delete
              </li>
            )}
          </ul>
        )}
      </div>
      <div className='content-wrapper'>
        <div className='task-summary'>
          <h1 className='page-title'>{project.name}</h1>
          <p>Created by {project.createdBy.displayName}</p>
          <p className='due-date'>Task due by {project.dueDate.toDate().toDateString()}</p>
          <p className='details'>{project.details}</p>
        </div>
        <div className='info-wrapper'>
          <div>
            <h4>Task is assigned to:</h4>
            <div className='assigned-users'>
              {project.assignedUsersList.map((user) => (
                <div key={user.id} className='avatar-wrapper'>
                  <Avatar src={user.photoURL} />
                </div>
              ))}
            </div>
          </div>
          <StatusButton project={project} />
        </div>
      </div>
    </StyledTaskSummary>
  );
};

const StyledTaskSummary = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 0.6em;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--nice-gray);

  .options-wrapper {
    display: flex;
    justify-content: flex-end;
    padding-bottom: 10px;
    position: relative;
  }

  button.active {
    background: var(--nice-gray);
  }

  .options {
    position: relative;

    height: 2.7em;
    width: 2.7em;
    display: flex;
    align-items: flex-end;
    border: none;
    background: none;
    transition-duration: 0.1s;
    border-radius: 0.4em;

    img {
      margin: auto;
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
    background: white;
    box-shadow: 3px 3px 9px 9px rgba(0, 0, 0, 0.05);
    padding: 4px;
    animation-direction: alternate;
    animation: fadeInAnimation ease-out 0.2s;
    border-radius: 0.3em;
    margin-top: 6px;
    top: 75%;
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
      margin: 3px;
      transition: 0.1s;
      border-radius: 0.3em;
      cursor: pointer;

      &:hover {
        background-color: var(--nice-gray);
      }
    }
  }

  .content-wrapper {
    display: flex;
    flex-direction: column;
  }

  .btn {
    white-space: nowrap;
  }

  .task-summary {
    word-break: break-all;

    .due-date {
      margin: 10px 0;
      font-size: 0.9em;
      color: var(--title-color);
    }
    .details {
      margin: 30px 0;
      color: var(--text-color);
      line-height: 1.8em;
      font-size: 0.9em;
    }
  }

  .info-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    h4 {
      color: var(--text-color);
      font-size: 0.9em;
    }
    .assigned-users {
      display: flex;
      align-items: flex-end;
      margin-top: 0px;

      .avatar {
        transform: scale(0.8);
      }
    }
  }
`;

export default TaskSummary;
