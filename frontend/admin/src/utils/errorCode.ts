interface ErrorCode {
  "401": string;
  "403": string;
  default: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

const errorCode: ErrorCode = {
  "401": "认证失败，无法访问系统资源",
  "403": "当前操作没有权限",
  default: "系统未知错误，请反馈给管理员",
};

export default errorCode;
