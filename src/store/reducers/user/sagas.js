import { all, call, put, takeEvery } from 'redux-saga/effects';
import actions from './actions';
import {
  getProfileUser,
  getProfileCheckPoint,
  surveyProgress
} from '../../../services';

export function* GET_CURRENT_USER() {
  yield put({ type: actions.SET_STATE, payload: { loading: true } });

  try {
    const { data: profile } = yield call(getProfileUser);
    yield put({ type: actions.SET_STATE, payload: { profile } });
  } catch ({ message: error }) {
    yield put({ type: actions.SET_STATE, payload: { error } });
  } finally {
    yield put({ type: actions.SET_STATE, payload: { loading: false } });
  }
}

export function* GET_CHECKPOINT() {
  yield put({ type: actions.SET_STATE, payload: { loading: true } });

  try {
    const { data } = yield call(getProfileCheckPoint);
    const { profile: checkpoint, survey } = data.data;
    yield put({ type: actions.SET_STATE, payload: { checkpoint, survey } });
  } catch ({ message: error }) {
    yield put({ type: actions.SET_STATE, payload: { error } });
  } finally {
    yield put({ type: actions.SET_STATE, payload: { loading: false } });
  }
}

export function* GET_PROGRESS() {
  yield put({ type: actions.SET_STATE, payload: { loading: true } });

  try {
    const { data: progress } = yield call(surveyProgress);
    yield put({ type: actions.SET_STATE, payload: { progress } });
  } catch ({ message: error }) {
    yield put({ type: actions.SET_STATE, payload: { error } });
  } finally {
    yield put({ type: actions.SET_STATE, payload: { loading: false } });
  }
}

export default function* profileSaga() {
  yield all([
    takeEvery(actions.GET_CURRENT_USER, GET_CURRENT_USER),
    takeEvery(actions.GET_CHECKPOINT, GET_CHECKPOINT),
    takeEvery(actions.GET_PROGRESS, GET_PROGRESS)
  ]);
}
