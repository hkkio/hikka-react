import { DescriptorsActionTypes } from "../../action";

const defaultState = {
	genre: [],
  category: [],
  state: [],
  franchise: []
};

const descriptors = (state = defaultState, action) => {
  switch (action.type) {
    case DescriptorsActionTypes.GET_DESCRIPTORS_SUCCESS:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
};

export default descriptors;
