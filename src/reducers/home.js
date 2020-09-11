import util from "./util";
import * as constants from "../constants/home";

const initialState = {
  list: [],
  pagination: {},
};

const fetchHomeData = {
  prefix: constants.FETCH_HOME_DATA,
  request: (state) => {
    return state;
  },
  success: (state, payload) => {
    const { list, pagination } = payload;
    return {
      ...state,
      list,
      pagination,
    };
  },
  fail: (state) => {
    return state;
  },
};

export default util([fetchHomeData], initialState, {});
