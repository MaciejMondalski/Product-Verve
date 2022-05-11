import ProjectList from '../components/ProjectList';
import { useCollection } from '../hooks/useCollection';

function Dashboard() {
  const { documents, error } = useCollection('projects');
  return (
    <div>
      <h2 className='page-title'>Dashboard</h2>
      {error && <p className='error'>{error}</p>}
      {documents && <ProjectList projects={documents} />}
    </div>
  );
}

export default Dashboard;
