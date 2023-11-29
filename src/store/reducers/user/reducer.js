import actions from './actions';

const initialState = {
  loading: false,
  profile: null,
  checkpoint: null,
  survey: null,
  progress: null,
  popup: false,
  buffer: {
    profile: {}
  }
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload };
    case actions.TOGGLE_POPUP:
      return { ...state, popup: action.payload || !state.popup };
    case actions.SET_BUFFER:
      return {
        ...state,
        buffer: {
          ...state.buffer,
          ...action.payload,
          profile: {
            ...state.buffer.profile,
            ...action.payload.profile
          }
        }
      };
    default:
      return state;
  }
}
