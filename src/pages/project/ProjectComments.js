import { useState } from 'react';
import { timestamp } from '../../firebase/config';
import { useAuthContext } from '../../hooks/useAuthContext';
import styled from 'styled-components';

const ProjectComments = () => {
  const [newComment, setNewComment] = useState('');
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const commentToAdd = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newComment,
      createdAt: timestamp.fromDate(new Date()),
      id: Math.random(),
    };
    console.log(commentToAdd);
  };

  return (
    <StyledComments>
      <h4>Project Comments</h4>
      <form className='add-comment' onSubmit={handleSubmit}>
        <label>
          <span>Add new comment:</span>
          <textarea
            required
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
          ></textarea>
        </label>
        <button className='btn'>Add Comment</button>
      </form>
    </StyledComments>
  );
};

const StyledComments = styled.div`
  label {
    margin-bottom: 0px;
  }
  textarea {
    min-height: 40px;
    font-size: 1.5em;
  }
`;

export default ProjectComments;