import { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic, Select, Alert, Typography, Table, Tag } from 'antd';
import {
  WalletOutlined,
  CoffeeOutlined,
  HomeOutlined,
  CarOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import type { ColumnsType } from 'antd/es/table';
import { DiemDen, LichTrinh } from '../../types';
import { load, KEYS } from '../../data';

interface Props {
  initialLichTrinhId?: string;
}

export default function NganSachPage({ initialLichTrinhId }: Props) {
  const lichTrinhs = load<LichTrinh[]>(KEYS.LICH_TRINH, []);
  const diemDens = load<DiemDen[]>(KEYS.DIEM_DEN, []);
  const [selectedId, setSelectedId] = useState<string | undefined>(initialLichTrinhId);

  useEffect(() => {
    setSelectedId(initialLichTrinhId);
  }, [initialLichTrinhId]);

  const lt = lichTrinhs.find((l) => l.id === selectedId);

  let tongAnUong = 0;
  let tongLuuTru = 0;
  let tongDiChuyen = 0;

  interface ChiTietRow {
    key: string;
    ngay: number;
    diemDen: string;
    anUong: number;
    luuTru: number;
    diChuyen: number;
    tong: number;
  }

  const chiTietRows: ChiTietRow[] = [];

  if (lt) {
    lt.ngayItems.forEach((n) => {
      n.diemDenIds.forEach((id) => {
        const dd = diemDens.find((d) => d.id === id);
        if (dd) {
          tongAnUong += dd.chiPhiAnUong;
          tongLuuTru += dd.chiPhiLuuTru;
          tongDiChuyen += dd.chiPhiDiChuyen;
          chiTietRows.push({
            key: `${n.ngay}-${id}`,
            ngay: n.ngay,
            diemDen: dd.ten,
            anUong: dd.chiPhiAnUong,
            luuTru: dd.chiPhiLuuTru,
            diChuyen: dd.chiPhiDiChuyen,
            tong: dd.chiPhiAnUong + dd.chiPhiLuuTru + dd.chiPhiDiChuyen,
          });
        }
      });
    });
  }

  const tongChi = tongAnUong + tongLuuTru + tongDiChuyen;
  const vuotNganSach = lt ? tongChi > lt.nganSachDuKien : false;
  const conLai = lt ? lt.nganSachDuKien - tongChi : 0;

  const formatVND = (v: number) => v?.toLocaleString('vi-VN') + ' đ';

  const donutOptions: ApexOptions = {
    chart: { type: 'donut' },
    labels: ['Ăn uống', 'Lưu trú', 'Di chuyển'],
    colors: ['#faad14', '#1890ff', '#52c41a'],
  };

  const columns: ColumnsType<ChiTietRow> = [
    { title: 'Ngày', dataIndex: 'ngay', width: 70, align: 'center', render: (v: number) => `Ngày ${v}` },
    { title: 'Điểm đến', dataIndex: 'diemDen' },
    { title: 'Ăn uống', dataIndex: 'anUong', width: 120, align: 'right', render: formatVND },
    { title: 'Lưu trú', dataIndex: 'luuTru', width: 120, align: 'right', render: formatVND },
    { title: 'Di chuyển', dataIndex: 'diChuyen', width: 120, align: 'right', render: formatVND },
    { title: 'Tổng', dataIndex: 'tong', width: 130, align: 'right', render: (v: number) => <Typography.Text strong>{formatVND(v)}</Typography.Text> },
  ];

  return (
    <>
      <Card style={{ marginBottom: 16 }}>
        <Select
          style={{ width: 300 }}
          placeholder="Chọn lịch trình"
          allowClear
          value={selectedId}
          onChange={setSelectedId}
          options={lichTrinhs.map((l) => ({ value: l.id, label: l.ten }))}
        />
      </Card>

      {!lt ? (
        <Card><Typography.Text>Chọn một lịch trình để xem ngân sách</Typography.Text></Card>
      ) : (
        <>
          {vuotNganSach && (
            <Alert
              message="Vượt ngân sách!"
              description={`Chi phí thực tế (${formatVND(tongChi)}) đã vượt ngân sách dự kiến (${formatVND(lt.nganSachDuKien)}) là ${formatVND(tongChi - lt.nganSachDuKien)}`}
              type="error"
              showIcon
              icon={<WarningOutlined />}
              style={{ marginBottom: 16 }}
            />
          )}

          <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
            <Col xs={12} sm={6}>
              <Card>
                <Statistic title="Ngân sách" value={lt.nganSachDuKien} prefix={<WalletOutlined />} suffix="đ" />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card>
                <Statistic title="Ăn uống" value={tongAnUong} prefix={<CoffeeOutlined />} valueStyle={{ color: '#faad14' }} suffix="đ" />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card>
                <Statistic title="Lưu trú" value={tongLuuTru} prefix={<HomeOutlined />} valueStyle={{ color: '#1890ff' }} suffix="đ" />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card>
                <Statistic title="Di chuyển" value={tongDiChuyen} prefix={<CarOutlined />} valueStyle={{ color: '#52c41a' }} suffix="đ" />
              </Card>
            </Col>
          </Row>

          <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
            <Col xs={24} sm={8}>
              <Card>
                <Statistic
                  title="Tổng chi"
                  value={tongChi}
                  valueStyle={{ color: vuotNganSach ? '#f5222d' : '#52c41a' }}
                  suffix="đ"
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card>
                <Statistic
                  title="Còn lại"
                  value={conLai}
                  valueStyle={{ color: conLai < 0 ? '#f5222d' : '#52c41a' }}
                  suffix="đ"
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card>
                {tongChi > 0 ? (
                  <Chart options={donutOptions} series={[tongAnUong, tongLuuTru, tongDiChuyen]} type="donut" height={200} />
                ) : (
                  <Typography.Text>Chưa có chi phí</Typography.Text>
                )}
              </Card>
            </Col>
          </Row>

          <Card title="Chi tiết ngân sách">
            <Table
              dataSource={chiTietRows}
              columns={columns}
              pagination={false}
              scroll={{ x: 700 }}
              summary={() => (
                <Table.Summary fixed>
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0} colSpan={2}><Typography.Text strong>Tổng cộng</Typography.Text></Table.Summary.Cell>
                    <Table.Summary.Cell index={2} align="right"><Typography.Text strong>{formatVND(tongAnUong)}</Typography.Text></Table.Summary.Cell>
                    <Table.Summary.Cell index={3} align="right"><Typography.Text strong>{formatVND(tongLuuTru)}</Typography.Text></Table.Summary.Cell>
                    <Table.Summary.Cell index={4} align="right"><Typography.Text strong>{formatVND(tongDiChuyen)}</Typography.Text></Table.Summary.Cell>
                    <Table.Summary.Cell index={5} align="right">
                      <Tag color={vuotNganSach ? 'red' : 'green'}>{formatVND(tongChi)}</Tag>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </Table.Summary>
              )}
            />
          </Card>
        </>
      )}
    </>
  );
}
