import { useEffect, useState } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useCollection } from '../../hooks/useCollection';
import styled from 'styled-components';

const CategoriesChart = ({ tasks }) => {
  const { documents: categories } = useCollection('categories');

  const [categoryList, setCategoryList] = useState();

  const COLORS = ['#C9BBFA', '#8677ED', '#4F42C7', '#322F7D'];

  useEffect(() => {
    const chartList =
      categories &&
      tasks &&
      categories.map((category) => {
        const categoryQuantity = tasks.filter((task) => task.category === category.value).length;
        return { name: category.value, quantity: categoryQuantity };
      });
    setCategoryList(chartList);
  }, [categories, tasks]);

  return (
    <StyledCategories>
      <div className='container'>
        <h2>Categories</h2>
        <ResponsiveContainer className='chart-wrapper' width='90%' height='80%'>
          <BarChart
            width={550}
            height={300}
            data={categoryList}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip />
            <Bar dataKey='quantity'>
              {categoryList &&
                categoryList.map((i, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </StyledCategories>
  );
};

const StyledCategories = styled.div`
  height: 100%;
  width: 100%;

  .container {
    box-sizing: border-box;
    height: 100%;
  }

  h2 {
    display: flex;
    color: var(--heading-color);
    margin: 1.2em 0 0 1.4em;
  }

  .chart-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    margin: auto 0;
  }
`;

export default CategoriesChart;
