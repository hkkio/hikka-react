import { ApplicationActionTypes } from "../../action";
import { genres, categories, states, statuses, minYear } from "../../../data/static";

const defaultState = { 
	user: null,
	isAuthenticated: localStorage.token != null && Date.now()/1000 <= localStorage.expire,
	loginUser: null,
	joinUser: null
};

const application = (state = defaultState, action) => {
	switch (action.type) {
		case ApplicationActionTypes.JOIN_USER_SUCCESS:
			return Object.assign({}, state, {joinUser: 2});
		case ApplicationActionTypes.JOIN_USER_ERROR:
			return Object.assign({}, state, {joinUser: 1});
		case ApplicationActionTypes.JOIN_USER_REQUEST:
			return Object.assign({}, state, {joinUser: 0});
		case ApplicationActionTypes.LOGIN_USER_SUCCESS:
			return Object.assign({}, state, {user: action.payload, loginUser: 2, isAuthenticated: true});
		case ApplicationActionTypes.LOGIN_USER_ERROR:
			return Object.assign({}, state, {loginUser: 1, isAuthenticated: false});
		case ApplicationActionTypes.LOGIN_USER_REQUEST:
			return Object.assign({}, state, {loginUser: 0, isAuthenticated: false});
		case ApplicationActionTypes.LOGOUT_USER_SUCCESS:
			return Object.assign({}, defaultState, {isAuthenticated: false});
        case ApplicationActionTypes.RESET_STATUSES:
            return Object.assign({}, state, {loginUser: null, joinUser: null});
		default:
			return state;
	}
};

export default application;
