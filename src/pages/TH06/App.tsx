import { useState } from 'react';
import { ConfigProvider, Layout, Menu, Typography } from 'antd';
import viVN from 'antd/es/locale/vi_VN';
import {
    CompassOutlined,
    ScheduleOutlined,
    WalletOutlined,
    EnvironmentOutlined,
    BarChartOutlined,
} from '@ant-design/icons';
import KhamPhaPage from './pages/KhamPha';
import LichTrinhPage from './pages/LichTrinh';
import NganSachPage from './pages/NganSach';
import QuanLyDiemDenPage from './pages/QuanLyDiemDen';
import ThongKePage from './pages/ThongKe';

const { Sider, Content } = Layout;

const menuItems = [
    { key: 'khampha', icon: <CompassOutlined />, label: 'Khám phá' },
    { key: 'lichtrinh', icon: <ScheduleOutlined />, label: 'Lịch trình' },
    { key: 'ngansach', icon: <WalletOutlined />, label: 'Ngân sách' },
    { key: 'quanlydden', icon: <EnvironmentOutlined />, label: 'Quản lý điểm đến' },
    { key: 'thongke', icon: <BarChartOutlined />, label: 'Thống kê' },
];

export default function App() {
    const [currentPage, setCurrentPage] = useState('khampha');
    const [selectedLichTrinhId, setSelectedLichTrinhId] = useState<string | undefined>();

    const goToNganSach = (lichTrinhId: string) => {
        setSelectedLichTrinhId(lichTrinhId);
        setCurrentPage('ngansach');
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'khampha':
                return <KhamPhaPage />;
            case 'lichtrinh':
                return <LichTrinhPage onViewNganSach={goToNganSach} />;
            case 'ngansach':
                return <NganSachPage initialLichTrinhId={selectedLichTrinhId} />;
            case 'quanlydden':
                return <QuanLyDiemDenPage />;
            case 'thongke':
                return <ThongKePage />;
            default:
                return <KhamPhaPage />;
        }
    };

    return (
        <ConfigProvider locale={viVN}>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider width={220} breakpoint="lg" collapsedWidth={60} style={{ background: '#001529' }}>
                    <Typography.Text
                        strong
                        style={{
                            display: 'block',
                            padding: '20px 16px',
                            textAlign: 'center',
                            color: '#fff',
                            fontSize: 16,
                            borderBottom: '1px solid rgba(255,255,255,0.1)',
                        }}
                    >
                        Du lịch Planner
                    </Typography.Text>
                    <Menu
                        theme="dark"
                        mode="inline"
                        selectedKeys={[currentPage]}
                        items={menuItems}
                        onClick={({ key }) => {
                            setCurrentPage(key);
                            if (key !== 'ngansach') setSelectedLichTrinhId(undefined);
                        }}
                    />
                </Sider>
                <Content style={{ padding: 24, background: '#f0f2f5', overflow: 'auto' }}>
                    {renderPage()}
                </Content>
            </Layout>
        </ConfigProvider>
    );
}
