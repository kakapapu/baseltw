import { useState } from "react";
import { Form, message } from "antd";
import { FormField } from "../../types";
import { load, save, KEYS } from "../../data";

export function useFieldConfig() {
    const [fields, setFields] = useState<FormField[]>(
        () => load(KEYS.FIELDS, [])
    );
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState<FormField | null>(null);
    const [form] = Form.useForm();

    const updateFields = (newList: FormField[]) => {
        setFields(newList);
        save(KEYS.FIELDS, newList);
    };

    const openAdd = () => {
        setEditing(null);
        form.resetFields();
        setModalOpen(true);
    };

    const openEdit = (field: FormField) => {
        setEditing(field);
        form.setFieldsValue({ name: field.name, dataType: field.dataType });
        setModalOpen(true);
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();

            if (editing) {
                const updated = fields.map((f) =>
                    f.id === editing.id
                        ? { ...f, name: values.name, dataType: values.dataType }
                        : f
                );
                updateFields(updated);
                message.success("Cập nhật trường thành công!");
            } else {
                const newField: FormField = {
                    id: Date.now().toString(),
                    name: values.name,
                    dataType: values.dataType,
                };
                updateFields([...fields, newField]);
                message.success("Thêm trường mới thành công!");
            }

            setModalOpen(false);
        } catch {
        }
    };

    const handleDelete = (id: string) => {
        updateFields(fields.filter((f) => f.id !== id));
        message.success("Xóa trường thành công!");
    };

    return {
        fields, modalOpen, setModalOpen, editing, form, openAdd, openEdit, handleOk, handleDelete,
    };
}
