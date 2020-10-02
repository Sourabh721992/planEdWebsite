import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import successReducer from "./successReducer";
import contentReducer from "./contentReducer";
import messageReducer from "./messageReducer";
import liveSessionReducer from "./liveSessionReducer";
import loginUrlReducer from "./loginUrlReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  success: successReducer,
  content: contentReducer,
  message: messageReducer,
  session: liveSessionReducer,
  loginUrl: loginUrlReducer,
});
