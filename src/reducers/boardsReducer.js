import { PERSIST_HYDRATE } from "redux-persist/lib/constants";

import { ADD_BOARD, UPDATE_BOARDS } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case PERSIST_HYDRATE:
      return action.payload.boards || {};
    case ADD_BOARD:
      return { ...state, [action.payload.id]: action.payload };
    case UPDATE_BOARDS:
      return { ...state, ...{ [action.payload.id]: action.payload } };
    default:
      return state;
  }
};
