import { useParams, useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useClassContext } from '../../context/class_context';
import { useEffect, useState } from 'react';
import { Loading } from '../../components';
import { MdDeleteForever } from 'react-icons/md';
import { IoChevronBack } from 'react-icons/io5';
import { useUserContext } from '../../context/user_context';

const Class = () => {
  const [classSingle, setClassSingle] = useState({});
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
  } = useClassContext();
  const navigate = useNavigate();

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
      <div className='section'>
        {classOption === 'view' && (
          <h1 className='title section-title'>view</h1>
        )}
        {classOption === 'add' && <h1 className='title section-title'>add</h1>}
        {classOption === 'edit' && (
          <h1 className='title section-title'>edit</h1>
        )}
      </div>
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
    padding: 0 1.5em;
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
    width: 60vw;
    height: 10em;
    background: var(--white);
    border-radius: var(--borderRadius);
    box-shadow: var(--shadow-2);
    margin: 1em auto;
  }
  .section-title {
    padding-top: 0.3em;
  }
`;
