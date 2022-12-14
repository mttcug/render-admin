import { extend } from "umi-request";

let extendParam = {
  prefix: "/api",
  timeout: 5000,
  headers: {
    "Content-Type": "multipart/form-data"
  },
  params: {
    token: "xxx" // 所有请求默认带上 token 参数
  },
  errorHandler: function(error) {
    /* 异常处理 */
  }
};

const umiRequest = param => {
  const { method = "get", url, params = {}, data = {}, headers = {} } = param;
  extendParam.headers = {
    ...extendParam.headers,
    ...headers
  };
  const _method = method.toLocaleLowerCase();
  const request = extend(extendParam);
  // get请求
  if (_method === "get") {
    return request
      .get(url, { params })
      .then(res => (res && res.success && res.result) || {})
      .catch(err => err);
  }
  // post 请求
  if (_method === "post") {
    return request
      .post(url, { data })
      .then(res => (res && res.success && res.result) || {})
      .catch(err => err);
  }
};

export default umiRequest;
