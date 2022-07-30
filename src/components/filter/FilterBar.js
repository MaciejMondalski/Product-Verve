import styled from 'styled-components';
import CategoryFilter from './CategoryFilter';
import StatusFilter from './StatusFilter';
import ViewToggle from './ViewToggle';

const FilterBar = ({
  handleView,
  currentStatusFilter,
  setCurrentStatusFilter,
  currentCategoryFilter,
  setCurrentCategoryFilter,
}) => {
  return (
    <StyledFilterBar>
      <ViewToggle handleView={handleView} />
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
  .filters {
    margin: 20px 0;
    z-index: 2;
    display: flex;
  }
`;

export default FilterBar;
