import { getAllCategories } from "@/api/category";
import { useCategory } from "@/hooks/useCategory";
import { api } from "@/api/API";
import { getToken } from "@/utils/auth";
import { PlusOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Tag,
  Upload,
  UploadFile,
  message,
} from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface IForm {
  name: string;
  categoryId: number;
  price: number;
  flavors: { name: string; value: string }[];
  image: string;
  description: string;
}

const flavorMap = {
  甜度: JSON.stringify(["无糖", "少糖", "半糖", "多糖", "全糖"]),
  温度: JSON.stringify(["热饮", "常温", "去冰", "少冰", "多冰"]),
  忌口: JSON.stringify(["不要葱", "不要蒜", "不要香菜", "不要辣"]),
  辣度: JSON.stringify(["不辣", "微辣", "中辣", "重辣"]),
};

const TagInput = ({
  value,
  onChange,
}: {
  value?: string;
  onChange?: (value: string) => void;
}) => {
  if (value === undefined) return;
  const arr = JSON.parse(value) as [];
  return (
    <div className="border-gray-200 p-2 rounded-lg border border-solid w-80 h-10 flex gap-0.5">
      {arr?.map((item, i) => (
        <Tag
          key={item}
          color="success"
          closable
          onClose={(e) => {
            e.preventDefault();
            const res = arr.filter((_, j) => j !== i);
            onChange && onChange(JSON.stringify(res));
          }}
        >
          {item}
        </Tag>
      ))}
    </div>
  );
};

const PictureUpload = ({
  onChange,
}: {
  value?: string;
  onChange?: (value: string) => void;
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>();
  return (
    <Upload
      listType="picture-card"
      action={`${import.meta.env.VITE_APP_API_URL}/common/upload`}
      name="file"
      headers={{ token: getToken() as string }}
      maxCount={1}
      fileList={fileList}
      onChange={(info) => {
        setFileList(info.fileList);
        if (info.file.status === "done")
          onChange && onChange(info.file.response.data);
      }}
    >
      <div>
        <PlusOutlined />
        <div className="mt-2">Upload</div>
      </div>
    </Upload>
  );
};

const Page = () => {
  const [form] = useForm<IForm>();

  const navigate = useNavigate();

  const onFinish = async (values: IForm) => {
    try {
      await api.dish.saveDishUsingPost(values);
      message.success("添加成功");
      navigate("/dish/list");
    } catch (error) {
      console.log(error);
    }
  };

  const { data: categories } = useCategory();

  return (
    <Form
      form={form}
      labelCol={{ span: 2 }}
      onFinish={onFinish}
      className="bg-white p-4 rounded-xl"
    >
      <Form.Item
        name="name"
        label="菜品名称"
        rules={[{ required: true, message: "请输入菜品名称" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="categoryId"
        label="菜品分类"
        rules={[{ required: true, message: "请选择菜品分类" }]}
      >
        <Select className="w-full">
          {categories?.map((category) => (
            <Select.Option key={category.id} value={category.id}>
              {category.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="price"
        label="菜品价格"
        rules={[{ required: true, message: "请输入菜品价格" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="口味做法配置">
        <Form.List name="flavors">
          {(fields, { add, remove }) => {
            return (
              <div className="p-4 rounded-xl  w-[700px] border border-gray-100 border-solid">
                {fields.map((field, i) => (
                  <Row key={i} align={"middle"}>
                    <Col span={7}>
                      <Form.Item name={[field.name, "name"]}>
                        <Select
                          onChange={(val) => {
                            form.setFieldValue(
                              "flavors",
                              form
                                .getFieldValue("flavors")
                                .map((item, j) =>
                                  i === j
                                    ? { name: val, value: flavorMap[val] }
                                    : item
                                )
                            );
                            console.log(form.getFieldsValue());
                          }}
                        >
                          {Object.keys(flavorMap)
                            .filter(
                              (flavor) =>
                                !form
                                  .getFieldValue("flavors")
                                  .map((item) => item.name)
                                  .includes(flavor)
                            )
                            .map((flavor) => (
                              <Select.Option value={flavor} key={flavor}>
                                {flavor}
                              </Select.Option>
                            ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={12} offset={1}>
                      <Form.Item name={[field.name, "value"]}>
                        <TagInput />
                      </Form.Item>
                    </Col>
                    <Col span={2} className="mb-6">
                      <Button danger type="link" onClick={() => remove(i)}>
                        删除
                      </Button>
                    </Col>
                  </Row>
                ))}
                <Button
                  onClick={add}
                  type="primary"
                  icon={<PlusOutlined />}
                  className={
                    form.getFieldValue("flavors")?.length >= 4 ? "hidden" : ""
                  }
                >
                  添新口味
                </Button>
              </div>
            );
          }}
        </Form.List>
      </Form.Item>
      <Form.Item
        name="image"
        label="菜品图片"
        rules={[{ required: true, message: "请上传菜品图片" }]}
      >
        <PictureUpload />
      </Form.Item>
      <Form.Item name="description" label="菜品描述">
        <TextArea placeholder="菜品描述，最长200字" />
      </Form.Item>
      <div className="flex justify-center">
        <Button htmlType="button" onClick={() => navigate("/dish/list")}>
          取消
        </Button>
        <Button htmlType="submit" type="primary" className="ml-8">
          保存
        </Button>
      </div>
    </Form>
  );
};

export default Page;
