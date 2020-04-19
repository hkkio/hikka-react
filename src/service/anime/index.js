import config from "../../display/application/config";
import axios from "axios";
import { uuid } from 'uuidv4';


function getAnimeList(payload) {
	return axios({
		method: "post",
		url: config.apiHost + "/anime/list",
		data: payload,
		headers: {
	        'Authentication': localStorage.token,
	        'Content-Type': 'application/json'
	    }
	})
	.then(response => {
		return response.data;
	})
	.catch(error => {
		throw error.response.data;
	})
}

function getAnime(payload) {
	return axios({
		method: "get",
		url: `${config.apiHost}/anime/get/${payload.slug}`,
		headers: {
	        'Authentication': localStorage.token,
	        'Content-Type': 'application/json'
	    }
	})
	.then(response => {
		return response.data;
	})
	.catch(error => {
		throw error.response.data;
	})
}

function newAnime(payload) {
	return axios({
		method: "post",
		url: `${config.apiHost}/anime/new`,
		data: payload,
		headers: {
	        'Authentication': localStorage.token,
	        'Content-Type': 'application/json'
	    }
	})
	.then(response => {
		return response.data;
	})
	.catch(error => {
		throw error.response.data;
	})
}

function createChunks(payload) {
	const chunkBytes = 1024*1024;
	const res = [];
	const id = uuid();

	for (var i = 0; i < payload.file.size; i+=chunkBytes) {
		if (i + chunkBytes < payload.file.size) {
			let blob = payload.file.slice(i, i+chunkBytes);
			res.push(blob);
		} else {
			let blob = payload.file.slice(i, payload.file.size);
			res.push(blob);
		}
	}

	return [res, id];
}

function uploadFile(payload, onUploadProgress) {
	const form = new FormData();

	form.append('type', payload.type);
	form.append('slug', payload.slug);
	form.append('file', payload.file);
	
	form.append('index', payload.index);
	form.append('total', payload.total);
	form.append('uuid', payload.uuid);
	form.append('offset', payload.offset);
	form.append('size', payload.file.size);

	return axios({
		method: "put",
		url: `${config.apiHost}/upload`,
		data: form,
		headers: {
	        'Authentication': localStorage.token,
	        'content-type': `multipart/form-data; boundary=${form._boundary}`,
	    },
	    onUploadProgress: (progress) => onUploadProgress({total: progress.total, index: payload.index, loaded: progress.loaded, chunks: payload.total})
	})
	.then(response => {
		return response.data;
	})
	.catch(error => {
		throw error.response.data;
	})
}

function getBannerAnimeList() {

	return axios({
		method: "get",
		url: config.apiHost + "/anime/selected",
		headers: {
	        'Authentication': localStorage.token,
	        'Content-Type': 'application/json'
	    }
	})
	.then(response => {
		return response.data;
	})
	.catch(error => {
		throw error.response.data;
	})
}

export { getAnimeList, getAnime, newAnime, uploadFile, createChunks, getBannerAnimeList };
