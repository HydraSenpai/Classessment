import React, { useContext, useEffect, useReducer, useState } from 'react';
import reducer from '../reducers/user_reducer';
import {
  SHOW_ALERT,
  CLEAR_ALERT,
  SET_USER_SUCCESS,
  SET_USER_ERROR,
  SET_USER_BEGIN,
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

  const setUser = ({ name, email, password }) => {
    dispatch({ type: SET_USER_BEGIN });
    try {
      const newUser = { name, email, password };
      dispatch({ type: SET_USER_SUCCESS, payload: { name, email, password } });
      addUserToLocalStorage(newUser);
    } catch (error) {
      dispatch({ type: SET_USER_ERROR });
      console.log(error);
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
