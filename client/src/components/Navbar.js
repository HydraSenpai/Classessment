import { FaBars } from 'react-icons/fa';
import styled from 'styled-components';

const Navbar = () => {
  return (
    <Wrapper>
      <FaBars className='icon' />
      <h2>Dashboard</h2>
      <h3>logout</h3>
    </Wrapper>
  );
};

export default Navbar;

const Wrapper = styled.nav`
  height: 5em;
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
  }
`;
