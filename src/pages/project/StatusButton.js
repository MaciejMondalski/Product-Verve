import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useFirestore } from '../../hooks/useFirestore';
import ArrowIcon from '../../assets/arrow_icon.svg';

const statusList = ['To Do', 'In Progress', 'Done', 'Blocked'];

const StatusButton = ({ project }) => {
  const ref = useRef(null);
  const refbutton = useRef(null);
  const [projectStatus, setProjectStatus] = useState(false);
  const [currentStatus, setCurrentStatus] = useState();
  const { updateDocument, response } = useFirestore('projects');

  const updateStatus = async (value) => {
    console.log(value);
    setCurrentStatus(value);
    updateDocument(project.id, {
      status: [value],
    });
    await closeStatus();
  };

  const handleStatusDropdown = () => {
    setProjectStatus(!projectStatus);
    console.log(projectStatus);
  };

  const closeStatus = () => {
    setProjectStatus(false);
    console.log(projectStatus);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (projectStatus && ref.current && !ref.current.contains(e.target) && !refbutton.current.contains(e.target)) {
        closeStatus();
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [handleStatusDropdown, closeStatus, projectStatus]);

  return (
    <StyledStatusButton>
      <button ref={refbutton} className={` btn ${projectStatus && 'active'}`} onClick={handleStatusDropdown}>
        {project.status}
        <img className='arrow-right' src={ArrowIcon} alt='arrow icon' />
      </button>
      {projectStatus && (
        <div ref={ref} className='status-dropdown'>
          <ul>
            {statusList.map((status) => (
              <li
                key={status}
                onClick={() => updateStatus(status)}
                className={`${currentStatus === status && 'active'}`}
              >
                {status}
              </li>
            ))}
          </ul>
        </div>
      )}
    </StyledStatusButton>
  );
};

const StyledStatusButton = styled.div`
  margin: 8px;
  .btn {
    background: var(--nice-gray);
    color: var(--heading-color);
    display: flex;
    align-items: center;
    justify-content: end;
    padding: 4px 4px 4px 12px;

    font-weight: 600;
    border: 2px solid var(--nice-gray);
    position: relative;
    &:hover {
      filter: brightness(0.9);
    }

    img {
      transition-duration: 0.2s;

      height: 2em;
      transform: rotate(-90deg);
      filter: invert(22%) sepia(0%) saturate(0%) hue-rotate(151deg) brightness(104%) contrast(85%);
    }
  }

  .status-dropdown {
    width: fit-content;
    display: flex;
    flex-direction: column;
    position: absolute;
    background: white;
    box-shadow: 3px 3px 9px 9px rgba(0, 0, 0, 0.05);
    padding: 4px;
    animation-direction: alternate;
    animation: fadeInAnimation ease-out 0.2s;
    border-radius: 0.5em;
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
      transition: 0.1s;
      border-radius: 0.3em;
      cursor: pointer;

      &:hover {
        background-color: var(--nice-gray);
      }
    }
    .active {
      background: var(--primary-color);
      color: white;
      &:hover {
        background: var(--primary-color);
        color: white;
      }
    }
  }
  button.active {
    border: 2px solid #999;
    filter: brightness(0.9);

    img {
      transform: rotate(90deg);
    }
  }
`;

export default StatusButton;
