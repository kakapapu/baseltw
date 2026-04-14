import React from 'react';
import { Table, Button, Popconfirm, Tag, Space } from 'antd';
import { State, Khoahoc } from '../types';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

interface Props {
    data: Khoahoc[];
    Edit: (record: Khoahoc) => void;
    Delete: (record: Khoahoc) => void;
}

const Course: React.FC<Props> = ({ data, Edit, Delete }) => {
    const col = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Tên khóa học',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Giảng viên',
            dataIndex: 'giangvien',
            key: 'giangvien',
        },
        {
            title: 'Số học sinh',
            dataIndex: 'sohocsinh',
            key: 'sohocsinh',
            sorter: (a: Khoahoc, b: Khoahoc) => a.sohocsinh - b.sohocsinh,
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
            render: (html: string) => <div dangerouslySetInnerHTML={{ __html: html || '' }} />,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'state',
            key: 'state',
            render: (s: State) => {
                const color = s === State.Open ? 'green' : s === State.Close ? 'red' : 'orange';
                return <Tag color={color}>{s}</Tag>;
            },
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_: unknown, record: Khoahoc) => (
                <Space>
                    <Button icon={<EditOutlined />} onClick={() => Edit(record)} size="small">
                        Sửa
                    </Button>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa?"
                        onConfirm={() => Delete(record)}
                        okText="Xóa"
                        cancelText="Hủy"
                    >
                        <Button icon={<DeleteOutlined />} danger size="small">
                            Xóa
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];
    return <Table columns={col} dataSource={data} rowKey="id" bordered pagination={{ pageSize: 5 }} />;
};

export default Course;