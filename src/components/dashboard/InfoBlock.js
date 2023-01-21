import styled from 'styled-components';
import BlockedIcon from '../../assets/blocked_icon.svg';
import OverdueIcon from '../../assets/overdue_icon.svg';

const InfoBlock = ({ title, value, percentage, icon }) => {
  //console.log(icon.toString());
  return (
    <StyledBlock>
      <div className='title-wrapper'>
        <h2>{title}</h2>
        <img
          className={title === 'Blocked' ? 'blocked-img' : ''}
          src={title == 'Blocked' ? BlockedIcon : OverdueIcon}
          alt='blocked icon'
        />
      </div>

      <div className='number-container'>
        <h1>{value}</h1>
        <h3>{percentage}%</h3>
      </div>
    </StyledBlock>
  );
};

const StyledBlock = styled.div`
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 1.2em 1.4em;
  .title-wrapper {
    display: flex;
    align-items: center;

    h2 {
      padding: 0.4em 0.3em 0.4em 0.6em;
    }

    img {
      height: 1.8em;
    }

    .blocked-img {
      filter: brightness(0) saturate(100%) invert(33%) sepia(68%) saturate(4353%) hue-rotate(345deg) brightness(108%)
        contrast(88%);
    }
  }

  .number-container {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  h1 {
    font-size: 5em;
    padding-bottom: 0.1em;
  }

  h3 {
  }
`;

export default InfoBlock;
