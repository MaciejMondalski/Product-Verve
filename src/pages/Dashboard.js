import styled from 'styled-components';
import Piechart from '../components/Piechart';
import TestPiechart from '../components/TestPiechart';
const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Piechart />
      <TestPiechart />
    </div>
  );
};

export default Dashboard;
