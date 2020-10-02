import { SET_USER_LOGIN_URL } from "../actions/types";
const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER_LOGIN_URL:
      return action.payload;
    default:
      return state;
  }
}
