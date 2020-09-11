/**
 * Default development API config.
 * 根据/src/lib/request中对api的解析规则
 * apiList子key的值为对象集合
 * 且key不能为`js`, `json`, `ts`中的一种
 */
import mockConfig from "../mocks/config";

export const BASE_URL = `http://${mockConfig.host}:${mockConfig.port}/`;

export default {
  apiBaseUrl: BASE_URL,
  uploadFile: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  downloadFile: "",
  apiList: {
    common: {},
    home: {
      index: "home/index.json",
    },
  },
};
