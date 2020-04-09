import config from "../../display/application/config";
import axios from "axios";

function joinUser(payload) {
	return axios({
		method: "post",
		url: config.apiHost + "/auth/join",
		data: { username: payload.username, email: payload.email, password: payload.password }
	})
	.then(response => {
		return response.data.data;
	})
	.catch(error => {
		throw new Error(error.response.data.error.message);
	})
}

function loginUser(payload) {
	return axios({
		method: "post",
		url: config.apiHost + "/auth/login",
		data: { email: payload.email, password: payload.password }
	})
	.then(response => {
		return response.data.data;
	})
	.catch(error => {
		throw new Error(error.response.data.error.message);
	})
}

function applicationInitialize() {
  if (localStorage.token == null) {
  	return {isInitialized: true};
  } else {
  	return {isInitialized: false};
  }
}

function getInfo() {
	return {
		
	};
}

export { applicationInitialize, joinUser, loginUser, getInfo };
