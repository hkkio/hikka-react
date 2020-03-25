const DescriptorsActionTypes = {
  GET_DESCRIPTORS_REQUEST: "GET_DESCRIPTORS_REQUEST",
  GET_DESCRIPTORS_ERROR: "GET_DESCRIPTORS_ERROR",
  GET_DESCRIPTORS_SUCCESS: "GET_DESCRIPTORS_SUCCESS",
};

// getDescriptors

function getDescriptors(payload) {
  return {
    payload,
    type: DescriptorsActionTypes.GET_DESCRIPTORS_REQUEST
  };
}

function getDescriptorsError(error) {
  return {
    payload: { error },
    type: DescriptorsActionTypes.GET_DESCRIPTORS_ERROR
  };
}

function getDescriptorsSuccess(payload) {
  return {
    payload,
    type: DescriptorsActionTypes.GET_DESCRIPTORS_SUCCESS
  };
}

const DescriptorsActionCreators = {
  // getDescriptors
  getDescriptors,
  getDescriptorsError,
  getDescriptorsSuccess,
};

export { DescriptorsActionTypes, DescriptorsActionCreators };
