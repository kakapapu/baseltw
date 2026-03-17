import { useState } from 'react';
import { Button, Space, message } from 'antd';
import { Review, Appointment, Employee, Service } from '../../types';
import Table from './Table';
import Form from './Form';
import ReplyForm from './ReplyForm';

interface Props {
  data: Review[];
  setData: (data: Review[]) => void;
  appointments: Appointment[];
  employees: Employee[];
  services: Service[];
}

export default ({ data, setData, appointments, employees, services }: Props) => {
  const [open, setOpen] = useState(false);
  const [replyOpen, setReplyOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  const completedAppointments = appointments.filter(a => a.status === 'completed' && !data.some(r => r.appointmentId === a.id));

  const handleSubmit = (values: any) => {
    setData([...data, { ...values, id: Date.now() }]);
    setOpen(false);
    message.success('Đánh giá thành công!');
  };

  const handleReply = (reply: string) => {
    setData(data.map(r => r.id === selectedReview?.id ? { ...r, reply } : r));
    setReplyOpen(false);
    setSelectedReview(null);
    message.success('Phản hồi thành công!');
  };

  const openReplyModal = (record: Review) => { setSelectedReview(record); setReplyOpen(true); };

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={() => setOpen(true)} disabled={!completedAppointments.length}>
          Thêm đánh giá
        </Button>
      </Space>
      <Table data={data} appointments={appointments} employees={employees} services={services} onReply={openReplyModal} />
      <Form open={open} appointments={completedAppointments} employees={employees} services={services} onCancel={() => setOpen(false)} onSubmit={handleSubmit} />
      <ReplyForm open={replyOpen} review={selectedReview} onCancel={() => { setReplyOpen(false); setSelectedReview(null); }} onSubmit={handleReply} />
    </div>
  );
};