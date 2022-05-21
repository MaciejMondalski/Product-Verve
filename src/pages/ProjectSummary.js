import styled from 'styled-components';
import Avatar from '../components/Avatar';

const ProjectSummary = ({ project }) => {
  return (
    <StyledProjectSummary>
      <div className='project-summary'>
        <h2 className='page-title'>{project.name}</h2>
        <p className='due-date'>
          Project due by {project.dueDate.toDate().toDateString()}
        </p>
        <p className='details'>{project.details}</p>
        <h4>Project is assigned to:</h4>
        <div className='assigned-users'>
          {project.assignedUsersList.map((user) => (
            <div key={user.id}>
              <Avatar src={user.photoURL} />
            </div>
          ))}{' '}
        </div>
      </div>
    </StyledProjectSummary>
  );
};

const StyledProjectSummary = styled.div`
  /* project summary */
  .project-summary {
    background-color: #fff;
    padding: 30px;
    border-radius: 4px;
    margin-top: 20px;

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
    h4 {
      color: var(--text-color);
      font-size: 0.9em;
    }
    .assigned-users {
      display: flex;
      margin-top: 20px;

      .avatar {
        margin-right: 10px;
      }
      .btn {
        margin-top: 20px;
      }
    }
  }
`;

export default ProjectSummary;
