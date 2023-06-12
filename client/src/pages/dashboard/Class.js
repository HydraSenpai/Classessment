import { useParams, useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useClassContext } from '../../context/class_context';
import { useEffect, useState } from 'react';
import { FormRow, Loading, TestScores } from '../../components';
import { MdDeleteForever } from 'react-icons/md';
import { IoChevronBack } from 'react-icons/io5';
import { useUserContext } from '../../context/user_context';
import uniqid from 'uniqid';

const initialState = {
  id: '',
  name: '',
  score: '',
  weight: '',
};

const Class = () => {
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
    isEditing,
    editScore,
    editing,
  } = useClassContext();
  const { displayAlert } = useUserContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setClassValues({ ...classValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!classValues.name || !classValues.score || !classValues.weight) {
      displayAlert();
      return;
    }
    if (isEditing) {
      editScore(classValues);
      console.log('editing score');
      setClassValues(initialState);
      return;
    } else {
      setClassValues({ ...classValues, id: uniqid('stat-') });
    }
  };

  useEffect(() => {
    if (!isEditing) {
      setClassValues(initialState);
    }
  }, [isEditing]);

  useEffect(() => {
    getSingleClass(id);
  }, []);

  useEffect(() => {
    console.log('id changed');
    if (!isLoading && classValues.id && !isEditing) {
      console.log('adding score');
      addScore(classValues);
      setClassValues(initialState);
    }
    return;
  }, [classValues.id]);

  useEffect(() => {
    if (deletedClass) {
      navigate(`/classes`);
      resetDeletedList();
    }
  }, [deletedClass]);

  const startEditing = (id, name, score, weight) => {
    editing();
    setClassValues({ ...classValues, id, name, score, weight });
    changeClassOption('add');
  };

  const startDelete = (id, name, score, weight) => {
    editScore({ id, name, score, weight }, 'delete');
    setClassValues(initialState);
  };

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
          <h3 className='option-text'>
            {!isEditing ? 'Add Stats' : 'Editing Stat'}
          </h3>
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
          <h2 className='title section-title'>
            {!isEditing ? 'Add Stats' : 'Edit Stat'}
          </h2>
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
              {isEditing ? 'Submit Edit' : 'Submit Grade'}
            </button>
          </form>
        </div>
      )}
      {classOption === 'edit' && (
        <div className='section'>
          <h2 className='title section-title' style={{ marginBottom: '0.5em' }}>
            Edit Grades
          </h2>
          {!currentClass.tests ||
          (currentClass.tests && currentClass.tests.length === 0) ? (
            <h3 style={{ marginTop: '1em', marginBottom: '0em' }}>
              No grades to edit...
            </h3>
          ) : null}
          {currentClass.tests.map((test, index) => {
            const { id, name, score, weight } = test;
            return (
              <div className='class-list-item' key={index}>
                <h5 className='class-list-name'>{name}</h5>
                <button
                  className='btn-edit'
                  onClick={() => startEditing(id, name, score, weight)}
                >
                  Edit
                </button>
                <button
                  className='btn-delete'
                  onClick={() => startDelete(id, name, score, weight)}
                >
                  Delete
                </button>
              </div>
            );
          })}
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
  .class-list-item {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 2em;
    transition: var(--transition);
    padding: 0.1em 1em;
    border-radius: var(--borderRadius);
  }
  .class-list-name {
    max-width: 20em;
    min-width: 10em;
  }
  .btn-edit {
    padding: 0.25em 0.75em;
    background: none;
    border: none;
    color: var(--primary-500);
    border-radius: var(--borderRadius);
  }
  .btn-delete {
    padding: 0.25em 0.75em;
    background: none;
    border: none;
    color: var(--red-dark);
    border-radius: var(--borderRadius);
  }

  .btn-edit:hover,
  .btn-delete:hover {
    background-color: var(--grey-300);
  }
  h5 {
    margin-bottom: 0em;
  }
`;
