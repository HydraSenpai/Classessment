import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Class = () => {
  const { id } = useParams();
  return (
    <Wrapper>
      <div className='form'>
        <h1 className='title'>Class with id {id}</h1>
      </div>
    </Wrapper>
  );
};

export default Class;

const Wrapper = styled.div`
  .form {
    max-width: 60vw;
  }
`;
