import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import styled from 'styled-components';
import { useCollection } from '../hooks/useCollection';
import { useState, useEffect } from 'react';

const Piechart = () => {
  const { documents: statuses } = useCollection('statuses');
  const { documents: projects } = useCollection('projects');
  const [statusList, setStatusList] = useState();

  //console.log(projects);
  //console.log(statuses);

  useEffect(() => {
    console.log('helloo');
    const chartList =
      statuses &&
      projects &&
      statuses.map((status) => {
        const statusQuantity = projects.filter((project) => project.status === status.name).length;
        return { name: status.name, quantity: statusQuantity };
      });
    setStatusList(chartList);
  }, [statuses, projects]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill='white' textAnchor={x > cx ? 'start' : 'end'} dominantBaseline='central'>
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <StyledPiechart>
      <PieChart width={400} height={400}>
        <Pie
          data={statusList}
          cx='50%'
          cy='50%'
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={120}
          fill='#8884d8'
          dataKey='quantity'
          isAnimationActive={false}
        >
          {statusList &&
            statusList.map((i, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
        </Pie>
        <Tooltip />
      </PieChart>
    </StyledPiechart>
  );
};

const StyledPiechart = styled.div`
  display: flex;
  justify-content: center;
  background-color: white;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--nice-gray);
  border-radius: 0.6em;

  width: 50%;
`;

export default Piechart;
