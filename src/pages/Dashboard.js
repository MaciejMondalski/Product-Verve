import ProjectCards from '../components/ProjectCards';
import ProjectList from '../components/ProjectList';
import { useCollection } from '../hooks/useCollection';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useDashboardContext } from '../hooks/useDashboardContext';
import { usePaginationContext } from '../hooks/usePaginationContext';
import Pagination from '../components/Pagination';
import { useParams } from 'react-router-dom';
import FilterBar from '../components/filter/FilterBar';

function Dashboard() {
  const { documents, error } = useCollection('projects');
  const [currentCategoryFilter, setCurrentCategoryFilter] = useState('All');
  const [currentStatusFilter, setCurrentStatusFilter] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState();

  const { user } = useAuthContext();
  const { dispatch, view } = useDashboardContext();
  const { pageId } = useParams();

  // Pagination
  const [loading, setLoading] = useState(false);
  // const [currentPage, setCurrentPage] = useState(1);
  const { currentPage, setCurrentPage } = usePaginationContext();

  const [itemsPerPage, setItemsPerPage] = useState(8);
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

  useEffect(() => {
    const unsub = () => {
      const filteredArray = documents
        ? documents.filter((document) => {
            switch (currentCategoryFilter) {
              case 'all':
                if (currentStatusFilter === 'All') {
                  return true;
                } else {
                  return document.status == currentStatusFilter;
                }
              case 'mine':
                let assignedToMe = false;
                document.assignedUsersList.forEach((u) => {
                  if (u.id === user.uid) {
                    assignedToMe = true;
                  }
                });
                if (currentStatusFilter === 'All') {
                  return assignedToMe;
                } else {
                  return assignedToMe && document.status == currentStatusFilter;
                }
              case 'development':
              case 'design':
              case 'sales':
              case 'marketing':
                if (currentStatusFilter === 'All') {
                  return document.category === currentCategoryFilter;
                } else {
                  return document.category === currentCategoryFilter && document.status == currentStatusFilter;
                }
              default:
                return true;
            }
          })
        : null;

      setFilteredProjects(filteredArray);
    };
    unsub();
  }, [documents, currentCategoryFilter, currentStatusFilter]);

  useEffect(() => {
    if (filteredProjects) {
      const unsub = () => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const items = filteredProjects.slice(indexOfFirstItem, indexOfLastItem);
        setCurrentItems(items);
      };
      unsub();
    }
  }, [filteredProjects, currentPage, documents]);

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
      <p className='page-title'>Dashboard</p>
      <button className='btn' onClick={() => handleView('list')}>
        List
      </button>
      <button className='btn' onClick={() => handleView('card')}>
        Card
      </button>
      {error && <p className='error'>{error}</p>}
      {documents && (
        <FilterBar
          currentStatusFilter={currentStatusFilter}
          setCurrentStatusFilter={setCurrentStatusFilter}
          currentCategoryFilter={currentCategoryFilter}
          setCurrentCategoryFilter={setCurrentCategoryFilter}
        />
      )}
      {currentItems && view === 'list' && <ProjectList filteredProjects={currentItems} />}
      {currentItems && view === 'card' && <ProjectCards filteredProjects={currentItems} />}
      {currentItems && filteredProjects && (
        <Pagination itemsPerPage={itemsPerPage} totalItems={filteredProjects.length} paginate={paginate} />
      )}
    </StyledDashboard>
  );
}

const StyledDashboard = styled.div`
  .page-title {
    font-size: 2.5em;
    font-weight: 500;
    color: var(--heading-color);
  }
`;
export default Dashboard;
