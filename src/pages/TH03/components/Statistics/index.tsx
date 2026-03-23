import { useState, useMemo } from 'react';
import { Card, Row, Col, Table, DatePicker, Statistic, Select } from 'antd';
import { Appointment, Employee, Service, Review } from '../../types';
import moment from 'moment';

interface Props {
  appointments: Appointment[];
  employees: Employee[];
  services: Service[];
  reviews: Review[];
}

export default ({ appointments, employees, services, reviews }: Props) => {
  const [month, setMonth] = useState(moment());
  const [viewType, setViewType] = useState<'day' | 'month'>('month');

  const filteredApts = useMemo(() => {
    return appointments.filter(a => {
      if (viewType === 'month') return moment(a.date).format('YYYY-MM') === month.format('YYYY-MM');
      return a.date === month.format('YYYY-MM-DD');
    });
  }, [appointments, month, viewType]);

  const stats = useMemo(() => {
    const total = filteredApts.length;
    const completed = filteredApts.filter(a => a.status === 'completed').length;
    const cancelled = filteredApts.filter(a => a.status === 'cancelled').length;
    const revenue = filteredApts.filter(a => a.status === 'completed').reduce((sum, a) => {
      const svc = services.find(s => s.id === a.serviceId);
      return sum + (svc?.price || 0);
    }, 0);
    return { total, completed, cancelled, revenue };
  }, [filteredApts, services]);

  const employeeStats = useMemo(() => {
    return employees.map(emp => {
      const apts = filteredApts.filter(a => a.employeeId === emp.id && a.status === 'completed');
      const revenue = apts.reduce((sum, a) => sum + (services.find(s => s.id === a.serviceId)?.price || 0), 0);
      const empReviews = reviews.filter(r => {
        const apt = appointments.find(a => a.id === r.appointmentId);
        return apt?.employeeId === emp.id;
      });
      const avgRating = empReviews.length ? (empReviews.reduce((s, r) => s + r.rating, 0) / empReviews.length).toFixed(1) : '-';
      return { ...emp, appointments: apts.length, revenue, avgRating };
    });
  }, [employees, filteredApts, services, reviews, appointments]);

  const serviceStats = useMemo(() => {
    return services.map(svc => {
      const apts = filteredApts.filter(a => a.serviceId === svc.id && a.status === 'completed');
      return { ...svc, count: apts.length, revenue: apts.length * svc.price };
    });
  }, [services, filteredApts]);

  return (
    <div>
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col>
          <Select value={viewType} onChange={setViewType} style={{ width: 120 }}>
            <Select.Option value="day">Theo ngày</Select.Option>
            <Select.Option value="month">Theo tháng</Select.Option>
          </Select>
        </Col>
        <Col>
          <DatePicker picker={viewType === 'month' ? 'month' : 'date'} value={month} onChange={v => v && setMonth(v)} />
        </Col>
      </Row>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}><Card><Statistic title="Tổng lịch hẹn" value={stats.total} /></Card></Col>
        <Col span={6}><Card><Statistic title="Hoàn thành" value={stats.completed} valueStyle={{ color: '#3f8600' }} /></Card></Col>
        <Col span={6}><Card><Statistic title="Đã hủy" value={stats.cancelled} valueStyle={{ color: '#cf1322' }} /></Card></Col>
        <Col span={6}><Card><Statistic title="Doanh thu" value={stats.revenue} suffix="đ" /></Card></Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Card title="Thống kê theo nhân viên">
            <Table rowKey="id" dataSource={employeeStats} pagination={false} size="small" columns={[
              { title: 'Nhân viên', dataIndex: 'name' },
              { title: 'Số lịch', dataIndex: 'appointments', align: 'center' },
              { title: 'Doanh thu', dataIndex: 'revenue', render: v => v.toLocaleString() + 'đ' },
              { title: 'Đánh giá TB', dataIndex: 'avgRating', align: 'center' },
            ]} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Thống kê theo dịch vụ">
            <Table rowKey="id" dataSource={serviceStats} pagination={false} size="small" columns={[
              { title: 'Dịch vụ', dataIndex: 'name' },
              { title: 'Số lượt', dataIndex: 'count', align: 'center' },
              { title: 'Doanh thu', dataIndex: 'revenue', render: v => v.toLocaleString() + 'đ' },
            ]} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};