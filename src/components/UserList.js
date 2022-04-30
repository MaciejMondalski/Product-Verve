import styled from 'styled-components';
import { useCollection } from '../hooks/useCollection';
import Avatar from './Avatar';

function UserList() {
  const { documents, error } = useCollection('users');
  return (
    <StyledUserList>
      <h2>All Users</h2>
      {error && <div className='error'>{error}</div>}
      <div className='user-list'>
        {documents &&
          documents.map((user) => (
            <div key={user.id} className='user-list-item'>
              <div className='user-wrapper'>
                <Avatar src={user.photoURL} />
                <span>{user.displayName}</span>
              </div>
              {user.online && <span className='online-user'></span>}
            </div>
          ))}
      </div>
    </StyledUserList>
  );
}

const StyledUserList = styled.div`
  width: 250px;
  min-height: 250px;
  box-sizing: border-box;
  background: #fbfbfb;
  color: var(--heading-color);

  h2 {
    text-align: left;
    margin: 10px 20px;
    font-size: 1.2em;
    border-bottom: 1px solid rgba(185, 185, 185, 0.322);
    padding: 10px 0;
  }

  .user-list {
    padding: 0 20px;
  }

  .user-list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px auto;

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
