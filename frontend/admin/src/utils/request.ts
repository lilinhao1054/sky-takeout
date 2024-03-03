import axios from "axios";
import { getToken, removeToken } from "./auth";
import { message, Modal } from "antd";
import errorCode from "./errorCode";
import qs from "qs";

const request = axios.create({
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  baseURL: import.meta.env.VITE_APP_API_URL,
  timeout: 10000,
  paramsSerializer: (params) => qs.stringify(params, { indices: false }),
});

request.interceptors.request.use(
  (config) => {
    if (getToken()) {
      config.headers["token"] = getToken();
    }
    return config;
  },
  (error) => {
    console.log(error);
    Promise.reject(error);
  }
);

request.interceptors.response.use(
  (res) => {
    const code = res.data.code;
    // 获取错误信息
    const msg = res.data.msg || errorCode["default"];
    // 二进制数据则直接返回
    if (
      res.request.responseType === "blob" ||
      res.request.responseType === "arraybuffer"
    ) {
      return res.data;
    }
    if (code !== 1) {
      message.error(msg);
      return Promise.reject(new Error(msg));
    } else {
      return res.data;
    }
  },
  (error) => {
    console.log("err" + error);
    let { message: msg } = error;
    if (msg === "Network Error") {
      msg = "后端接口连接异常";
    } else if (msg.includes("timeout")) {
      msg = "系统接口请求超时";
    } else if (msg.includes("Request failed with status code")) {
      // 获得异常http状态码
      const statusCode = +msg.substr(msg.length - 3);
      if (statusCode === 401) {
        Modal.confirm({
          title: "系统提示",
          content: "登录状态已过期，请重新登录",
          okText: "确定",
          onOk() {
            removeToken();
            location.href = "/";
          },
        });
        return Promise.reject("无效的会话，或者会话已过期，请重新登录。");
      }
      msg = "系统接口" + statusCode + "异常";
    }
    message.error(msg);
    return Promise.reject(error);
  }
);

export default request;
