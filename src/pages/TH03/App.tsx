import { useState } from 'react';
import { Tabs } from 'antd';
import { Employee, Service, Appointment, Review } from './types';
import { initEmployees, initServices, initAppointments, initReviews } from './data';
import EmployeeTab from './components/Employee';
import ServiceTab from './components/Service';
import AppointmentTab from './components/Appointment';
import ReviewTab from './components/Review';
import Statistics from './components/Statistics';

export default () => {
  const [employees, setEmployees] = useState<Employee[]>(initEmployees);
  const [services, setServices] = useState<Service[]>(initServices);
  const [appointments, setAppointments] = useState<Appointment[]>(initAppointments);
  const [reviews, setReviews] = useState<Review[]>(initReviews);

  return (
    <div style={{ padding: 20, maxWidth: 1400, margin: '0 auto' }}>
      <h1>🗓️ Hệ thống Đặt Lịch Hẹn</h1>
      <Tabs>
        <Tabs.TabPane key="1" tab="👤 Nhân viên">
          <EmployeeTab data={employees} setData={setEmployees} />
        </Tabs.TabPane>
        <Tabs.TabPane key="2" tab="💼 Dịch vụ">
          <ServiceTab data={services} setData={setServices} />
        </Tabs.TabPane>
        <Tabs.TabPane key="3" tab="📅 Lịch hẹn">
          <AppointmentTab data={appointments} setData={setAppointments} employees={employees} services={services} />
        </Tabs.TabPane>
        <Tabs.TabPane key="4" tab="⭐ Đánh giá">
          <ReviewTab data={reviews} setData={setReviews} appointments={appointments} employees={employees} services={services} />
        </Tabs.TabPane>
        <Tabs.TabPane key="5" tab="📊 Thống kê">
          <Statistics appointments={appointments} employees={employees} services={services} reviews={reviews} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};