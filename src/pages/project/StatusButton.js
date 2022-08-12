import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useFirestore } from '../../hooks/useFirestore';
import ArrowIcon from '../../assets/arrow_icon.svg';

const statusList = ['To Do', 'In Progress', 'Done', 'Blocked'];

const StatusButton = ({ project }) => {
  const ref = useRef(null);
  const refbutton = useRef(null);
  const [projectStatusButton, setProjectStatusButton] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(project.status);
  const { updateDocument, response } = useFirestore('projects');

  const updateStatus = async (value) => {
    console.log(value);
    setCurrentStatus(value);
    updateDocument(project.id, {
      status: value,
    });
    await closeStatus();
  };

  const handleStatusDropdown = () => {
    setProjectStatusButton(!projectStatusButton);
    console.log(projectStatusButton);
  };

  const closeStatus = () => {
    setProjectStatusButton(false);
    console.log(projectStatusButton);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        projectStatusButton &&
        ref.current &&
        !ref.current.contains(e.target) &&
        !refbutton.current.contains(e.target)
      ) {
        closeStatus();
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [handleStatusDropdown, closeStatus, projectStatusButton]);

  return (
    <StyledStatusButton>
      <div className={`${projectStatusButton && 'active'}`}>
        <button
          ref={refbutton}
          className={`btn   ${
            project.status == 'To Do'
              ? 'gray'
              : project.status == 'In Progress'
              ? 'blue'
              : project.status == 'Done'
              ? 'green'
              : project.status == 'Blocked' && 'red'
          } `}
          onClick={handleStatusDropdown}
        >
          <div>{project.status}</div>
          <img className='arrow-right' src={ArrowIcon} alt='arrow icon' />
        </button>
      </div>
      {projectStatusButton && (
        <div ref={ref} className='status-dropdown'>
          <ul>
            {statusList.map((status) => (
              <li
                key={status}
                onClick={() => updateStatus(status)}
                className={`${currentStatus == status && 'active'}`}
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
    display: flex;
    align-items: center;
    justify-content: end;
    padding: 4px 4px 4px 12px;

    font-weight: 600;
    border: none;
    position: relative;

    &:hover {
      filter: brightness(0.9);
    }

    img {
      transition-duration: 0.2s;
      height: 2em;
      transform: rotate(-90deg);
    }
  }

  div.active {
    button {
      filter: brightness(0.9);

      img {
        transform: rotate(90deg);
      }
    }
  }

  .status-dropdown {
    width: fit-content;
    display: flex;
    flex-direction: column;
    position: absolute;
    background: white;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.05);
    border: 1px solid var(--nice-gray);
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
      margin: 3px;
      transition: 0.1s;
      border-radius: 0.3em;
      cursor: pointer;

      &:hover {
        background-color: var(--nice-gray);
      }
    }
    li.active {
      background: var(--primary-color);
      color: white;
      &:hover {
        background: var(--primary-color);
        color: white;
      }
    }
  }
`;

export default StatusButton;
