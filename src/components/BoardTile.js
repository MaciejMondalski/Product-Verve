import { Link } from 'react-router-dom';
import { useState } from 'react';

import styled from 'styled-components';
import Avatar from './Avatar';

const BoardTile = ({ project }) => {
  const [shownName, setShowName] = useState(null);

  return (
    <StyledBoardTile>
      <Link to={`/project/${project.id}`} key={project.id}>
        <div className='top-part'>
          <h4>{project.name}</h4>
          <p>Due by {project.dueDate.toDate().toDateString()}</p>
          <div className='bottom-part'>
            <p
              className={`priority ${
                project.priority === 'High'
                  ? 'high'
                  : project.priority === 'Medium'
                  ? 'medium'
                  : project.priority === 'Low' && 'low'
              }`}
            >
              {project.priority}
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
        </div>
      </Link>
    </StyledBoardTile>
  );
};

const StyledBoardTile = styled.div`
  padding: 1em;
  margin-bottom: 8px;
  width: 100%;
  background: #fff;
  border-radius: 0.5em;
  border: 1px solid var(--nice-gray);
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.05);
  transition: transform 0.13s;

  .top-part {
    h4 {
      margin-bottom: 0.4em;
    }

    .priority {
      color: black;
      margin-top: 0;
    }
  }

  .bottom-part {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0.4em;

    ul {
      display: flex;
    }
    li {
      margin-left: -0.9em;
      position: relative;
      transition: 0.2s;
    }
    .avatar {
      width: 2.2em;
      height: 2.2em;
      border: 1px solid #fff;
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
