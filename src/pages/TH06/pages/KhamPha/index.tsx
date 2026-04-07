import { useState } from 'react';
import { Card, Row, Col, Rate, Tag, Select, Input, Empty } from 'antd';
import { EnvironmentOutlined, SearchOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { DiemDen } from '../../types';
import { load, KEYS, SAMPLE_DIEM_DEN, save } from '../../data';

export default function KhamPhaPage() {
    const [diemDens] = useState<DiemDen[]>(() => {
        const saved = load<DiemDen[]>(KEYS.DIEM_DEN, []);
        if (saved.length === 0) {
            save(KEYS.DIEM_DEN, SAMPLE_DIEM_DEN);
            return SAMPLE_DIEM_DEN;
        }
        return saved;
    });
    const [search, setSearch] = useState('');
    const [filterLoai, setFilterLoai] = useState<string | undefined>();
    const [sortBy, setSortBy] = useState<string>('rating');

    const loaiHinhColor = (loai: string) =>
        loai === 'Biển' ? 'blue' : loai === 'Núi' ? 'green' : 'orange';

    let filtered = diemDens.filter((d) => {
        const matchSearch = d.ten.toLowerCase().includes(search.toLowerCase());
        const matchLoai = !filterLoai || d.loaiHinh === filterLoai;
        return matchSearch && matchLoai;
    });

    filtered = [...filtered].sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'giaTang') return (a.chiPhiAnUong + a.chiPhiLuuTru + a.chiPhiDiChuyen) - (b.chiPhiAnUong + b.chiPhiLuuTru + b.chiPhiDiChuyen);
        if (sortBy === 'giaGiam') return (b.chiPhiAnUong + b.chiPhiLuuTru + b.chiPhiDiChuyen) - (a.chiPhiAnUong + a.chiPhiLuuTru + a.chiPhiDiChuyen);
        return 0;
    });

    const formatVND = (v: number) => v?.toLocaleString('vi-VN') + ' đ';

    return (
        <>
            <Card style={{ marginBottom: 16 }}>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={8}>
                        <Input
                            placeholder="Tìm điểm đến..."
                            prefix={<SearchOutlined />}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            allowClear
                        />
                    </Col>
                    <Col xs={12} sm={8}>
                        <Select
                            style={{ width: '100%' }}
                            placeholder="Loại hình"
                            allowClear
                            value={filterLoai}
                            onChange={setFilterLoai}
                            options={[
                                { value: 'Biển', label: 'Biển' },
                                { value: 'Núi', label: 'Núi' },
                                { value: 'Thành phố', label: 'Thành phố' },
                            ]}
                        />
                    </Col>
                    <Col xs={12} sm={8}>
                        <Select
                            style={{ width: '100%' }}
                            value={sortBy}
                            onChange={setSortBy}
                            options={[
                                { value: 'rating', label: 'Rating cao nhất' },
                                { value: 'giaTang', label: 'Giá tăng dần' },
                                { value: 'giaGiam', label: 'Giá giảm dần' },
                            ]}
                        />
                    </Col>
                </Row>
            </Card>

            {filtered.length === 0 ? (
                <Empty description="Không tìm thấy điểm đến" />
            ) : (
                <Row gutter={[16, 16]}>
                    {filtered.map((dd) => (
                        <Col key={dd.id} xs={24} sm={12} md={8} lg={6}>
                            <Card
                                hoverable
                                cover={
                                    <img
                                        alt={dd.ten}
                                        src={dd.hinhAnh}
                                        style={{ height: 180, objectFit: 'cover' }}
                                        onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x180?text=No+Image'; }}
                                    />
                                }
                            >
                                <Card.Meta
                                    title={
                                        <span>
                                            <EnvironmentOutlined style={{ marginRight: 4 }} />
                                            {dd.ten}
                                        </span>
                                    }
                                    description={dd.moTa}
                                />
                                <div style={{ marginTop: 12 }}>
                                    <Tag color={loaiHinhColor(dd.loaiHinh)}>{dd.loaiHinh}</Tag>
                                    <Rate disabled value={dd.rating} allowHalf style={{ fontSize: 14 }} />
                                </div>
                                <div style={{ marginTop: 8 }}>
                                    <ClockCircleOutlined /> {dd.thoiGianThamQuan}h
                                </div>
                                <div style={{ marginTop: 4, fontWeight: 'bold', color: '#f5222d' }}>
                                    Tổng: {formatVND(dd.chiPhiAnUong + dd.chiPhiLuuTru + dd.chiPhiDiChuyen)}
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </>
    );
}
