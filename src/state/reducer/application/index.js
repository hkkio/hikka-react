import { ApplicationActionTypes } from "../../action";

const defaultState = { 
	user: null,
  states: [],
  teams: [],
  genres: [],
  categories: [],
  isAuthenticated: localStorage.token == null ? false : true,
  loginUser: null,
  joinUser: null,
  getInfo: null
};

const application = (state = defaultState, action) => {
  switch (action.type) {
  	case ApplicationActionTypes.JOIN_USER_SUCCESS:
      return Object.assign({}, state, {user: action.payload, joinUser: 2, isAuthenticated: true});
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
    case ApplicationActionTypes.GET_INFO_SUCCESS:
      return Object.assign({}, state, {...action.payload, getInfo: 2});
    default:
      return state;
  }
};

export default application;
