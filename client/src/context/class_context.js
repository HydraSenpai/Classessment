import React, { useContext, useEffect, useReducer, useState } from 'react';
import reducer from '../reducers/class_reducer';
import axios from 'axios';
import { useUserContext } from './user_context';

import {
  HANDLE_CHANGE,
  GET_CLASS_ERROR,
  GET_CLASS_SUCCESS,
  GET_CLASS_BEGIN,
  CREATE_CLASS_ERROR,
  CREATE_CLASS_SUCCESS,
  CREATE_CLASS_BEGIN,
} from '../actions';
const initialState = {
  classes: [],
  totalClasses: 0,
  isLoading: false,
};

const ClassContext = React.createContext();

const ClassProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { token, logoutUser, clearAlert } = useUserContext();

  const authFetch = axios.create({
    baseURL: '/api/v1',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const setDetails = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  const getAllClasses = async () => {
    let url = `/classes`;
    dispatch({ type: GET_CLASS_BEGIN });
    try {
      const { data } = await authFetch.get(url);
      const { classes, totalClasses } = data;
      dispatch({
        type: GET_CLASS_SUCCESS,
        payload: {
          classes,
          totalClasses,
        },
      });
      console.log(classes);
    } catch (error) {
      console.log(error.response);
      logoutUser();
    }
    clearAlert();
  };

  const createClass = async ({ name }) => {
    dispatch({ type: CREATE_CLASS_BEGIN });
    try {
      await authFetch.post('/classes', { name });
      dispatch({ type: CREATE_CLASS_SUCCESS });
      getAllClasses();
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_CLASS_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  return (
    <ClassContext.Provider
      value={{ ...state, setDetails, createClass, getAllClasses }}
    >
      {children}
    </ClassContext.Provider>
  );
};

const useClassContext = () => {
  return useContext(ClassContext);
};

export { ClassProvider, useClassContext, initialState };
