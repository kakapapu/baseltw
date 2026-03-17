import { useState } from 'react';
import { Input, Button, Space, Select, message } from 'antd';
import { Appointment, Employee, Service } from '../../types';
import Table from './Table';
import Form from './Form';

interface Props {
  data: Appointment[];
  setData: (data: Appointment[]) => void;
  employees: Employee[];
  services: Service[];
}

export default ({ data, setData, employees, services }: Props) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Appointment | null>(null);

  const checkConflict = (values: any, excludeId?: number) => {
    return data.some(a => 
      a.id !== excludeId &&
      a.employeeId === values.employeeId &&
      a.date === values.date &&
      a.time === values.time &&
      a.status !== 'cancelled'
    );
  };

  const checkMaxCustomers = (values: any, excludeId?: number) => {
    const emp = employees.find(e => e.id === values.employeeId);
    const count = data.filter(a => 
      a.id !== excludeId &&
      a.employeeId === values.employeeId &&
      a.date === values.date &&
      a.status !== 'cancelled'
    ).length;
    return emp && count >= emp.maxCustomers;
  };

  const handleSubmit = (values: any) => {
    if (checkConflict(values, editing?.id)) {
      message.error('Lịch hẹn bị trùng!');
      return;
    }
    if (checkMaxCustomers(values, editing?.id)) {
      message.error('Nhân viên đã đạt giới hạn khách trong ngày!');
      return;
    }

    if (editing) {
      setData(data.map(a => a.id === editing.id ? { ...editing, ...values } : a));
      message.success('Cập nhật thành công!');
    } else {
      setData([...data, { ...values, id: Date.now(), status: 'pending' }]);
      message.success('Đặt lịch thành công!');
    }
    setOpen(false);
    setEditing(null);
  };

  const handleStatusChange = (id: number, status: Appointment['status']) => {
    setData(data.map(a => a.id === id ? { ...a, status } : a));
    message.success('Cập nhật trạng thái!');
  };

  const handleEdit = (record: Appointment) => { setEditing(record); setOpen(true); };
  const handleDelete = (id: number) => { setData(data.filter(a => a.id !== id)); message.success('Đã xóa!'); };

  const filtered = data.filter(a => {
    const matchSearch = a.customerName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !statusFilter || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Input.Search placeholder="Tìm khách hàng..." allowClear onChange={e => setSearch(e.target.value)} style={{ width: 200 }} />
        <Select placeholder="Lọc trạng thái" allowClear style={{ width: 150 }} onChange={setStatusFilter}
          options={[
            { value: 'pending', label: 'Chờ duyệt' },
            { value: 'confirmed', label: 'Xác nhận' },
            { value: 'completed', label: 'Hoàn thành' },
            { value: 'cancelled', label: 'Đã hủy' },
          ]}
        />
        <Button type="primary" onClick={() => setOpen(true)}>Đặt lịch mới</Button>
      </Space>
      <Table data={filtered} employees={employees} services={services} onEdit={handleEdit} onDelete={handleDelete} onStatusChange={handleStatusChange} />
      <Form open={open} editing={editing} employees={employees} services={services} onCancel={() => { setOpen(false); setEditing(null); }} onSubmit={handleSubmit} />
    </div>
  );
};