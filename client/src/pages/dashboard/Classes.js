import styled from 'styled-components';
import { useClassContext } from '../../context/class_context';
import { FormRow, Class } from '../../components';
import { useState } from 'react';

const initialState = {
  name: '',
};

const Classes = () => {
  const [classDetails, setClassDetails] = useState(initialState);

  const handleChange = (e) => {
    setClassDetails({ ...classDetails, [e.target.name]: e.target.value });
  };

  return (
    <Wrapper>
      <div className='form'>
        <h2 className='title'>Classes</h2>
        {/* SEARCH CONTAINER */}
        <div className='search-container'>
          <FormRow
            name='name'
            type='text'
            labelText='class name'
            value={classDetails.name}
            handleChange={handleChange}
          />
          <button className='btn add-btn'>Add Class</button>
        </div>
      </div>
      {/* CLASS LIST */}
      <div className='class-list'>
        <h5 className='classes-title'>0 Classes found</h5>
        <div className='classes'>
          <Class name='History' />
          <Class name='Science' />
          <Class name='Math' />
          <Class name='English' />
          <Class name='French' />
          <Class name='German' />
          <Class name='Physical Education' />
        </div>
      </div>
    </Wrapper>
  );
};

export default Classes;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .form {
    max-width: 60vw;
  }
  .search-container {
    display: grid;
    grid-template-columns: 1fr 10em;
    align-items: end;
    gap: 1em;
  }
  h2 {
    margin: 0;
  }
  .add-btn {
    max-width: 10em;
    height: 2.2em;
  }
  .class-list {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 60vw;
    margin-bottom: 5em;
  }
  .classes {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto;
    gap: 2em;
    align-items: center;
  }
`;
