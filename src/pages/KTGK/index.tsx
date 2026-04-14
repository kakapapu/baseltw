import React, {useState} from "react";
import { Form, message } from "antd";
import { Khoahoc, State } from "./types";
import { example } from "./data";
import Search from "./components/Search";
import Course from "./components/Course";
import KhoaHocModal from "./components/Modal";

const QuanLy: React.FC = () => {
    const [listkhoahoc, setlistkhoahoc] = useState<Khoahoc[]>(example);
    const [open, setopen] = useState(false);
    const [Edit, setEdit] = useState<Khoahoc | null>(null);
    const [form] = Form.useForm();
    const [search, setSearch] = useState("");
    const [locGV, setlocGV] = useState<string>("");
    const [locState, setlocState] = useState<State | undefined>(undefined);
    const data = listkhoahoc.filter(e => {
        const Ten = e.name.toLowerCase().includes(search.toLowerCase());
        const GV = locGV ? e.giangvien === locGV : true;
        const ST = locState ? e.state === locState : true;
        return Ten && GV && ST;
    });

    const mo = (rec?: Khoahoc) => {
        if (rec) {
            setEdit(rec);
            form.setFieldsValue(rec);
        } else {
            setEdit(null);
            form.resetFields();
        }
        setopen(true);
    };

    const save = () => {
        form.validateFields().then(values => {
            const tenMoi = (values.name || '').trim().toLowerCase();
            const dup = listkhoahoc.find(
                (kh) => kh.name.trim().toLowerCase() === tenMoi && kh.id !== Edit?.id
            );
            if (dup) {
                message.error("Tên khóa học đã tồn tại!");
                return;
            }
            if (Edit) {
                setlistkhoahoc(prev => prev.map(kh => kh.id === Edit.id ? { ...kh, ...values } : kh));
                message.success("Cập nhật khóa học thành công!");
            } else {
                const newidx = listkhoahoc.length > 0 ? Math.max(...listkhoahoc.map(kh => kh.id)) + 1 : 1;
                setlistkhoahoc(prev => [...prev, { id: newidx, ...values }]);
                message.success("Thêm khóa học thành công!");
            }
            setopen(false);
            form.resetFields();
        });
    };

    const del = (rec: Khoahoc) => {
        if(rec.sohocsinh > 0) {
            message.error("Không thể xóa khóa học có học viên!");
            return;
        }
        setlistkhoahoc(prev => prev.filter(kh => kh.id !== rec.id));
        message.success("Xóa khóa học thành công!");
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>Quản lý khóa học</h2>
            <Search
                search={search}
                setSearch={setSearch}
                locGV={locGV}
                setLocGV={setlocGV}
                locState={locState}
                setLocState={setlocState}
                Add={() => mo()}
            />

            <Course
                data={data}
                Edit={mo}
                Delete={del}
            />

            <KhoaHocModal
                open={open}
                Edit={!!Edit}
                form={form}
                onCancel={() => { setopen(false); form.resetFields(); }}
                onOk={save}
                dskhoahoc={listkhoahoc}
                EditId={Edit?.id}
            />
        </div>
    )
};

export default QuanLy;