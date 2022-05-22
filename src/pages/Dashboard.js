import ProjectList from '../components/ProjectList';
import { useCollection } from '../hooks/useCollection';
import styled from 'styled-components';

function Dashboard() {
  const { documents, error } = useCollection('projects');
  return (
    <StyledDashboard>
      <h2 className='page-title'>Dashboard</h2>
      {error && <p className='error'>{error}</p>}
      {documents && <ProjectList projects={documents} />}
    </StyledDashboard>
  );
}

const StyledDashboard = styled.div``;
export default Dashboard;
