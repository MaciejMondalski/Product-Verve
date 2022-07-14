import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const filterList = ['all', 'mine', 'development', 'design', 'marketing', 'sales'];

const ProjectFilter = ({ currentFilter, changeFilter }) => {
  const navigate = useNavigate();
  const handleClick = (newFilter) => {
    changeFilter(newFilter);
    navigate('/dashboard/page-1');
  };

  return (
    <StyledProjectFilter>
      <nav>
        <p>Filter by: </p>
        {filterList.map((f) => (
          <button key={f} onClick={() => handleClick(f)} className={currentFilter === f ? 'active' : ''}>
            {f}
          </button>
        ))}
      </nav>
    </StyledProjectFilter>
  );
};

const StyledProjectFilter = styled.div`
  margin: 30px auto;

  nav {
    display: flex;
    padding: 10px;
    background-color: #fff;
    border-radius: 0.5em;
  }
  p {
    font-size: 0.9em;
    margin-right: 10px;
  }
  button {
    background: transparent;
    border: 0;
    font-family: inherit;
    font-weight: bold;
    color: var(--text-color);
    cursor: pointer;
    border-right: 1px solid #e4e4e4;
    font-size: 0.9em;
  }
  button:last-child {
    border: 0;
  }
  button.active {
    color: var(--primary-color);
  }
`;

export default ProjectFilter;
