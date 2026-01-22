import { useState } from 'react';
import { Input, Button, Space, message } from 'antd';
import Table from './Table';
import Form from './Form';

const initData = [
  { id: 1, name: 'Laptop Dell XPS 13', price: 25000000, quantity: 10 },
  { id: 2, name: 'iPhone 15 Pro Max', price: 30000000, quantity: 15 },
  { id: 3, name: 'Samsung Galaxy S24', price: 22000000, quantity: 20 },
  { id: 4, name: 'iPad Air M2', price: 18000000, quantity: 12 },
  { id: 5, name: 'MacBook Air M3', price: 28000000, quantity: 8 },
];

export default () => {
  const [products, setProducts] = useState(initData);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);

  const handleAdd = (values: any) => {
    setProducts([...products, { ...values, id: Date.now() }]);
    setOpen(false);
    message.success('Thêm thành công!');
  };

  const handleDelete = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
    message.success('Đã xóa!');
  };

  const filteredData = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: 20 }}>
      <h2>Quản lý Sản phẩm</h2>

      <Space style={{ marginBottom: 16 }}>
        <Input.Search
          placeholder="Tìm kiếm..."
          allowClear
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: 250 }}
        />
        <Button type="primary" onClick={() => setOpen(true)}>
          Thêm sản phẩm
        </Button>
      </Space>

      <Table 
        data={filteredData}
        onDelete={handleDelete} 
      />

      <Form 
        open={open} 
        onCancel={() => setOpen(false)} 
        onSubmit={handleAdd} 
      />
    </div>
  );
};