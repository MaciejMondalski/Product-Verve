import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Avatar from './Avatar';

function ProjectList({ filteredProjects }) {
  return (
    <StyledProjectList>
      <ul className='table-header'>
        <li>Project Name</li>
        <li>Status</li>
        <li>Category</li>
        <li>Due Date</li>
        <li>Asignee</li>
      </ul>
      {filteredProjects.length === 0 && <p>No projects to display...</p>}
      {filteredProjects.map((project) => (
        <Link className='item' to={`/projects/${project.id}`} key={project.id}>
          <ul>
            <li className='sub-item project-name'>
              <p>{project.name}</p>
            </li>
            <li className='sub-item project-status'>
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
            </li>
            <li className='sub-item project-category'>
              <p>{project.category}</p>
            </li>
            <li className='sub-item due-date'>
              <p>{project.dueDate.toDate().toDateString()}</p>
            </li>
            <li className='sub-item assigned-to'>
              <ul>
                {project.assignedUsersList.map((user) => (
                  <li key={user.photoURL}>
                    <Avatar className='avatar' src={user.photoURL} />
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </Link>
      ))}
    </StyledProjectList>
  );
}

const StyledProjectList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--nice-gray);
  border-radius: 0.5em;
  overflow: hidden;

  .table-header {
    display: flex;
    align-items: center;
    font-weight: bold;
    width: 100%;
    height: 3em;
    font-size: 1em;
    background: #eaecf0;
    border-bottom: 1px solid var(--nice-gray);

    li {
      padding: 10px 20px;
      :nth-child(1) {
        flex: 3;
      }
      :nth-child(2) {
        flex: 1;
      }
      :nth-child(3) {
        flex: 1;
      }
      :nth-child(4) {
        flex: 1;
      }
      :nth-child(5) {
        flex: 1;
      }
    }
  }

  .item {
    text-decoration: none;
    color: var(--heading-color);
    border-bottom: 1px solid rgba(185, 185, 185, 0.322);
    background-color: white;
    &:hover {
      filter: brightness(0.97);
    }
    :nth-last-child(1) {
      border: none;
    }
  }

  .item ul {
    display: flex;
    width: 100%;
    align-items: center;
    font-weight: 400;
    transition-duration: 0.2s;

    .sub-item {
      padding: 10px 20px;
      font-size: 0.9em;
    }

    .project-name {
      flex: 3;
      font-weight: 600;
    }
    .project-status {
      flex: 1;
    }

    .project-category {
      flex: 1;
    }

    .due-date {
      flex: 1;
    }

    .status-icon {
      font-size: 0.9em;
      width: fit-content;
      padding: 3px 6px;
      transition: 0.1s;
      border-radius: 0.3em;
      cursor: pointer;
      display: flex;
      align-items: center;
      font-weight: 600;
    }

    .assigned-to {
      flex: 1;
      li {
        padding-right: 10px;
      }
      .avatar {
        width: 2em;
        height: 2em;
      }
    }

    .assigned-to ul {
      display: flex;
    }
  }
`;

export default ProjectList;
