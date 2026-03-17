import { useState } from 'react';
import { Input, Button, Space, message } from 'antd';
import { Service } from '../../types';
import Table from './Table';
import Form from './Form';

interface Props {
  data: Service[];
  setData: (data: Service[]) => void;
}

export default ({ data, setData }: Props) => {
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);

  const handleSubmit = (values: any) => {
    if (editing) {
      setData(data.map(s => s.id === editing.id ? { ...editing, ...values } : s));
      message.success('Cập nhật thành công!');
    } else {
      setData([...data, { ...values, id: Date.now() }]);
      message.success('Thêm thành công!');
    }
    setOpen(false);
    setEditing(null);
  };

  const handleEdit = (record: Service) => { setEditing(record); setOpen(true); };
  const handleDelete = (id: number) => { setData(data.filter(s => s.id !== id)); message.success('Đã xóa!'); };
  const filtered = data.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Input.Search placeholder="Tìm dịch vụ..." allowClear onChange={e => setSearch(e.target.value)} style={{ width: 250 }} />
        <Button type="primary" onClick={() => setOpen(true)}>Thêm dịch vụ</Button>
      </Space>
      <Table data={filtered} onEdit={handleEdit} onDelete={handleDelete} />
      <Form open={open} editing={editing} onCancel={() => { setOpen(false); setEditing(null); }} onSubmit={handleSubmit} />
    </div>
  );
};