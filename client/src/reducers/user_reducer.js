import {
  SHOW_ALERT,
  CLEAR_ALERT,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGIN_USER_BEGIN,
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
  if (action.type === LOGIN_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === LOGIN_USER_SUCCESS) {
    return {
      ...state,
      user: action.payload,
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
      alertText: action.payload.msg || 'Unable to register, try again later...',
    };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default user_reducer;
