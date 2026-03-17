import { useEffect } from 'react';
import { Modal, Form, Input, InputNumber } from 'antd';
import { Service } from '../../types';

interface Props {
  open: boolean;
  editing: Service | null;
  onCancel: () => void;
  onSubmit: (values: any) => void;
}

export default ({ open, editing, onCancel, onSubmit }: Props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    editing ? form.setFieldsValue(editing) : form.resetFields();
  }, [editing, open]);

  const handleOk = () => {
    form.validateFields().then(values => { onSubmit(values); form.resetFields(); });
  };

  return (
    <Modal title={editing ? 'Sửa dịch vụ' : 'Thêm dịch vụ'} open={open} onOk={handleOk} onCancel={() => { form.resetFields(); onCancel(); }} okText="Lưu" cancelText="Hủy">
      <Form form={form} layout="vertical">
        <Form.Item name="name" label="Tên dịch vụ" rules={[{ required: true, message: 'Nhập tên!' }]}>
          <Input placeholder="Nhập tên dịch vụ" />
        </Form.Item>
        <Form.Item name="price" label="Giá" rules={[{ required: true, message: 'Nhập giá!' }]}>
          <InputNumber min={1000} style={{ width: '100%' }} placeholder="Nhập giá" />
        </Form.Item>
        <Form.Item name="duration" label="Thời gian (phút)" rules={[{ required: true, message: 'Nhập thời gian!' }]}>
          <InputNumber min={5} style={{ width: '100%' }} placeholder="Nhập thời gian" />
        </Form.Item>
      </Form>
    </Modal>
  );
};