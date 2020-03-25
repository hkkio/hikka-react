import config from "../../display/application/config";
import axios from "axios";


function getDescriptors(payload) {
	return axios({
		method: "post",
		url: `${config.apiHost}descriptors/list`,
		data: { "services": payload.services }
	})
	.then(response => {
		return response.data.data;
	})
	.catch(error => {
		throw new Error(error.response.data.error.message);
	})
}

export { getDescriptors };
