import styled from 'styled-components';
import RecentIssues from '../components/dashboard/RecentIssues';
import Piechart from '../components/dashboard/Piechart';
import UpcomingIssues from '../components/dashboard/UpcomingIssues';
import CategoriesChart from '../components/dashboard/CategoriesChart';
import { useCollection } from '../hooks/useCollection';
import { useEffect, useState } from 'react';
import InfoBlock from '../components/dashboard/InfoBlock';
import { useProjectContext } from '../hooks/useProjectContext';

const Dashboard = () => {
  const { documents: statuses } = useCollection('statuses');
  const { currentProject } = useProjectContext();
  const { documents: tasks } = useCollection('projects', ['projectGroup.projectName', 'in', [`${currentProject}`]]);
  const [blockedQuantity, setBlockedQuantity] = useState();
  const [blockedPercentage, setBlockedPercentage] = useState();

  const [overdueQuantity, setOverdueQuantity] = useState();
  const [overduePercentage, setOverduePercentage] = useState();

  useEffect(() => {
    // Only count overdue issues that are not "Done"
    const overdue =
      tasks && tasks.filter((project) => project.dueDate.toDate() < new Date() && project.status !== 'Done').length;

    const notDone = tasks && tasks.filter((task) => task.status !== 'Done').length;

    const percentage = tasks && ((overdue / notDone) * 100).toFixed(2);
    setOverdueQuantity(overdue);
    setOverduePercentage(percentage);
  }, [tasks]);

  useEffect(() => {
    const blocked = tasks && tasks.filter((task) => task.status === 'Blocked').length;
    const percentage = tasks && ((blocked / tasks.length) * 100).toFixed(2);
    setBlockedQuantity(blocked);
    setBlockedPercentage(percentage);
  }, [tasks]);

  return (
    <StyledDashboard>
      <h2 className='page-title'>Dashboard</h2>
      <div className='dashboard-container'>
        <div className='block categories'>
          <CategoriesChart tasks={tasks} />
        </div>
        <div className='block overdue'>
          <InfoBlock title={'Overdue'} value={overdueQuantity} percentage={overduePercentage} icon='OverdueIcon' />
        </div>
        <div className='block blocked'>
          <InfoBlock title={'Blocked'} value={blockedQuantity} percentage={blockedPercentage} icon='BlockedIcon' />
        </div>
        <div className='block statuses'>
          <Piechart tasks={tasks} />
        </div>
        <div className='block upcoming'>
          <UpcomingIssues />
        </div>
        <div className='block recent'>
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
    grid-auto-rows: minmax(150px, auto);
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

  .categories {
    grid-column: 1 / 5;
    grid-row: 1/3;
  }

  .statuses {
    grid-column: 7 / 11;

    grid-row: 1/3;
  }

  .overdue {
    grid-column: 5 / 7;
    grid-row: 1;
  }

  .blocked {
    grid-column: 5 / 7;
    grid-row: 2;
  }

  .upcoming {
    grid-column: 1 / 6;

    grid-row: 3;
  }

  .recent {
    grid-column: 6 / 11;

    grid-row: 3;
  }
`;

export default Dashboard;
