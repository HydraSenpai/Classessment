import { TOGGLE_SIDEBAR } from '../actions';

const app_reducer = (state, action) => {
  if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSidebar: !state.showSidebar,
    };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default app_reducer;
