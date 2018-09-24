import {
  ADD_BOARD,
  SET_ACTIVE_BOARD,
  ADD_NEW_LIST,
  ADD_NEW_CARD,
  UPDATE_BOARDS,
  EDIT_ACTIVE_BOARD
} from "./types";

export const addNewBoard = board => async dispatch => {
  dispatch({
    type: ADD_BOARD,
    payload: board
  });
};

export const setActiveBoard = board => async dispatch => {
  dispatch({
    type: SET_ACTIVE_BOARD,
    payload: board
  });
};

export const addNewList = list => async dispatch => {
  dispatch({
    type: ADD_NEW_LIST,
    payload: list
  });
};

export const addNewCard = card => async dispatch => {
  dispatch({
    type: ADD_NEW_CARD,
    payload: card
  });
};

export const editActiveBoard = board => async dispatch => {
  dispatch({
    type: EDIT_ACTIVE_BOARD,
    payload: board
  });
};

export const updateBoards = board => async dispatch => {
  dispatch({
    type: UPDATE_BOARDS,
    payload: board
  });
};
