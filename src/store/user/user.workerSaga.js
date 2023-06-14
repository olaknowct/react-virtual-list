import { call, put } from 'redux-saga/effects';
import { createUser } from '../../utils/apicall/createUser';
import { signupFailed, signInSuccess } from './user.reducer';

export function* signupSaga({ payload: { email, password, passwordConfirm } }) {
  try {
    if (!email || (!password && !passwordConfirm))
      throw new Error('Please fill the required details!');

    if (password !== passwordConfirm) throw new Error('Password not matched. please try again');

    const result = yield call(createUser, email, password, passwordConfirm);

    if (result.error) throw new Error(result.error);

    yield put(signInSuccess());
  } catch (error) {
    console.log(error.message);
    yield put(signupFailed(error.message));
  }
}
