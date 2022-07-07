import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Avatar from './Avatar';

function ProjectCards({ projects }) {
  return (
    <StyledProjectCards>
      {projects.length === 0 && <p>No projects yet!</p>}
      {projects.map((project) => (
        <Link to={`/projects/${project.id}`} key={project.id}>
          <h4>{project.name}</h4>
          <p>Due by {project.dueDate.toDate().toDateString()}</p>
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
        </Link>
      ))}
    </StyledProjectCards>
  );
}

const StyledProjectCards = styled.div`
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 20px;
  a {
    background-color: #fff;
    padding: 16px;
    border-radius: 0.5em;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.05);
    text-decoration: none;
    color: inherit;
    transition-duration: 0.2s;

    &:hover {
      transform: scale(1.02);
      box-shadow: 4px 4px 7px rgba(0, 0, 0, 0.04);
      filter: brightness(0.97);
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
  .assigned-to {
    margin-top: 20px;
    padding-top: 10px;
    border-top: 1px solid #eee;
  }
  ul {
    margin: 10px 0;
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
