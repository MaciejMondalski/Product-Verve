import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useDocument } from '../../hooks/useDocument';
import ProjectSummary from './ProjectSummary';
import ProjectComments from './ProjectComments';

function Project() {
  const { id } = useParams();
  const { error, document } = useDocument('projects', id);

  if (error) {
    return <div className='error'>{error}</div>;
  }

  if (!document) {
    return <div className='loading'>Loading...</div>;
  }
  return (
    <StyledProject>
      <ProjectSummary project={document} />
      <ProjectComments project={document} />
    </StyledProject>
  );
}

const StyledProject = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  align-items: start;
  grid-gap: 60px;
  width: 100%;
`;

export default Project;
