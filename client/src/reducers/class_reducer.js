import {
  HANDLE_CHANGE,
  GET_CLASS_ERROR,
  GET_CLASS_SUCCESS,
  GET_CLASS_BEGIN,
  CREATE_CLASS_ERROR,
  CREATE_CLASS_SUCCESS,
  CREATE_CLASS_BEGIN,
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
      //showAlert: true,
      //alertType: 'danger',
      //alertText: action.payload.msg,
    };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default class_reducer;
