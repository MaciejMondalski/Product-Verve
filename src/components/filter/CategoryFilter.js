import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ArrowIcon from '../../assets/arrow_icon.svg';
import { useState, useRef, useEffect } from 'react';

const filterList = ['All', 'Mine', 'Development', 'Design', 'Marketing', 'Sales'];

const CategoryFilter = ({ currentCategoryFilter, setCurrentCategoryFilter }) => {
  const [categoryFilterButton, setCategoryFilterButton] = useState(false);
  const navigate = useNavigate();
  const ref = useRef(null);

  const handleClick = (newFilter) => {
    setCurrentCategoryFilter(newFilter);
    setCategoryFilterButton(!categoryFilterButton);
    navigate('/dashboard/page-1');
  };

  const handleFilterPicker = () => {
    setCategoryFilterButton(!categoryFilterButton);
    console.log(categoryFilterButton);
  };

  const closeFilterPicker = () => {
    setCategoryFilterButton(false);
    console.log(categoryFilterButton);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (categoryFilterButton && ref.current && !ref.current.contains(e.target)) {
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
      <p className='filter-title'>Category</p>

      <div className='filter-wrapper' ref={ref}>
        <button className={` filter-btn ${categoryFilterButton && 'active'}`} onClick={handleFilterPicker}>
          <p>{currentCategoryFilter}</p> <img className='arrow-right' src={ArrowIcon} alt='arrow icon' />
        </button>
        {categoryFilterButton && (
          <div className='filter-picker'>
            <ul>
              {filterList.map((category) => (
                <li
                  key={category}
                  onClick={() => handleClick(category)}
                  className={` category ${currentCategoryFilter === category && 'active'}`}
                >
                  {category}
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
  .filter-title {
    font-size: 0.9em;
    color: var(--text-color);
    margin-bottom: 0.3em;
  }
  .filter-wrapper {
    position: relative;
  }

  .filter-btn {
    display: flex;
    align-items: center;
    justify-content: end;
    justify-content: space-between;
    width: 10em;

    &:hover {
      border: 1px solid var(--primary-color);
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
    display: flex;
    flex-direction: column;
    position: absolute;
    background: white;
    box-shadow: 3px 3px 9px 9px rgba(0, 0, 0, 0.05);
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

    .category {
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
