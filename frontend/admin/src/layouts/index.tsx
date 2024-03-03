import { useState } from "react";
import {
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, Button, Avatar, Dropdown, Breadcrumb } from "antd";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useMatches,
  UIMatch,
} from "react-router-dom";
import { rawRouter } from "@/router";
import type { Data } from "@/router";
import { concatPath, router2menu } from "@/utils/parseRoute";

const { Header, Content, Footer, Sider } = Layout;

const popItems: MenuProps["items"] = [
  {
    key: "1",
    label: "修改密码",
  },
  {
    key: "2",
    label: "退出登录",
  },
];

const App = () => {
  const location = useLocation();
  const matches = useMatches() as UIMatch<Data | null>[];

  const pathSnippets = matches.map((item) => ({
    url: item.pathname,
    title: item.data && item.data.title,
  }));

  const breadcrumbItems = pathSnippets.map((route, index) => {
    const last = pathSnippets.length === index + 1;
    return {
      key: route.url,
      title: last ? (
        <span>{route.title}</span>
      ) : (
        <Link to={route.url}>{route.title}</Link>
      ),
    };
  });

  let menuItems = router2menu(concatPath(rawRouter));
  menuItems = menuItems && menuItems[0] && menuItems[0].children;

  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <Layout className="min-h-screen">
      <Sider
        collapsible
        trigger={null}
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className="overflow-auto h-screen !fixed left-0 top-0 bottom-0"
      >
        <Menu
          theme="dark"
          defaultSelectedKeys={[location.pathname]}
          mode="inline"
          items={menuItems}
          onSelect={({ key }) => {
            navigate(key);
          }}
        />
      </Sider>

      <Layout className={collapsed ? "ml-[80px]" : "ml-[200px]"}>
        <Header className="px-4 bg-white flex items-center">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />
          <Breadcrumb items={breadcrumbItems} />
          <Dropdown menu={{ items: popItems }}>
            <Avatar
              icon={<UserOutlined />}
              className="cursor-pointer ml-auto"
            />
          </Dropdown>
        </Header>
        <Content className="p-4">
          <Outlet />
        </Content>
        <Footer className="text-center">Sky Takeout ©2023 Created by F</Footer>
      </Layout>
    </Layout>
  );
};

export default App;
