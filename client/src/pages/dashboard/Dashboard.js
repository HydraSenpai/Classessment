import styled from 'styled-components';
import { useUserContext } from '../../context/user_context';
import { useClassContext } from '../../context/class_context';
import { useEffect, useState } from 'react';

const initialData = {
  numOfClasses: 0,
  averageScore: 0,
};
const Dashboard = () => {
  const [data, setData] = useState();
  const { user } = useUserContext();
  const { classes } = useClassContext();

  const calculateData = () => {};

  useEffect(() => {
    //GET AND CALCULATE DATA
    calculateData();
  }, [classes]);

  return (
    <Wrapper>
      <div className='form'>
        <h2 className='title'>{`Welcome ${user.name}!`}</h2>
      </div>
      <div className='form data-section'>data</div>
    </Wrapper>
  );
};

export default Dashboard;

const Wrapper = styled.div`
  h2 {
    margin: 0;
  }
  .data-section {
    min-height: 50vh;
  }
`;
