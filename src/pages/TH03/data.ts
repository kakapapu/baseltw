import { Employee, Service, Appointment, Review } from './types';

export const initEmployees: Employee[] = [
  { id: 1, name: 'Nguyễn Văn A', phone: '0901234567', maxCustomers: 8, workDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], workHours: { start: '09:00', end: '17:00' } },
  { id: 2, name: 'Trần Thị B', phone: '0912345678', maxCustomers: 6, workDays: ['Mon', 'Wed', 'Fri', 'Sat'], workHours: { start: '10:00', end: '18:00' } },
  { id: 3, name: 'Lê Văn C', phone: '0923456789', maxCustomers: 10, workDays: ['Tue', 'Thu', 'Sat', 'Sun'], workHours: { start: '08:00', end: '16:00' } },
];

export const initServices: Service[] = [
  { id: 1, name: 'Cắt tóc nam', price: 100000, duration: 30 },
  { id: 2, name: 'Cắt tóc nữ', price: 150000, duration: 45 },
  { id: 3, name: 'Nhuộm tóc', price: 300000, duration: 90 },
  { id: 4, name: 'Uốn tóc', price: 400000, duration: 120 },
  { id: 5, name: 'Massage đầu', price: 80000, duration: 20 },
];

export const initAppointments: Appointment[] = [
  { id: 1, customerName: 'Khách 1', customerPhone: '0901111111', employeeId: 1, serviceId: 1, date: '2025-01-20', time: '09:00', status: 'completed' },
  { id: 2, customerName: 'Khách 2', customerPhone: '0902222222', employeeId: 2, serviceId: 3, date: '2025-01-20', time: '10:00', status: 'confirmed' },
  { id: 3, customerName: 'Khách 3', customerPhone: '0903333333', employeeId: 1, serviceId: 2, date: '2025-01-21', time: '14:00', status: 'pending' },
];

export const initReviews: Review[] = [
  { id: 1, appointmentId: 1, rating: 5, comment: 'Dịch vụ tuyệt vời!', reply: 'Cảm ơn quý khách!' },
];