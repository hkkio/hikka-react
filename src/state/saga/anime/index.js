// @flow

import { call, put, fork, take, takeLatest, takeEvery } from "redux-saga/effects";
import { eventChannel, END } from 'redux-saga';
import {
  AnimeActionCreators,
  AnimeActionTypes
} from "../../action";
import { getAnimeList, getAnime, getBannerAnimeList, newAnime, uploadFile, createChunks } from "../../../service";

const handleGetAnimeListRequest = function*(action) {
  try {
    const data = action.payload != null ? yield call(getAnimeList, action.payload) : yield call(getAnimeList, {page: 0});
    yield put(AnimeActionCreators.getAnimeListSuccess(data));
  } catch (error) {
    console.log("error", error)
    yield put(AnimeActionCreators.getAnimeListError(error));
  }
};

const handleGetAnimeRequest = function*(action) {
  try {
    const data = yield call(getAnime, action.payload);
    yield put(AnimeActionCreators.getAnimeSuccess(data));
  } catch (error) {
    yield put(AnimeActionCreators.getAnimeError(error));
  }
};

const handleNewAnimeRequest = function*(action) {
  try {
    const data = yield call(newAnime, action.payload);
    yield put(AnimeActionCreators.newAnimeSuccess(data));
  } catch (error) {
    yield put(AnimeActionCreators.newAnimeError(error));
  }
};

// const handleUploadFileRequest = function*(action) {
//   try {
//     const data = yield call(uploadFile, action.payload);
//     yield put(AnimeActionCreators.uploadFileSuccess(data));
//   } catch (error) {
//     yield put(AnimeActionCreators.uploadFileError(error));
//   }
// };

const handleGetBannerAnimeListRequest = function*() {
  try {
    const data = yield call(getBannerAnimeList);
    yield put(AnimeActionCreators.getBannerAnimeListSuccess(data));
  } catch (error) {
    yield put(AnimeActionCreators.getBannerAnimeListError(error));
  }
};

function createUploader() {
  let emit;
  const chan = eventChannel((emitter) => {
    emit = emitter;
    return () => {};
  });

  const uploadProgressCb = ({ total, loaded, chunks, index }) => {
    const percentage = Math.round((((loaded * 100) / total) / chunks) + ((100/chunks)*(index-1)));
    console.log(percentage);
    emit(percentage);
    if (percentage === 100) emit(END);
  };

  return [uploadProgressCb, chan];
}

function* uploadProgressWatcher(chan) {
  while (true) { // eslint-disable-line no-constant-condition
    const progress = yield take(chan);
    yield put(AnimeActionCreators.uploadFileProgress(progress));
  }
}

function* handleUploadFileRequest(action) {
  yield put(AnimeActionCreators.uploadFileStart());

  try {
    const [uploadProgressCb, chan] = yield call(createUploader);
    yield fork(uploadProgressWatcher, chan);

    const [chunks, uuid] = yield call(createChunks, action.payload);
    let res = null;

    for (var i = 0; i < chunks.length; i++) {
      let res = yield call(uploadFile, {...action.payload, file: chunks[i], index: i+1, offset: (i*chunks[i].size)+1, total: chunks.length, uuid}, uploadProgressCb);
    }
    
    yield put(AnimeActionCreators.uploadFileSuccess(res));
  } catch (e) {
    console.log(e)
    yield put(AnimeActionCreators.uploadFileError(e));
  }
}

const Saga = function*() {
  yield takeLatest(
    AnimeActionTypes.GET_ANIMELIST_REQUEST,
    handleGetAnimeListRequest
  );

  yield takeLatest(
    AnimeActionTypes.GET_ANIME_REQUEST,
    handleGetAnimeRequest
  );

  yield takeLatest(
    AnimeActionTypes.NEW_ANIME_REQUEST,
    handleNewAnimeRequest
  );

  yield takeLatest(
    AnimeActionTypes.UPLOAD_FILE_REQUEST,
    handleUploadFileRequest
  );

  yield takeLatest(
    AnimeActionTypes.GET_BANNER_ANIMELIST_REQUEST,
    handleGetBannerAnimeListRequest
  );
};

export default Saga;
