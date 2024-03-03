import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/index.js";
import { ConfigProvider } from "antd";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <ConfigProvider
    theme={{
      components: {
        Menu: {
          itemHeight: 56,
        },
      },
    }}
  >
    <RouterProvider router={router} />
  </ConfigProvider>
  // </React.StrictMode>
);
