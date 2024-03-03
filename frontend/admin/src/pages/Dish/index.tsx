import {
  Button,
  Form,
  Image,
  Input,
  Modal,
  Select,
  Table,
  message,
} from "antd";
import { SearchOutlined, FileOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "@/api/API";
import useSWR from "swr";
import { useCategory } from "@/hooks/useCategory";

interface DataType {
  key: React.Key;
  id: number;
  name: string;
  image: string;
  categoryId: number;
  price: number;
  status: number;
  updateTime: string;
}

interface IForm {
  name: string;
  categoryId: number;
  status: number;
}

const Page = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const [form] = Form.useForm<IForm>();

  const { data, isLoading, mutate } = useSWR(
    ["/admin/dish/page", page, pageSize],
    () =>
      api.dish
        .pageDishUsingGet({ page, pageSize, ...form.getFieldsValue() })
        .then((res) => res.data.data)
  );

  const onFinish = (values: IForm) => {
    console.log(values);
    mutate();
  };

  const onReset = () => {
    form.resetFields();
  };

  const { data: categories } = useCategory();

  const handleEnableOrDisable = async (status: number, id: number) => {
    try {
      await api.dish.updateUsingPut1({ id, status });
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
          await api.dish.deleteDishUsingDelete({ ids: [id] });
          message.success("删除成功");
          refresh();
        } catch (error) {
          console.log(error);
        }
      },
    });
  };

  const [selectedRows, setSelectedRows] = useState<DataType[]>([]);

  const handleDeleteBatch = () => {
    Modal.confirm({
      title: "删除分类",
      content: "确定删除吗？一旦删除，无法恢复",
      okType: "danger",
      okText: "确定",
      cancelText: "取消",
      onOk: async () => {
        try {
          if (selectedRows.length > 0)
            await api.dish.deleteDishUsingDelete({
              ids: selectedRows.map((row) => row.id),
            });
          else {
            message.warning("未选择菜品");
            return;
          }
          message.success("删除成功");
          mutate();
        } catch (e) {
          console.log(e);
        }
      },
    });
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "菜品名称",
      dataIndex: "name",
      align: "center",
    },
    {
      title: "图片",
      dataIndex: "image",
      align: "center",
      render: (url) => <Image width={100} src={url} />,
    },
    {
      title: "菜品分类",
      dataIndex: "categoryName",
      align: "center",
    },
    {
      title: "售价",
      dataIndex: "price",
      align: "center",
      render: (price) => `￥${price}`,
    },
    {
      title: "售卖状态",
      dataIndex: "status",
      align: "center",
      render: (status) => (status === 1 ? "启售" : "停售"),
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
            onClick={() => navigate(`/dish/update/${record.id}`)}
          >
            修改
          </Button>
          <Button
            type="link"
            danger={record.status === 1}
            onClick={() =>
              handleEnableOrDisable(record.status ? 0 : 1, record.id)
            }
          >
            {record.status === 1 ? "停售" : "启售"}
          </Button>
          <Button danger type="link" onClick={() => handleDelete(record.id)}>
            删除
          </Button>
        </div>
      ),
    },
  ];

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

        <Form.Item name="name" label="菜品名称">
          <Input />
        </Form.Item>
        <Form.Item name="categoryId" label="菜品分类">
          <Select allowClear>
            {categories?.map((category) => (
              <Select.Option key={category.id} value={category.id}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="status" label="售卖状态">
          <Select allowClear>
            <Select.Option value={1}>启售</Select.Option>
            <Select.Option value={0}>停售</Select.Option>
          </Select>
        </Form.Item>
      </Form>

      <div className="flex bg-white w-full rounded-lg p-4">
        <div className="flex items-center gap-1 text-lg">
          <FileOutlined />
          数据列表
        </div>
        <Button className="ml-auto" onClick={() => navigate("/dish/add")}>
          添加
        </Button>
        <Button className="ml-2" danger onClick={handleDeleteBatch}>
          批量删除
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
        rowSelection={{
          type: "checkbox",
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
          getCheckboxProps: (record: DataType) => ({
            name: record.name,
          }),
        }}
        columns={columns}
        dataSource={data?.records}
        loading={isLoading}
      />
    </div>
  );
};

export default Page;
