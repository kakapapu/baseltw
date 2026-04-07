import { Card, Row, Col, Statistic } from 'antd';
import {
  EnvironmentOutlined,
  ScheduleOutlined,
  DollarOutlined,
  CoffeeOutlined,
  HomeOutlined,
  CarOutlined,
} from '@ant-design/icons';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import { DiemDen, LichTrinh } from '../../types';
import { load, KEYS } from '../../data';
import dayjs from 'dayjs';

export default function ThongKePage() {
  const diemDens = load<DiemDen[]>(KEYS.DIEM_DEN, []);
  const lichTrinhs = load<LichTrinh[]>(KEYS.LICH_TRINH, []);

  const tongNganSach = lichTrinhs.reduce((s, lt) => s + lt.nganSachDuKien, 0);

  const allDiemDenIds = lichTrinhs.flatMap((lt) => lt.ngayItems.flatMap((n) => n.diemDenIds));
  const diemDenCount: Record<string, number> = {};
  allDiemDenIds.forEach((id) => {
    diemDenCount[id] = (diemDenCount[id] || 0) + 1;
  });

  let tongAnUong = 0;
  let tongLuuTru = 0;
  let tongDiChuyen = 0;
  allDiemDenIds.forEach((id) => {
    const dd = diemDens.find((d) => d.id === id);
    if (dd) {
      tongAnUong += dd.chiPhiAnUong;
      tongLuuTru += dd.chiPhiLuuTru;
      tongDiChuyen += dd.chiPhiDiChuyen;
    }
  });

  const thangMap: Record<string, number> = {};
  lichTrinhs.forEach((lt) => {
    const m = dayjs(lt.ngayTao).format('MM/YYYY');
    thangMap[m] = (thangMap[m] || 0) + 1;
  });
  const thangLabels = Object.keys(thangMap).sort();
  const thangData = thangLabels.map((m) => thangMap[m]);

  const barOptions: ApexOptions = {
    chart: { type: 'bar' },
    xaxis: { categories: thangLabels },
    plotOptions: { bar: { columnWidth: '50%' } },
    dataLabels: { enabled: false },
    colors: ['#1890ff'],
  };

  const barSeries = [{ name: 'Số lịch trình', data: thangData }];

  const topDiemDen = Object.entries(diemDenCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  const topLabels = topDiemDen.map(([id]) => diemDens.find((d) => d.id === id)?.ten || id);
  const topData = topDiemDen.map(([, count]) => count);

  const pieOptions: ApexOptions = {
    chart: { type: 'donut' },
    labels: topLabels,
    colors: ['#1890ff', '#52c41a', '#faad14', '#f5222d', '#722ed1'],
  };

  const hangMucOptions: ApexOptions = {
    chart: { type: 'donut' },
    labels: ['Ăn uống', 'Lưu trú', 'Di chuyển'],
    colors: ['#faad14', '#1890ff', '#52c41a'],
  };

  return (
    <>
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={12} sm={8} md={4}>
          <Card>
            <Statistic title="Điểm đến" value={diemDens.length} prefix={<EnvironmentOutlined />} />
          </Card>
        </Col>
        <Col xs={12} sm={8} md={4}>
          <Card>
            <Statistic title="Lịch trình" value={lichTrinhs.length} prefix={<ScheduleOutlined />} />
          </Card>
        </Col>
        <Col xs={12} sm={8} md={4}>
          <Card>
            <Statistic title="Tổng ngân sách" value={tongNganSach} prefix={<DollarOutlined />} suffix="đ" />
          </Card>
        </Col>
        <Col xs={12} sm={8} md={4}>
          <Card>
            <Statistic title="Ăn uống" value={tongAnUong} prefix={<CoffeeOutlined />} valueStyle={{ color: '#faad14' }} suffix="đ" />
          </Card>
        </Col>
        <Col xs={12} sm={8} md={4}>
          <Card>
            <Statistic title="Lưu trú" value={tongLuuTru} prefix={<HomeOutlined />} valueStyle={{ color: '#1890ff' }} suffix="đ" />
          </Card>
        </Col>
        <Col xs={12} sm={8} md={4}>
          <Card>
            <Statistic title="Di chuyển" value={tongDiChuyen} prefix={<CarOutlined />} valueStyle={{ color: '#52c41a' }} suffix="đ" />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card title="Lịch trình theo tháng">
            {thangLabels.length > 0 ? (
              <Chart options={barOptions} series={barSeries} type="bar" height={300} />
            ) : (
              <p>Chưa có dữ liệu</p>
            )}
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Điểm đến phổ biến">
            {topData.length > 0 ? (
              <Chart options={pieOptions} series={topData} type="donut" height={300} />
            ) : (
              <p>Chưa có dữ liệu</p>
            )}
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} md={12}>
          <Card title="Chi phí theo hạng mục">
            {tongAnUong + tongLuuTru + tongDiChuyen > 0 ? (
              <Chart options={hangMucOptions} series={[tongAnUong, tongLuuTru, tongDiChuyen]} type="donut" height={300} />
            ) : (
              <p>Chưa có dữ liệu</p>
            )}
          </Card>
        </Col>
      </Row>
    </>
  );
}
