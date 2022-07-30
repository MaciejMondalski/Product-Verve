import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ArrowIcon from '../../assets/arrow_icon.svg';
import { useState, useRef, useEffect } from 'react';

const statusFilterList = ['All', 'To Do', 'In Progress', 'Done', 'Blocked'];

const CategoryFilter = ({ currentStatusFilter, setCurrentStatusFilter }) => {
  const [statusFilterButton, setStatusFilterButton] = useState(false);
  const navigate = useNavigate();
  const ref = useRef(null);

  const handleClick = (newFilter) => {
    setCurrentStatusFilter(newFilter);
    setStatusFilterButton(!statusFilterButton);
    navigate('/initiatives/page-1');
  };

  const handleFilterPicker = () => {
    setStatusFilterButton(!statusFilterButton);
    console.log(statusFilterButton);
  };

  const closeFilterPicker = () => {
    setStatusFilterButton(false);
    console.log(statusFilterButton);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (statusFilterButton && ref.current && !ref.current.contains(e.target)) {
        closeFilterPicker();
        console.log(ref);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [handleFilterPicker]);

  return (
    <StyledCategoryFilter>
      <div className='filter-wrapper' ref={ref}>
        <p className='filter-title'>Status</p>
        <button className={` filter-btn ${statusFilterButton && 'active'}`} onClick={handleFilterPicker}>
          <p>{currentStatusFilter}</p> <img className='arrow-right' src={ArrowIcon} alt='arrow icon' />
        </button>
        {statusFilterButton && (
          <div className='filter-picker'>
            <ul>
              {statusFilterList.map((status) => (
                <li
                  key={status}
                  onClick={() => handleClick(status)}
                  className={` status ${currentStatusFilter === status && 'active'}`}
                >
                  {status}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </StyledCategoryFilter>
  );
};

const StyledCategoryFilter = styled.div`
  margin-right: 20px;
  .filter-title {
    font-size: 0.9em;
    color: var(--text-color);
    position: absolute;
    top: -20px;
    z-index: 5;
  }
  .filter-wrapper {
    position: relative;
    height: 2.7em;
  }

  .filter-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 10em;
    height: 2.8em;

    &:hover {
      border: 1px solid var(--primary-color);
      color: var(--primary-color);
    }

    img {
      transition-duration: 0.2s;
      height: 2em;
      transform: rotate(-90deg);
      filter: invert(22%) sepia(0%) saturate(0%) hue-rotate(151deg) brightness(104%) contrast(85%);
    }
  }

  button.active {
    border: 1px solid var(--primary-color);

    img {
      transform: rotate(90deg);
    }
  }

  .filter-picker {
    width: fit-content;
    white-space: nowrap;
    display: flex;
    flex-direction: column;
    position: absolute;
    background: white;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
    padding: 4px;
    animation-direction: alternate;
    animation: fadeInAnimation ease-out 0.2s;
    border-radius: 0.5em;
    margin-top: 6px;
    right: 0;
    z-index: 2;

    @keyframes fadeInAnimation {
      0% {
        opacity: 0%;
      }
      100% {
        opacity: 1;
      }
    }

    .status {
      padding: 3px 6px;
      margin: 3px;
      transition: 0.1s;
      border-radius: 0.3em;
      cursor: pointer;

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

export default CategoryFilter;
