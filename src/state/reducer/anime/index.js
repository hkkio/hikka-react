import { AnimeActionTypes } from "../../action";

const defaultState = {
	animeList: {
		data: null,
		newData: null,
		error: null,
		loading: false,
	},
	bannerAnimeList: {
		data: null,
		error: null,
		loading: false,
	},
	currentAnime: {
		data: null,
		error: null,
		loading: false,
	},
};

const anime = (state = defaultState, action) => {
	switch (action.type) {
		case AnimeActionTypes.GET_ANIMELIST_SUCCESS:
			return {...state, animeList: mergeAnimeList(state, action.payload)};
		case AnimeActionTypes.GET_ANIMELIST_REQUEST:
			return {...state, animeList: {...state.animeList, loading: true}};
		case AnimeActionTypes.GET_ANIMELIST_ERROR:
			return {...state, animeList: {...state.animeList, loading: false}};
		case AnimeActionTypes.GET_ANIME_SUCCESS:
			return {...state, currentAnime: {...action.payload, loading: false}};
		case AnimeActionTypes.GET_BANNER_ANIMELIST_SUCCESS:
			return {...state, bannerAnimeList: {...action.payload, loading: false}};
		case AnimeActionTypes.SET_ANIME:
			return {...state, currentAnime: {...action.payload, loading: false}};
		case AnimeActionTypes.SET_DEFAUT_ANIMELIST:
			return {...state, animeList: {...defaultState.animeList, loading: false}};
		case AnimeActionTypes.NEW_ANIME_SUCCESS:
			return {...state, currentAnime: {...action.payload, loading: false}};
		case AnimeActionTypes.NEW_ANIME_REQUEST:
			return {...state, currentAnime: {...defaultState.currentAnime, loading: true}};
		case AnimeActionTypes.NEW_ANIME_ERROR:
			return {...state, currentAnime: {...action.payload, loading: false}};
		case AnimeActionTypes.UPLOAD_FILE_SUCCESS:
			return {...state, currentAnime: {...action.payload, loading: false}};
		case AnimeActionTypes.UPLOAD_FILE_REQUEST:
			return {...state, currentAnime: {...defaultState.currentAnime, ...state.currentAnime.data, loading: true}};
		case AnimeActionTypes.UPLOAD_FILE_ERROR:
			return {...state, currentAnime: {...action.payload, ...state.currentAnime.data, loading: false}};
		default:
			return state;
	}
};

const mergeAnimeList = (state, payload) => {
	if (state.animeList.data == null) {
		return {...payload, newData: payload.data, loading: false};
	};

	let newState = {...state};
	let animeList = newState.animeList.data;
	const prop = "slug";

	mergeByProperty(animeList, payload.data, prop);
	return {...newState.animeList, data: animeList, newData: payload.data, loading: false};
}

const mergeByProperty = (target, source, prop) => {
  source.forEach(sourceElement => {
    let targetElement = target.find(targetElement => {
      return sourceElement[prop] === targetElement[prop];
    })
    targetElement ? Object.assign(targetElement, sourceElement) : target.push(sourceElement);
  })
}

export default anime;
