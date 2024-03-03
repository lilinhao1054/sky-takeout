import { api } from "@/api/API";
import { PageResult } from "@/api/data-contracts";
import { Form, Input, Modal, Radio, message } from "antd";
import React, { useImperativeHandle } from "react";
import { useState } from "react";
import { KeyedMutator } from "swr";

interface IProps {
  mutate: KeyedMutator<PageResult | undefined>;
}

interface IForm {
  username: string;
  name: string;
  phone: string;
  sex: string;
  idNumber: string;
}

const Page = React.forwardRef(({ mutate }: IProps, ref) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const [empId, setEmpId] = useState<number>();

  const [form] = Form.useForm<IForm>();

  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = async () => {
    setConfirmLoading(true);
    try {
      const values = await form.validateFields();
      if (!empId) {
        await api.employee.saveEmployeeUsingPost(values);
        mutate();
      } else {
        await api.employee.updateEmpUsingPut({ ...values, id: empId });
        mutate();
      }
      form.resetFields();
      handleClose();
      message.success("操作成功");
    } catch (error) {
      console.log(error);
    }
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    form.resetFields();
    setEmpId(undefined);
    handleClose();
  };

  useImperativeHandle(
    ref,
    () => ({
      show: (id?: number) => {
        setOpen(true);
        if (id) {
          setEmpId(id);
          api.employee.getEmpByIdUsingGet(id).then((res) => {
            form.setFieldsValue(res.data.data!);
          });
        }
      },
    }),
    [form]
  );

  return (
    <Modal
      title={empId ? "修改信息" : "添加员工"}
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      cancelText="取消"
      okText="保存"
      confirmLoading={confirmLoading}
    >
      <Form form={form} labelCol={{ span: 4 }} initialValues={{ sex: "0" }}>
        <Form.Item
          name="username"
          label="账号"
          rules={[{ required: true, message: "账号不能为空" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="name"
          label="员工姓名"
          rules={[{ required: true, message: "姓名不能为空" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phone"
          label="手机号"
          rules={[
            { required: true, message: "手机号不能为空" },
            { len: 11, message: "手机号格式错误" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="sex" label="性别">
          <Radio.Group>
            <Radio value="0">男</Radio>
            <Radio value="1">女</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="idNumber"
          label="身份证号"
          rules={[
            { required: true, message: "身份证号不能为空" },
            { len: 18, message: "身份证号格式错误" },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
});

export default Page;
