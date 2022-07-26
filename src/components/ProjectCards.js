import { Link } from 'react-router-dom';

import styled from 'styled-components';
import Avatar from './Avatar';

function ProjectCards({ filteredProjects }) {
  return (
    <StyledProjectCards>
      {filteredProjects.length === 0 && <p>No projects yet!</p>}
      {filteredProjects.map((project) => (
        <Link to={`/projects/${project.id}`} key={project.id}>
          <div>
            <h4>{project.name}</h4>
            <p>Due by {project.dueDate.toDate().toDateString()}</p>
          </div>
          <div className='lower-part'>
            <div className='assigned-to'>
              <p>
                <strong>Assigned to:</strong>
              </p>
              <ul>
                {project.assignedUsersList.map((user) => (
                  <li key={user.photoURL}>
                    <Avatar src={user.photoURL} />
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
            </div>{' '}
          </div>
        </Link>
      ))}
    </StyledProjectCards>
  );
}

const StyledProjectCards = styled.div`
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
      box-shadow: 4px 4px 7px rgba(0, 0, 0, 0.04);
      filter: brightness(0.98);
    }
  }
  h4 {
    font-size: 0.9em;
    color: var(--heading-color);
  }
  p {
    color: var(--text-color);
    font-size: 0.9em;
  }

  .lower-part {
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
    font-size: 0.9em;
    font-weight: 600;
  }

  .assigned-to {
    margin-top: 20px;
    padding-top: 10px;
    border-top: 1px solid #eee;
  }
  ul {
    margin: 10px 0 0 0;
    display: flex;
  }
  li {
    margin-right: 10px;
  }
  .avatar {
    width: 30px;
    height: 30px;
  }
`;

export default ProjectCards;
