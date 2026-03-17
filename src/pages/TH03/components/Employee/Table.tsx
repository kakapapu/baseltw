import { Table, Button, Popconfirm, Tag, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Employee } from '../../types';

const dayMap: any = { Mon: 'T2', Tue: 'T3', Wed: 'T4', Thu: 'T5', Fri: 'T6', Sat: 'T7', Sun: 'CN' };

interface Props {
  data: Employee[];
  onEdit: (record: Employee) => void;
  onDelete: (id: number) => void;
}

export default ({ data, onEdit, onDelete }: Props) => {
  const columns: ColumnsType<Employee> = [
    { title: 'STT', width: 60, align: 'center', render: (_, __, i) => i + 1 },
    { title: 'Tên nhân viên', dataIndex: 'name' },
    { title: 'SĐT', dataIndex: 'phone' },
    { title: 'Giới hạn khách/ngày', dataIndex: 'maxCustomers', align: 'center' },
    { 
      title: 'Ngày làm việc', 
      dataIndex: 'workDays',
      render: (days: string[]) => days?.map(d => <Tag key={d} color="blue">{dayMap[d]}</Tag>)
    },
    { 
      title: 'Giờ làm việc', 
      render: (_, r) => `${r.workHours?.start} - ${r.workHours?.end}`
    },
    {
      title: 'Thao tác',
      align: 'center',
      render: (_, record) => (
        <Space>
          <Button size="small" onClick={() => onEdit(record)}>Sửa</Button>
          <Popconfirm title="Xác nhận xóa?" onConfirm={() => onDelete(record.id)} okText="Có" cancelText="Không">
            <Button size="small" danger>Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return <Table rowKey="id" dataSource={data} columns={columns} bordered pagination={{ pageSize: 5 }} />;
};