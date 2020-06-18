import axios from "axios";
import { GET_ERRORS, SET_USER_CONTENT, GET_SUCCESS_MSG } from "./types";
import { GetCurrentEpochTime, GetCurrentYear } from "../Common";

const uploadContent = (bId, tId, description, nm, insNm, file) => (
  dispatch
) => {
  GetCurrentEpochTime().then((epochDt) => {
    GetCurrentYear().then((year) => {
      let data = new FormData();
      data.append("year", year);
      data.append("bId", bId);
      data.append("uploadedDt", epochDt);
      data.append("tId", tId);
      data.append("description", description);
      data.append("nm", nm);
      data.append("insNm", insNm);
      data.append("file", file);

      axios
        .post("https://planed.in/api/teachers/uploadcontent", data, {})
        .then((res) => {
          if (res.data.flag == 1) {
            let teacherDetails = {
              tId: tId,
            };
            axios
              .post("https://planed.in/api/common/content", teacherDetails)
              .then((res) => {
                if (res.data.flag == 1) {
                  dispatch({
                    type: GET_SUCCESS_MSG,
                    payload: {
                      flag: 1,
                      msg:
                        "Content has been uploaded successfully and shared with students.",
                    },
                  });
                  dispatch({
                    type: SET_USER_CONTENT,
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

const getContentList = (id, role, insId) => (dispatch) => {
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

  axios.post("https://planed.in/api/common/content", data).then((res) => {
    if (res.data.flag == 1) {
      dispatch({
        type: SET_USER_CONTENT,
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

export { uploadContent, getContentList };
