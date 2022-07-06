import ProjectCards from '../components/ProjectCards';
import ProjectList from '../components/ProjectList';
import { useCollection } from '../hooks/useCollection';
import styled from 'styled-components';
import ProjectFilter from '../components/ProjectFilter';
import { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useDashboardContext } from '../hooks/useDashboardContext';

function Dashboard() {
  const { documents, error } = useCollection('projects');
  const [currentFilter, setCurrentFilter] = useState('all');
  const { user } = useAuthContext();
  const { dispatch, view } = useDashboardContext();

  console.log(view);

  const handleView = async (e) => {
    console.log(e);
    if (e === 'list') {
      dispatch({ type: 'LIST', payload: e });
    }
    if (e === 'card') {
      dispatch({ type: 'CARD', payload: e });
    }
  };

  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter);
  };

  const projects = documents
    ? documents.filter((document) => {
        switch (currentFilter) {
          case 'all':
            return true;
          case 'mine':
            let assignedToMe = false;
            document.assignedUsersList.forEach((u) => {
              if (user.uid === u.id) {
                assignedToMe = true;
              }
            });
            return assignedToMe;
          case 'development':
          case 'design':
          case 'sales':
          case 'marketing':
            console.log(document.category, currentFilter);
            return document.category === currentFilter;
          default:
            return true;
        }
      })
    : null;

  return (
    <StyledDashboard>
      <h2 className='page-title'>Dashboard</h2>
      <button className='btn' onClick={() => handleView('list')}>
        List
      </button>
      <button className='btn' onClick={() => handleView('card')}>
        Card
      </button>
      {error && <p className='error'>{error}</p>}

      {documents && <ProjectFilter currentFilter={currentFilter} changeFilter={changeFilter} />}
      {projects && view === 'list' && <ProjectList projects={projects} />}
      {projects && view === 'card' && <ProjectCards projects={projects} />}
    </StyledDashboard>
  );
}

const StyledDashboard = styled.div``;
export default Dashboard;
