import styled from 'styled-components';
import { useCollection } from '../hooks/useCollection';
import Avatar from './Avatar';
import { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

// icon
import ArrowIcon from '../assets/arrow_icon.svg';

function UserList() {
  const { documents, error } = useCollection('users');
  const [userListStatus, setUserListStatus] = useState(false);
  const { user: loggedInUser } = useAuthContext();

  return (
    <StyledUserList>
      <div className={`userlist-wrapper ${userListStatus ? 'active-userlist' : ''}`}>
        <div className='top-row'>
          <h2>User List</h2>
          <img className='arrow' src={ArrowIcon} alt='arrow icon' onClick={() => setUserListStatus(!userListStatus)} />
        </div>
        {error && <div className='error'>{error}</div>}
        <div className='user-list'>
          <div className='user-list-item'>
            <div className='user-wrapper'>
              <Avatar src={loggedInUser.photoURL} />
              <span>{loggedInUser.displayName}</span>
            </div>
            <span className='online-user'></span>
          </div>
          {documents &&
            documents
              .filter((user) => user.id !== loggedInUser.uid)
              .map((user) => (
                <div key={user.id} className='user-list-item'>
                  <div className='user-wrapper'>
                    <Avatar src={user.photoURL} />
                    <span>{user.displayName}</span>
                  </div>
                  {user.online && <span className='online-user'></span>}
                </div>
              ))}
        </div>
      </div>
    </StyledUserList>
  );
}

// {`library ${userListStatus ? 'active-userlist' : ''}`}

const StyledUserList = styled.div`
  .userlist-wrapper {
    min-width: 230px;
    min-height: 100%;
    box-sizing: border-box;
    background: #fbfbfb;
    color: var(--heading-color);
    border-radius: 6px;
    box-shadow: -3px -3px 5px rgba(0, 0, 0, 0.05);

    position: fixed;
    top: 0em;
    right: 0em;
    overflow: scroll;
    transform: translateY(95%);
    transition: all 0.5s ease;
  }

  .active-userlist {
    transform: translateY(4.2em);

    .arrow {
      transform: rotate(90deg);
    }
  }

  .top-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 3px solid rgba(185, 185, 185, 0.322);
    margin: 0;

    h2 {
      font-size: 1.1em;
      padding: 10px 0;
      margin: 0 14px;
    }

    img {
      transition: 0.2s ease;
      margin: 0 14px;
      transform: rotate(-90deg);
      border-radius: 50%;
      padding: 6px;

      &:hover {
        background: rgba(214, 214, 214, 1);
      }
    }
  }

  .user-list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(185, 185, 185, 0.322);
    padding: 10px 12px;

    .user-wrapper {
      display: flex;
      align-items: center;
    }

    .online-user {
      margin: 0 10px;
      width: 12px;
      height: 12px;
      background: #0ebb50;
      border-radius: 50%;
      justify-self: left;
    }
  }

  .avatar {
    margin-right: 10px;
    width: 40px;
    height: 40px;
  }
`;

export default UserList;
