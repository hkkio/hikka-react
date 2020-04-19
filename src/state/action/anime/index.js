const AnimeActionTypes = {
  GET_ANIMELIST_REQUEST: "GET_ANIMELIST_REQUEST",
  GET_ANIMELIST_ERROR: "GET_ANIMELIST_ERROR",
  GET_ANIMELIST_SUCCESS: "GET_ANIMELIST_SUCCESS",

  SET_DEFAUT_ANIMELIST: "SET_DEFAUT_ANIMELIST",

  GET_ANIME_REQUEST: "GET_ANIME_REQUEST",
  GET_ANIME_ERROR: "GET_ANIME_ERROR",
  GET_ANIME_SUCCESS: "GET_ANIME_SUCCESS",

  SET_ANIME: "SET_ANIME",

  GET_BANNER_ANIMELIST_REQUEST: "GET_BANNER_ANIMELIST_REQUEST",
  GET_BANNER_ANIMELIST_ERROR: "GET_BANNER_ANIMELIST_ERROR",
  GET_BANNER_ANIMELIST_SUCCESS: "GET_BANNER_ANIMELIST_SUCCESS",

  NEW_ANIME_REQUEST: "NEW_ANIME_REQUEST",
  NEW_ANIME_ERROR: "NEW_ANIME_ERROR",
  NEW_ANIME_SUCCESS: "NEW_ANIME_SUCCESS",

  UPLOAD_FILE_REQUEST: "UPLOAD_FILE_REQUEST",
  UPLOAD_FILE_ERROR: "UPLOAD_FILE_ERROR",
  UPLOAD_FILE_SUCCESS: "UPLOAD_FILE_SUCCESS",
  UPLOAD_FILE_START: "UPLOAD_FILE_START",
  UPLOAD_FILE_PROGRESS: "UPLOAD_FILE_PROGRESS"
};

// getAnimeList

function getAnimeList(payload) {
  return {
    payload,
    type: AnimeActionTypes.GET_ANIMELIST_REQUEST
  };
}

function getAnimeListError(error) {
  return {
    payload: { error },
    type: AnimeActionTypes.GET_ANIMELIST_ERROR
  };
}

function getAnimeListSuccess(data) {
  return {
    payload: data,
    type: AnimeActionTypes.GET_ANIMELIST_SUCCESS
  };
}

// newAnime

function newAnime(payload) {
  return {
    payload,
    type: AnimeActionTypes.NEW_ANIME_REQUEST
  };
}

function newAnimeError(data) {
  return {
    payload: data,
    type: AnimeActionTypes.NEW_ANIME_ERROR
  };
}

function newAnimeSuccess(data) {
  return {
    payload: data,
    type: AnimeActionTypes.NEW_ANIME_SUCCESS
  };
}

// newAnime

function uploadFile(payload) {
  return {
    payload,
    type: AnimeActionTypes.UPLOAD_FILE_REQUEST
  };
}

function uploadFileStart(payload) {
  return {
    payload,
    type: AnimeActionTypes.UPLOAD_FILE_START
  };
}

function uploadFileProgress(payload) {
  return {
    payload,
    type: AnimeActionTypes.UPLOAD_FILE_PROGRESS
  };
}

function uploadFileError(data) {
  return {
    payload: data,
    type: AnimeActionTypes.UPLOAD_FILE_ERROR
  };
}

function uploadFileSuccess(data) {
  return {
    payload: data,
    type: AnimeActionTypes.UPLOAD_FILE_SUCCESS
  };
}


// setDefaultAnimeList

function setDefaultAnimeList(payload) {
  return {
    payload,
    type: AnimeActionTypes.SET_DEFAUT_ANIMELIST
  };
}

// getAnime

function getAnime(payload) {
  return {
    payload,
    type: AnimeActionTypes.GET_ANIME_REQUEST
  };
}

function getAnimeError(payload) {
  return {
    payload,
    type: AnimeActionTypes.GET_ANIME_ERROR
  };
}

function getAnimeSuccess(data) {
  return {
    payload: data,
    type: AnimeActionTypes.GET_ANIME_SUCCESS
  };
}


// setAnime

function setAnime(payload) {
  return {
    payload,
    type: AnimeActionTypes.SET_ANIME
  };
}


// getBannerAnimeList

function getBannerAnimeList() {
  return {
    type: AnimeActionTypes.GET_BANNER_ANIMELIST_REQUEST
  };
}

function getBannerAnimeListError(payload) {
  return {
    payload,
    type: AnimeActionTypes.GET_BANNER_ANIMELIST_ERROR
  };
}

function getBannerAnimeListSuccess(data) {
  return {
    payload: data,
    type: AnimeActionTypes.GET_BANNER_ANIMELIST_SUCCESS
  };
}

const AnimeActionCreators = {
  // getAnimeList
  getAnimeList,
  getAnimeListError,
  getAnimeListSuccess,
  // newAnime
  newAnime,
  newAnimeError,
  newAnimeSuccess,
  // uploadFile
  uploadFile,
  uploadFileError,
  uploadFileSuccess,
  uploadFileStart,
  uploadFileProgress,
  // setDefaultAnimeList
  setDefaultAnimeList,
  // getAnime
  getAnime,
  getAnimeError,
  getAnimeSuccess,
  // setAnime
  setAnime,
  // getBannerAnimeList
  getBannerAnimeList,
  getBannerAnimeListError,
  getBannerAnimeListSuccess,
};

export { AnimeActionTypes, AnimeActionCreators };
