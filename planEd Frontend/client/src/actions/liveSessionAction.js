import axios from "axios";
import { GET_ERRORS, SET_USER_SESSION, GET_SUCCESS_MSG } from "./types";
import { GetCurrentEpochTime, GetCurrentYear } from "../Common";

const saveLiveSession = (
  bId,
  tId,
  tNm,
  bNm,
  chapter,
  topic,
  description,
  startTime,
  endTime,
  chapterDone
) => (dispatch) => {
  GetCurrentEpochTime().then((epochDt) => {
    GetCurrentYear().then((year) => {
      let data = {
        bId: bId,
        tId: tId,
        tNm: tNm,
        bNm: bNm,
        chapter: chapter,
        topic: topic,
        description: description,
        startTime: startTime,
        endTime: endTime,
        chapterDone: chapterDone,
      };

      axios
        .post("https://planed.in/api/teachers/schedulelivesession", data, {})
        .then((res) => {
          if (res.data.flag == 1) {
            let teacherDetails = {
              tId: tId,
            };
            axios
              .post("https://planed.in/api/common/livesession", teacherDetails)
              .then((res) => {
                if (res.data.flag == 1) {
                  dispatch({
                    type: GET_SUCCESS_MSG,
                    payload: {
                      flag: 1,
                      msg:
                        "Live Session has been scheduled and details shared with students.",
                    },
                  });
                  dispatch({
                    type: SET_USER_SESSION,
                    payload: res.data.data,
                  });
                  //Set error msg to {}
                  dispatch({
                    type: GET_ERRORS,
                    payload: {},
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
    });
  });
};

const getLiveSessionList = (tId) => (dispatch) => {
  let teacherDetails = {
    tId: tId,
  };

  axios
    .post("https://planed.in/api/common/livesession", teacherDetails)
    .then((res) => {
      if (res.data.flag == 1) {
        dispatch({
          type: SET_USER_SESSION,
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

const getStudenLiveSessionList = (studentDetails) => (dispatch) => {};

export { saveLiveSession, getLiveSessionList, getStudenLiveSessionList };
