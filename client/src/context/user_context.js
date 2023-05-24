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
} from '../actions';

const user = localStorage.getItem('user');

const initialState = {
  user: user ? JSON.parse(user) : null,
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
};

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addUserToLocalStorage = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user');
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

  const setUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const response = await axios.post('/api/v1/auth/register', currentUser);
      console.log(response);
      dispatch({ type: LOGIN_USER_SUCCESS, payload: response.data.user });
      addUserToLocalStorage(response.data.user);
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
    <UserContext.Provider value={{ ...state, displayAlert, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  return useContext(UserContext);
};

export { UserProvider, useUserContext, initialState };
