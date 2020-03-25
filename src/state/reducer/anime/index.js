import { AnimeActionTypes } from "../../action";

const defaultState = {
	animeList: null,
	bannerAnimeList: null,
  currentAnime: null
};

const anime = (state = defaultState, action) => {
  switch (action.type) {
    case AnimeActionTypes.GET_ANIMELIST_SUCCESS:
      return Object.assign({}, state, {animeList: action.payload});
    case AnimeActionTypes.GET_ANIME_SUCCESS:
      return Object.assign({}, state, {currentAnime: action.payload});
    case AnimeActionTypes.GET_BANNER_ANIMELIST_SUCCESS:
      return Object.assign({}, state, {bannerAnimeList: action.payload});
    case AnimeActionTypes.SET_ANIME:
      return Object.assign({}, state, {currentAnime: action.payload});
      case AnimeActionTypes.SET_ANIMELIST:
      return Object.assign({}, state, {animeList: action.payload});
    default:
      return state;
  }
};

export default anime;
