import {bannerAnimeList} from "../../data";
import config from "../../display/application/config";
import axios from "axios";


function getAnimeList(payload) {
	return axios({
		method: "post",
		url: config.apiHost + "anime/list",
		data: payload
	})
	.then(response => {
		return [...response.data.data.slice(), ...response.data.data.slice(), ...response.data.data.slice(), ...response.data.data.slice(), ...response.data.data.slice(), ...response.data.data.slice(), ...response.data.data.slice(), ...response.data.data.slice(), ...response.data.data.slice(), ...response.data.data.slice(), ...response.data.data.slice(), ...response.data.data.slice()];
	})
	.catch(error => {
		throw new Error(error.response.data.error.message);
	})
}

function getAnime(payload) {
	return axios({
		method: "get",
		url: `${config.apiHost}anime/get/${payload.slug}`
	})
	.then(response => {
		return response.data;
	})
	.catch(error => {
		throw new Error(error.response.data.error.message);
	})
}

function getBannerAnimeList() {
  return () => {
    return bannerAnimeList;
  };
}

export { getAnimeList, getAnime, getBannerAnimeList };
