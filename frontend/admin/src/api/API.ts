import { getToken, removeToken } from "@/utils/auth";
import { Category } from "./Category";
import { Common } from "./Common";
import { Dish } from "./Dish";
import { Employee } from "./Employee";
import { HttpClient } from "./http-client";
import qs from "qs";
import { Modal, message } from "antd";

class API<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  public category = new Category(this);
  public common = new Common(this);
  public dish = new Dish(this);
  public employee = new Employee(this);
}

export const api = new API({
  paramsSerializer: (params) => qs.stringify(params, { indices: false }),
  baseURL: import.meta.env.VITE_APP_API_URL,
});

api.instance.interceptors.request.use(
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

api.instance.interceptors.response.use(
  (res) => {
    const code = res.data.code;
    // 获取错误信息
    const msg = res.data.msg || "系统未知错误，请反馈给管理员";
    // 二进制数据则直接返回
    if (
      res.request.responseType === "blob" ||
      res.request.responseType === "arraybuffer"
    ) {
      return res;
    }
    if (code !== 1) {
      message.error(msg);
      return Promise.reject(new Error(msg));
    } else {
      return res;
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
