import { genres, states, categories, statuses } from "../data/static";

export const getGenres = (genreSlugs = []) => {
	let data = [];

	for (var i = 0; i < genreSlugs.length; i++) {
		data.push(getGenre(genreSlugs[i]));
	}

	return data;
};

export const getGenre = (genreSlug = "") => {
	return genres.find((genre) => genre.slug == genreSlug)["name"];
};

export const getState = (stateSlug = "") => {
	return states.find((state) => state.slug == stateSlug)["name"];
};

export const getCategory = (categorySlug = "") => {
	return categories.find((category) => category.slug == categorySlug)["name"];
};

export const getStatus = (statusSlug = "") => {
	return statuses.find((status) => status.slug == statusSlug)["name"];
};