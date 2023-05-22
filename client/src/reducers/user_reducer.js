import {
  SHOW_ALERT,
  CLEAR_ALERT,
  SET_USER_SUCCESS,
  SET_USER_ERROR,
  SET_USER_BEGIN,
} from '../actions';

const user_reducer = (state, action) => {
  if (action.type === SHOW_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: 'danger',
      alertText: 'Please provide all values',
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
  if (action.type === SET_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === SET_USER_SUCCESS) {
    return {
      ...state,
      user: action.payload,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'Logged in! Redirecting...',
    };
  }
  if (action.type === SET_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: 'Unable to register, try again later...',
    };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default user_reducer;
