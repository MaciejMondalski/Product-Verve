import styled from 'styled-components';
import { useInitiativesContext } from '../../hooks/useInitiativesContext';
import CategoryFilter from './CategoryFilter';
import StatusFilter from './StatusFilter';

const FilterBar = ({
  handleView,
  currentStatusFilter,
  setCurrentStatusFilter,
  currentCategoryFilter,
  setCurrentCategoryFilter,
}) => {
  const { view } = useInitiativesContext();

  return (
    <StyledFilterBar>
      <div className={`view-toggle  ${view === 'list' ? 'toggle-list' : 'toggle-card'} `}>
        <div className='list' onClick={() => handleView('list')}>
          List
        </div>
        <div className='card' onClick={() => handleView('card')}>
          Card
        </div>
      </div>
      <div className='filters'>
        <StatusFilter currentStatusFilter={currentStatusFilter} setCurrentStatusFilter={setCurrentStatusFilter} />
        <CategoryFilter
          currentCategoryFilter={currentCategoryFilter}
          setCurrentCategoryFilter={setCurrentCategoryFilter}
        />
      </div>
    </StyledFilterBar>
  );
};

const StyledFilterBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .view-toggle {
    background-color: aliceblue;
    display: flex;
    justify-content: space-around;
    position: relative;
    align-items: center;

    .list {
      background-color: lightblue;
      padding: 4px;
      text-align: center;
      width: 40px;
    }

    .card {
      background-color: lightgreen;
      padding: 4px;
      text-align: center;
      width: 40px;
    }
  }

  .filters {
    margin: 20px 0;
    z-index: 2;
    display: flex;
  }
`;

export default FilterBar;
