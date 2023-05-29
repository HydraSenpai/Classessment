import styled from 'styled-components';
import { useUserContext } from '../../context/user_context';
import { InfoField, InfoLabel } from '../../components';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';

const Profile = () => {
  const { user } = useUserContext();
  const fields = {
    name: user.name,
    lastName: user.lastName,
    email: user.email,
    dob: user.dob,
    bio: user.bio,
    favoriteSubject: user.favoriteSubject,
  };

  return (
    <Wrapper>
      <div className='form'>
        <h2 className='title'>Profile</h2>
        <span className='title-underline'></span>
        <div className='info-container'>
          {Object.keys(fields).map((dataItem) => {
            return (
              <>
                <InfoLabel key={uuidv4()} text={dataItem} />
                <InfoField key={uuidv4()} value={fields[dataItem]} />
                <button key={uuidv4()} type='button' className='btn edit-btn'>
                  Edit
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
    column-gap: 2em;
  }
  .title {
    margin-bottom: 1.5em;
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
