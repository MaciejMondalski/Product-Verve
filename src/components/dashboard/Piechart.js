import { useCallback, useState, useEffect } from 'react';
import styled from 'styled-components';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import { useCollection } from '../../hooks/useCollection';
import { timestamp } from '../../firebase/config';

const Piechart = () => {
  const { documents: statuses } = useCollection('statuses');
  const { documents: projects } = useCollection('projects');

  const [statusList, setStatusList] = useState();
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  const COLORS = ['#C9BBFA', '#8677ED', '#4F42C7', '#322F7D'];

  //TESTING DATEEEEE
  console.log(Date.now());

  const today = new Date().toDateString();
  console.log(today);

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

  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
      <g>
        <text className='center-text' x={cx} y={cy} dy={6} textAnchor='middle' fill='#333'>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />{' '}
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill='none' />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke='none' />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill='#333'>
          {`${value} ${value === 1 ? 'issue' : 'issues'}`}
        </text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill='#999'>
          {`(${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };

  return (
    <StyledPiechart>
      <PieChart width={400} height={400}>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={statusList}
          cx={200}
          cy={200}
          innerRadius={60}
          outerRadius={110}
          fill='#8884d8'
          dataKey='quantity'
          onMouseEnter={onPieEnter}
        >
          {statusList &&
            statusList.map((i, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
        </Pie>
      </PieChart>
      <div className='chart-legend'>
        {statuses &&
          statuses.map((status, index) => {
            return (
              <div key={index} className='legend-item'>
                <span style={{ background: COLORS[index] }}></span>
                <p>{status.name}</p>
              </div>
            );
          })}
      </div>
    </StyledPiechart>
  );
};

const StyledPiechart = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--nice-gray);
  border-radius: 0.6em;
  padding: 0 4em;
  margin-left: 1em;

  svg {
    overflow: inherit;
    padding: 0 0px;
    margin-top: -40px;
  }

  .center-text {
    font-weight: 600;
    font-size: 1.2em;
  }

  .chart-legend {
    display: flex;
    justify-content: center;
    margin-top: -70px;
    margin-bottom: 30px;
    z-index: 44;
    display: flex;
  }

  .legend-item {
    display: flex;
    align-items: center;
    margin: 0 0.6em;

    span {
      width: 1em;
      height: 1em;
      border-radius: 0.2em;
      margin-right: 0.2em;
    }
  }
`;

export default Piechart;
