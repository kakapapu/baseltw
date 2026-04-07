import { useState } from 'react';
import { Card, Table, Button, Space, Popconfirm, Tag, Input, Typography } from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  WalletOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { LichTrinh } from '../../types';
import { useLichTrinh } from './useLichTrinh';
import LichTrinhModal from './LichTrinhModal';

interface Props {
  onViewNganSach: (lichTrinhId: string) => void;
}

export default function LichTrinhPage({ onViewNganSach }: Props) {
  const hook = useLichTrinh();
  const [search, setSearch] = useState('');

  const filtered = hook.lichTrinhs.filter((lt) =>
    lt.ten.toLowerCase().includes(search.toLowerCase()),
  );

  const formatVND = (v: number) => v?.toLocaleString('vi-VN') + ' đ';

  const columns: ColumnsType<LichTrinh> = [
    {
      title: 'Tên lịch trình',
      dataIndex: 'ten',
      sorter: (a, b) => a.ten.localeCompare(b.ten),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'ngayTao',
      width: 120,
      align: 'center',
      render: (v: string) => dayjs(v).format('DD/MM/YYYY'),
    },
    {
      title: 'Số ngày',
      width: 90,
      align: 'center',
      render: (_, r) => r.ngayItems.length,
    },
    {
      title: 'Tổng giờ',
      width: 90,
      align: 'center',
      render: (_, r) => hook.tinhTongGio(r) + 'h',
    },
    {
      title: 'Ngân sách',
      dataIndex: 'nganSachDuKien',
      width: 140,
      align: 'right',
      render: formatVND,
    },
    {
      title: 'Chi phí thực',
      width: 140,
      align: 'right',
      render: (_, r) => {
        const tongChi = hook.tinhTongChi(r);
        const vuot = tongChi > r.nganSachDuKien;
        return (
          <Typography.Text type={vuot ? 'danger' : undefined} strong={vuot}>
            {vuot && <WarningOutlined style={{ marginRight: 4 }} />}
            {formatVND(tongChi)}
          </Typography.Text>
        );
      },
    },
    {
      title: 'Trạng thái',
      width: 120,
      align: 'center',
      render: (_, r) => {
        const tongChi = hook.tinhTongChi(r);
        return tongChi > r.nganSachDuKien ? (
          <Tag color="red">Vượt ngân sách</Tag>
        ) : (
          <Tag color="green">Trong ngân sách</Tag>
        );
      },
    },
    {
      title: 'Thao tác',
      width: 150,
      align: 'center',
      render: (_, r) => (
        <Space>
          <Button type="text" icon={<WalletOutlined />} onClick={() => onViewNganSach(r.id)} />
          <Button type="text" icon={<EditOutlined />} onClick={() => hook.openEdit(r)} />
          <Popconfirm title="Xác nhận xóa?" onConfirm={() => hook.handleDelete(r.id)} okText="Xóa" cancelText="Hủy">
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card
      title="Quản lý lịch trình"
      extra={
        <Space>
          <Input
            placeholder="Tìm kiếm..."
            prefix={<SearchOutlined />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            allowClear
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={hook.openAdd}>
            Tạo lịch trình
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
      <LichTrinhModal
        open={hook.modalOpen}
        editing={!!hook.editing}
        form={hook.form}
        ngayItems={hook.ngayItems}
        diemDens={hook.diemDens}
        onOk={hook.handleOk}
        onCancel={() => hook.setModalOpen(false)}
        onAddNgay={hook.addNgay}
        onRemoveNgay={hook.removeNgay}
        onUpdateDiemDen={hook.updateDiemDen}
      />
    </Card>
  );
}
