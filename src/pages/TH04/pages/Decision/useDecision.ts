
import { useState } from "react";
import { Form, message } from "antd";
import dayjs from "dayjs";
import { GraduationDecision, RegistryBook, Diploma } from "../../types";
import { load, save, KEYS } from "../../data";

export function useDecision() {
    const [decisions, setDecisions] = useState<GraduationDecision[]>(
        () => load(KEYS.DECISIONS, [])
    );
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState<GraduationDecision | null>(null);
    const [form] = Form.useForm();

    const books = load<RegistryBook[]>(KEYS.BOOKS, []);
    const diplomas = load<Diploma[]>(KEYS.DIPLOMAS, []);

    const getBookLabel = (bookId: string) => {
        const book = books.find((b) => b.id === bookId);
        return book ? `${book.name} (${book.year})` : "N/A";
    };

    const countDiplomas = (decisionId: string) =>
        diplomas.filter((d) => d.decisionId === decisionId).length;

    const updateDecisions = (newList: GraduationDecision[]) => {
        setDecisions(newList);
        save(KEYS.DECISIONS, newList);
    };

    const openAdd = () => {
        if (books.length === 0) {
            message.warning("Vui lòng tạo sổ văn bằng trước!");
            return;
        }
        setEditing(null);
        form.resetFields();
        setModalOpen(true);
    };

    const openEdit = (record: GraduationDecision) => {
        setEditing(record);
        form.setFieldsValue({
            registryBookId: record.registryBookId,
            decisionNumber: record.decisionNumber,
            issueDate: dayjs(record.issueDate),
            summary: record.summary,
        });
        setModalOpen(true);
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();

            const data = {
                registryBookId: values.registryBookId,
                decisionNumber: values.decisionNumber,
                issueDate: values.issueDate.format("YYYY-MM-DD"),
                summary: values.summary,
            };

            if (editing) {
                const updated = decisions.map((d) =>
                    d.id === editing.id ? { ...d, ...data } : d
                );
                updateDecisions(updated);
                message.success("Cập nhật quyết định thành công!");
            } else {
                const newDecision: GraduationDecision = {
                    id: Date.now().toString(),
                    ...data,
                    lookupCount: 0,
                };
                updateDecisions([...decisions, newDecision]);
                message.success("Thêm quyết định thành công!");
            }

            setModalOpen(false);
        } catch {
        }
    };

    const handleDelete = (id: string) => {
        if (diplomas.some((d) => d.decisionId === id)) {
            message.error("Không thể xóa! Quyết định này đã có văn bằng.");
            return;
        }
        updateDecisions(decisions.filter((d) => d.id !== id));
        message.success("Xóa quyết định thành công!");
    };

    return {
        decisions, books, modalOpen, setModalOpen, editing, form,
        getBookLabel, countDiplomas, openAdd, openEdit, handleOk, handleDelete,
    };
}
