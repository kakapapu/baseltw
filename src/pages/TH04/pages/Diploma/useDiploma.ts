

import { useState, useMemo } from "react";
import { Form, message } from "antd";
import dayjs from "dayjs";
import {
    Diploma, RegistryBook, GraduationDecision, FormField,
} from "../../types";
import { load, save, KEYS } from "../../data";

export function useDiploma() {
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

    const decisions = load<GraduationDecision[]>(KEYS.DECISIONS, []);
    const formFields = load<FormField[]>(KEYS.FIELDS, []);

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

    const getDecisionLabel = (id: string) => {
        const d = decisions.find((x) => x.id === id);
        return d ? d.decisionNumber : "N/A";
    };

    const updateDiplomas = (newList: Diploma[]) => {
        setDiplomas(newList);
        save(KEYS.DIPLOMAS, newList);
    };

    const openAdd = () => {
        if (decisions.length === 0) {
            message.warning("Vui lòng tạo quyết định tốt nghiệp trước!");
            return;
        }
        setEditing(null);
        form.resetFields();
        setModalOpen(true);
    };

    const openEdit = (diploma: Diploma) => {
        setEditing(diploma);

        const formValues: Record<string, unknown> = {
            decisionId: diploma.decisionId,
            entryNumber: diploma.entryNumber,
            diplomaNumber: diploma.diplomaNumber,
            studentId: diploma.studentId,
            fullName: diploma.fullName,
            dateOfBirth: dayjs(diploma.dateOfBirth),
        };

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

    const openDetail = (diploma: Diploma) => {
        setViewing(diploma);
        setDetailOpen(true);
    };

    const handleDecisionChange = (decisionId: string) => {
        const decision = decisions.find((d) => d.id === decisionId);
        if (!decision) return;

        const book = books.find((b) => b.id === decision.registryBookId);
        if (!book) return;

        form.setFieldsValue({ entryNumber: book.currentEntryNumber + 1 });
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();

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

                const updatedBooks = books.map((b) =>
                    b.id === book.id ? { ...b, currentEntryNumber: entryNumber } : b
                );
                setBooks(updatedBooks);
                save(KEYS.BOOKS, updatedBooks);

                message.success("Thêm văn bằng thành công!");
            }

            setModalOpen(false);
        } catch {
        }
    };

    const handleDelete = (id: string) => {
        updateDiplomas(diplomas.filter((d) => d.id !== id));
        message.success("Xóa văn bằng thành công!");
    };

    return {

        books, decisions, formFields, filteredDiplomas, modalOpen, setModalOpen, detailOpen, setDetailOpen,
        editing, viewing, form, filterBookId, setFilterBookId, filterDecisionId, setFilterDecisionId,
        getDecisionLabel, openAdd, openEdit, openDetail, handleDecisionChange, handleOk, handleDelete,
    };
}
