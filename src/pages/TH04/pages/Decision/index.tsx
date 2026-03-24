
import { Card, Table, Button, Space, Popconfirm, Tag } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { GraduationDecision } from "../../types";
import { useDecision } from "./useDecision";
import DecisionModal from "./DecisionModal";

export default function DecisionPage() {
    const {
        decisions, books, modalOpen, setModalOpen, editing, form,
        getBookLabel, countDiplomas, openAdd, openEdit, handleOk, handleDelete,
    } = useDecision();

    const columns: ColumnsType<GraduationDecision> = [
        {
            title: "STT",
            width: 60,
            align: "center",
            render: (_v, _r, i) => i + 1,
        },
        {
            title: "Số QĐ",
            dataIndex: "decisionNumber",
            width: 140,
        },
        {
            title: "Ngày ban hành",
            dataIndex: "issueDate",
            width: 140,
            render: (date: string) => dayjs(date).format("DD/MM/YYYY"),
        },
        {
            title: "Trích yếu",
            dataIndex: "summary",
            ellipsis: true,
        },
        {
            title: "Sổ Văn bằng",
            dataIndex: "registryBookId",
            width: 220,
            render: (id: string) => <Tag color="blue">{getBookLabel(id)}</Tag>,
        },
        {
            title: "Số VB",
            width: 80,
            align: "center",
            render: (_v, record) => countDiplomas(record.id),
        },
        {
            title: "Lượt tra cứu",
            dataIndex: "lookupCount",
            width: 120,
            align: "center",
            render: (count: number) => <Tag color="orange">{count}</Tag>,
        },
        {
            title: "Thao tác",
            width: 110,
            align: "center",
            render: (_v, record) => (
                <Space>
                    <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => openEdit(record)}
                    />
                    <Popconfirm
                        title="Xác nhận xóa quyết định?"
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
            title="Quản lý Quyết định Tốt nghiệp"
            extra={
                <Button type="primary" icon={<PlusOutlined />} onClick={openAdd}>
                    Thêm quyết định
                </Button>
            }
        >
            <Table
                dataSource={decisions}
                columns={columns}
                rowKey="id"
                pagination={{ pageSize: 10 }}
                locale={{ emptyText: "Chưa có quyết định nào" }}
            />

            <DecisionModal
                open={modalOpen}
                editing={editing}
                form={form}
                books={books}
                onOk={handleOk}
                onCancel={() => setModalOpen(false)}
            />
        </Card>
    );
}
