import { HANDLE_CHANGE } from '../actions';

const class_reducer = (state, action) => {
  if (action.type === HANDLE_CHANGE) {
    return { ...state, [action.payload.name]: action.payload.value };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default class_reducer;
