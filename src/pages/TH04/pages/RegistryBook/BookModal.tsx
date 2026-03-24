

import { Modal, Form, Input, InputNumber } from "antd";
import type { FormInstance } from "antd";
import { RegistryBook } from "../../types";

interface Props {
    open: boolean;
    editing: RegistryBook | null;
    form: FormInstance;
    onOk: () => void;
    onCancel: () => void;
}

export default function BookModal({ open, editing, form, onOk, onCancel }: Props) {
    return (
        <Modal
            title={editing ? "Chỉnh sửa Sổ Văn bằng" : "Thêm Sổ Văn bằng mới"}
            visible={open}
            onOk={onOk}
            onCancel={onCancel}
            okText={editing ? "Cập nhật" : "Thêm mới"}
            cancelText="Hủy"
        >
            <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
                <Form.Item
                    name="year"
                    label="Năm"
                    rules={[{ required: true, message: "Vui lòng nhập năm!" }]}
                >
                    <InputNumber
                        style={{ width: "100%" }}
                        min={2000}
                        max={2100}
                        placeholder="VD: 2024"
                    />
                </Form.Item>

                <Form.Item
                    name="name"
                    label="Tên sổ văn bằng"
                    rules={[{ required: true, message: "Vui lòng nhập tên sổ!" }]}
                >
                    <Input placeholder="VD: Sổ văn bằng cử nhân năm 2024" />
                </Form.Item>
            </Form>
        </Modal>
    );
}
