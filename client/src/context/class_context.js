import React, { useContext, useReducer } from 'react';
import reducer from '../reducers/class_reducer';
import axios from 'axios';
import { useUserContext } from './user_context';

import {
  HANDLE_CHANGE,
  GET_CLASS_SUCCESS,
  GET_CLASS_BEGIN,
  CREATE_CLASS_ERROR,
  CREATE_CLASS_SUCCESS,
  CREATE_CLASS_BEGIN,
  GET_SINGLECLASS_SUCCESS,
  GET_SINGLECLASS_BEGIN,
  GET_SINGLECLASS_ERROR,
  CHANGE_CLASS_OPTION,
  CREATED_NEW_CLASS,
  CREATED_NEW_CLASS_PROCESSED,
  DELETE_CLASS_SUCCESS,
  DELETE_CLASS_BEGIN,
  DELETE_CLASS_ERROR,
  DELETED_NEW_CLASS,
  DELETED_NEW_CLASS_PROCESSED,
  ADD_TEST_ERROR,
  ADD_TEST_BEGIN,
  ADD_TEST_SUCCESS,
} from '../actions';
const initialState = {
  classes: [],
  totalClasses: 0,
  isLoading: true,
  currentClass: {},
  classOption: 'view',
  createdClass: false,
  deletedClass: false,
  showAlert: false,
  alertType: '',
  alertText: '',
};

const ClassContext = React.createContext();

const ClassProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { token, logoutUser, clearAlert, displayCustomAlert } =
    useUserContext();

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
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const getSingleClass = async (id) => {
    dispatch({ type: GET_SINGLECLASS_BEGIN });
    let url = `/classes/${id}`;
    try {
      const { data } = await authFetch.get(url);
      const { classSingle } = data;
      dispatch({ type: GET_SINGLECLASS_SUCCESS, payload: classSingle });
    } catch (error) {
      dispatch({ type: GET_SINGLECLASS_ERROR });
      console.log(error);
    }
  };

  const createClass = async ({ name }) => {
    dispatch({ type: CREATE_CLASS_BEGIN });
    try {
      await authFetch.post('/classes', { name });
      dispatch({ type: CREATE_CLASS_SUCCESS });
      await getAllClasses();
      dispatch({ type: CREATED_NEW_CLASS });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_CLASS_ERROR,
        payload: { msg: error.response.data.msg },
      });
      displayCustomAlert('danger', 'class name already exists');
    }
    clearAlert();
  };

  // NEED TO ADD REDUCER OPTIONS AND WILL BE FINISHED
  const addScore = async ({ name, score }) => {
    dispatch({ type: ADD_TEST_BEGIN });
    try {
      await authFetch.patch(`/classes/stats/${state.currentClass._id}`, {
        name,
        score,
      });
      dispatch({ type: ADD_TEST_SUCCESS });
      await getAllClasses();
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: ADD_TEST_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const deleteClass = async () => {
    dispatch({ type: DELETE_CLASS_BEGIN });
    try {
      await authFetch.delete(`/classes/${state.currentClass._id}`);
      dispatch({ type: DELETE_CLASS_SUCCESS });
      await getAllClasses();
      dispatch({ type: DELETED_NEW_CLASS });
      displayCustomAlert('success', 'Success! Deleted class...');
    } catch (error) {
      dispatch({ type: DELETE_CLASS_ERROR });
      displayCustomAlert('danger', 'Error! Could not delete class');
    }
    setTimeout(() => clearAlert(), 4000);
  };

  const resetClassesSearch = () => {
    dispatch({ type: CREATED_NEW_CLASS_PROCESSED });
  };

  const resetDeletedList = () => {
    dispatch({ type: DELETED_NEW_CLASS_PROCESSED });
  };

  const changeClassOption = (option) => {
    dispatch({ type: CHANGE_CLASS_OPTION, payload: option });
  };

  return (
    <ClassContext.Provider
      value={{
        ...state,
        setDetails,
        createClass,
        getAllClasses,
        getSingleClass,
        changeClassOption,
        resetClassesSearch,
        deleteClass,
        resetDeletedList,
        addScore,
      }}
    >
      {children}
    </ClassContext.Provider>
  );
};

const useClassContext = () => {
  return useContext(ClassContext);
};

export { ClassProvider, useClassContext, initialState };
