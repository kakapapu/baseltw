import { Modal, Form, Input, Select } from "antd";
import type { FormInstance } from "antd";
import { FormField } from "../../types";

interface Props {
    open: boolean;
    editing: FormField | null;
    form: FormInstance;
    onOk: () => void;
    onCancel: () => void;
}

const dataTypeOptions = [
    { value: "String", label: "Chuỗi (String)" },
    { value: "Number", label: "Số (Number)" },
    { value: "Date", label: "Ngày (Date)" },
];

export default function FieldModal({ open, editing, form, onOk, onCancel }: Props) {
    return (
        <Modal
            title={editing ? "Chỉnh sửa trường" : "Thêm trường mới"}
            visible={open}
            onOk={onOk}
            onCancel={onCancel}
            okText={editing ? "Cập nhật" : "Thêm mới"}
            cancelText="Hủy"
        >
            <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
                <Form.Item
                    name="name"
                    label="Tên trường"
                    rules={[{ required: true, message: "Vui lòng nhập tên trường!" }]}
                >
                    <Input placeholder="VD: Xếp loại tốt nghiệp" />
                </Form.Item>

                <Form.Item
                    name="dataType"
                    label="Kiểu dữ liệu"
                    rules={[{ required: true, message: "Vui lòng chọn kiểu dữ liệu!" }]}
                >
                    <Select placeholder="-- Chọn kiểu --" options={dataTypeOptions} />
                </Form.Item>
            </Form>
        </Modal>
    );
}
