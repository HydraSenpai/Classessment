import { FaBars, FaX } from 'react-icons/fa';
import styled from 'styled-components';
import { useAppContext } from '../context/app_context';
import { useUserContext } from '../context/user_context';
import { useState } from 'react';

const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { toggleSidebar } = useAppContext();
  const { user } = useUserContext();
  return (
    <Wrapper>
      <button className='toggle' onClick={toggleSidebar}>
        <FaBars className='icon' />
      </button>
      <h2>Dashboard</h2>
      <div className='logout'>
        <button
          type='button'
          className='btn btn-logout'
          onClick={() => setShowLogout(!showLogout)}
        >
          {user.name}
        </button>
        {showLogout && (
          <button type='button' className='btn sign-logout'>
            logout
          </button>
        )}
      </div>
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
  .btn-logout {
    position: relative;
    width: 8em;
  }
  .sign-logout {
    position: absolute;
    top: 100px;
    left: 50px;
  }
`;
