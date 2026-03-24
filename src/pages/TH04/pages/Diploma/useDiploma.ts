/**
 * ==========================================
 *  HOOK: Logic quản lý Thông tin Văn bằng
 * ==========================================
 *
 *  Đây là hook phức tạp nhất:
 *    - CRUD văn bằng
 *    - Tự động tính số vào sổ
 *    - Lọc theo sổ VB / quyết định
 *    - Xử lý trường bổ sung (extraFields)
 */

import { useState, useMemo } from "react";
import { Form, message } from "antd";
import dayjs from "dayjs";
import {
  Diploma, RegistryBook, GraduationDecision, FormField,
} from "../../types";
import { load, save, KEYS } from "../../data";

export function useDiploma() {
  // ========== STATE ==========
  const [diplomas, setDiplomas] = useState<Diploma[]>(
    () => load(KEYS.DIPLOMAS, [])
  );
  const [books, setBooks] = useState<RegistryBook[]>(
    () => load(KEYS.BOOKS, [])
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [editing, setEditing] = useState<Diploma | null>(null);
  const [viewing, setViewing] = useState<Diploma | null>(null);
  const [filterBookId, setFilterBookId] = useState<string>();
  const [filterDecisionId, setFilterDecisionId] = useState<string>();
  const [form] = Form.useForm();

  // Dữ liệu liên quan
  const decisions = load<GraduationDecision[]>(KEYS.DECISIONS, []);
  const formFields = load<FormField[]>(KEYS.FIELDS, []);

  // ========== DANH SÁCH ĐÃ LỌC ==========
  const filteredDiplomas = useMemo(() => {
    let list = diplomas;
    if (filterBookId) {
      list = list.filter((d) => d.registryBookId === filterBookId);
    }
    if (filterDecisionId) {
      list = list.filter((d) => d.decisionId === filterDecisionId);
    }
    return list;
  }, [diplomas, filterBookId, filterDecisionId]);

  // ========== HÀM TIỆN ÍCH ==========
  const getDecisionLabel = (id: string) => {
    const d = decisions.find((x) => x.id === id);
    return d ? d.decisionNumber : "N/A";
  };

  // ========== LƯU DỮ LIỆU ==========
  const updateDiplomas = (newList: Diploma[]) => {
    setDiplomas(newList);
    save(KEYS.DIPLOMAS, newList);
  };

  // ========== MỞ MODAL THÊM ==========
  const openAdd = () => {
    if (decisions.length === 0) {
      message.warning("Vui lòng tạo quyết định tốt nghiệp trước!");
      return;
    }
    setEditing(null);
    form.resetFields();
    setModalOpen(true);
  };

  // ========== MỞ MODAL SỬA ==========
  const openEdit = (diploma: Diploma) => {
    setEditing(diploma);

    // Chuẩn bị dữ liệu cho form
    const formValues: Record<string, unknown> = {
      decisionId: diploma.decisionId,
      entryNumber: diploma.entryNumber,
      diplomaNumber: diploma.diplomaNumber,
      studentId: diploma.studentId,
      fullName: diploma.fullName,
      dateOfBirth: dayjs(diploma.dateOfBirth),
    };

    // Nạp giá trị các trường bổ sung
    formFields.forEach((field) => {
      const val = diploma.extraFields[field.id];
      if (val !== undefined && val !== null) {
        formValues[`extra_${field.id}`] =
          field.dataType === "Date" ? dayjs(val as string) : val;
      }
    });

    form.setFieldsValue(formValues);
    setModalOpen(true);
  };

  // ========== XEM CHI TIẾT ==========
  const openDetail = (diploma: Diploma) => {
    setViewing(diploma);
    setDetailOpen(true);
  };

  // ========== KHI CHỌN QĐ → TỰ TÍNH SỐ VÀO SỔ ==========
  const handleDecisionChange = (decisionId: string) => {
    const decision = decisions.find((d) => d.id === decisionId);
    if (!decision) return;

    const book = books.find((b) => b.id === decision.registryBookId);
    if (!book) return;

    // Số vào sổ tiếp theo = số hiện tại + 1
    form.setFieldsValue({ entryNumber: book.currentEntryNumber + 1 });
  };

  // ========== XỬ LÝ KHI NHẤN OK ==========
  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      // Thu thập các trường bổ sung
      const extraFields: Record<string, string | number> = {};
      formFields.forEach((field) => {
        const val = values[`extra_${field.id}`];
        if (val !== undefined && val !== null) {
          extraFields[field.id] =
            field.dataType === "Date" && dayjs.isDayjs(val)
              ? val.format("YYYY-MM-DD")
              : val;
        }
      });

      const decision = decisions.find((d) => d.id === values.decisionId)!;

      if (editing) {
        // ===== CHỈNH SỬA (giữ nguyên số vào sổ) =====
        const updated = diplomas.map((d) =>
          d.id === editing.id
            ? {
                ...d,
                decisionId: values.decisionId,
                registryBookId: decision.registryBookId,
                diplomaNumber: values.diplomaNumber,
                studentId: values.studentId,
                fullName: values.fullName,
                dateOfBirth: values.dateOfBirth.format("YYYY-MM-DD"),
                extraFields,
              }
            : d
        );
        updateDiplomas(updated);
        message.success("Cập nhật văn bằng thành công!");
      } else {
        // ===== THÊM MỚI =====
        const book = books.find((b) => b.id === decision.registryBookId)!;
        const entryNumber = book.currentEntryNumber + 1;

        const newDiploma: Diploma = {
          id: Date.now().toString(),
          registryBookId: book.id,
          decisionId: values.decisionId,
          entryNumber,
          diplomaNumber: values.diplomaNumber,
          studentId: values.studentId,
          fullName: values.fullName,
          dateOfBirth: values.dateOfBirth.format("YYYY-MM-DD"),
          extraFields,
        };

        updateDiplomas([...diplomas, newDiploma]);

        // Cập nhật số vào sổ hiện tại của sổ VB
        const updatedBooks = books.map((b) =>
          b.id === book.id ? { ...b, currentEntryNumber: entryNumber } : b
        );
        setBooks(updatedBooks);
        save(KEYS.BOOKS, updatedBooks);

        message.success("Thêm văn bằng thành công!");
      }

      setModalOpen(false);
    } catch {
      // validation error
    }
  };

  // ========== XÓA ==========
  const handleDelete = (id: string) => {
    updateDiplomas(diplomas.filter((d) => d.id !== id));
    message.success("Xóa văn bằng thành công!");
  };

  // ========== TRẢ VỀ ==========
  return {
    // Dữ liệu
    books, decisions, formFields, filteredDiplomas,
    // State giao diện
    modalOpen, setModalOpen, detailOpen, setDetailOpen,
    editing, viewing, form,
    filterBookId, setFilterBookId, filterDecisionId, setFilterDecisionId,
    // Hàm xử lý
    getDecisionLabel,
    openAdd, openEdit, openDetail, handleDecisionChange, handleOk, handleDelete,
  };
}
