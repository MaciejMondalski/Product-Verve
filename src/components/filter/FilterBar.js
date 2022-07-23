import styled from 'styled-components';
import CategoryFilter from './CategoryFilter';
import StatusFilter from './StatusFilter';

const FilterBar = ({
  currentStatusFilter,
  setCurrentStatusFilter,
  currentCategoryFilter,
  setCurrentCategoryFilter,
}) => {
  return (
    <StyledFilterBar>
      <StatusFilter currentStatusFilter={currentStatusFilter} setCurrentStatusFilter={setCurrentStatusFilter} />
      <CategoryFilter
        currentCategoryFilter={currentCategoryFilter}
        setCurrentCategoryFilter={setCurrentCategoryFilter}
      />
    </StyledFilterBar>
  );
};

const StyledFilterBar = styled.div`
  margin: 20px 0;
  z-index: 2;
  display: flex;
  justify-content: end;
`;

export default FilterBar;
