import styled from 'styled-components';
import { useClassContext } from '../../context/class_context';
import { FormRow, Class, Alert, Loading } from '../../components';
import { useEffect, useState } from 'react';
import { useUserContext } from '../../context/user_context';
import { useNavigate } from 'react-router-dom';

const initialState = {
  name: '',
};

const Classes = () => {
  const [classDetails, setClassDetails] = useState(initialState);
  const {
    getAllClasses,
    classes,
    createClass,
    totalClasses,
    isLoading,
    resetClassesSearch,
    createdClass,
  } = useClassContext();
  const { displayAlert, showAlert } = useUserContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setClassDetails({ ...classDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!classDetails || !classDetails.name) {
      displayAlert();
      return;
    }
    createClass(classDetails);
  };

  useEffect(() => {
    getAllClasses();
  }, []);

  useEffect(() => {
    if (createdClass) {
      const newClass = classes.find(
        (classSingle) => classDetails.name === classSingle.name
      );
      navigate(`/class/${newClass._id}`);
      setClassDetails(initialState);
      resetClassesSearch();
    }
  }, [createdClass]);

  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h2 className={showAlert ? 'title title-margin' : 'title'}>Classes</h2>
        <Alert />
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
      {isLoading ? (
        <Loading />
      ) : classes.length === 0 ? (
        <h3 className='title'>No Classes Being Tracked</h3>
      ) : (
        <div className='class-list'>
          <h5 className='classes-title'>
            {totalClasses === 0
              ? '0 Classes Found'
              : totalClasses === 1
              ? '1 Class Found'
              : `${totalClasses} Classes Found`}
          </h5>
          <div className='classes'>
            {classes.map((classSingle) => {
              const { name, _id } = classSingle;
              return <Class name={name} id={_id} key={_id} {...classSingle} />;
            })}
          </div>
        </div>
      )}
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
  .title-margin {
    margin-bottom: 0.5em;
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
