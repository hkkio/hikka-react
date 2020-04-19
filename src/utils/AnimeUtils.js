import { genres, states, categories, statuses, seasons, minYear } from "../data/static";
export { genres, states, categories, statuses, seasons, minYear };

export const getGenres = (genreSlugs = []) => {
	let data = [];

	for (var i = 0; i < genreSlugs.length; i++) {
		data.push(getGenre(genreSlugs[i]));
	}

	return data;
};

export const getGenre = (genreSlug = "", prop = "name") => {
	try {
		return genres.find((genre) => genre.slug == genreSlug)[prop];
	} catch(e) {
		return "";
	}
};

export const getState = (stateSlug = "", prop = "name") => {
	try {
		return states.find((state) => state.slug == stateSlug)[prop];
	} catch(e) {
		return "";
	}
};

export const getCategory = (categorySlug = "", prop = "name") => {
	try {
		return categories.find((category) => category.slug == categorySlug)[prop];
	} catch(e) {
		return "";
	}
};

export const getStatus = (statusSlug = "", prop = "name") => {
	try {
		return statuses.find((status) => status.slug == statusSlug)[prop];
	} catch(e) {
		return "";
	}
};

export const getSeason = (seasonSlug = "", prop = "value") => {
	try {
		return seasons.find((season) => season.slug == seasonSlug)[prop];
	} catch(e) {
		return "";
	}
};

export const cutDescription = (description = "", maxLenDesc = 200) => {
	if (description.length <= maxLenDesc) return description;
    return description.substr(0, description.lastIndexOf(" ", maxLenDesc)) + "...";
};

export const getGenresByMAL = (MALGenres = []) => {
	let data = [];

	for (var i = 0; i < MALGenres.length; i++) {
		try {
			data.push(getGenre(MALGenres[i].name.replace('-', '_').replace(' ', '_').toLowerCase(), "slug"));
		} catch(e) {
			console.log(e);
		}
	}

	return data;
};