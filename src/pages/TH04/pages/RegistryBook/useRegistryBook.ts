
import { useState } from "react";
import { Form, message } from "antd";
import { RegistryBook, GraduationDecision, Diploma } from "../../types";
import { load, save, KEYS } from "../../data";

export function useRegistryBook() {
    const [books, setBooks] = useState<RegistryBook[]>(
        () => load(KEYS.BOOKS, [])
    );
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState<RegistryBook | null>(null);
    const [form] = Form.useForm();

    const diplomas = load<Diploma[]>(KEYS.DIPLOMAS, []);
    const countDiplomas = (bookId: string) =>
        diplomas.filter((d) => d.registryBookId === bookId).length;

    const updateBooks = (newBooks: RegistryBook[]) => {
        setBooks(newBooks);
        save(KEYS.BOOKS, newBooks);
    };

    const openAdd = () => {
        setEditing(null);
        form.resetFields();
        form.setFieldsValue({ year: new Date().getFullYear() });
        setModalOpen(true);
    };

    const openEdit = (book: RegistryBook) => {
        setEditing(book);
        form.setFieldsValue({ year: book.year, name: book.name });
        setModalOpen(true);
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();

            if (editing) {
                if (books.some((b) => b.year === values.year && b.id !== editing.id)) {
                    message.error(`Đã tồn tại sổ văn bằng năm ${values.year}!`);
                    return;
                }
                const updated = books.map((b) =>
                    b.id === editing.id
                        ? { ...b, year: values.year, name: values.name }
                        : b
                );
                updateBooks(updated);
                message.success("Cập nhật sổ văn bằng thành công!");
            } else {
                if (books.some((b) => b.year === values.year)) {
                    message.error(`Đã tồn tại sổ văn bằng năm ${values.year}!`);
                    return;
                }
                const newBook: RegistryBook = {
                    id: Date.now().toString(),
                    year: values.year,
                    name: values.name,
                    currentEntryNumber: 0,
                };
                updateBooks([...books, newBook]);
                message.success("Thêm sổ văn bằng mới thành công!");
            }

            setModalOpen(false);
        } catch {
        }
    };

    const handleDelete = (bookId: string) => {
        const decisions = load<GraduationDecision[]>(KEYS.DECISIONS, []);
        if (decisions.some((d) => d.registryBookId === bookId)) {
            message.error("Không thể xóa! Sổ này đã có quyết định tốt nghiệp.");
            return;
        }
        updateBooks(books.filter((b) => b.id !== bookId));
        message.success("Xóa sổ văn bằng thành công!");
    };

    return {
        books,
        modalOpen,
        setModalOpen,
        editing,
        form,
        countDiplomas,
        openAdd,
        openEdit,
        handleOk,
        handleDelete,
    };
}
