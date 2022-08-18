import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import ArrowIcon from '../assets/arrow_icon.svg';
import { usePaginationContext } from '../hooks/usePaginationContext';

const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
  const { currentPage, setCurrentPage } = usePaginationContext();
  const [pageRange, setPageRange] = useState();

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const numberOfPages = pageNumbers.length;
  const firstPage = pageNumbers[0];
  const lastPage = pageNumbers.length;

  const indexCurrentPage = parseInt(currentPage - 1);
  const indexFirstPage = parseInt(firstPage - 1);
  const indexLastPage = parseInt(lastPage - 1);

  useEffect(() => {
    console.log('number of items changed');
  }, [totalItems]);

  useEffect(() => {
    console.log('current index is ' + pageNumbers);

    // There are more 4 pages or less
    if (numberOfPages <= 4) {
      const range = pageNumbers.slice(0, 3);
      setPageRange(range);
      console.log('condition 1');
    }
    // There are more than 4 pages
    else if (numberOfPages > 4) {
      // First 3 pages
      if (indexCurrentPage < 2) {
        const range = pageNumbers.slice(0, 3);
        setPageRange(range);
        console.log('condition 2');
      }

      // Page 3
      if (indexCurrentPage === 2) {
        const range = pageNumbers.slice(0, 4);
        setPageRange(range);
        console.log('condition 2 but for page 3');
      }

      // Last 3 pages
      if (indexLastPage - indexCurrentPage < 2) {
        const rangeStart = indexLastPage - 2;
        const rangeEnd = indexLastPage + 1;
        const range = pageNumbers.slice(rangeStart, rangeEnd);
        setPageRange(range);
        console.log('condition 3');
      }

      // Page 3 from end

      if (indexLastPage - indexCurrentPage === 2) {
        const rangeStart = indexLastPage - 3;
        const rangeEnd = indexLastPage + 1;
        const range = pageNumbers.slice(rangeStart, rangeEnd);
        setPageRange(range);
        console.log('condition 3 but for page 3 counting from end');
      }
      // Middle pages
      if (indexCurrentPage - 2 > indexFirstPage && indexCurrentPage + 2 < indexLastPage) {
        const rangeStart = indexCurrentPage - 1;
        const rangeEnd = indexCurrentPage + 2;
        const range = pageNumbers.slice(rangeStart, rangeEnd);
        setPageRange(range);
        console.log('condition 4');
      }
    }
  }, [currentPage, totalItems]);

  if (numberOfPages === 1) {
    return null;
  }
  return (
    <StyledPagination>
      <ul className='pagination'>
        {totalItems !== 0 && currentPage !== '1' && (
          <NavLink className={'img-wrapper'} to={`/projects/page-${currentPage === 1 ? '1' : currentPage - 1}`}>
            <img className='arrow-left' src={ArrowIcon} alt='arrow icon' />
          </NavLink>
        )}
        {currentPage > 3 && (
          <div className='dot-page'>
            <NavLink
              onClick={() => paginate(firstPage)}
              to={`/projects/${'page-' + firstPage}`}
              key={firstPage}
              className='page-number'
            >
              <h3>{firstPage}</h3>
            </NavLink>
            <h3>...</h3>
          </div>
        )}
        {pageRange && (
          <div className='page-list'>
            {pageRange.map((number) => (
              <NavLink
                onClick={() => paginate(number)}
                to={`/projects/${'page-' + number}`}
                key={number}
                className={`page-number ${currentPage !== number && 'not-current-page'}`}
              >
                <h3>{number}</h3>
              </NavLink>
            ))}
          </div>
        )}

        {lastPage - 2 > currentPage && numberOfPages > 4 && (
          <div className='dot-page'>
            <h3>...</h3>

            <NavLink
              onClick={() => paginate(lastPage)}
              to={`/projects/${'page-' + lastPage}`}
              key={lastPage}
              className='page-number'
            >
              <h3>{lastPage}</h3>
            </NavLink>
          </div>
        )}

        {totalItems !== 0 && parseInt(currentPage) !== lastPage && (
          <NavLink
            className={'img-wrapper'}
            to={`/projects/page-${currentPage === lastPage ? lastPage : parseInt(currentPage) + 1}`}
          >
            <img className='arrow-right' src={ArrowIcon} alt='arrow icon' />
          </NavLink>
        )}
      </ul>
    </StyledPagination>
  );
};

const StyledPagination = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2em;
  color: var(--heading-color);

  .pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .img-wrapper {
      display: flex;
      align-items: center;
    }
  }

  img {
    height: 2.5em;
    filter: invert(24%) sepia(0%) saturate(0%) hue-rotate(142deg) brightness(104%) contrast(93%);
  }

  .arrow-left {
    margin-right: 1em;
  }
  .arrow-right {
    transform: rotate(180deg);
    margin-left: 1em;
  }

  .page-list {
    display: flex;

    .active {
      background-color: var(--primary-color);
      color: white;
      transition-duration: 0.2s;

      &:hover {
        background-color: var(--primary-color);
      }
    }
  }

  .dot-page {
    display: flex;
    align-items: center;
  }

  .page-number {
    text-decoration: none;
    color: var(--heading-color);
    margin: 0.2em 0.3em;
    padding: 0.4em 1em;
    border-radius: 0.4em;

    &:hover {
      background: var(--nice-gray);
      transition-duration: 0.2s;
    }
  }

  h1 {
  }
`;

export default Pagination;
