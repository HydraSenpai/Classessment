import styled from 'styled-components';
import { Logo, NavLinks } from './';
import { useAppContext } from '../context/app_context';

const Sidebar = () => {
  const { showSidebar } = useAppContext();
  return (
    <Wrapper>
      <div className={showSidebar ? 'sidebar' : 'hide sidebar'}>
        <Logo />
        <NavLinks />
      </div>
    </Wrapper>
  );
};

export default Sidebar;

const Wrapper = styled.div`
  .sidebar {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3em;
    transition: var(--transition);
    background-color: white;
    padding-top: 0.3em;
    height: 100vh;
    width: 13em;
  }
  .links {
    margin-top: 5em;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    gap: 1em;
  }
  .hide {
    margin-left: -13em;
  }
`;
