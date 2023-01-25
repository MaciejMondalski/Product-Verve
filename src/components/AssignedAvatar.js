import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useCollection } from '../hooks/useCollection';

const AssignedAvatar = (assignedUserId) => {
  const { documents, error } = useCollection('users');
  const [src, setSrc] = useState();

  useEffect(() => {
    const selectUser = documents && documents.filter((document) => document.id.includes(assignedUserId.src));
    const photoURL = selectUser && selectUser[0].photoURL;
    setSrc(photoURL);
  });

  //  const loggedInUser = documents && documents.filter((document) => document.id.includes(user.uid));
  //  //console.log(loggedInUser[0].selectedProjectId);
  //  loggedInUser && setProjectObject(loggedInUser[0].selectedProjectId);

  return (
    <StyledAvatar className='avatar'>
      <img src={src} alt='user avatar' />
    </StyledAvatar>
  );
};

const StyledAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
  }
`;

export default AssignedAvatar;
