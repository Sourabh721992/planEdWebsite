import { SET_USER_CONTENT } from "../actions/types";
const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER_CONTENT:
      return action.payload;
    default:
      return state;
  }
}
