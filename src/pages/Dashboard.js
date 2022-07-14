import ProjectCards from '../components/ProjectCards';
import ProjectList from '../components/ProjectList';
import { useCollection } from '../hooks/useCollection';
import styled from 'styled-components';
import ProjectFilter from '../components/ProjectFilter';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useDashboardContext } from '../hooks/useDashboardContext';
import { usePaginationContext } from '../hooks/usePaginationContext';
import Pagination from '../components/Pagination';
import { useParams } from 'react-router-dom';

function Dashboard() {
  const { documents, error } = useCollection('projects');
  const [currentFilter, setCurrentFilter] = useState('all');
  const { user } = useAuthContext();
  const { dispatch, view } = useDashboardContext();
  const { pageId } = useParams();

  // Pagination
  const [loading, setLoading] = useState(false);
  // const [currentPage, setCurrentPage] = useState(1);
  const { currentPage, setCurrentPage } = usePaginationContext();

  const [itemsPerPage, setItemsPerPage] = useState(2);
  const [currentItems, setCurrentItems] = useState();

  const handleView = async (e) => {
    console.log(e);
    if (e === 'list') {
      dispatch({ type: 'LIST', payload: e });
    }
    if (e === 'card') {
      dispatch({ type: 'CARD', payload: e });
    }
  };

  const projects = documents
    ? documents.filter((document) => {
        switch (currentFilter) {
          case 'all':
            return true;
          case 'mine':
            let assignedToMe = false;
            document.assignedUsersList.forEach((u) => {
              if (u.id === user.uid) {
                assignedToMe = true;
              }
            });
            return assignedToMe;
          case 'development':
          case 'design':
          case 'sales':
          case 'marketing':
            return document.category === currentFilter;
          default:
            return true;
        }
      })
    : null;

  useEffect(() => {
    if (projects) {
      const unsub = () => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const items = projects.slice(indexOfFirstItem, indexOfLastItem);
        setCurrentItems(items);
        console.log(projects);
      };
      unsub();
    }
  }, [currentFilter, currentPage, documents]);

  // Maintain page after refresh
  useEffect(() => {
    const filteredPageId = () => {
      const filteredPageId = pageId.substring(5, 7);
      setCurrentPage(filteredPageId);
    };
    filteredPageId();
  }, [pageId]);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

      {documents && <ProjectFilter currentFilter={currentFilter} changeFilter={setCurrentFilter} />}
      {currentItems && view === 'list' && <ProjectList projects={currentItems} />}
      {currentItems && view === 'card' && <ProjectCards projects={currentItems} />}
      {currentItems && projects && (
        <Pagination itemsPerPage={itemsPerPage} totalItems={projects.length} paginate={paginate} projects={projects} />
      )}
    </StyledDashboard>
  );
}

const StyledDashboard = styled.div``;
export default Dashboard;
