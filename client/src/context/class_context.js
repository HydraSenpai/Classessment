import React, { useContext, useEffect, useReducer, useState } from 'react';
import reducer from '../reducers/class_reducer';

import { HANDLE_CHANGE } from '../actions';
const initialState = {
  name: '',
};

const ClassContext = React.createContext();

const ClassProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setDetails = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  return (
    <ClassContext.Provider value={{ ...state, setDetails }}>
      {children}
    </ClassContext.Provider>
  );
};

const useClassContext = () => {
  return useContext(ClassContext);
};

export { ClassProvider, useClassContext, initialState };
