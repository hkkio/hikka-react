const ApplicationActionTypes = {
  INITIALIZE_APPLICATION_REQUEST: "INITIALIZE_APPLICATION_REQUEST",
  INITIALIZE_APPLICATION_ERROR: "INITIALIZE_APPLICATION_ERROR",
  INITIALIZE_APPLICATION_SUCCESS: "INITIALIZE_APPLICATION_SUCCESS",

  GET_INFO_REQUEST: "GET_INFO_REQUEST",
  GET_INFO_ERROR: "GET_INFO_ERROR",
  GET_INFO_SUCCESS: "GET_INFO_SUCCESS",

  JOIN_USER_REQUEST: "JOIN_USER_REQUEST",
  JOIN_USER_ERROR: "JOIN_USER_ERROR",
  JOIN_USER_SUCCESS: "JOIN_USER_SUCCESS",

  LOGIN_USER_REQUEST: "LOGIN_USER_REQUEST",
  LOGIN_USER_ERROR: "LOGIN_USER_ERROR",
  LOGIN_USER_SUCCESS: "LOGIN_USER_SUCCESS",

  LOGOUT_USER_REQUEST: "LOGOUT_USER_REQUEST",
  LOGOUT_USER_SUCCESS: "LOGOUT_USER_SUCCESS",

  RESET_STATUSES: "RESET_STATUSES",
};

// initializeApplication

function initializeApplication() {
  return {
    type: ApplicationActionTypes.INITIALIZE_APPLICATION_REQUEST
  };
}

function initializeApplicationError(error) {
  return {
    payload: { error },
    type: ApplicationActionTypes.INITIALIZE_APPLICATION_ERROR
  };
}

function initializeApplicationSuccess(payload) {
  return {
    payload,
    type: ApplicationActionTypes.INITIALIZE_APPLICATION_SUCCESS
  };
}

// getInfo

function getInfo() {
  return {
    type: ApplicationActionTypes.GET_INFO_REQUEST
  };
}

function getInfoError(error) {
  return {
    payload: { error },
    type: ApplicationActionTypes.GET_INFO_ERROR
  };
}

function getInfoSuccess(payload) {
  return {
    payload,
    type: ApplicationActionTypes.GET_INFO_SUCCESS
  };
}

// joinUser

function joinUser(payload) {
  return {
    payload,
    type: ApplicationActionTypes.JOIN_USER_REQUEST
  };
}

function joinUserError(error) {
  return {
    payload: { error },
    type: ApplicationActionTypes.JOIN_USER_ERROR
  };
}

function joinUserSuccess(data) {
  return {
    payload: data,
    type: ApplicationActionTypes.JOIN_USER_SUCCESS
  };
}

// loginUser

function loginUser(payload) {
  return {
    payload,
    type: ApplicationActionTypes.LOGIN_USER_REQUEST
  };
}

function loginUserError(error) {
  return {
    payload: { error },
    type: ApplicationActionTypes.LOGIN_USER_ERROR
  };
}

function loginUserSuccess(data) {
  return {
    payload: data,
    type: ApplicationActionTypes.LOGIN_USER_SUCCESS
  };
}

// logoutUser

function logoutUser() {
  return {
    type: ApplicationActionTypes.LOGOUT_USER_REQUEST
  };
}

function logoutUserSuccess() {
  return {
    type: ApplicationActionTypes.LOGOUT_USER_SUCCESS
  };
}

// resetStatuses

function resetStatuses() {
  return {
    type: ApplicationActionTypes.RESET_STATUSES
  };
}


const ApplicationActionCreators = {
  initializeApplication,
  initializeApplicationError,
  initializeApplicationSuccess,
  getInfo,
  getInfoError,
  getInfoSuccess,
  joinUser,
  joinUserError,
  joinUserSuccess,
  loginUser,
  loginUserError,
  loginUserSuccess,
  logoutUser,
  logoutUserSuccess,
  resetStatuses
};

export { ApplicationActionTypes, ApplicationActionCreators };
