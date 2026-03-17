import { useState } from 'react';
import { Input, Button, Space, message } from 'antd';
import { Employee } from '../../types';
import Table from './Table';
import Form from './Form';

interface Props {
  data: Employee[];
  setData: (data: Employee[]) => void;
}

export default ({ data, setData }: Props) => {
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Employee | null>(null);

  const handleSubmit = (values: any) => {
    if (editing) {
      setData(data.map(e => e.id === editing.id ? { ...editing, ...values } : e));
      message.success('Cập nhật thành công!');
    } else {
      setData([...data, { ...values, id: Date.now() }]);
      message.success('Thêm thành công!');
    }
    setOpen(false);
    setEditing(null);
  };

  const handleEdit = (record: Employee) => {
    setEditing(record);
    setOpen(true);
  };

  const handleDelete = (id: number) => {
    setData(data.filter(e => e.id !== id));
    message.success('Đã xóa!');
  };

  const filtered = data.filter(e => e.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Input.Search placeholder="Tìm nhân viên..." allowClear onChange={e => setSearch(e.target.value)} style={{ width: 250 }} />
        <Button type="primary" onClick={() => setOpen(true)}>Thêm nhân viên</Button>
      </Space>
      <Table data={filtered} onEdit={handleEdit} onDelete={handleDelete} />
      <Form open={open} editing={editing} onCancel={() => { setOpen(false); setEditing(null); }} onSubmit={handleSubmit} />
    </div>
  );
};