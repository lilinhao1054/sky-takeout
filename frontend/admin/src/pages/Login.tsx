import { Form, Button, Divider, Input, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { MyIcon } from "@/utils/icon";
import { useForm } from "antd/es/form/Form";
import { setToken } from "@/utils/auth";
import { api } from "@/api/API";

interface IForm {
  username: string;
  password: string;
}

const Page = () => {
  const navigate = useNavigate();
  const [form] = useForm<IForm>();

  const onFinish = async (values: IForm) => {
    try {
      const { data } = await api.employee.loginUsingPost(values);

      setToken(data.data?.token as string);
      message.success("登录成功");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="grow flex flex-col justify-center items-center bg-slate-900">
        <div className="text-3xl text-slate-200 font-bold">
          Sky Takeout 后台管理系统
        </div>
        <MyIcon type="icon-analytics" className="text-[512px]" />
      </div>
      <div className="flex p-4">
        <div className="flex flex-col justify-center items-center">
          <div className="mb-2 text-3xl font-bold">欢迎回来</div>
          {/* gray-400 */}
          <Divider className="!text-gray-400">账号密码登录</Divider>
          <Form
            wrapperCol={{ offset: 4, span: 16 }}
            style={{ width: 488 }}
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
            form={form}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: "用户名不能为空" }]}
            >
              <Input placeholder="请输入用户名" prefix={<UserOutlined />} />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: "密码不能为空" }]}
            >
              <Input.Password
                placeholder="请输入密码"
                prefix={<LockOutlined />}
              />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
              <Button type="primary" htmlType="submit" block>
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Page;
