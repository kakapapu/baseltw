
import { useState } from "react";
import { ConfigProvider, Layout, Menu, Typography } from "antd";
import viVN from "antd/es/locale/vi_VN";
import {
  BookOutlined,
  FileProtectOutlined,
  SettingOutlined,
  SolutionOutlined,
  SearchOutlined,
} from "@ant-design/icons";

import RegistryBookPage from "./pages/RegistryBook";
import DecisionPage from "./pages/Decision";
import FormConfigPage from "./pages/FormConfig";
import DiplomaPage from "./pages/Diploma";
import SearchPage from "./pages/Search";

const { Sider, Content } = Layout;

const menuItems = [
  { key: "books",     icon: <BookOutlined />,          label: "Sổ Văn bằng" },
  { key: "decisions", icon: <FileProtectOutlined />,   label: "Quyết định TN" },
  { key: "config",    icon: <SettingOutlined />,       label: "Cấu hình Biểu mẫu" },
  { key: "diplomas",  icon: <SolutionOutlined />,      label: "Thông tin Văn bằng" },
  { key: "search",    icon: <SearchOutlined />,        label: "Tra cứu Văn bằng" },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState("books");

  const renderPage = () => {
    switch (currentPage) {
      case "books":     return <RegistryBookPage />;
      case "decisions": return <DecisionPage />;
      case "config":    return <FormConfigPage />;
      case "diplomas":  return <DiplomaPage />;
      case "search":    return <SearchPage />;
      default:          return <RegistryBookPage />;
    }
  };

  return (

    <ConfigProvider locale={viVN}>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          width={240}
          breakpoint="lg"
          collapsedWidth={60}
          style={{ background: "#4cb8df" }}
        >
          <Typography.Text
            strong
            style={{
              display: "block",
              padding: "20px 16px",
              textAlign: "center",
              color: "#fff",
              fontSize: 17,
              whiteSpace: "nowrap",
              overflow: "hidden",
              borderBottom: "1px solid rgba(32, 34, 35, 0.1)",
            }}
          >
            Quản lý Văn bằng
          </Typography.Text>

          <Menu
            theme="#485357"
            mode="inline"
            selectedKeys={[currentPage]}
            items={menuItems}
            onClick={({ key }) => setCurrentPage(key)}
            style={{ marginTop: 8 }}
          />
        </Sider>

        <Content
          style={{
            padding: 24,
            background: "#f0f2f5",
            overflow: "auto",
          }}
        >
          {renderPage()}
        </Content>
      </Layout>
    </ConfigProvider>
  );
}
