import React from "react";
import { Input, Select, Button, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { State } from '../types';
import { List_GV } from '../data';

interface Props {
    search: string;
    setSearch: (value: string) => void;
    locGV: string;
    setLocGV: (value: string) => void;
    locState: State | undefined;
    setLocState: (value: State | undefined) => void;
    Add: () => void;
}

const Search: React.FC<Props> = ({ search, setSearch, locGV, setLocGV, locState, setLocState, Add }) => (
    <Space style={{ marginBottom: 16 }} wrap>
        <Input
            placeholder="Tìm kiếm khóa học"
            prefix={<SearchOutlined />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style = {{ width: 200 }}
        />

        <Select
            placeholder="Lọc theo giảng viên"
            value={locGV}
            onChange={setLocGV}
            style={{ width: 200 }}
        >
        {List_GV.map((gv) => (
            <Select.Option key={gv} value={gv}> {gv} </Select.Option>
        ))}
        </Select>
        
        <Select
            placeholder="Lọc theo trạng thái"
            value={locState}
            onChange={setLocState}
            style={{ width: 200 }}
        >
        {Object.values(State).map((state) => (
            <Select.Option key={state} value={state}> {state} </Select.Option>
        ))}
        </Select>
        
        <Button type="primary" onClick={Add}>
            Thêm khóa học
        </Button>
    </Space>  
);

export default Search;