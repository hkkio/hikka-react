// @flow

import { call, put, takeLatest } from "redux-saga/effects";
import {
  ApplicationActionCreators,
  ApplicationActionTypes
} from "../../action";
import { applicationInitialize, joinUser, loginUser, getInfo } from "../../../service";

const handleJoinUserRequest = function*(action) {
  try {
    const data = yield call(joinUser, action.payload);
    yield put(ApplicationActionCreators.joinUserSuccess(data));
  } catch (error) {
    yield put(ApplicationActionCreators.joinUserError(error));
  }
};

const handleLoginUserRequest = function*(action) {
  try {
    const data = yield call(loginUser, action.payload);

    yield put(ApplicationActionCreators.loginUserSuccess(data));

    localStorage.setItem("token", data.token);
    localStorage.setItem("expire", data.expire);
  } catch (error) {
    yield put(ApplicationActionCreators.loginUserError(error));

    localStorage.removeItem("token");
    localStorage.removeItem("expire");
  }
};

const handleLogoutUserRequest = function*(action) {
  try {
    // const data = yield call(loginUser, action.payload);
    localStorage.removeItem("token");
    localStorage.removeItem("expire");

    yield put(ApplicationActionCreators.logoutUserSuccess());
  } catch (error) {
    // yield put(ApplicationActionCreators.loginUserError(error));

  }
};

const handleGetInfoRequest = function*() {
  try {
    const data = yield call(getInfo);
    yield put(ApplicationActionCreators.getInfoSuccess(data));
  } catch (error) {
    yield put(ApplicationActionCreators.getInfoError(error));
  }
};

const handleInitializeApplicationRequest = function*() {
  try {
    const data = yield call(applicationInitialize);
    yield put(ApplicationActionCreators.initializeApplicationSuccess(data));
  } catch (error) {
    yield put(ApplicationActionCreators.initializeApplicationError(error));
  }
};

const Saga = function*() {
  yield takeLatest(
    ApplicationActionTypes.INITIALIZE_APPLICATION_REQUEST,
    handleInitializeApplicationRequest,
  );
  yield takeLatest(
    ApplicationActionTypes.GET_INFO_REQUEST,
    handleGetInfoRequest,
  );
  yield takeLatest(
    ApplicationActionTypes.JOIN_USER_REQUEST,
    handleJoinUserRequest
  );
  yield takeLatest(
    ApplicationActionTypes.LOGIN_USER_REQUEST,
    handleLoginUserRequest
  );
  yield takeLatest(
    ApplicationActionTypes.LOGOUT_USER_REQUEST,
    handleLogoutUserRequest
  );
};

export default Saga;
