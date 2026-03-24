import { Card, Table, Button, Space, Popconfirm, Tag } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { FormField } from "../../types";
import { useFieldConfig } from "./useFieldConfig";
import FieldModal from "./FieldModal";

const dataTypeColor: Record<string, string> = {
  String: "blue",
  Number: "green",
  Date: "orange",
};

export default function FormConfigPage() {
  const {
    fields, modalOpen, setModalOpen, editing, form,
    openAdd, openEdit, handleOk, handleDelete,
  } = useFieldConfig();

  const columns: ColumnsType<FormField> = [
    {
      title: "STT",
      width: 70,
      align: "center",
      render: (_v, _r, index) => index + 1,
    },
    {
      title: "Tên trường",
      dataIndex: "name",
    },
    {
      title: "Kiểu dữ liệu",
      dataIndex: "dataType",
      width: 160,
      align: "center",
      render: (type: string) => (
        <Tag color={dataTypeColor[type] ?? "default"}>{type}</Tag>
      ),
    },
    {
      title: "Thao tác",
      width: 120,
      align: "center",
      render: (_v, record) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => openEdit(record)}
          />
          <Popconfirm
            title="Xác nhận xóa trường này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card
      title=" Cấu hình Biểu mẫu (Trường thông tin bổ sung)"
      extra={
        <Button type="primary" icon={<PlusOutlined />} onClick={openAdd}>
          Thêm trường
        </Button>
      }
    >
      <Table
        dataSource={fields}
        columns={columns}
        rowKey="id"
        pagination={false}
        locale={{ emptyText: "Chưa có trường bổ sung nào" }}
      />

      <FieldModal
        open={modalOpen}
        editing={editing}
        form={form}
        onOk={handleOk}
        onCancel={() => setModalOpen(false)}
      />
    </Card>
  );
}
