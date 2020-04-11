// @flow

import { call, put, takeLatest } from "redux-saga/effects";
import {
  AnimeActionCreators,
  AnimeActionTypes
} from "../../action";
import { getAnimeList, getAnime, getBannerAnimeList } from "../../../service";

const handleGetAnimeListRequest = function*(action) {
  try {
    const data = yield call(getAnimeList, action.payload);
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

const handleGetBannerAnimeListRequest = function*() {
  try {
    const data = yield call(getBannerAnimeList);
    yield put(AnimeActionCreators.getBannerAnimeListSuccess(data));
  } catch (error) {
    yield put(AnimeActionCreators.getBannerAnimeListError(error));
  }
};

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
    AnimeActionTypes.GET_BANNER_ANIMELIST_REQUEST,
    handleGetBannerAnimeListRequest
  );
};

export default Saga;
