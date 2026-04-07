import { useState } from 'react';
import { Card, Table, Button, Space, Popconfirm, Tag, Input, Rate, Image } from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { DiemDen } from '../../types';
import { useQuanLyDiemDen } from './useQuanLyDiemDen';
import DiemDenModal from './DiemDenModal';

export default function QuanLyDiemDenPage() {
  const { danhSach, modalOpen, setModalOpen, editing, form, openAdd, openEdit, handleOk, handleDelete } =
    useQuanLyDiemDen();
  const [search, setSearch] = useState('');

  const filtered = danhSach.filter((d) =>
    d.ten.toLowerCase().includes(search.toLowerCase()),
  );

  const loaiHinhColor = (loai: string) =>
    loai === 'Biển' ? 'blue' : loai === 'Núi' ? 'green' : 'orange';

  const formatVND = (v: number) => v?.toLocaleString('vi-VN') + ' đ';

  const columns: ColumnsType<DiemDen> = [
    {
      title: 'Hình',
      width: 80,
      render: (_, r) => (
        <Image src={r.hinhAnh} width={60} height={40} style={{ objectFit: 'cover', borderRadius: 4 }} fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88P/BfwAJhAPk3KFhjwAAAABJRU5ErkJggg==" />
      ),
    },
    {
      title: 'Tên điểm đến',
      dataIndex: 'ten',
      sorter: (a, b) => a.ten.localeCompare(b.ten),
    },
    {
      title: 'Loại hình',
      dataIndex: 'loaiHinh',
      width: 110,
      align: 'center',
      render: (v: string) => <Tag color={loaiHinhColor(v)}>{v}</Tag>,
      filters: [
        { text: 'Biển', value: 'Biển' },
        { text: 'Núi', value: 'Núi' },
        { text: 'Thành phố', value: 'Thành phố' },
      ],
      onFilter: (v, r) => r.loaiHinh === v,
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      width: 160,
      sorter: (a, b) => a.rating - b.rating,
      render: (v: number) => <Rate disabled value={v} allowHalf style={{ fontSize: 14 }} />,
    },
    {
      title: 'Ăn uống',
      dataIndex: 'chiPhiAnUong',
      width: 120,
      align: 'right',
      render: formatVND,
    },
    {
      title: 'Lưu trú',
      dataIndex: 'chiPhiLuuTru',
      width: 120,
      align: 'right',
      render: formatVND,
    },
    {
      title: 'Di chuyển',
      dataIndex: 'chiPhiDiChuyen',
      width: 120,
      align: 'right',
      render: formatVND,
    },
    {
      title: 'Thao tác',
      width: 100,
      align: 'center',
      render: (_, r) => (
        <Space>
          <Button type="text" icon={<EditOutlined />} onClick={() => openEdit(r)} />
          <Popconfirm title="Xác nhận xóa?" onConfirm={() => handleDelete(r.id)} okText="Xóa" cancelText="Hủy">
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card
      title="Quản lý điểm đến"
      extra={
        <Space>
          <Input
            placeholder="Tìm kiếm..."
            prefix={<SearchOutlined />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            allowClear
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={openAdd}>
            Thêm
          </Button>
        </Space>
      }
    >
      <Table
        dataSource={filtered}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: 900 }}
      />
      <DiemDenModal
        open={modalOpen}
        editing={!!editing}
        form={form}
        onOk={handleOk}
        onCancel={() => setModalOpen(false)}
      />
    </Card>
  );
}
