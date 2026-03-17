import { Table, Button, Popconfirm, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Service } from '../../types';

interface Props {
  data: Service[];
  onEdit: (record: Service) => void;
  onDelete: (id: number) => void;
}

export default ({ data, onEdit, onDelete }: Props) => {
  const columns: ColumnsType<Service> = [
    { title: 'STT', width: 60, align: 'center', render: (_, __, i) => i + 1 },
    { title: 'Tên dịch vụ', dataIndex: 'name' },
    { title: 'Giá', dataIndex: 'price', render: v => v?.toLocaleString('vi-VN') + ' đ' },
    { title: 'Thời gian (phút)', dataIndex: 'duration', align: 'center' },
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