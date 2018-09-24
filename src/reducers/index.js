import { combineReducers } from "redux";

import boards from "./boardsReducer";
import activeBoard from "./activeBoardReducer";

export default combineReducers({
  boards,
  activeBoard
});
