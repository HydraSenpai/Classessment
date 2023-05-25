import styled from 'styled-components';
import { FormRow, Alert } from '../components';
import { useState, useEffect } from 'react';
import { useUserContext } from '../context/user_context';
import { useNavigate, useLocation } from 'react-router-dom';

const initialState = {
  name: '',
  email: '',
  password: '',
};

const Register = () => {
  const [login, setLogin] = useState(false);
  const [userDetails, setUserDetails] = useState(initialState);
  const { showAlert, displayAlert, setUser, isLoading, user, loginUser } =
    useUserContext();
  const navigate = useNavigate();
  let location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = userDetails;
    if (!email || (!name && !login) || !password) {
      displayAlert();
      return;
    }
    if (login) {
      loginUser(userDetails);
    } else {
      setUser(userDetails);
    }
  };

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  }, [user, navigate]);

  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h1 className='title'>{login ? 'Login' : 'Register'}</h1>
        <span className='title-underline'></span>
        {showAlert && <Alert />}
        {/* Name - WONT NEED WHEN LOGGING IN SO USE CONDITIONAL RENDER*/}
        {!login && (
          <FormRow
            name='name'
            type='text'
            labelText='First Name'
            handleChange={handleChange}
            value={userDetails.name}
          />
        )}
        {/* Email */}
        <FormRow
          name='email'
          type='email'
          labelText='Email'
          value={userDetails.email}
          handleChange={handleChange}
        />
        {/* Password */}
        <FormRow
          name='password'
          type='password'
          labelText='password'
          handleChange={handleChange}
          value={userDetails.password}
        />
        <button type='submit' className='btn submit-btn'>
          {!isLoading ? (!login ? 'Register' : 'Login') : 'Waiting...'}
        </button>
        <p>
          {!login
            ? 'Already achieving your best grades?'
            : 'Ready to start achieving your best grades?'}
          <button
            type='button'
            className='member-btn'
            onClick={() => setLogin(!login)}
            disabled={isLoading}
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
    gap: 1em;
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
