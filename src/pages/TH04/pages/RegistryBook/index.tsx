

import { Card, Table, Button, Space, Popconfirm, Tag } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { RegistryBook } from "../../types";
import { useRegistryBook } from "./useRegistryBook";
import BookModal from "./BookModal";

export default function RegistryBookPage() {
    const {
        books, modalOpen, setModalOpen, editing, form, countDiplomas, openAdd, openEdit, handleOk, handleDelete,
    } = useRegistryBook();

    const columns: ColumnsType<RegistryBook> = [
        {
            title: "STT",
            width: 70,
            align: "center",
            render: (_v, _r, index) => index + 1,
        },
        {
            title: "Năm",
            dataIndex: "year",
            width: 100,
            align: "center",
            sorter: (a, b) => a.year - b.year,
            render: (year: number) => <Tag color="blue">{year}</Tag>,
        },
        {
            title: "Tên sổ văn bằng",
            dataIndex: "name",
        },
        {
            title: "Số VB đã cấp",
            width: 130,
            align: "center",
            render: (_v, record) => (
                <Tag color="green">{countDiplomas(record.id)}</Tag>
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
                        title="Xác nhận xóa sổ văn bằng này?"
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
            title=" Quản lý Sổ Văn bằng"
            extra={
                <Button type="primary" icon={<PlusOutlined />} onClick={openAdd}>
                    Thêm sổ mới
                </Button>
            }
        >
            <Table
                dataSource={books}
                columns={columns}
                rowKey="id"
                pagination={{ pageSize: 10 }}
                locale={{ emptyText: "Chưa có sổ văn bằng nào" }}
            />

            <BookModal
                open={modalOpen}
                editing={editing}
                form={form}
                onOk={handleOk}
                onCancel={() => setModalOpen(false)}
            />
        </Card>
    );
}
