import styled from 'styled-components';
import { Outlet, Link } from 'react-router-dom';
import { Sidebar, Navbar } from '../../components/';
import { useAppContext } from '../../context/app_context';

const SharedLayout = () => {
  const { showSidebar } = useAppContext();

  return (
    <Wrapper>
      <div className='main'>
        <Sidebar />
        <div>
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
    display: grid;
    grid-template-columns: auto 1fr;
  }
  .page {
    width: calc(100vw - 15%);
  }
  .full {
    display: grid;
    grid-template-columns: 1fr;
  }
`;
