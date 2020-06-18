import axios from "axios";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  SET_USER_SESSION,
  SET_USER_CONTENT,
  GET_SUCCESS_MSG,
  SET_USER_MSG,
} from "./types";

//Login User action
export const loginUser = (userDetails) => (dispatch) => {
  axios.post("https://planed.in/api/users/login", userDetails).then((res) => {
    if (res.data.flag == 1) {
      //Region for teacher login -- start
      if ("tId" in res.data) {
        let teacherDetails = {
          tId: res.data.tId,
          insId: res.data.data,
        };
        axios
          .post("https://planed.in/api/users/web/teachers/ins", teacherDetails)
          .then((res) => {
            if (res.data.flag == 1) {
              //Set user information in local storage
              //Once logged in user should be active for 1 hour. For this I am storing user in
              //local storage
              let dt = new Date();
              dt.setMinutes(dt.getMinutes() + 10);
              res.data.data["exp"] = Math.trunc(dt.getTime() / 1000);

              localStorage.setItem("user", JSON.stringify(res.data.data));
              dispatch(setCurrentUser(res.data.data));
              //Setting erros to {}
              dispatch({
                type: GET_ERRORS,
                payload: {},
              });
            } else {
              dispatch({
                type: GET_ERRORS,
                payload: res.data,
              });
            }
          });
      }
      //Region for teacher login -- end
      //Region for student login -- start
      if ("sId" in res.data) {
        let studentDetails = {
          sId: res.data.sId,
          insId: res.data.data,
        };
        axios
          .post("https://planed.in/api/users/web/students/ins", studentDetails)
          .then((res) => {
            if (res.data.flag == 1) {
              //Set user information in local storage
              //Once logged in user should be active for 1 hour. For this I am storing user in
              //local storage
              let dt = new Date();
              dt.setMinutes(dt.getMinutes() + 10);
              res.data.data["exp"] = Math.trunc(dt.getTime() / 1000);

              localStorage.setItem("user", JSON.stringify(res.data.data));
              dispatch(setCurrentUser(res.data.data));
              //Setting erros to {}
              dispatch({
                type: GET_ERRORS,
                payload: {},
              });
            } else {
              dispatch({
                type: GET_ERRORS,
                payload: res.data,
              });
            }
          });
      }
      //Region for student login -- end
    } else {
      dispatch({
        type: GET_ERRORS,
        payload: res.data,
      });
    }
  });
};

//Set logged in user
export const setCurrentUser = (userDetails) => {
  return {
    type: SET_CURRENT_USER,
    payload: userDetails,
  };
};

//Logout user functionality.
export const logoutUser = () => (dispatch) => {
  dispatch({
    type: SET_USER_CONTENT,
    payload: {},
  });
  dispatch({
    type: SET_USER_SESSION,
    payload: {},
  });
  dispatch({
    type: GET_SUCCESS_MSG,
    payload: {},
  });
  dispatch({
    type: GET_ERRORS,
    payload: {},
  });
  dispatch({
    type: SET_USER_MSG,
    payload: {},
  });
  //Set current user to {}
  dispatch(setCurrentUser({}));
  //remove user from local storage
  localStorage.removeItem("user");
};
