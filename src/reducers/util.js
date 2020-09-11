const SUCCESS = "SUCCESS";
const REQUEST = "REQUEST";
const FAILED = "FAIL";

export default function (netReducers, initState, others = {}) {
  let handleObj = {};
  netReducers.forEach((reducer) => {
    handleObj[reducer.prefix + "_" + REQUEST] =
      reducer.request || ((state) => state);
    handleObj[reducer.prefix + "_" + SUCCESS] = reducer.success;
    handleObj[reducer.prefix + "_" + FAILED] =
      reducer.fail || ((state) => state);
  });
  handleObj = { ...handleObj, ...others };
  return function (state = initState, { type, payload }) {
    if (handleObj[type]) {
      return handleObj[type](state, payload);
    } else {
      return state;
    }
  };
}
