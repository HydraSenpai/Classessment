import styled from 'styled-components';
import { useUserContext } from '../../context/user_context';
import { InfoField, InfoLabel, Alert } from '../../components';
import { useState } from 'react';

const Profile = () => {
  const [fieldEditing, setFieldEditing] = useState('');
  const { user, isEditing, editUser } = useUserContext();
  let fieldsInitial = {
    name: user.name,
    lastName: user.lastName,
    email: user.email,
    dob: user.dob || '',
    bio: user.bio || '',
    favoriteSubject: user.favoriteSubject || '',
  };
  const [fields, setFields] = useState(fieldsInitial);

  const handleChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const editField = (data, value) => {
    if (!fieldEditing) {
      setFieldEditing(data);
      return;
    }
    editUser(data, value);
    setFieldEditing('');
  };

  return (
    <Wrapper>
      <div className='form'>
        <h2 className='title'>Profile</h2>
        <Alert />
        <span className='title-underline'></span>
        <div className='info-container'>
          {Object.keys(fields).map((dataItem) => {
            return (
              <>
                <InfoLabel text={dataItem} />
                <InfoField
                  value={fields[dataItem]}
                  name={dataItem}
                  editing={fieldEditing === dataItem}
                  handleChange={handleChange}
                />
                <button
                  type='button'
                  className='btn edit-btn'
                  onClick={() => editField(dataItem, fields[dataItem])}
                >
                  {!fieldEditing
                    ? 'Edit'
                    : fieldEditing === dataItem
                    ? 'Save'
                    : ''}
                </button>
              </>
            );
          })}
        </div>
      </div>
    </Wrapper>
  );
};

export default Profile;

const Wrapper = styled.div`
  margin: 0;
  max-width: 100vw;
  .form {
    max-width: 60vw;
  }
  .info-container {
    display: grid;
    grid-template-columns: 10em 1fr 3em;
    grid-template-rows: auto;
    column-gap: 1.5em;
    row-gap: 1em;
    align-items: center;
  }
  .title {
    margin-bottom: 1em;
  }
  .edit-btn {
    padding: 0;
    max-height: 2em;
    background: none;
    box-shadow: none;
    color: var(--primary-500);
  }
  @media screen and (max-width: 950px) {
    .form {
      max-width: 70vw;
    }
    .info-container {
      column-gap: 1em;
      grid-template-columns: 8em 1fr 3em;
    }
  }
`;
