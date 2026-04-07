import { Modal, Form, Input, InputNumber, Select, Rate } from 'antd';
import type { FormInstance } from 'antd';

interface Props {
  open: boolean;
  editing: boolean;
  form: FormInstance;
  onOk: () => void;
  onCancel: () => void;
}

export default function DiemDenModal({ open, editing, form, onOk, onCancel }: Props) {
  return (
    <Modal
      title={editing ? 'Chỉnh sửa điểm đến' : 'Thêm điểm đến'}
      visible={open}
      onOk={onOk}
      onCancel={onCancel}
      okText="Lưu"
      cancelText="Hủy"
      width={600}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="ten" label="Tên điểm đến" rules={[{ required: true, message: 'Nhập tên' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="moTa" label="Mô tả">
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item name="hinhAnh" label="URL hình ảnh">
          <Input placeholder="https://..." />
        </Form.Item>
        <Form.Item name="loaiHinh" label="Loại hình" rules={[{ required: true, message: 'Chọn loại hình' }]}>
          <Select
            options={[
              { value: 'Biển', label: 'Biển' },
              { value: 'Núi', label: 'Núi' },
              { value: 'Thành phố', label: 'Thành phố' },
            ]}
          />
        </Form.Item>
        <Form.Item name="rating" label="Đánh giá">
          <Rate allowHalf />
        </Form.Item>
        <Form.Item name="thoiGianThamQuan" label="Thời gian tham quan (giờ)" rules={[{ required: true, message: 'Nhập thời gian' }]}>
          <InputNumber min={1} max={24} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="chiPhiAnUong" label="Chi phí ăn uống (VNĐ)" rules={[{ required: true, message: 'Nhập chi phí' }]}>
          <InputNumber min={0} style={{ width: '100%' }} formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} />
        </Form.Item>
        <Form.Item name="chiPhiLuuTru" label="Chi phí lưu trú (VNĐ)" rules={[{ required: true, message: 'Nhập chi phí' }]}>
          <InputNumber min={0} style={{ width: '100%' }} formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} />
        </Form.Item>
        <Form.Item name="chiPhiDiChuyen" label="Chi phí di chuyển (VNĐ)" rules={[{ required: true, message: 'Nhập chi phí' }]}>
          <InputNumber min={0} style={{ width: '100%' }} formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
