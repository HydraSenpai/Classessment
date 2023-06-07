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
  CREATE_EXISTING_CLASS_ERROR,
  DELETE_CLASS_SUCCESS,
  DELETE_CLASS_BEGIN,
  DELETE_CLASS_ERROR,
  DELETED_NEW_CLASS,
  DELETED_NEW_CLASS_PROCESSED,
  ADD_TEST_ERROR,
  ADD_TEST_BEGIN,
  ADD_TEST_SUCCESS,
  EDIT_TEST_BEGIN,
  EDIT_TEST_ERROR,
  EDIT_TEST_SUCCESS,
  EDITING_BEGIN,
  STOP_EDITING,
} from '../actions';

const class_reducer = (state, action) => {
  if (action.type === HANDLE_CHANGE) {
    return { ...state, [action.payload.name]: action.payload.value };
  }
  if (action.type === GET_CLASS_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === GET_CLASS_SUCCESS) {
    return {
      ...state,
      classes: action.payload.classes,
      totalClasses: action.payload.totalClasses,
      isLoading: false,
    };
  }
  if (action.type === CREATE_CLASS_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === CREATE_CLASS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === CREATE_CLASS_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }
  if (action.type === GET_SINGLECLASS_SUCCESS) {
    return { ...state, currentClass: action.payload, isLoading: false };
  }
  if (action.type === GET_SINGLECLASS_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === GET_SINGLECLASS_ERROR) {
    return {
      ...state,
      isLoading: false,
      //showAlert: true,
      //alertType: 'danger',
      //alertText: action.payload.msg,
    };
  }
  if (action.type === CHANGE_CLASS_OPTION) {
    return { ...state, classOption: action.payload };
  }
  if (action.type === CREATED_NEW_CLASS) {
    return { ...state, createdClass: true };
  }
  if (action.type === CREATED_NEW_CLASS_PROCESSED) {
    return { ...state, createdClass: false };
  }
  if (action.type === CREATE_EXISTING_CLASS_ERROR)
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: 'Class name already exists',
    };
  if (action.type === DELETE_CLASS_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === DELETE_CLASS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'Class deleted...',
    };
  }
  if (action.type === DELETE_CLASS_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: 'Could not delete class...',
    };
  }
  if (action.type === DELETED_NEW_CLASS) {
    return { ...state, deletedClass: true };
  }
  if (action.type === DELETED_NEW_CLASS_PROCESSED) {
    return { ...state, deletedClass: false };
  }
  if (action.type === ADD_TEST_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === ADD_TEST_SUCCESS) {
    return { ...state, isLoading: false };
  }
  if (action.type === ADD_TEST_ERROR) {
    return { ...state, isLoading: false };
  }
  if (action.type === EDITING_BEGIN) {
    return { ...state, isEditing: true };
  }
  if (action.type === EDIT_TEST_BEGIN) {
    return { ...state, isLoading: true, isEditing: true };
  }
  if (action.type === EDIT_TEST_SUCCESS) {
    return { ...state, isLoading: false, isEditing: false };
  }
  if (action.type === EDIT_TEST_ERROR) {
    //SHOULD SHOW ERROR MESSAGE
    return { ...state, isLoading: false, isEditing: false };
  }
  if (action.type === STOP_EDITING) {
    return { ...state, isEditing: false };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default class_reducer;
