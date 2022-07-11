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

  const firstPage = pageNumbers[0];
  const lastPage = pageNumbers.length;
  console.log(currentPage + ' out of ' + lastPage);

  const indexCurrentPage = parseInt(currentPage - 1);
  const indexFirstPage = parseInt(firstPage - 1);
  const indexLastPage = parseInt(lastPage - 1);

  useEffect(() => {
    console.log('current index is ' + indexCurrentPage);

    if (indexCurrentPage < 2) {
      const range = pageNumbers.slice(0, 3);
      setPageRange(range);
    }
    if (indexCurrentPage === 2) {
      const range = pageNumbers.slice(0, 4);
      setPageRange(range);
    }

    if (indexCurrentPage >= 3) {
      const rangeStart = indexCurrentPage - 1;
      const rangeEnd = indexCurrentPage + 2;
      const range = pageNumbers.slice(rangeStart, rangeEnd);
      setPageRange(range);
    }

    if (indexLastPage - indexCurrentPage === 2) {
      const rangeStart = indexCurrentPage - 1;
      const rangeEnd = indexCurrentPage + 3;
      const range = pageNumbers.slice(rangeStart, rangeEnd);
      setPageRange(range);
    }
    if (indexCurrentPage === indexLastPage) {
      const rangeStart = indexCurrentPage - 2;
      const rangeEnd = indexCurrentPage + 2;
      const range = pageNumbers.slice(rangeStart, rangeEnd);
      setPageRange(range);
    }
  }, [currentPage]);

  return (
    <StyledPagination>
      <ul className='pagination'>
        <NavLink className={'img-wrapper'} to={`/dashboard/page-${currentPage == 1 ? '1' : currentPage - 1}`}>
          <img className='arrow-left' src={ArrowIcon} alt='arrow icon' />
        </NavLink>
        {currentPage > 3 && pageNumbers > 4 && (
          <div className='dot-page'>
            <NavLink
              onClick={() => paginate(firstPage)}
              to={`/dashboard/${'page-' + firstPage}`}
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
                to={`/dashboard/${'page-' + number}`}
                key={number}
                className={`page-number ${currentPage !== number && 'not-current-page'}`}
              >
                <h3>{number}</h3>
              </NavLink>
            ))}
          </div>
        )}

        {lastPage - currentPage > 2 && pageNumbers > 4 && (
          <div className='dot-page'>
            <h3>...</h3>

            <NavLink
              onClick={() => paginate(lastPage)}
              to={`/dashboard/${'page-' + lastPage}`}
              key={lastPage}
              className='page-number'
            >
              <h3>{lastPage}</h3>
            </NavLink>
          </div>
        )}

        <NavLink
          className={'img-wrapper'}
          to={`/dashboard/page-${currentPage == lastPage ? lastPage : parseInt(currentPage) + 1}`}
        >
          <img className='arrow-right' src={ArrowIcon} alt='arrow icon' />
        </NavLink>
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
