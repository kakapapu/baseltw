
import { Card, Table, Button, Select, Space, Popconfirm, Tag, Row, Col } from "antd";
import {
    PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { Diploma } from "../../types";
import { useDiploma } from "./useDiploma";
import DiplomaModal from "./DiplomaModal";
import DiplomaDetail from "../../components/Detail";

export default function DiplomaPage() {
    const {
        books, decisions, formFields, filteredDiplomas,
        modalOpen, setModalOpen, detailOpen, setDetailOpen,
        editing, viewing, form,
        filterBookId, setFilterBookId, filterDecisionId, setFilterDecisionId,
        getDecisionLabel,
        openAdd, openEdit, openDetail, handleDecisionChange, handleOk, handleDelete,
    } = useDiploma();

    const columns: ColumnsType<Diploma> = [
        {
            title: "Số vào sổ",
            dataIndex: "entryNumber",
            width: 100,
            align: "center",
            sorter: (a, b) => a.entryNumber - b.entryNumber,
        },
        { title: "Số hiệu VB", dataIndex: "diplomaNumber", width: 140 },
        { title: "MSV", dataIndex: "studentId", width: 120 },
        { title: "Họ tên", dataIndex: "fullName" },
        {
            title: "Ngày sinh",
            dataIndex: "dateOfBirth",
            width: 120,
            render: (d: string) => dayjs(d).format("DD/MM/YYYY"),
        },
        {
            title: "Quyết định",
            dataIndex: "decisionId",
            width: 150,
            render: (id: string) => <Tag>{getDecisionLabel(id)}</Tag>,
        },
        {
            title: "Thao tác",
            width: 150,
            align: "center",
            render: (_v, record) => (
                <Space>
                    <Button
                        type="text"
                        icon={<EyeOutlined />}
                        onClick={() => openDetail(record)}
                    />
                    <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => openEdit(record)}
                    />
                    <Popconfirm
                        title="Xác nhận xóa văn bằng?"
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
        <>
            <Card
                title="Quản lý Thông tin Văn bằng"
                extra={
                    <Button type="primary" icon={<PlusOutlined />} onClick={openAdd}>
                        Thêm văn bằng
                    </Button>
                }
            >
                <Row gutter={16} style={{ marginBottom: 16 }}>
                    <Col xs={24} sm={12} md={8}>
                        <Select
                            allowClear
                            style={{ width: "100%" }}
                            placeholder="Lọc theo sổ văn bằng"
                            value={filterBookId}
                            onChange={setFilterBookId}
                            options={books.map((b) => ({
                                value: b.id,
                                label: `${b.name} (${b.year})`,
                            }))}
                        />
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                        <Select
                            allowClear
                            style={{ width: "100%" }}
                            placeholder="Lọc theo quyết định"
                            value={filterDecisionId}
                            onChange={setFilterDecisionId}
                            options={decisions.map((d) => ({
                                value: d.id,
                                label: `${d.decisionNumber} — ${d.summary}`,
                            }))}
                        />
                    </Col>
                </Row>

                <Table
                    dataSource={filteredDiplomas}
                    columns={columns}
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                    locale={{ emptyText: "Chưa có văn bằng nào" }}
                />
            </Card>

            <DiplomaModal
                open={modalOpen}
                editing={editing}
                form={form}
                decisions={decisions}
                formFields={formFields}
                onDecisionChange={handleDecisionChange}
                onOk={handleOk}
                onCancel={() => setModalOpen(false)}
            />

            <DiplomaDetail
                diploma={viewing}
                open={detailOpen}
                onClose={() => setDetailOpen(false)}
            />
        </>
    );
}
