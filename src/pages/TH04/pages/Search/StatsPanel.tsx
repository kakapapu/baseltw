

import { Card, Table, Statistic, Badge } from "antd";
import type { ColumnsType } from "antd/es/table";
import { GraduationDecision } from "../../types";
import { load, KEYS } from "../../data";

interface Props {
  refreshKey: number;
}

export default function StatsPanel({ refreshKey }: Props) {
 
  void refreshKey;

  const decisions = load<GraduationDecision[]>(KEYS.DECISIONS, []);
  const totalLookups = decisions.reduce((sum, d) => sum + d.lookupCount, 0);

  const columns: ColumnsType<GraduationDecision> = [
    { title: "Số QĐ", dataIndex: "decisionNumber", width: 140 },
    { title: "Trích yếu", dataIndex: "summary", ellipsis: true },
    {
      title: "Lượt tra cứu",
      dataIndex: "lookupCount",
      width: 130,
      align: "center",
      sorter: (a, b) => a.lookupCount - b.lookupCount,
      render: (count: number) => (
        <Badge
          count={count}
          showZero
          overflowCount={99999}
          style={{
            backgroundColor: count > 0 ? "#1677ff" : "#d9d9d9",
          }}
        />
      ),
    },
  ];

  return (
    <Card
      title=" Thống kê lượt tra cứu theo Quyết định"
      style={{ marginTop: 16 }}
    >
      <Statistic
        title="Tổng lượt tra cứu"
        value={totalLookups}
        style={{ marginBottom: 16 }}
      />
      <Table
        dataSource={decisions}
        columns={columns}
        rowKey="id"
        pagination={false}
        size="small"
        locale={{ emptyText: "Chưa có quyết định nào" }}
      />
    </Card>
  );
}
