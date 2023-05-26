import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useClassContext } from '../../context/class_context';
import { useEffect, useState } from 'react';

const Class = () => {
  const [classSingle, setClassSingle] = useState({});
  const { id } = useParams();
  const { getSingleClass, currentClass } = useClassContext();

  useEffect(() => {
    getSingleClass(id);
  }, []);

  return (
    <Wrapper>
      <div className='form'>
        <h1 className='title'>{currentClass.name}</h1>
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
