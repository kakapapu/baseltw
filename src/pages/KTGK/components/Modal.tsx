import React from "react";
import { Modal, Form, Input, Select } from "antd";
import { Khoahoc, State } from '../types';
import { List_GV } from '../data';
import type { FormInstance } from "antd";

interface Props {
    open: boolean;
    Edit: boolean;
    form: FormInstance;
    dskhoahoc: Khoahoc[];
    EditId?: number;
    onCancel: () => void;
    onOk: () => void;
}

const KhoaHocModal: React.FC<Props> = ({ open, Edit, form, onCancel, onOk, dskhoahoc, EditId }) => (
    <Modal
        title={Edit ? "Sửa khóa học" : "Thêm khóa học"}
        visible={open}
        onCancel={onCancel}
        onOk={onOk}
        okText="Lưu"
        cancelText="Hủy"
        width={700}
    >
        <Form form={form}>
            <Form.Item
                name="name"
                label="Tên khóa học"
                rules={[
                    { required: true, message: 'Vui lòng nhập tên khóa học!' },
                    { max: 100, message: 'Tối đa 100 ký tự!' },
                    {
                        validator: (_, value) => {
                            if (!value) return Promise.resolve();
                            const trung = dskhoahoc.find(
                                (kh) => kh.name.trim().toLowerCase() === value.trim().toLowerCase() && kh.id !== EditId,
                            );
                            if (trung) return Promise.reject('Tên khóa học đã tồn tại!');
                            return Promise.resolve();
                        },
                    },
                ]}
            >
                <Input maxLength={100} />
            </Form.Item>

            <Form.Item
                name="giangvien"
                label="Giảng viên"
                rules={[{ required: true, message: 'Vui lòng chọn giảng viên!' }]}
            >
                <Select placeholder="Chọn giảng viên">
                    {List_GV.map((gv) => (
                        <Select.Option key={gv} value={gv}>{gv}</Select.Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item
                name="sohocsinh"
                label="Số lượng học viên"
                rules={[{ required: true, message: 'Vui lòng nhập số học viên!' }]}
            >
                <Input type="number" min={0} />
            </Form.Item>

            <Form.Item
                name="description"
                label="Mô tả khóa học"
                rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
            >
                <Input.TextArea rows={4} />
            </Form.Item>

            <Form.Item
                name="state"
                label="Trạng thái"
                rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
            >
                <Select placeholder="Chọn trạng thái">
                    {Object.values(State).map((s) => (
                        <Select.Option key={s} value={s}>{s}</Select.Option>
                    ))}
                </Select>
            </Form.Item>
        </Form>
    </Modal>
);

export default KhoaHocModal;