import styled from 'styled-components';
import { useUserContext } from '../../context/user_context';

const Dashboard = () => {
  const { user } = useUserContext();
  return (
    <div className='form'>
      <h2 className='title'>{`Welcome ${user.name}!`}</h2>
    </div>
  );
};

export default Dashboard;

const Wrapper = styled.div``;
