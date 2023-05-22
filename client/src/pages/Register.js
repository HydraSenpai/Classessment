import styled from 'styled-components';
import { FormRow } from '../components';
import { useState } from 'react';

const Register = () => {
  const [login, setLogin] = useState(false);
  return (
    <Wrapper>
      <form className='form'>
        <h1 className='title'>{login ? 'Login' : 'Register'}</h1>
        <span className='title-underline'></span>
        {/* Name - WONT NEED WHEN LOGGING IN SO USE CONDITIONAL RENDER*/}
        {!login && <FormRow name='name' type='text' labelText='First Name' />}
        {/* Email */}
        <FormRow name='email' type='email' labelText='Email' />
        {/* Password */}
        <FormRow name='password' type='password' labelText='password' />
        <button type='submit' className='btn submit-btn'>
          {login ? 'Login' : 'Register'}
        </button>
        <p>
          {!login
            ? 'Already achieving your best grades?'
            : 'Ready to achieve your best grades?'}
          <button
            type='button'
            className='member-btn'
            onClick={() => setLogin(!login)}
          >
            {!login ? 'Login' : 'Register'}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;

const Wrapper = styled.div`
  .form {
    display: flex;
    flex-direction: column;
    padding-bottom: 0.2em;
  }
  h1 {
    align-self: center;
  }
  span {
    margin-bottom: 1em;
  }
  .submit-btn {
    width: 8em;
    align-self: center;
    margin-top: 0.75em;
  }
  p {
    margin: none;
    padding: none;
    text-align: center;
  }
  .member-btn {
    background: transparent;
    border: transparent;
    color: var(--primary-500);
    cursor: pointer;
    letter-spacing: var(--letterSpacing);
  }
`;
