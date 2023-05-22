import styled from 'styled-components';
import { Logo } from './';

const Sidebar = () => {
  return (
    <Wrapper>
      <div className='sidebar'>
        <Logo />
        <div className='links'>
          <h4>Link</h4>
          <h4>Link</h4>
          <h4>Link</h4>
        </div>
      </div>
    </Wrapper>
  );
};

export default Sidebar;

const Wrapper = styled.div`
  background-color: white;
  padding-top: 0.5em;
  height: 100vh;
  width: 15%;
  .sidebar {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2em;
  }
  .links {
    margin-top: 5em;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    gap: 1em;
  }
`;
