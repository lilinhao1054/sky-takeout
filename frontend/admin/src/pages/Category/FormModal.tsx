import { api } from "@/api/API";
import { PageResult } from "@/api/data-contracts";
import { Form, Input, Modal, Select, message } from "antd";
import React, { useImperativeHandle } from "react";
import { useState } from "react";
import { KeyedMutator } from "swr";

interface IProps {
  mutate: KeyedMutator<PageResult | undefined>;
}

interface IForm {
  name: string;
  type: number;
  sort: number;
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
      console.log(values);
      if (!empId) await api.category.saveUsingPost(values);
      else await api.category.updateUsingPut({ ...values, id: empId });
      form.resetFields();
      handleClose();
      message.success("操作成功");
      mutate();
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
          api.category.getByIdUsingGet(id).then((res) => {
            form.setFieldsValue(res.data.data!);
            res.data.data;
          });
        }
      },
    }),
    [form]
  );

  return (
    <Modal
      title={empId ? "修改信息" : "添加分类"}
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      cancelText="取消"
      okText="保存"
      confirmLoading={confirmLoading}
    >
      <Form form={form} labelCol={{ span: 4 }} initialValues={{ sex: "0" }}>
        <Form.Item
          name="name"
          label="分类名称"
          rules={[{ required: true, message: "账号不能为空" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="sort"
          label="排序"
          rules={[{ required: true, message: "请输入排序序号" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="type"
          label="分类类型"
          rules={[{ required: true, message: "请选择分类类型" }]}
        >
          <Select allowClear>
            <Select.Option value={1}>菜品</Select.Option>
            <Select.Option value={2}>套餐</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
});

export default Page;
