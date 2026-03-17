import { useEffect } from 'react';
import { Modal, Form, Input, Select, DatePicker, TimePicker } from 'antd';
import { Appointment, Employee, Service } from '../../types';
import dayjs from 'dayjs';

interface Props {
  open: boolean;
  editing: Appointment | null;
  employees: Employee[];
  services: Service[];
  onCancel: () => void;
  onSubmit: (values: any) => void;
}

export default ({ open, editing, employees, services, onCancel, onSubmit }: Props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (editing) {
      form.setFieldsValue({ ...editing, date: dayjs(editing.date), time: dayjs(editing.time, 'HH:mm') });
    } else {
      form.resetFields();
    }
  }, [editing, open]);

  const handleOk = () => {
    form.validateFields().then(values => {
      onSubmit({ ...values, date: values.date.format('YYYY-MM-DD'), time: values.time.format('HH:mm') });
      form.resetFields();
    });
  };

  return (
    <Modal title={editing ? 'Sửa lịch hẹn' : 'Đặt lịch hẹn'} open={open} onOk={handleOk} onCancel={() => { form.resetFields(); onCancel(); }} okText="Lưu" cancelText="Hủy" width={500}>
      <Form form={form} layout="vertical">
        <Form.Item name="customerName" label="Tên khách hàng" rules={[{ required: true, message: 'Nhập tên!' }]}>
          <Input placeholder="Nhập tên khách hàng" />
        </Form.Item>
        <Form.Item name="customerPhone" label="SĐT khách hàng" rules={[{ required: true, message: 'Nhập SĐT!' }]}>
          <Input placeholder="Nhập số điện thoại" />
        </Form.Item>
        <Form.Item name="serviceId" label="Dịch vụ" rules={[{ required: true, message: 'Chọn dịch vụ!' }]}>
          <Select placeholder="Chọn dịch vụ" options={services.map(s => ({ value: s.id, label: `${s.name} - ${s.price.toLocaleString()}đ (${s.duration} phút)` }))} />
        </Form.Item>
        <Form.Item name="employeeId" label="Nhân viên" rules={[{ required: true, message: 'Chọn nhân viên!' }]}>
          <Select placeholder="Chọn nhân viên" options={employees.map(e => ({ value: e.id, label: e.name }))} />
        </Form.Item>
        <Form.Item name="date" label="Ngày hẹn" rules={[{ required: true, message: 'Chọn ngày!' }]}>
          <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
        </Form.Item>
        <Form.Item name="time" label="Giờ hẹn" rules={[{ required: true, message: 'Chọn giờ!' }]}>
          <TimePicker style={{ width: '100%' }} format="HH:mm" minuteStep={15} />
        </Form.Item>
      </Form>
    </Modal>
  );
};