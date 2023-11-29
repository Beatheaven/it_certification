import { all } from 'redux-saga/effects';
import user from '../reducers/user/sagas';
import ui from '../reducers/ui/sagas';

export default function* rootSaga() {
  yield all([user(), ui()]);
}
