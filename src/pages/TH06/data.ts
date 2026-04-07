export const KEYS = {
  DIEM_DEN: 'th06_diem_den',
  LICH_TRINH: 'th06_lich_trinh',
} as const;

export function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function save(key: string, data: unknown): void {
  localStorage.setItem(key, JSON.stringify(data));
}

export const SAMPLE_DIEM_DEN = [
  {
    id: '1',
    ten: 'Vịnh Hạ Long',
    moTa: 'Di sản thiên nhiên thế giới với hàng nghìn đảo đá vôi',
    hinhAnh: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=400',
    loaiHinh: 'Biển' as const,
    rating: 4.8,
    thoiGianThamQuan: 3,
    chiPhiAnUong: 500000,
    chiPhiLuuTru: 800000,
    chiPhiDiChuyen: 300000,
  },
  {
    id: '2',
    ten: 'Sapa',
    moTa: 'Thị trấn trên mây với ruộng bậc thang tuyệt đẹp',
    hinhAnh: 'https://images.unsplash.com/photo-1570366583862-f91883984fde?w=400',
    loaiHinh: 'Núi' as const,
    rating: 4.6,
    thoiGianThamQuan: 4,
    chiPhiAnUong: 400000,
    chiPhiLuuTru: 600000,
    chiPhiDiChuyen: 500000,
  },
  {
    id: '3',
    ten: 'Hồ Chí Minh City',
    moTa: 'Thành phố năng động nhất Việt Nam',
    hinhAnh: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400',
    loaiHinh: 'Thành phố' as const,
    rating: 4.5,
    thoiGianThamQuan: 2,
    chiPhiAnUong: 600000,
    chiPhiLuuTru: 700000,
    chiPhiDiChuyen: 200000,
  },
  {
    id: '4',
    ten: 'Đà Nẵng',
    moTa: 'Thành phố biển xinh đẹp miền Trung',
    hinhAnh: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=400',
    loaiHinh: 'Biển' as const,
    rating: 4.7,
    thoiGianThamQuan: 3,
    chiPhiAnUong: 450000,
    chiPhiLuuTru: 650000,
    chiPhiDiChuyen: 350000,
  },
  {
    id: '5',
    ten: 'Đà Lạt',
    moTa: 'Thành phố ngàn hoa trên cao nguyên',
    hinhAnh: 'https://images.unsplash.com/photo-1555921015-5532091f6026?w=400',
    loaiHinh: 'Núi' as const,
    rating: 4.6,
    thoiGianThamQuan: 3,
    chiPhiAnUong: 350000,
    chiPhiLuuTru: 500000,
    chiPhiDiChuyen: 400000,
  },
  {
    id: '6',
    ten: 'Hà Nội',
    moTa: 'Thủ đô nghìn năm văn hiến',
    hinhAnh: 'https://images.unsplash.com/photo-1509030450996-dd1a26dda07a?w=400',
    loaiHinh: 'Thành phố' as const,
    rating: 4.4,
    thoiGianThamQuan: 2,
    chiPhiAnUong: 500000,
    chiPhiLuuTru: 600000,
    chiPhiDiChuyen: 250000,
  },
];
