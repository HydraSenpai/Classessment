import styled from 'styled-components';
import { Outlet, Link } from 'react-router-dom';
import { Sidebar, Navbar } from '../../components/';

const SharedLayout = () => {
  return (
    <Wrapper className='full-page'>
      <div className='main'>
        <Sidebar />
        <div className='page'>
          <Navbar />
          <Outlet />
        </div>
      </div>
    </Wrapper>
  );
};

export default SharedLayout;

const Wrapper = styled.div`
  .main {
    display: flex;
    flex-direction: row;
  }
  .page {
    width: calc(100vw - 15%);
  }
`;
