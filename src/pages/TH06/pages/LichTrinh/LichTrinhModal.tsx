import { Modal, Form, Input, InputNumber, Button, Select, Card, Space, Typography } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import type { FormInstance } from 'antd';
import { DiemDen, NgayItem } from '../../types';

interface Props {
    open: boolean;
    editing: boolean;
    form: FormInstance;
    ngayItems: NgayItem[];
    diemDens: DiemDen[];
    onOk: () => void;
    onCancel: () => void;
    onAddNgay: () => void;
    onRemoveNgay: (index: number) => void;
    onUpdateDiemDen: (index: number, ids: string[]) => void;
}

export default function LichTrinhModal({
    open, editing, form, ngayItems, diemDens, onOk, onCancel, onAddNgay, onRemoveNgay, onUpdateDiemDen,
}: Props) {
    return (
        <Modal
            title={editing ? 'Chỉnh sửa lịch trình' : 'Tạo lịch trình mới'}
            visible={open}
            onOk={onOk}
            onCancel={onCancel}
            okText="Lưu"
            cancelText="Hủy"
            width={700}
        >
            <Form form={form} layout="vertical">
                <Form.Item name="ten" label="Tên lịch trình" rules={[{ required: true, message: 'Nhập tên' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="nganSachDuKien" label="Ngân sách dự kiến (VNĐ)" rules={[{ required: true, message: 'Nhập ngân sách' }]}>
                    <InputNumber min={0} style={{ width: '100%' }} formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} />
                </Form.Item>
            </Form>

            <Typography.Text strong>Lịch trình theo ngày:</Typography.Text>
            <div style={{ marginTop: 8, maxHeight: 400, overflow: 'auto' }}>
                {ngayItems.map((item, index) => (
                    <Card
                        key={index}
                        size="small"
                        title={`Ngày ${item.ngay}`}
                        style={{ marginBottom: 8 }}
                        extra={
                            ngayItems.length > 1 && (
                                <Button type="text" danger icon={<DeleteOutlined />} onClick={() => onRemoveNgay(index)} />
                            )
                        }
                    >
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="Chọn điểm đến"
                            value={item.diemDenIds}
                            onChange={(ids) => onUpdateDiemDen(index, ids)}
                            options={diemDens.map((d) => ({ value: d.id, label: d.ten }))}
                        />
                    </Card>
                ))}
            </div>
            <Space style={{ marginTop: 8 }}>
                <Button icon={<PlusOutlined />} onClick={onAddNgay}>Thêm ngày</Button>
            </Space>
        </Modal>
    );
}
