import request from "../lib/request";
import * as types from "../constants/home";

export const fetchHomeData = (params) =>
  request({
    url: "home.index",
    params,
    type: types.FETCH_HOME_DATA,
    onSuccess: (data) => {
      console.log(data);
    },
  });
