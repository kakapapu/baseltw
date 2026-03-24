

import { Card, Form, Input, InputNumber, DatePicker, Button, Row, Col, Space, Alert } from "antd";
import { SearchOutlined, ReloadOutlined } from "@ant-design/icons";
import type { FormInstance } from "antd";

interface Props {
    form: FormInstance;
    onSearch: () => void;
    onReset: () => void;
}

export default function SearchForm({ form, onSearch, onReset }: Props) {
    return (
        <Card title="Tra cứu Văn bằng">
            <Alert
                type="info"
                showIcon
                message="Nhập ít nhất 2 tham số để tìm kiếm"
                style={{ marginBottom: 16 }}
            />

            <Form form={form} layout="vertical">
                <Row gutter={16}>
                    <Col xs={24} sm={12} md={8}>
                        <Form.Item name="diplomaNumber" label="Số hiệu văn bằng">
                            <Input placeholder="Nhập số hiệu VB..." allowClear />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={12} md={8}>
                        <Form.Item name="entryNumber" label="Số vào sổ">
                            <InputNumber
                                style={{ width: "100%" }}
                                placeholder="Nhập số vào sổ..."
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                        <Form.Item name="studentId" label="Mã sinh viên">
                            <Input placeholder="Nhập MSV..." allowClear />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col xs={24} sm={12} md={8}>
                        <Form.Item name="fullName" label="Họ tên">
                            <Input placeholder="Nhập họ tên..." allowClear />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={12} md={8}>
                        <Form.Item name="dateOfBirth" label="Ngày sinh">
                            <DatePicker
                                style={{ width: "100%" }}
                                format="DD/MM/YYYY"
                                placeholder="Chọn ngày sinh"
                            />
                        </Form.Item>
                    </Col>

                    <Col
                        xs={24}
                        sm={12}
                        md={8}
                        style={{ display: "flex", alignItems: "flex-end", paddingBottom: 24 }}
                    >
                        <Space>
                            <Button
                                type="primary"
                                icon={<SearchOutlined />}
                                onClick={onSearch}
                            >
                                Tìm kiếm
                            </Button>
                            <Button icon={<ReloadOutlined />} onClick={onReset}>
                                Xóa bộ lọc
                            </Button>
                        </Space>
                    </Col>
                </Row>
            </Form>
        </Card>
    );
}
