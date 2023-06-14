import { takeLatest, all, call } from 'redux-saga/effects';
import { signupSaga } from './user.workerSaga';
import { signUpStart } from './user.reducer';

export function* watchSignupStart() {
  yield takeLatest(signUpStart, signupSaga);
}

export function* userSagas() {
  yield all([call(watchSignupStart)]);
}
