import styled from 'styled-components';
import { useUserContext } from '../../context/user_context';

const Classes = () => {
  return (
    <Wrapper>
      <div className='form'>
        <h2 className='title'>Classes</h2>
        <span className='title-underline'></span>
        {/* SEARCH CONTAINER */}
        {/* CLASS LIST */}
      </div>
    </Wrapper>
  );
};

export default Classes;

const Wrapper = styled.div`
  .form {
    max-width: 60vw;
  }
`;
