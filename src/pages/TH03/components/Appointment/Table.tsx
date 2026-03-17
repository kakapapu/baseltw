import { Table, Button, Popconfirm, Tag, Space, Select } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Appointment, Employee, Service } from '../../types';

const statusMap: any = {
  pending: { color: 'orange', text: 'Chờ duyệt' },
  confirmed: { color: 'blue', text: 'Xác nhận' },
  completed: { color: 'green', text: 'Hoàn thành' },
  cancelled: { color: 'red', text: 'Đã hủy' },
};

interface Props {
  data: Appointment[];
  employees: Employee[];
  services: Service[];
  onEdit: (record: Appointment) => void;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: Appointment['status']) => void;
}

export default ({ data, employees, services, onEdit, onDelete, onStatusChange }: Props) => {
  const columns: ColumnsType<Appointment> = [
    { title: 'STT', width: 60, align: 'center', render: (_, __, i) => i + 1 },
    { title: 'Khách hàng', dataIndex: 'customerName' },
    { title: 'SĐT', dataIndex: 'customerPhone' },
    { title: 'Nhân viên', dataIndex: 'employeeId', render: id => employees.find(e => e.id === id)?.name },
    { title: 'Dịch vụ', dataIndex: 'serviceId', render: id => services.find(s => s.id === id)?.name },
    { title: 'Ngày', dataIndex: 'date' },
    { title: 'Giờ', dataIndex: 'time' },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (status, record) => (
        <Select value={status} size="small" style={{ width: 120 }} onChange={v => onStatusChange(record.id, v)}
          options={Object.keys(statusMap).map(k => ({ value: k, label: <Tag color={statusMap[k].color}>{statusMap[k].text}</Tag> }))}
        />
      ),
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

  return <Table rowKey="id" dataSource={data} columns={columns} bordered pagination={{ pageSize: 5 }} scroll={{ x: 1000 }} />;
};