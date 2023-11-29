import { combineReducers } from 'redux';

import user from './user/reducer';
import ui from './ui/reducer';

const createRootReducer = () =>
  combineReducers({
    user,
    ui
  });

export default createRootReducer;
