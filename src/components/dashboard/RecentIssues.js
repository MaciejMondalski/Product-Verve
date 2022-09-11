import styled from 'styled-components';
import { useCollection } from '../../hooks/useCollection';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import Avatar from '../Avatar';

const RecentIssues = () => {
  const { documents: projects } = useCollection('projects', ['status', '==', 'To Do'], ['creationTimestamp', 'desc']);
  const [recentItems, setRecentItems] = useState();
  const [shownName, setShowName] = useState(null);

  useEffect(() => {
    if (projects) {
      const sortedRecent = projects.filter((project) => project.creationTimestamp !== undefined).slice(0, 3);

      setRecentItems(sortedRecent);
    }
  }, [projects]);

  return (
    <StyledRecent>
      <h2>Recently Added</h2>
      <ul className='table-header'>
        <li>Name</li>
        <li>Created</li>
        <li>Due Date</li>
        <li>Priority</li>
        <li>Asignee</li>
      </ul>

      {recentItems &&
        recentItems.map((project) => (
          <Link className='item' to={`/project/${project.id}`} key={project.id}>
            <ul>
              <li className='sub-item project-name'>
                <p>{project.name}</p>
              </li>
              <li className='sub-item'>
                <p> {formatDistanceToNow(project.createdAt.toDate(), { addSuffix: true })}</p>
              </li>
              <li className='sub-item'>
                <p>{project.dueDate.toDate().toDateString()}</p>
              </li>
              <li className='sub-item project-priority'>
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
              </li>
              <li className='sub-item assigned-to'>
                <ul>
                  {project.assignedUsersList.map((user) => (
                    <li
                      className={`assigne ${shownName === user && 'is-hovered'}`}
                      onMouseEnter={() => setShowName(user)}
                      onMouseLeave={() => setShowName(null)}
                      key={user.photoURL}
                    >
                      <Avatar className='avatar' src={user.photoURL} />
                      {shownName === user && <p className='hover-name'>{user.displayName}</p>}
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </Link>
        ))}
    </StyledRecent>
  );
};

const StyledRecent = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1.2em 1.4em;

  h2 {
    display: flex;
    color: var(--heading-color);
    padding: 0.4em 0.6em;
  }

  .table-header {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    color: var(--text-color);
    width: 100%;
    height: 3em;
    border-bottom: 1px solid var(--nice-gray);

    li {
      margin-left: 1em;

      :nth-child(1) {
        flex: 2.8;
        margin: 0;
      }
      :nth-child(2) {
        flex: 1.1;
      }
      :nth-child(3) {
        flex: 1.1;
      }
      :nth-child(4) {
        flex: 1;
      }
      :nth-child(5) {
        flex: 0.9;
      }
    }
  }

  .project-name {
    font-weight: 500;
  }

  .priority {
    font-size: 0.9em;
  }

  .item {
    text-decoration: none;
    color: var(--heading-color);
    border-bottom: 1px solid rgba(185, 185, 185, 0.322);
    &:hover {
      filter: brightness(0.97);
    }
    :nth-last-child(1) {
      border: none;
    }

    ul {
      height: 4em;
      display: flex;
      width: 100%;
      align-items: center;
      font-weight: 400;
      transition-duration: 0.2s;

      .sub-item {
        font-size: 0.9em;
      }

      li {
        margin-left: 1em;

        :nth-child(1) {
          flex: 2.8;
          margin: 0;
        }
        :nth-child(2) {
          flex: 1.1;
        }
        :nth-child(3) {
          flex: 1.1;
        }
        :nth-child(4) {
          flex: 1;
        }
        :nth-child(5) {
          flex: 0.9;
        }
      }
    }

    .assigned-to ul {
      display: flex;
      width: fit-content;

      .assigne {
        margin-left: -1.2em;
        :nth-child(1) {
          margin-left: 0;
        }
      }

      li {
        transition: 0.2s;
        overflow: visible;
      }

      .avatar {
        width: 2.5em;
        height: 2.5em;
        border: 1px solid #fff;
      }
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
      z-index: 200;
    }

    .is-hovered {
      transform: scale(1.05);
      z-index: 300;
      position: relative;
    }
  }
`;

export default RecentIssues;