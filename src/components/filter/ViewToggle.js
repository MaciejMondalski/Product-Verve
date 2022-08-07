import { useInitiativesContext } from '../../hooks/useInitiativesContext';
import styled from 'styled-components';
import ListIcon from '../../assets/list_icon.svg';
import GridIcon from '../../assets/grid_icon.svg';
import BoardIcon from '../../assets/board_icon.svg';

const ViewToggle = ({ handleView }) => {
  const { view } = useInitiativesContext();

  return (
    <StyledToggle>
      <div className='toggle-container'>
        <div
          className={`slider slide-center   ${view === 'list' && 'slide-left'} ${view === 'board' && 'slide-right'}  `}
        >
          {view === 'list' && (
            <div>
              <img src={ListIcon} alt='list icon' /> <p>List</p>
            </div>
          )}

          {view === 'grid' && (
            <div>
              <img src={GridIcon} alt='grid icon' /> <p>Grid</p>
            </div>
          )}
          {view === 'board' && (
            <div>
              <img src={BoardIcon} alt='board icon' /> <p>Board</p>
            </div>
          )}
        </div>
        <div className='list toggle-option' onClick={() => handleView('list')}>
          <img src={ListIcon} alt='list icon' />
          <p>List</p>
        </div>
        <div className='grid toggle-option' onClick={() => handleView('grid')}>
          <img src={GridIcon} alt='list icon' />
          <p>Grid</p>
        </div>
        <div className='grid toggle-option' onClick={() => handleView('board')}>
          <img src={BoardIcon} alt='board icon' />
          <p>Board</p>
        </div>
      </div>
    </StyledToggle>
  );
};

const StyledToggle = styled.div`
  .toggle-container {
    position: relative;
    display: flex;
    justify-content: space-around;
    position: relative;
    align-items: center;
    cursor: pointer;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    margin: 0;
    border-radius: 0.6em;
    border: 1px solid var(--nice-gray);
    overflow: hidden;
    background: #fff;
    height: 2.7em;
    transition-duration: 0.1s;

    &:hover {
      border: 1px solid var(--primary-color);

      .toggle-option {
        color: var(--primary-color);

        img {
          filter: brightness(0) saturate(100%) invert(19%) sepia(90%) saturate(1792%) hue-rotate(233deg) brightness(84%)
            contrast(93%);
        }
      }
    }

    .slider {
      opacity: 100%;
      position: absolute;
      width: 33%;
      height: 86%;
      top: 0;
      bottom: 0;
      margin: auto;
      background: white;
      pointer-events: none;
      color: black;
      background: var(--primary-color);
      z-index: 3;
      transition-duration: 0.1s;
      border-radius: 0.4em;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 600;
      p {
        padding: 4px;
        color: white;
      }

      div {
        display: flex;
        justify-content: space-around;
        align-items: center;

        img {
          filter: invert(100%) sepia(100%) saturate(1%) hue-rotate(248deg) brightness(105%) contrast(101%);
          height: 1.2em;
          padding-left: 4px;
        }
      }
    }
    .slide-center {
      left: 33%;
    }
    .slide-right {
      left: 66%;
    }
    .slide-left {
      left: 1%;
    }

    .toggle-option {
      background: #fff;
      padding: 6px 8px;
      margin: 0px 6px;
      font-weight: 400;
      color: var(--text-color);
      width: 5em;
      box-sizing: border-box;
      display: flex;
      align-items: center;

      img {
        filter: invert(65%) sepia(4%) saturate(13%) hue-rotate(357deg) brightness(93%) contrast(90%);
        height: 1.2em;
        padding: 5px;
      }
    }

    .grid {
      justify-content: end;
    }

    .list {
      justify-content: start;
      padding-left: 4px;
    }
  }
`;

export default ViewToggle;
