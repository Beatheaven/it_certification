import { all, select, put, takeEvery } from 'redux-saga/effects';
import actions from './actions';
import selectors from './selectors';

export function* TOGGLE_MEGAMENU({ payload }) {
  const isMegaMenuOpen = yield select(selectors, 'megamenu');
  yield put({
    type: actions.SET_STATE,
    payload:
      payload !== undefined
        ? { megamenu: payload }
        : { megamenu: !isMegaMenuOpen }
  });
}

export default function* uiSaga() {
  yield all([takeEvery(actions.TOGGLE_MEGAMENU, TOGGLE_MEGAMENU)]);
}
