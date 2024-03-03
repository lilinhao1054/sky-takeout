import { Button, Form, Input, Table, message } from "antd";
import { SearchOutlined, FileOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import FormModal from "./FormModal";
import { useRef, useState } from "react";
import { api } from "@/api/API";
import useSWR from "swr";

interface DataType {
  key: React.Key;
  id: number;
  name: string;
  username: string;
  phone: string;
  status: number;
  lastModifiedTime: string;
}

const Page = () => {
  const [form] = Form.useForm<{ name: string }>();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const { data, isLoading, mutate } = useSWR(
    ["/admin/employee/page", page, pageSize],
    () =>
      api.employee
        .pageEmployeeUsingGet({
          page,
          pageSize,
          ...form.getFieldsValue(),
        })
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
      await api.employee.enableOrDisableEmployeeUsingPost(status, id);
      message.success("操作成功");
      mutate();
    } catch (error) {
      console.log(error);
    }
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "员工姓名",
      dataIndex: "name",
      align: "center",
    },
    {
      title: "账号",
      dataIndex: "username",
      align: "center",
    },
    {
      title: "手机号",
      dataIndex: "phone",
      align: "center",
    },
    {
      title: "账号状态",
      dataIndex: "status",
      align: "center",
      render: (status) => (status ? "启用" : "禁用"),
    },
    {
      title: "最后操作时间",
      dataIndex: "updateTime",
      align: "center",
    },
    {
      title: "操作",
      align: "center",

      render: (_, record) => (
        <div className="flex-center gap-2 ">
          <Button
            type="link"
            onClick={() => {
              modalRef.current?.show(record.id);
            }}
          >
            修改
          </Button>
          <Button
            type="link"
            danger={!!record.status}
            disabled={record.username === "admin"}
            onClick={() =>
              handleEnableOrDisable(record.status ? 0 : 1, record.id)
            }
          >
            {record.status ? "禁用" : "启用"}
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

        <Form.Item name="name" label="员工姓名">
          <Input />
        </Form.Item>
      </Form>

      <div className="flex bg-white w-full rounded-lg p-4">
        <div className="flex items-center gap-1 text-lg">
          <FileOutlined />
          数据列表
        </div>
        <Button
          className="ml-auto"
          onClick={() => {
            modalRef.current?.show();
          }}
        >
          添加
        </Button>
      </div>

      <Table
        bordered
        pagination={{
          total: data?.total,
          showSizeChanger: true,
          showTotal: (total) => `共 ${total} 条数据`,
          pageSize,
          pageSizeOptions: ["5", "10"],
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
