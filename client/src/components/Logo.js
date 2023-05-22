import logo from '../assets/images/logobold.png';
import styled from 'styled-components';

const Logo = () => {
  return (
    <Wrapper>
      <div>
        <img src={logo} />
      </div>
    </Wrapper>
  );
};

export default Logo;

const Wrapper = styled.div`
  img {
    max-height: 6em;
  }
`;
