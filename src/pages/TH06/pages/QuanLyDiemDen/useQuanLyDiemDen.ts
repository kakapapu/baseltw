import { useState } from 'react';
import { Form, message } from 'antd';
import { DiemDen } from '../../types';
import { load, save, KEYS, SAMPLE_DIEM_DEN } from '../../data';

export function useQuanLyDiemDen() {
  const [danhSach, setDanhSach] = useState<DiemDen[]>(() => {
    const saved = load<DiemDen[]>(KEYS.DIEM_DEN, []);
    if (saved.length === 0) {
      save(KEYS.DIEM_DEN, SAMPLE_DIEM_DEN);
      return SAMPLE_DIEM_DEN;
    }
    return saved;
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<DiemDen | null>(null);
  const [form] = Form.useForm();

  const update = (list: DiemDen[]) => {
    setDanhSach(list);
    save(KEYS.DIEM_DEN, list);
  };

  const openAdd = () => {
    setEditing(null);
    form.resetFields();
    form.setFieldsValue({ loaiHinh: 'Biển', rating: 4 });
    setModalOpen(true);
  };

  const openEdit = (item: DiemDen) => {
    setEditing(item);
    form.setFieldsValue(item);
    setModalOpen(true);
  };

  const handleOk = async () => {
    const values = await form.validateFields();
    if (editing) {
      update(danhSach.map((d) => (d.id === editing.id ? { ...d, ...values } : d)));
      message.success('Cập nhật thành công!');
    } else {
      update([...danhSach, { ...values, id: Date.now().toString() }]);
      message.success('Thêm thành công!');
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    update(danhSach.filter((d) => d.id !== id));
    message.success('Đã xóa!');
  };

  return { danhSach, modalOpen, setModalOpen, editing, form, openAdd, openEdit, handleOk, handleDelete };
}
