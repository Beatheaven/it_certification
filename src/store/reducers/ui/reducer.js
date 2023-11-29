import actions from './actions';

const initialState = {
  loading: false,
  megamenu: false
};

export default function uiReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
