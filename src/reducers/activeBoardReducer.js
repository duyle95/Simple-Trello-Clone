import { PERSIST_HYDRATE } from "redux-persist/lib/constants";
import {
  SET_ACTIVE_BOARD,
  ADD_NEW_LIST,
  ADD_NEW_CARD,
  EDIT_ACTIVE_BOARD
} from "../actions/types";

const INITIAL_STATE = {
  data: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PERSIST_HYDRATE:
      return action.payload.activeBoard;
    case SET_ACTIVE_BOARD:
      return action.payload;
    case ADD_NEW_LIST:
      return {
        ...state,
        data: { ...state.data, ...{ [action.payload.id]: action.payload } }
      };
    case EDIT_ACTIVE_BOARD:
      return action.payload;
    case ADD_NEW_CARD:
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.listId]: {
            ...state.data[action.payload.listId],
            cards: [...state.data[action.payload.listId].cards, action.payload]
          }
        }
      };
    default:
      return state;
  }
};
