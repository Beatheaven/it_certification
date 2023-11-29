import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';

import history from './history';
import sagas from './sagas';

export { history, sagas };

export const routeMiddleware = routerMiddleware(history);
export const sagaMiddleware = createSagaMiddleware();

export default [routeMiddleware, sagaMiddleware];
