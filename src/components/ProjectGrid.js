import { useState } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import Avatar from './Avatar';

function ProjectGrid({ filteredProjects, currentProject, urlCurrentProject }) {
  const [shownName, setShowName] = useState(null);

  return (
    <StyledProjectGrid>
      {filteredProjects.length === 0 && <p>No projects yet!</p>}
      {filteredProjects.map((project) => (
        <Link to={`/${urlCurrentProject}/task/${project.id}`} key={project.id}>
          <div className='top-part'>
            <h4>{project.name}</h4>
            <p>Due by {project.dueDate.toDate().toDateString()}</p>
            <p
              className={`priority ${
                !project.priority
                  ? null
                  : project.priority === 'High'
                  ? 'high'
                  : project.priority === 'Medium'
                  ? 'medium'
                  : project.priority === 'Low' && 'low'
              }`}
            >
              {project.priority}
            </p>
          </div>
          <div className='bottom-part'>
            <div className='assigned-to'>
              <p>
                <strong>Assigned to:</strong>
              </p>
              <ul>
                {project.assignedUsersList.map((user) => (
                  <li
                    className={`${shownName === user && 'is-hovered'}`}
                    onMouseEnter={() => setShowName(user)}
                    onMouseLeave={() => setShowName(null)}
                    key={user.photoURL}
                  >
                    <Avatar src={user.photoURL} />
                    {shownName === user && <p className='hover-name'>{user.displayName}</p>}
                  </li>
                ))}
              </ul>
            </div>
            <div
              className={`status-icon ${
                project.status == 'To Do'
                  ? 'gray'
                  : project.status == 'In Progress'
                  ? 'blue'
                  : project.status == 'Done'
                  ? 'green'
                  : project.status == 'Blocked' && 'red'
              }`}
            >
              {project.status}
            </div>
          </div>
        </Link>
      ))}
    </StyledProjectGrid>
  );
}

const StyledProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 20px;
  z-index: 0;

  a {
    background-color: #fff;
    padding: 16px;
    border-radius: 0.5em;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.05);
    text-decoration: none;
    color: inherit;
    transition-duration: 0.2s;
    border: 1px solid var(--nice-gray);

    &:hover {
      transform: scale(1.02);
      box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.05);
      filter: brightness(0.99);
    }
  }
  h4 {
    color: var(--heading-color);
    margin-bottom: 0.4em;
  }
  p {
    color: var(--text-color);
    font-size: 0.9em;
    margin-bottom: 0.4em;
  }

  .priority {
    color: black;
    margin: 0.8em 0;
  }

  .bottom-part {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .status-icon {
    padding: 3px 6px;
    transition: 0.1s;
    border-radius: 0.3em;
    display: flex;
    align-items: center;
    font-size: 1em;
    font-weight: 600;
  }

  .hover-name {
    position: absolute;
    background: grey;
    color: #fff;
    padding: 0.2em 0.4em;
    border-radius: 0.5em;
    top: 120%;
    left: 50%;
    transform: translate(-50%);
    text-align: center;
    white-space: nowrap;
  }

  .is-hovered {
    z-index: 5;
    transform: scale(1.05);
  }

  ul {
    margin: 10px 0 0 0;
    display: flex;
  }
  li {
    margin-right: -0.5em;
    position: relative;
    transition: 0.2s;
  }
  .avatar {
    width: 2.6em;
    height: 2.6em;
    border: 1px solid #fff;
  }
`;

export default ProjectGrid;
