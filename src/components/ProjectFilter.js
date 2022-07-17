import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ArrowIcon from '../assets/arrow_icon.svg';
import { useState, useRef, useEffect, useCallback } from 'react';

const filterList = ['all', 'mine', 'development', 'design', 'marketing', 'sales'];

const ProjectFilter = ({ currentFilter, changeFilter }) => {
  const [CategoryFilterStatus, setCategoryFilterStatus] = useState(false);
  const navigate = useNavigate();
  const ref = useRef(null);
  const filterbtn = useRef(null);

  const handleClick = (newFilter) => {
    changeFilter(newFilter);
    setCategoryFilterStatus(!CategoryFilterStatus);
    navigate('/dashboard/page-1');
  };

  const handleFilterPicker = () => {
    setCategoryFilterStatus(!CategoryFilterStatus);
    console.log(CategoryFilterStatus);
  };

  const closeFilterPicker = () => {
    setCategoryFilterStatus(false);
    console.log(CategoryFilterStatus);
  };

  //  <StyledProjectFilter>
  //  <nav>
  //  <p>Filter by: </p>
  //  {filterList.map((category) => (
  //    <button
  //      key={category}
  //      onClick={() => handleClick(category)}
  //      className={currentFilter === category ? 'active' : ''}
  //    >
  //      {category}
  //    </button>
  //  ))}
  //  </nav>
  //  </StyledProjectFilter>

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (CategoryFilterStatus && ref.current && !ref.current.contains(e.target)) {
        closeFilterPicker();
        console.log(ref);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [handleFilterPicker, filterbtn]);

  return (
    <StyledFilters ref={ref}>
      <button filterbtn={ref} className={` btn ${CategoryFilterStatus && 'active'}`} onClick={handleFilterPicker}>
        <p>Category</p> <img className='arrow-right' src={ArrowIcon} alt='arrow icon' />
      </button>
      {CategoryFilterStatus && (
        <div className='filter-picker'>
          <ul>
            {filterList.map((category) => (
              <li
                key={category}
                onClick={() => handleClick(category)}
                className={` category ${currentFilter === category && 'active'}`}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
      )}
    </StyledFilters>
  );
};

const StyledFilters = styled.div`
  margin: 20px 0;
  width: fit-content;
  position: relative;
  z-index: 1;

  .btn {
    background: var(--nice-gray);
    border: none;
    color: var(--heading-color);
    display: flex;
    align-items: center;
    justify-content: end;
    padding: 6px 4px 6px 12px;
    font-weight: 600;
    border: 2px solid var(--nice-gray);

    &:hover {
      filter: brightness(0.9);
    }

    img {
      transition-duration: 0.2s;

      height: 2em;
      transform: rotate(-90deg);
      filter: invert(22%) sepia(0%) saturate(0%) hue-rotate(151deg) brightness(104%) contrast(85%);
    }
  }

  button.active {
    border: 2px solid var(--heading-color);
    filter: brightness(0.9);

    img {
      transform: rotate(90deg);
    }
  }

  .filter-picker {
    width: fit-content;
    display: flex;
    flex-direction: column;
    position: absolute;
    background: white;
    box-shadow: 3px 3px 9px 9px rgba(0, 0, 0, 0.05);
    padding: 8px;
    animation-direction: alternate;
    animation: fadeInAnimation ease-out 0.2s;
    border-radius: 0.5em;
    margin-top: 6px;

    @keyframes fadeInAnimation {
      0% {
        opacity: 0%;
      }
      100% {
        opacity: 1;
      }
    }

    .category {
      padding: 6px 8px;
      transition: 0.1s;
      border-radius: 6px;

      &:hover {
        background-color: var(--nice-gray);
      }
    }
    .active {
      background: var(--primary-color);
      color: white;
      &:hover {
        background: var(--primary-color);
        color: white;
      }
    }
  }
`;

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
