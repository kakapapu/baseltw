
import { Card, Table, Button } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { Diploma } from "../../types";
import { useSearch } from "./useSearch";
import SearchForm from "./SearchForm";
import StatsPanel from "./StatsPanel";
import DiplomaDetail from "../../components/Detail";

export default function SearchPage() {
    const {
        results, viewing, detailOpen, setDetailOpen, form, refreshKey,
        handleSearch, handleReset, openDetail,
    } = useSearch();

    const resultColumns: ColumnsType<Diploma> = [
        { title: "Số hiệu VB", dataIndex: "diplomaNumber", width: 140 },
        { title: "MSV", dataIndex: "studentId", width: 120 },
        { title: "Họ tên", dataIndex: "fullName" },
        {
            title: "Ngày sinh",
            dataIndex: "dateOfBirth",
            width: 120,
            render: (d: string) => dayjs(d).format("DD/MM/YYYY"),
        },
        {
            title: "Số vào sổ",
            dataIndex: "entryNumber",
            width: 100,
            align: "center",
        },
        {
            title: "Chi tiết",
            width: 100,
            align: "center",
            render: (_v, record) => (
                <Button
                    type="link"
                    icon={<EyeOutlined />}
                    onClick={() => openDetail(record)}
                >
                    Xem
                </Button>
            ),
        },
    ];

    return (
        <>
            <SearchForm form={form} onSearch={handleSearch} onReset={handleReset} />

            {results !== null && (
                <Card
                    title={`Kết quả tìm kiếm (${results.length} văn bằng)`}
                    style={{ marginTop: 16 }}
                >
                    <Table
                        dataSource={results}
                        columns={resultColumns}
                        rowKey="id"
                        pagination={{ pageSize: 10 }}
                        locale={{ emptyText: "Không tìm thấy kết quả" }}
                    />
                </Card>
            )}

            <StatsPanel refreshKey={refreshKey} />

            <DiplomaDetail
                diploma={viewing}
                open={detailOpen}
                onClose={() => setDetailOpen(false)}
                showDecisionInfo
            />
        </>
    );
}
