/* eslint-disable import/prefer-default-export */
import http from "./http";
import Tora from "@tarojs/taro";
import getApiFullPath from "../../utils/getApiFullPath";

const request = ({
  url,
  method = "get",
  params = {},
  type = "",
  onSuccess = (f) => f,
  onFail = (f) => f,
}: IRequest) => {
  const realParams = {};
  for (const key in params) {
    if (![undefined, null].includes(params[key])) {
      const current = params[key];
      realParams[key] = current;
    }
  }
  let dispatchRequest = "";
  let dispatchSuccess = "";
  let dispatchFail = "";
  if (type) {
    dispatchRequest = `${type}_REQUEST`;
    dispatchSuccess = `${type}_SUCCESS`;
    dispatchFail = `${type}_FAIL`;
  }
  return (dispatch) => {
    dispatchRequest &&
      dispatch({
        type: dispatchRequest,
        payload: realParams,
      });
    Tora.showLoading({
      title: "加载中",
    });
    return new Promise((resolve, reject) => {
      http[method](getApiFullPath(url), realParams)
        .then((res) => {
          const { data, status = "", msg = "请求失败" } = res;
          if (status === "success") {
            const successData = onSuccess(data, dispatch, realParams) || data;
            dispatchSuccess &&
              dispatch({
                type: dispatchSuccess,
                payload: successData,
              });
            resolve(successData);
          } else {
            const failData = onFail(msg, dispatch, realParams) || msg;
            if (dispatchFail) {
              dispatch({
                type: dispatchFail,
                payload: failData,
              });
              // 使用统一的错误处理
              dispatch({
                type: "REQUEST_FAIL",
                payload: {
                  time: Date.now(),
                  url,
                  method,
                  params,
                  type,
                  msg,
                  msgType: "error",
                },
              });
            }
            reject(failData);
          }
          Tora.hideLoading();
        })
        .catch((err) => {
          reject(err);
          Tora.hideLoading();
        });
    });
  };
};

export default request;
