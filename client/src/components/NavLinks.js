import links from '../utils/links';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavLinks = () => {
  return (
    <Wrapper>
      {links.map((link) => {
        const { id, name, icon, path } = link;
        return (
          <NavLink to={path} key={id} className='link'>
            <div className='text'>
              <span className='icon'>{icon}</span>
              {name}
            </div>
          </NavLink>
        );
      })}
    </Wrapper>
  );
};

export default NavLinks;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2em;
  justify-content: center;
  .text {
    display: flex;
    align-items: center;
  }
  .link {
    font-size: 1.25em;
    color: var(--black);
  }
  .icon {
    font-size: 1.75em;
    color: var(--black);
    margin-right: 0.5em;
  }
`;
