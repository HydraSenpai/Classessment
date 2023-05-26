import React, { useContext, useEffect, useReducer, useState } from 'react';
import reducer from '../reducers/class_reducer';
import axios from 'axios';

import { HANDLE_CHANGE } from '../actions';
const initialState = {
  classes: [],
  isLoading: false,
};

const ClassContext = React.createContext();

const ClassProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setDetails = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  const getAllClasses = () => {
    console.log('get all classes');
  };

  return (
    <ClassContext.Provider value={{ ...state, setDetails, getAllClasses }}>
      {children}
    </ClassContext.Provider>
  );
};

const useClassContext = () => {
  return useContext(ClassContext);
};

export { ClassProvider, useClassContext, initialState };
