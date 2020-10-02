import axios from "axios";
import {
  GET_ERRORS,
  SET_USER_TEACHERS,
  SET_USER_MSG,
  GET_SUCCESS_MSG,
} from "./types";

const broadcastMessage = (arrBids, tId, tNm, msg, insNm) => (dispatch) => {
  let brodacastDetails = {
    bIds: JSON.stringify(arrBids),
    tId: tId,
    tNm: tNm,
    msg: msg,
    insNm: insNm,
  };

  axios
    .post("https://planed.in/api/teachers/broadcast", brodacastDetails, {})
    .then((res) => {
      if (res.data.flag == 1) {
        let teacherDetails = {
          tId: tId,
        };
        axios
          .post("https://planed.in/api/common/message", teacherDetails)
          .then((res) => {
            if (res.data.flag == 1) {
              dispatch({
                type: GET_SUCCESS_MSG,
                payload: {
                  flag: 1,
                  msg: "Message has been shared with students.",
                },
              });
              let data = [];
              data = res.data.data;
              dispatch({
                type: SET_USER_MSG,
                payload: data,
              });
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
      } else {
        //Set Success Msg to {}
        dispatch({
          type: GET_SUCCESS_MSG,
          payload: {},
        });

        dispatch({
          type: GET_ERRORS,
          payload: res.data,
        });
      }
    });
};

const getBrodcastMessages = (id, role, insId) => (dispatch) => {
  let data = {};
  if (role == "T") {
    data = {
      tId: id,
      insId: insId,
    };
  } else if (role == "S") {
    data = {
      sId: id,
      insId: insId,
    };
  }
  axios.post("https://planed.in/api/common/message", data).then((res) => {
    if (res.data.flag == 1) {
      dispatch({
        type: SET_USER_MSG,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: GET_ERRORS,
        payload: res.data,
      });
    }
  });
};

export { broadcastMessage, getBrodcastMessages };
