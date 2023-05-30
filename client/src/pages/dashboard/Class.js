import { useParams, useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useClassContext } from '../../context/class_context';
import { useEffect, useState } from 'react';
import { FormRow, Loading, TestScores } from '../../components';
import { MdDeleteForever } from 'react-icons/md';
import { IoChevronBack } from 'react-icons/io5';
import { useUserContext } from '../../context/user_context';

const initialState = {
  name: '',
  score: '',
  weight: '',
};

const Class = () => {
  const [classSingle, setClassSingle] = useState({});
  const [classValues, setClassValues] = useState(initialState);
  const { id } = useParams();
  const {
    getSingleClass,
    currentClass,
    isLoading,
    classOption,
    changeClassOption,
    deleteClass,
    deletedClass,
    resetDeletedList,
    addScore,
  } = useClassContext();
  const { displayAlert, showAlert } = useUserContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setClassValues({ ...classValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!classValues.name || !classValues.score || !classValues.weight) {
      displayAlert();
      return;
    }
    addScore(classValues);
    setClassValues(initialState);
  };

  useEffect(() => {
    getSingleClass(id);
  }, []);

  useEffect(() => {
    if (deletedClass) {
      navigate(`/classes`);
      resetDeletedList();
    }
  }, [deletedClass]);

  if (isLoading) {
    return (
      <Wrapper>
        <div className='loading-page'>
          <Loading center />;
        </div>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      {/* HEADING CONTAINER */}
      <div className='form'>
        <h1 className='title'>{currentClass.name}</h1>
        <Link to='/classes' className='back'>
          <IoChevronBack />
        </Link>
        <div className='delete' onClick={deleteClass}>
          <MdDeleteForever />
        </div>
      </div>
      {/* BUTTONS CONTAINER */}
      <div className='options-container'>
        <div
          className='option option-view'
          onClick={() => changeClassOption('view')}
        >
          <h3 className='option-text'>View Stats</h3>
        </div>
        <div
          className='option option-add'
          onClick={() => changeClassOption('add')}
        >
          <h3 className='option-text'>Add Stats</h3>
        </div>
        <div
          className='option option-delete'
          onClick={() => changeClassOption('edit')}
        >
          <h3 className='option-text'>Edit Stat</h3>
        </div>
      </div>
      {/* SECTION CONTAINER */}
      {classOption === 'view' && (
        <div className='section'>
          <h2 className='title section-title' style={{ marginBottom: '0.5em' }}>
            View Grades
          </h2>
          <TestScores tests={currentClass.tests} />
        </div>
      )}
      {classOption === 'add' && (
        <div className='section'>
          <h2 className='title section-title'>Add Grade</h2>
          <form className='form-add' onSubmit={handleSubmit}>
            <FormRow
              labelText='Test Name'
              type='text'
              name='name'
              value={classValues.name}
              handleChange={handleChange}
            />
            <FormRow
              labelText='Your Percentage'
              type='number'
              name='score'
              value={classValues.score}
              handleChange={handleChange}
              max={100}
              min={0}
            />
            <FormRow
              labelText='Test Weight of Class'
              type='number'
              name='weight'
              value={classValues.weight}
              handleChange={handleChange}
              max={100}
              min={0}
            />
            <button type='submit' className='btn submit-btn'>
              Submit Grade
            </button>
          </form>
        </div>
      )}
      {classOption === 'edit' && (
        <div className='section'>
          <h2 className='title section-title'>Edit Grades</h2>
        </div>
      )}
    </Wrapper>
  );
};

export default Class;

const Wrapper = styled.div`
  .form {
    max-width: 60vw;
    margin-bottom: 1em;
    position: relative;
  }
  .back {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2em;
    width: 1.8em;
    height: 1.8em;
    position: absolute;
    top: 1.5em;
    left: 1.5em;
    background-color: var(--grey-200);
    border-radius: var(--borderRadius);
    box-shadow: var(--shadow-2);
    transition: var(--transition);
    color: var(--black);
  }
  .back:hover {
    background-color: var(--grey-500);
  }
  .delete {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2em;
    width: 1.8em;
    height: 1.8em;
    position: absolute;
    top: 1.5em;
    right: 1.5em;
    background-color: var(--red-light);
    border-radius: var(--borderRadius);
    box-shadow: var(--shadow-2);
    transition: var(--transition);
    color: var(--black);
  }
  .delete:hover {
    background-color: var(--red-dark);
  }
  .title {
    padding: 0 1em;
    margin-bottom: 0;
  }
  .loading-page {
    margin-top: 5em;
  }
  .options-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1em auto;

    width: 60vw;
    gap: 1em;
    transition: var(--transition);
  }
  .option {
    display: flex;
    height: 5em;
    width: 100%;
    align-items: center;
    justify-content: center;
    background: var(--white);
    border-radius: var(--borderRadius);
    box-shadow: var(--shadow-2);
    transition: var(--transition);
  }
  .option-add {
    background: var(--primary-100);
  }
  .option-add:hover {
    background: var(--primary-500);
  }
  .option-delete {
    background: var(--red-light);
  }
  .option-delete:hover {
    background: var(--red-dark);
  }
  .option-view {
    background: var(--green-light);
  }
  .option-view:hover {
    background: var(--green-dark);
  }
  .option-text {
    padding: 0;
    margin: 0;
    font-size: 1.4em;
  }
  .section {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 60vw;
    padding-bottom: 3em;
    background: var(--white);
    border-radius: var(--borderRadius);
    box-shadow: var(--shadow-2);
    margin: 1em auto 5em auto;
  }
  .section-title {
    padding-top: 0.4em;
  }
  .form-add {
    display: flex;
    flex-direction: column;
    margin-top: 1em;
    gap: 0.8em;
    width: 50%;
  }
  .submit-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40%;
    height: 2.5em;
    margin-top: 0.5em;
    font-size: 0.9em;
  }
`;
