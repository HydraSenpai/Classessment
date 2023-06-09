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
  SHOW_CUSTOM_ALERT,
  EDIT_USER_BEGIN,
  EDIT_USER_SUCCESS,
  EDIT_USER_ERROR,
  RESET_USER,
} from '../actions';
import { initialState } from '../context/user_context';

const user_reducer = (state, action) => {
  if (action.type === SHOW_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: 'danger',
      alertText: 'Please provide all values',
    };
  }
  if (action.type === SHOW_CUSTOM_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: action.payload.type,
      alertText: action.payload.message,
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: '',
      alertText: '',
    };
  }
  if (action.type === LOGIN_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === LOGIN_USER_SUCCESS) {
    return {
      ...state,
      user: action.payload.user,
      token: action.payload.token,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'Logged in! Redirecting...',
    };
  }
  if (action.type === LOGIN_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg || 'Unable to login, try again later...',
    };
  }
  if (action.type === REGISTER_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === REGISTER_USER_SUCCESS) {
    return {
      ...state,
      user: action.payload.user,
      token: action.payload.token,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'Account Created! Redirecting...',
    };
  }
  if (action.type === REGISTER_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg || 'Unable to register, try again later...',
    };
  }
  if (action.type === REMOVE_USER) {
    return {
      ...initialState,
      user: null,
    };
  }
  if (action.type === EDIT_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
      isEditing: true,
    };
  }
  if (action.type === EDIT_USER_SUCCESS) {
    return {
      ...state,
      user: action.payload.user,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'Updated Value!',
      isEditing: false,
    };
  }
  if (action.type === EDIT_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText:
        action.payload.msg || 'Unable to update value, try again later...',
      isEditing: false,
    };
  }
  if (action.type === RESET_USER) {
    return { ...state, user: action.payload.user };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default user_reducer;
