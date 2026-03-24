
import {
    Modal, Form, Input, InputNumber, Select, DatePicker, Row, Col, Divider,
} from "antd";
import type { FormInstance } from "antd";
import { GraduationDecision, FormField, Diploma } from "../../types";

interface Props {
    open: boolean;
    editing: Diploma | null;
    form: FormInstance;
    decisions: GraduationDecision[];
    formFields: FormField[];
    onDecisionChange: (decisionId: string) => void;
    onOk: () => void;
    onCancel: () => void;
}

function renderFieldInput(dataType: string) {
    switch (dataType) {
        case "Number":
            return <InputNumber style={{ width: "100%" }} />;
        case "Date":
            return <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />;
        default:
            return <Input />;
    }
}

export default function DiplomaModal({
    open, editing, form, decisions, formFields,
    onDecisionChange, onOk, onCancel,
}: Props) {
    return (
        <Modal
            title={editing ? "Chỉnh sửa Văn bằng" : "Thêm Văn bằng mới"}
            visible={open}
            onOk={onOk}
            onCancel={onCancel}
            okText={editing ? "Cập nhật" : "Thêm mới"}
            cancelText="Hủy"
            width={680}
        >
            <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
                <Form.Item
                    name="decisionId"
                    label="Quyết định tốt nghiệp"
                    rules={[{ required: true, message: "Vui lòng chọn quyết định!" }]}
                >
                    <Select
                        placeholder="-- Chọn quyết định --"
                        onChange={!editing ? onDecisionChange : undefined}
                        disabled={!!editing}
                        options={decisions.map((d) => ({
                            value: d.id,
                            label: `${d.decisionNumber} — ${d.summary}`,
                        }))}
                    />
                </Form.Item>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="entryNumber" label="Số vào sổ">
                            <InputNumber
                                style={{ width: "100%" }}
                                disabled
                                placeholder="Tự động khi chọn QĐ"
                            />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name="diplomaNumber"
                            label="Số hiệu văn bằng"
                            rules={[{ required: true, message: "Nhập số hiệu VB!" }]}
                        >
                            <Input placeholder="VD: VB-2024-001" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item
                            name="studentId"
                            label="Mã sinh viên"
                            rules={[{ required: true, message: "Nhập MSV!" }]}
                        >
                            <Input placeholder="VD: 20210001" />
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item
                            name="fullName"
                            label="Họ tên"
                            rules={[{ required: true, message: "Nhập họ tên!" }]}
                        >
                            <Input placeholder="Nguyễn Văn A" />
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item
                            name="dateOfBirth"
                            label="Ngày sinh"
                            rules={[{ required: true, message: "Chọn ngày sinh!" }]}
                        >
                            <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
                        </Form.Item>
                    </Col>
                </Row>

                {formFields.length > 0 && (
                    <>
                        <Divider dashed style={{ margin: "8px 0 16px" }}>
                            Trường thông tin bổ sung
                        </Divider>
                        <Row gutter={16}>
                            {formFields.map((field) => (
                                <Col span={12} key={field.id}>
                                    <Form.Item name={`extra_${field.id}`} label={field.name}>
                                        {renderFieldInput(field.dataType)}
                                    </Form.Item>
                                </Col>
                            ))}
                        </Row>
                    </>
                )}
            </Form>
        </Modal>
    );
}
