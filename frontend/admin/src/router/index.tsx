import { createBrowserRouter } from "react-router-dom";
import Layout from "@/layouts/index.tsx";
import Login from "@/pages/Login.tsx";
import WorkSpace from "@/pages/WorkSpace";
import Order from "@/pages/Order";
import Category from "@/pages/Category";
import Dish from "@/pages/Dish";
import DishAdd from "@/pages/Dish/Add";
import DishUpdate from "@/pages/Dish/Update";
import SetMeal from "@/pages/SetMeal";
import Analysis from "@/pages/Analysis";
import Employee from "@/pages/Employee";
import { Navigate } from "react-router-dom";
import { getToken } from "@/utils/auth";
import { ReactNode } from "react";
import {
  FileOutlined,
  UserOutlined,
  HomeOutlined,
  LineChartOutlined,
  FolderOpenOutlined,
  TableOutlined,
  TabletOutlined,
} from "@ant-design/icons";

const Auth = ({ children }: { children: ReactNode }) => {
  if (getToken()) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export interface RawRouter {
  path: string;
  element?: ReactNode;
  children?: RawRouter[];
  loader?: () => Data;
}

export interface Data {
  title?: string;
  menu?: boolean;
  icon?: ReactNode;
}

export const rawRouter: RawRouter[] = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    loader: () => ({ title: "首页", menu: true }),
    element: (
      <Auth>
        <Layout />
      </Auth>
    ),
    children: [
      {
        path: "work-space",
        element: <WorkSpace />,
        loader: () => ({ title: "工作台", menu: true, icon: <HomeOutlined /> }),
      },
      {
        path: "order",
        element: <Order />,
        loader: () => ({
          title: "订单管理",
          menu: true,
          icon: <FileOutlined />,
        }),
      },
      {
        path: "category",
        element: <Category />,
        loader: () => ({
          title: "分类管理",
          menu: true,
          icon: <FolderOpenOutlined />,
        }),
      },
      {
        path: "dish",
        loader: () => ({
          title: "菜品管理",
          menu: true,
          icon: <TabletOutlined />,
        }),
        children: [
          {
            path: "add",
            element: <DishAdd />,
            loader: () => ({
              title: "新增菜品",
            }),
          },
          {
            path: "update/:id",
            element: <DishUpdate />,
            loader: () => ({ title: "修改菜品" }),
          },
          {
            path: "list",
            element: <Dish />,
            loader: () => ({
              title: "菜品列表",
            }),
          },
          {
            path: "",
            element: <Navigate to="list" replace />,
          },
        ],
      },
      {
        path: "set-meal",
        element: <SetMeal />,
        loader: () => ({
          title: "套餐管理",
          menu: true,
          icon: <TableOutlined />,
        }),
      },
      {
        path: "analysis",
        element: <Analysis />,
        loader: () => ({
          title: "数据统计",
          menu: true,
          icon: <LineChartOutlined />,
        }),
      },
      {
        path: "employee",
        element: <Employee />,
        loader: () => ({
          title: "员工管理",
          menu: true,
          icon: <UserOutlined />,
        }),
      },
      {
        path: "",
        element: <Navigate to="work-space" replace />,
      },
      {
        path: "*",
        element: <Navigate to="" replace />,
      },
    ],
  },
];

export const router = createBrowserRouter(rawRouter);
