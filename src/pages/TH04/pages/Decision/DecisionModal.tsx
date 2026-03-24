

import { Modal, Form, Input, Select, DatePicker } from "antd";
import type { FormInstance } from "antd";
import { GraduationDecision, RegistryBook } from "../../types";

interface Props {
    open: boolean;
    editing: GraduationDecision | null;
    form: FormInstance;
    books: RegistryBook[];
    onOk: () => void;
    onCancel: () => void;
}

export default function DecisionModal({
    open, editing, form, books, onOk, onCancel,
}: Props) {
    return (
        <Modal
            title={editing ? "Chỉnh sửa Quyết định" : "Thêm Quyết định mới"}
            visible={open}
            onOk={onOk}
            onCancel={onCancel}
            okText={editing ? "Cập nhật" : "Thêm mới"}
            cancelText="Hủy"
        >
            <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
                <Form.Item
                    name="registryBookId"
                    label="Sổ Văn bằng"
                    rules={[{ required: true, message: "Chọn sổ văn bằng!" }]}
                >
                    <Select
                        placeholder=" Chọn sổ "
                        options={books.map((b) => ({
                            value: b.id,
                            label: `${b.name} (${b.year})`,
                        }))}
                    />
                </Form.Item>

                <Form.Item
                    name="decisionNumber"
                    label="Số Quyết định"
                    rules={[{ required: true, message: "Nhập số QĐ!" }]}
                >
                    <Input placeholder="VD: 123/QĐ-ĐHXX" />
                </Form.Item>

                <Form.Item
                    name="issueDate"
                    label="Ngày ban hành"
                    rules={[{ required: true, message: "Chọn ngày!" }]}
                >
                    <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
                </Form.Item>

                <Form.Item
                    name="summary"
                    label="Trích yếu"
                    rules={[{ required: true, message: "Nhập trích yếu!" }]}
                >
                    <Input.TextArea
                        rows={2}
                        placeholder="VD: Công nhận tốt nghiệp đợt 1 năm 2024"
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
}
