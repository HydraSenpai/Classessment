import { FaBars, FaX } from 'react-icons/fa';
import styled from 'styled-components';
import { useAppContext } from '../context/app_context';

const Navbar = () => {
  const { toggleSidebar } = useAppContext();
  return (
    <Wrapper>
      <button className='toggle' onClick={toggleSidebar}>
        <FaBars className='icon' />
      </button>
      <h2>Dashboard</h2>
      <h3>logout</h3>
    </Wrapper>
  );
};

export default Navbar;

const Wrapper = styled.nav`
  height: 6em;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 2em;
  padding-right: 2em;
  h2,
  h3 {
    margin: 0px;
  }
  .icon {
    font-size: 1.75em;
    color: var(--black);
  }
  .toggle {
    background: none;
    border: none;
    padding: none;
    margin: none;
    cursor: pointer;
  }
`;
