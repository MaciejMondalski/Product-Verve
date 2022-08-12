import { useState } from 'react';
import { timestamp } from '../../firebase/config';
import { useAuthContext } from '../../hooks/useAuthContext';
import styled from 'styled-components';
import { useFirestore } from '../../hooks/useFirestore';
import Avatar from '../../components/Avatar';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import TrashIcon from '../../assets/trash_icon.svg';

const ProjectComments = ({ project }) => {
  const [newComment, setNewComment] = useState('');
  const { user } = useAuthContext();
  const { updateDocument, response } = useFirestore('projects');

  const commentsArray = project.comments;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      userId: user.uid,
    };

    const commentToAdd = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newComment,
      createdAt: timestamp.fromDate(new Date()),
      createdBy,
      id: Math.random(),
    };
    await updateDocument(project.id, {
      comments: [...commentsArray, commentToAdd],
    });
    if (!response.error) {
      setNewComment('');
    }
  };

  const handleDeleteComment = async (e, id) => {
    e.preventDefault();

    const filteredArray = commentsArray.filter((comment) => comment.id !== id);

    await updateDocument(project.id, {
      comments: [...filteredArray],
    });
  };

  return (
    <StyledComments>
      <h4>Project Comments</h4>

      <ul>
        {project.comments.length > 0 &&
          project.comments.map((comment) => (
            <li key={comment.id}>
              {user.uid === comment.createdBy.userId && (
                <img
                  className='delete-comment'
                  src={TrashIcon}
                  alt='trash icon'
                  onClick={(e) => {
                    handleDeleteComment(e, comment.id);
                  }}
                />
              )}

              <div className='comment-author'>
                <Avatar src={comment.photoURL} />
                <p>{comment.displayName}</p>
                <div className='comment-date'>
                  <p>{formatDistanceToNow(comment.createdAt.toDate(), { addSuffix: true })}</p>
                </div>
              </div>

              <div className='comment-content'>
                <p>{comment.content}</p>
              </div>
            </li>
          ))}
      </ul>

      <form className='add-comment' onSubmit={handleSubmit}>
        <label>
          <span>Add new comment:</span>
          <textarea required onChange={(e) => setNewComment(e.target.value)} value={newComment}></textarea>
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
    font-size: 0.9em;
    font-family: Poppins, sans-serif;
    resize: none;
    border-radius: 0.5em;
  }

  /* project comments */

  h4 {
    color: var(--heading-color);
  }

  li {
    padding: 0.7em;
    border-radius: 0.5em;
    border: 1px solid #f2f2f2;
    margin-top: 12px;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.05);
    background: #fff;
    position: relative;
  }

  .btn {
    margin-top: 0.6em;
  }

  .delete-comment {
    position: absolute;
    cursor: pointer;
    right: 0;
    top: 0;
    margin: 8px;
    height: 0.9em;
    filter: invert(45%) sepia(7%) saturate(250%) hue-rotate(202deg) brightness(93%) contrast(91%);
  }

  .comment-author {
    display: flex;
    align-items: center;
    color: var(--title-color);

    .avatar {
      width: 30px;
      height: 30px;
      margin-right: 10px;
    }
    .comment-date {
      color: var(--text-color);
      font-size: 0.7em;
      margin-left: 10px;
    }
  }

  .comment-content {
    color: black;
    font-size: 0.9em;
    margin: 0.9em 0 0 0;
  }
`;

export default ProjectComments;
