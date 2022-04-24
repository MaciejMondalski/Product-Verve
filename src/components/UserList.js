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
            <div className='user-list-item'>
              <Avatar src={user.photoURL} />
              <span>{user.displayName}</span>
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
    justify-content: flex-start;
    align-items: center;
    margin: 20px auto;
  }

  .avatar {
    margin-right: 10px;
    width: 40px;
    height: 40px;
  }
`;

export default UserList;
