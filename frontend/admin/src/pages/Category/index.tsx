import { Button, Form, Input, Modal, Select, Table, message } from "antd";
import { SearchOutlined, FileOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { useRef, useState } from "react";
import FormModal from "./FormModal";
import { api } from "@/api/API";
import useSWR from "swr";

interface DataType {
  key: React.Key;
  id: number;
  name: string;
  type: string;
  sort: number;
  status: number;
  updateTime: string;
}

interface IForm {
  name: string;
  type: number;
}

const Page = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const [form] = Form.useForm<IForm>();

  const { data, isLoading, mutate } = useSWR(
    ["/admin/category/page", page, pageSize],
    () =>
      api.category
        .pageUsingGet({ page, pageSize, ...form.getFieldsValue() })
        .then((res) => res.data.data)
  );

  const onFinish = () => {
    mutate();
  };

  const onReset = () => {
    form.resetFields();
  };

  const handleEnableOrDisable = async (status: number, id: number) => {
    try {
      await api.category.startOrStopUsingPost(status, id);
      message.success("操作成功");
      mutate();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: "删除分类",
      content: "确定删除吗？一旦删除，无法恢复",
      okType: "danger",
      okText: "确定",
      cancelText: "取消",
      onOk: async () => {
        try {
          await api.category.deleteByIdUsingDelete(id);
          message.success("删除成功");
          mutate();
        } catch (error) {
          console.log(error);
        }
      },
    });
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "分类名称",
      dataIndex: "name",
      align: "center",
    },
    {
      title: "分类类型",
      dataIndex: "type",
      align: "center",
      render: (type) => (type === 1 ? "菜品" : "套餐"),
    },
    {
      title: "状态",
      dataIndex: "status",
      align: "center",
      render: (status) => (status ? "启用" : "禁用"),
    },
    {
      title: "排序",
      dataIndex: "sort",
      align: "center",
    },
    {
      title: "操作时间",
      dataIndex: "updateTime",
      align: "center",
    },
    {
      title: "操作",
      align: "center",
      render: (_, record) => (
        <div className="flex-center gap-2 ">
          <Button type="link" onClick={() => modalRef.current?.show(record.id)}>
            修改
          </Button>
          <Button
            type="link"
            danger={!!record.status}
            onClick={() =>
              handleEnableOrDisable(record.status ? 0 : 1, record.id)
            }
          >
            {record.status ? "禁用" : "启用"}
          </Button>
          <Button danger type="link" onClick={() => handleDelete(record.id)}>
            删除
          </Button>
        </div>
      ),
    },
  ];

  const modalRef = useRef<{ show: (id?: number) => void }>();

  return (
    <div className="flex flex-col gap-4">
      <Form
        form={form}
        onFinish={onFinish}
        className="bg-white w-full rounded-lg p-4"
      >
        <div className="flex mb-4">
          <div className="flex items-center gap-1 text-lg">
            <SearchOutlined />
            筛选搜索
          </div>
          <Button className="ml-auto" htmlType="button" onClick={onReset}>
            重置
          </Button>
          <Button className="ml-4" type="primary" htmlType="submit">
            查询结果
          </Button>
        </div>

        <Form.Item name="name" label="分类名称">
          <Input />
        </Form.Item>
        <Form.Item name="type" label="分类类型">
          <Select allowClear>
            <Select.Option value={1}>菜品</Select.Option>
            <Select.Option value={2}>套餐</Select.Option>
          </Select>
        </Form.Item>
      </Form>

      <div className="flex bg-white w-full rounded-lg p-4">
        <div className="flex items-center gap-1 text-lg">
          <FileOutlined />
          数据列表
        </div>
        <Button className="ml-auto" onClick={() => modalRef.current?.show()}>
          添加
        </Button>
      </div>

      <Table
        bordered
        pagination={{
          total: data?.total,
          showSizeChanger: true,
          showTotal: (total) => `共 ${total} 条数据`,
          pageSizeOptions: ["5", "10"],
          pageSize,
          onChange: (page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          },
        }}
        columns={columns}
        dataSource={data?.records}
        loading={isLoading}
      />
      <FormModal ref={modalRef} mutate={mutate} />
    </div>
  );
};

export default Page;
