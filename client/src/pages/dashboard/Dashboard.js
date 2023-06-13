import styled from 'styled-components';
import { useUserContext } from '../../context/user_context';
import { useClassContext } from '../../context/class_context';
import { useEffect, useState } from 'react';
import {
  ScatterChart,
  LineChart,
  Line,
  XAxis,
  YAxis,
  ZAxis,
  Scatter,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const initialData = {
  numOfClasses: 0,
  averageScore: 0,
};
const Dashboard = () => {
  const { user } = useUserContext();
  const { classes } = useClassContext();
  const [classData, setClassData] = useState([]);

  const calculateData = () => {
    let classData = [];
    let score = 0;
    let divisor = 0;
    for (let x = 0; x < classes.length; x++) {
      for (let y = 0; y < classes[x].tests.length; y++) {
        score += parseInt(classes[x].tests[y].score);
      }
      score = score / classes[x].tests.length;
      classData.push({ name: classes[x].name, score: score });
      score = 0;
    }
    setClassData(classData);
  };

  const data = [
    { score: 56, year: 'Year 1' },
    { score: 87, year: 'Year 2' },
    { score: 67, year: 'Year 3' },
    { score: 75, year: 'Year 4' },
    { score: 42, year: 'Year 5' },
  ];

  const currentdata = [
    { month: 'Sep', currentscore: 49 },
    { month: 'Oct', currentscore: 67 },
    { month: 'Nov', currentscore: 98 },
    { month: 'Dec', currentscore: 78 },
    { month: 'Jan', currentscore: 57 },
    { month: 'Feb', currentscore: 56 },
    { month: 'Mar', currentscore: 86 },
    { month: 'Apr', currentscore: 67 },
    { month: 'May', currentscore: 23 },
  ];

  useEffect(() => {
    //GET AND CALCULATE DATA
    calculateData();
  }, [classes]);

  return (
    <Wrapper>
      <div className='form'>
        <h2 className='title'>{`Welcome ${user.name}!`}</h2>
      </div>
      <div className='form data-section'>
        <div className='graph' style={{ gridColumn: 'span 2' }}>
          <h5 className='graph-title'>Average Test Score by Class</h5>
          <ResponsiveContainer width='99%' aspect={3}>
            <LineChart
              data={classData}
              title='Total Score'
              margin={{
                top: 5,
                right: 5,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type='natural'
                dataKey='score'
                stroke='#9327d2'
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className='graph'>
          <h5 className='graph-title'>Average Score by Year</h5>
          <ResponsiveContainer width='99%' aspect={1.5}>
            <LineChart
              data={data}
              title='Total Score'
              margin={{
                top: 5,
                right: 5,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='year' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type='natural'
                dataKey='score'
                stroke='#9327d2'
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className='graph'>
          <h5 className='graph-title'>Current Score by Month</h5>
          <ResponsiveContainer width='99%' aspect={1.5}>
            <LineChart
              data={currentdata}
              title='Total Score'
              margin={{
                top: 5,
                right: 5,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='month' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type='natural'
                dataKey='currentscore'
                stroke='#9327d2'
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Wrapper>
  );
};

export default Dashboard;

const Wrapper = styled.div`
  h2,
  h5 {
    margin: 0;
    padding: 0;
  }
  .data-section {
    min-height: 50vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-content: start;
  }
  .graph {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0;
  }
  .graph-title {
    padding-left: 3em;
  }
`;
