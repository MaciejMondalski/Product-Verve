import styled from 'styled-components';
import RecentIssues from '../components/dashboard/RecentIssues';
import Piechart from '../components/dashboard/Piechart';
import UpcomingIssues from '../components/dashboard/UpcomingIssues';

const Dashboard = () => {
  return (
    <StyledDashboard>
      <h2 className='page-title'>Dashboard</h2>
      <div className='dashboard-container'>
        <div className='block one'></div>
        <div className='block two'>
          <Piechart />
        </div>
        <div className='block three'>
          <UpcomingIssues />
        </div>
        <div className='block four'>
          <RecentIssues />
        </div>
      </div>
    </StyledDashboard>
  );
};

const StyledDashboard = styled.div`
  .page-title {
    font-size: 2.5em;
    font-weight: 500;
    color: var(--heading-color);
  }

  .dashboard-container {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-auto-rows: minmax(200px, auto);
    margin-top: 2em;
    gap: 1.5em;
    width: 100%;
  }

  .block {
    background-color: white;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.05);
    border: 1px solid var(--nice-gray);
    border-radius: 0.6em;
  }

  .one {
    grid-column: 1 / 7;
    grid-row: 1;
  }

  .two {
    grid-column: 7 / 11;

    grid-row: 1;
  }

  .three {
    grid-column: 1 / 6;

    grid-row: 2;
  }

  .four {
    grid-column: 6 / 11;

    grid-row: 2;
  }
`;

export default Dashboard;
