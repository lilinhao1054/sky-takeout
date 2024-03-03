import { Button, Form, Input, Select, Table } from "antd";
import { SearchOutlined, FileOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

interface DataType {
  key: React.Key;
  name: string;
  image: string;
  type: string;
  price: number;
  status: boolean;
  lastModifiedTime: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "套餐名称",
    dataIndex: "name",
    align: "center",
  },
  {
    title: "套餐图片",
    dataIndex: "image",
    align: "center",
  },
  {
    title: "套餐分类",
    dataIndex: "type",
    align: "center",
  },
  {
    title: "套餐价",
    dataIndex: "price",
    align: "center",
  },
  {
    title: "状态",
    dataIndex: "status",
    align: "center",
  },
  {
    title: "最后操作时间",
    dataIndex: "lastModifiedTime",
    align: "center",
  },
  {
    title: "操作",
    align: "center",
    render: () => (
      <div className="flex-center gap-2 ">
        <Button type="link">修改</Button>
        <Button type="link">启售</Button>
        <Button danger type="link">
          删除
        </Button>
      </div>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
  },
];

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  getCheckboxProps: (record: DataType) => ({
    name: record.name,
  }),
};

const Page = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onAdd = () => {};

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

        <Form.Item name="name" label="套餐名称">
          <Input />
        </Form.Item>
        <Form.Item name="type" label="套餐分类">
          <Input />
        </Form.Item>
        <Form.Item name="status" label="售卖状态">
          <Select allowClear>
            <Select.Option value="1">启售</Select.Option>
            <Select.Option value="0">停售</Select.Option>
          </Select>
        </Form.Item>
      </Form>

      <div className="flex bg-white w-full rounded-lg p-4">
        <div className="flex items-center gap-1 text-lg">
          <FileOutlined />
          数据列表
        </div>
        <Button className="ml-auto" onClick={onAdd}>
          添加
        </Button>
        <Button className="ml-2" danger>
          批量删除
        </Button>
      </div>

      <Table
        bordered
        pagination={{
          total: 85,
          showSizeChanger: true,
          showTotal: (total) => `共 ${total} 条数据`,
        }}
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};

export default Page;
