import Taro from "@tarojs/taro";
import getBaseUrl from "./baseUrl";
import interceptors from "./interceptors";

interceptors.forEach((interceptorItem) => Taro.addInterceptor(interceptorItem));

const combineUrl = (baseUrl, url) => {
  baseUrl = `${baseUrl}`;
  baseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
  url = `${url}`;
  url = url.startsWith("/") ? url.slice(1) : url;
  return `${baseUrl}/${url}`;
};

class httpRequest {
  baseOptions(params, method = "GET") {
    let { url, data } = params;
    const BASE_URL = getBaseUrl(url);
    let contentType = "application/json";
    contentType = params.contentType || contentType;
    const option = {
      url: combineUrl(BASE_URL, url),
      data: data,
      method: method,
      header: {
        "content-type": contentType,
        Authorization: Taro.getStorageSync("Authorization"),
      },
    };
    return Taro.request(option);
  }

  get(url, data = "") {
    let option = { url, data };
    return this.baseOptions(option);
  }

  post(url, data, contentType) {
    let params = { url, data, contentType };
    return this.baseOptions(params, "POST");
  }

  put(url, data = "") {
    let option = { url, data };
    return this.baseOptions(option, "PUT");
  }

  delete(url, data = "") {
    let option = { url, data };
    return this.baseOptions(option, "DELETE");
  }
}

export default new httpRequest();
