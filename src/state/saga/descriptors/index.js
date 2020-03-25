// @flow

import { call, put, takeLatest } from "redux-saga/effects";
import {
  DescriptorsActionCreators,
  DescriptorsActionTypes
} from "../../action";
import { getDescriptors } from "../../../service";

const handleGetDescriptorsRequest = function*(action) {
  try {
    const data = yield call(getDescriptors, action.payload);
    yield put(DescriptorsActionCreators.getDescriptorsSuccess(data));
  } catch (error) {
    yield put(DescriptorsActionCreators.getDescriptorsError(error));
  }
};

const Saga = function*() {
  yield takeLatest(
    DescriptorsActionTypes.GET_DESCRIPTORS_REQUEST,
    handleGetDescriptorsRequest
  );
};

export default Saga;
