import React from 'react';
import { Table, Button, Popconfirm } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface Props {
  data: Product[];
  onDelete: (id: number) => void;
}

const ProductList: React.FC<Props> = ({ data, onDelete }) => {
  const columns: ColumnsType<Product> = [
    {
      title: 'STT',
      width: 60,
      align: 'center',
      render: (_, __, index) => index + 1, 
    },
    { 
      title: 'Tên sản phẩm', 
      dataIndex: 'name',
      key: 'name',
    },
    { 
      title: 'Giá', 
      dataIndex: 'price', 
      key: 'price',
      render: (value) => value?.toLocaleString('vi-VN') + ' đ',
    },
    { 
      title: 'Số lượng', 
      dataIndex: 'quantity', 
      key: 'quantity',
      align: 'center',
    },
    {
      title: 'Thao tác',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Popconfirm 
          title="Bạn chắc chắn muốn xóa?" 
          onConfirm={() => onDelete(record.id)}
          okText="Có"
          cancelText="Không"
        >
          <Button type="primary" danger size="small">
            Xóa
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <Table
      rowKey="id"
      dataSource={data}
      columns={columns}
      bordered
      pagination={{ pageSize: 10 }} 
    />
  );
};

export default ProductList;