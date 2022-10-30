import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useDocument } from '../../hooks/useDocument';
import TaskSummary from './TaskSummary';
import TaskComments from './TaskComments';

function Task() {
  const { id } = useParams();
  const { error, document } = useDocument('projects', id);

  if (error) {
    return <div className='error'>{error}</div>;
  }

  if (!document) {
    return <div className='loading'>Loading...</div>;
  }
  return (
    <StyledTask>
      <TaskSummary project={document} />
      <TaskComments project={document} />
    </StyledTask>
  );
}

const StyledTask = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  align-items: start;
  grid-gap: 30px;
  width: 100%;
`;

export default Task;
