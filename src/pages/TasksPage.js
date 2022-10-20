import ProjectGrid from '../components/ProjectGrid';
import ProjectList from '../components/ProjectList';
import { useCollection } from '../hooks/useCollection';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useViewContext } from '../hooks/useViewContext';
import { usePaginationContext } from '../hooks/usePaginationContext';
import Pagination from '../components/Pagination';
import { useParams } from 'react-router-dom';
import FilterBar from '../components/filter/FilterBar';
import ProjectBoard from '../components/ProjectBoard';
import { useProjectContext } from '../hooks/useProjectContext';

function TasksPage() {
  const { currentProject, urlCurrentProject } = useProjectContext();
  const { documents, error } = useCollection('projects', ['projectGroup.projectName', 'in', [`${currentProject}`]]);
  const [currentCategoryFilter, setCurrentCategoryFilter] = useState('All');
  const [currentStatusFilter, setCurrentStatusFilter] = useState('All');
  const [sortedProjects, setSortedProjects] = useState();
  const [filteredProjects, setFilteredProjects] = useState();

  const { user } = useAuthContext();
  const { dispatch, view } = useViewContext();
  const { pageId } = useParams();

  // Pagination
  const { currentPage, setCurrentPage } = usePaginationContext();

  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [currentItems, setCurrentItems] = useState();

  const handleView = async (e) => {
    console.log(e);
    if (e === 'list') {
      dispatch({ type: 'LIST', payload: e });
    }
    if (e === 'grid') {
      dispatch({ type: 'GRID', payload: e });
    }
    if (e === 'board') {
      dispatch({ type: 'BOARD', payload: e });
    }
  };

  useEffect(() => {
    const unsub = () => {
      if (documents) {
        const sortedArray = documents.sort(function (a, b) {
          return a.index - b.index;
        });

        setSortedProjects(sortedArray);

        const filteredArray = sortedArray
          ? sortedArray.filter((document) => {
              switch (currentCategoryFilter) {
                case 'All':
                  if (currentStatusFilter === 'All') {
                    return true;
                  } else {
                    return document.status == currentStatusFilter;
                  }
                case 'Mine':
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
                case 'Development':
                case 'Design':
                case 'Sales':
                case 'Marketing':
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
      }
    };
    unsub();
  }, [documents, currentCategoryFilter, currentStatusFilter, user.uid]);

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
  }, [filteredProjects, currentPage, documents, itemsPerPage]);

  // Maintain page after refresh
  useEffect(() => {
    const filteredPageId = () => {
      const filteredPageId = pageId.substring(5, 7);
      setCurrentPage(filteredPageId);
    };
    filteredPageId();
  }, [pageId, setCurrentPage]);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <StyledProjects>
      <h2 className='page-title'>Projects</h2>

      {error && <p className='error'>{error}</p>}
      {documents && (
        <FilterBar
          handleView={handleView}
          currentStatusFilter={currentStatusFilter}
          setCurrentStatusFilter={setCurrentStatusFilter}
          currentCategoryFilter={currentCategoryFilter}
          setCurrentCategoryFilter={setCurrentCategoryFilter}
        />
      )}
      {currentItems && view === 'board' && (
        <ProjectBoard filteredProjects={currentItems} allProjects={sortedProjects} />
      )}
      {currentItems && view === 'list' && (
        <ProjectList urlCurrentProject={urlCurrentProject} filteredProjects={currentItems} />
      )}
      {currentItems && view === 'grid' && (
        <ProjectGrid urlCurrentProject={urlCurrentProject} filteredProjects={currentItems} />
      )}
      {view !== 'board' && filteredProjects && (
        <Pagination itemsPerPage={itemsPerPage} totalItems={filteredProjects.length} paginate={paginate} />
      )}
    </StyledProjects>
  );
}

const StyledProjects = styled.div`
  .page-title {
    font-size: 2.5em;
    font-weight: 500;
    color: var(--heading-color);
  }
`;
export default TasksPage;
