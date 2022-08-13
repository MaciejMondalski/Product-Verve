import { Link } from 'react-router-dom';
import styled from 'styled-components';

const BoardTile = ({ project }) => {
  return (
    <StyledBoardTile>
      <Link to={`/projects/${project.id}`} key={project.id}>
        <div className='top-part'>
          <h4>{project.name}</h4>
          <p>Due by {project.dueDate.toDate().toDateString()}</p>
        </div>
      </Link>
    </StyledBoardTile>
  );
};

const StyledBoardTile = styled.div`
  padding: 1em;
  margin-bottom: 8px;
  width: 100%;
  height: 50px;
  background: #fff;
  border-radius: 0.5em;
  border: 1px solid var(--nice-gray);
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.05);
  transition: transform 0.13s;

  .top-part {
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;

    h4 {
      margin-bottom: 0.4em;
    }
  }

  a {
    text-decoration: none;
    color: var(--heading-color);
  }

  p {
    color: var(--text-color);
    font-size: 0.8em;
  }

  &:hover {
    transform: scale(1.02);
  }
`;

export default BoardTile;
