import React, { useContext, useEffect, useReducer, useState } from 'react';
import reducer from '../reducers/user_reducer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  SHOW_ALERT,
  CLEAR_ALERT,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGIN_USER_BEGIN,
  REMOVE_USER,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
} from '../actions';

const user = localStorage.getItem('user');
const token = localStorage.getItem('token');

const initialState = {
  user: user ? JSON.parse(user) : null,
  token: token || null,
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
};

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const displayAlert = () => {
    dispatch({ type: SHOW_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const logoutUser = () => {
    removeUserFromLocalStorage();
    dispatch({ type: REMOVE_USER });
    console.log('logout');
  };

  const setUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const response = await axios.post('/api/v1/auth/register', currentUser);
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: { user: response.data.user, token: response.data.token },
      });
      addUserToLocalStorage({
        user: response.data.user,
        token: response.data.token,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    const { email, password } = currentUser;
    try {
      const response = await axios.post('/api/v1/auth/login', {
        email,
        password,
      });
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user: response.data.user, token: response.data.token },
      });
      addUserToLocalStorage({
        user: response.data.user,
        token: response.data.token,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  return (
    <UserContext.Provider
      value={{ ...state, displayAlert, setUser, logoutUser, loginUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  return useContext(UserContext);
};

export { UserProvider, useUserContext, initialState };
