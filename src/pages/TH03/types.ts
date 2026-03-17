export interface Employee {
  id: number;
  name: string;
  phone: string;
  maxCustomers: number;
  workDays: string[];
  workHours: { start: string; end: string };
}

export interface Service {
  id: number;
  name: string;
  price: number;
  duration: number; // phút
}

export interface Appointment {
  id: number;
  customerName: string;
  customerPhone: string;
  employeeId: number;
  serviceId: number;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

export interface Review {
  id: number;
  appointmentId: number;
  rating: number;
  comment: string;
  reply?: string;
}