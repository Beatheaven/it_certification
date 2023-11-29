import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import middlewares, { sagas, sagaMiddleware } from 'store/middlewares';
import reducers from 'store/reducers';

const configureStore = (initialState) => {
  const store = createStore(
    reducers(),
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
  );
  sagaMiddleware.run(sagas);
  return store;
};

export default configureStore(/* provide initial state if any */);
