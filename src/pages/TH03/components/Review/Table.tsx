import { Table, Button, Rate, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Review, Appointment, Employee, Service } from '../../types';

interface Props {
  data: Review[];
  appointments: Appointment[];
  employees: Employee[];
  services: Service[];
  onReply: (record: Review) => void;
}

export default ({ data, appointments, employees, services, onReply }: Props) => {
  const getInfo = (appointmentId: number) => {
    const apt = appointments.find(a => a.id === appointmentId);
    return {
      employee: employees.find(e => e.id === apt?.employeeId)?.name,
      service: services.find(s => s.id === apt?.serviceId)?.name,
      customer: apt?.customerName,
    };
  };

  const columns: ColumnsType<Review> = [
    { title: 'STT', width: 60, align: 'center', render: (_, __, i) => i + 1 },
    { title: 'Khách hàng', render: (_, r) => getInfo(r.appointmentId).customer },
    { title: 'Nhân viên', render: (_, r) => getInfo(r.appointmentId).employee },
    { title: 'Dịch vụ', render: (_, r) => getInfo(r.appointmentId).service },
    { title: 'Đánh giá', dataIndex: 'rating', render: v => <Rate disabled value={v} /> },
    { title: 'Nhận xét', dataIndex: 'comment' },
    { title: 'Phản hồi', dataIndex: 'reply', render: v => v ? <Tag color="green">{v}</Tag> : <Tag>Chưa phản hồi</Tag> },
    {
      title: 'Thao tác',
      align: 'center',
      render: (_, record) => (
        <Button size="small" onClick={() => onReply(record)}>{record.reply ? 'Sửa phản hồi' : 'Phản hồi'}</Button>
      ),
    },
  ];

  return <Table rowKey="id" dataSource={data} columns={columns} bordered pagination={{ pageSize: 5 }} />;
};