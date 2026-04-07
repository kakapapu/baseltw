export interface DiemDen {
  id: string;
  ten: string;
  moTa: string;
  hinhAnh: string;
  loaiHinh: 'Biển' | 'Núi' | 'Thành phố';
  rating: number;
  thoiGianThamQuan: number;
  chiPhiAnUong: number;
  chiPhiLuuTru: number;
  chiPhiDiChuyen: number;
}

export interface LichTrinh {
  id: string;
  ten: string;
  ngayTao: string;
  nganSachDuKien: number;
  ngayItems: NgayItem[];
}

export interface NgayItem {
  ngay: number;
  diemDenIds: string[];
}

export interface ThongKe {
  thang: string;
  soLichTrinh: number;
}
