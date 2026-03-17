import { Modal, Form, Select, Rate, Input } from 'antd';
import { Appointment, Employee, Service } from '../../types';

interface Props {
  open: boolean;
  appointments: Appointment[];
  employees: Employee[];
  services: Service[];
  onCancel: () => void;
  onSubmit: (values: any) => void;
}

export default ({ open, appointments, employees, services, onCancel, onSubmit }: Props) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then(values => { onSubmit(values); form.resetFields(); });
  };

  const getLabel = (apt: Appointment) => {
    const emp = employees.find(e => e.id === apt.employeeId)?.name;
    const svc = services.find(s => s.id === apt.serviceId)?.name;
    return `${apt.customerName} - ${svc} (${emp}) - ${apt.date}`;
  };

  return (
    <Modal title="Thêm đánh giá" open={open} onOk={handleOk} onCancel={() => { form.resetFields(); onCancel(); }} okText="Gửi" cancelText="Hủy">
      <Form form={form} layout="vertical">
        <Form.Item name="appointmentId" label="Chọn lịch hẹn" rules={[{ required: true, message: 'Chọn lịch hẹn!' }]}>
          <Select placeholder="Chọn lịch hẹn đã hoàn thành" options={appointments.map(a => ({ value: a.id, label: getLabel(a) }))} />
        </Form.Item>
        <Form.Item name="rating" label="Đánh giá" rules={[{ required: true, message: 'Cho điểm!' }]}>
          <Rate />
        </Form.Item>
        <Form.Item name="comment" label="Nhận xét">
          <Input.TextArea rows={3} placeholder="Nhập nhận xét..." />
        </Form.Item>
      </Form>
    </Modal>
  );
};