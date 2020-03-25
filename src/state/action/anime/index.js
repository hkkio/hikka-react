const AnimeActionTypes = {
  GET_ANIMELIST_REQUEST: "GET_ANIMELIST_REQUEST",
  GET_ANIMELIST_ERROR: "GET_ANIMELIST_ERROR",
  GET_ANIMELIST_SUCCESS: "GET_ANIMELIST_SUCCESS",

  SET_ANIMELIST: "SET_ANIMELIST",

  GET_ANIME_REQUEST: "GET_ANIME_REQUEST",
  GET_ANIME_ERROR: "GET_ANIME_ERROR",
  GET_ANIME_SUCCESS: "GET_ANIME_SUCCESS",

  SET_ANIME: "SET_ANIME",

  GET_BANNER_ANIMELIST_REQUEST: "GET_BANNER_ANIMELIST_REQUEST",
  GET_BANNER_ANIMELIST_ERROR: "GET_BANNER_ANIMELIST_ERROR",
  GET_BANNER_ANIMELIST_SUCCESS: "GET_BANNER_ANIMELIST_SUCCESS",
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

// setAnime

function setAnimeList(payload) {
  return {
    payload,
    type: AnimeActionTypes.SET_ANIMELIST
  };
}

// getAnime

function getAnime(payload) {
  return {
    payload,
    type: AnimeActionTypes.GET_ANIME_REQUEST
  };
}

function getAnimeError(error) {
  return {
    payload: { error },
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

function getBannerAnimeListError(error) {
  return {
    payload: { error },
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
  // setAnime
  setAnimeList,
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
