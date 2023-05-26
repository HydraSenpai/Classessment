import styled from 'styled-components';
import { useClassContext } from '../../context/class_context';
import { FormRow, Class } from '../../components';
import { useEffect, useState } from 'react';

const initialState = {
  name: '',
};

const Classes = () => {
  const [classDetails, setClassDetails] = useState(initialState);
  const { getAllClasses, classes, createClass } = useClassContext();

  const handleChange = (e) => {
    setClassDetails({ ...classDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!classDetails) {
      //show error
      return;
    }
    createClass(classDetails);
  };

  useEffect(() => {
    getAllClasses();
  }, []);

  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
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
      </form>
      {/* CLASS LIST */}
      <div className='class-list'>
        <h5 className='classes-title'>0 Classes found</h5>
        <div className='classes'>
          {classes.map((classSingle, index) => {
            const { name } = classSingle;
            return <Class name={name} id={index} key={index} />;
          })}
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
