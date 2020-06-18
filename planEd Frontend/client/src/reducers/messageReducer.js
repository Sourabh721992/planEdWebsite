import { SET_USER_MSG } from "../actions/types";
const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER_MSG:
      return action.payload;
    default:
      return state;
  }
}
