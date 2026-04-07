import { useState } from 'react';
import { Form, message } from 'antd';
import { LichTrinh, NgayItem, DiemDen } from '../../types';
import { load, save, KEYS } from '../../data';
import dayjs from 'dayjs';

export function useLichTrinh() {
  const [lichTrinhs, setLichTrinhs] = useState<LichTrinh[]>(() => load(KEYS.LICH_TRINH, []));
  const diemDens = load<DiemDen[]>(KEYS.DIEM_DEN, []);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<LichTrinh | null>(null);
  const [form] = Form.useForm();
  const [ngayItems, setNgayItems] = useState<NgayItem[]>([{ ngay: 1, diemDenIds: [] }]);

  const update = (list: LichTrinh[]) => {
    setLichTrinhs(list);
    save(KEYS.LICH_TRINH, list);
  };

  const openAdd = () => {
    setEditing(null);
    form.resetFields();
    form.setFieldsValue({ nganSachDuKien: 5000000 });
    setNgayItems([{ ngay: 1, diemDenIds: [] }]);
    setModalOpen(true);
  };

  const openEdit = (lt: LichTrinh) => {
    setEditing(lt);
    form.setFieldsValue({ ten: lt.ten, nganSachDuKien: lt.nganSachDuKien });
    setNgayItems(lt.ngayItems.length > 0 ? lt.ngayItems : [{ ngay: 1, diemDenIds: [] }]);
    setModalOpen(true);
  };

  const handleOk = async () => {
    const values = await form.validateFields();
    const data: Omit<LichTrinh, 'id'> = {
      ten: values.ten,
      nganSachDuKien: values.nganSachDuKien,
      ngayTao: dayjs().format('YYYY-MM-DD'),
      ngayItems,
    };
    if (editing) {
      update(lichTrinhs.map((l) => (l.id === editing.id ? { ...l, ...data } : l)));
      message.success('Cập nhật lịch trình thành công!');
    } else {
      update([...lichTrinhs, { ...data, id: Date.now().toString() }]);
      message.success('Tạo lịch trình thành công!');
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    update(lichTrinhs.filter((l) => l.id !== id));
    message.success('Đã xóa lịch trình!');
  };

  const addNgay = () => {
    setNgayItems([...ngayItems, { ngay: ngayItems.length + 1, diemDenIds: [] }]);
  };

  const removeNgay = (index: number) => {
    const updated = ngayItems.filter((_, i) => i !== index).map((n, i) => ({ ...n, ngay: i + 1 }));
    setNgayItems(updated);
  };

  const updateDiemDen = (index: number, ids: string[]) => {
    const updated = [...ngayItems];
    updated[index] = { ...updated[index], diemDenIds: ids };
    setNgayItems(updated);
  };

  const tinhTongChi = (lt: LichTrinh) => {
    let tong = 0;
    lt.ngayItems.forEach((n) => {
      n.diemDenIds.forEach((id) => {
        const dd = diemDens.find((d) => d.id === id);
        if (dd) tong += dd.chiPhiAnUong + dd.chiPhiLuuTru + dd.chiPhiDiChuyen;
      });
    });
    return tong;
  };

  const tinhTongGio = (lt: LichTrinh) => {
    let tong = 0;
    lt.ngayItems.forEach((n) => {
      n.diemDenIds.forEach((id) => {
        const dd = diemDens.find((d) => d.id === id);
        if (dd) tong += dd.thoiGianThamQuan;
      });
    });
    return tong;
  };

  return {
    lichTrinhs,
    diemDens,
    modalOpen,
    setModalOpen,
    editing,
    form,
    ngayItems,
    openAdd,
    openEdit,
    handleOk,
    handleDelete,
    addNgay,
    removeNgay,
    updateDiemDen,
    tinhTongChi,
    tinhTongGio,
  };
}
