
import { useState } from "react";
import { Form, message } from "antd";
import { Diploma, GraduationDecision } from "../../types";
import { load, save, KEYS } from "../../data";

export function useSearch() {
    const [results, setResults] = useState<Diploma[] | null>(null);
    const [viewing, setViewing] = useState<Diploma | null>(null);
    const [detailOpen, setDetailOpen] = useState(false);
    const [form] = Form.useForm();

    const [refreshKey, setRefreshKey] = useState(0);

    const countFilledParams = (): number => {
        const v = form.getFieldsValue();
        let count = 0;
        if (v.diplomaNumber?.trim()) count++;
        if (v.entryNumber !== undefined && v.entryNumber !== null) count++;
        if (v.studentId?.trim()) count++;
        if (v.fullName?.trim()) count++;
        if (v.dateOfBirth) count++;
        return count;
    };

    const handleSearch = () => {
        if (countFilledParams() < 2) {
            message.warning("Vui lòng nhập ít nhất 2 tham số tìm kiếm!");
            return;
        }

        const v = form.getFieldsValue();
        const allDiplomas = load<Diploma[]>(KEYS.DIPLOMAS, []);

        const filtered = allDiplomas.filter((d) => {
            if (v.diplomaNumber?.trim()) {
                if (!d.diplomaNumber.toLowerCase().includes(v.diplomaNumber.trim().toLowerCase()))
                    return false;
            }
            if (v.entryNumber !== undefined && v.entryNumber !== null) {
                if (d.entryNumber !== v.entryNumber) return false;
            }
            if (v.studentId?.trim()) {
                if (!d.studentId.toLowerCase().includes(v.studentId.trim().toLowerCase()))
                    return false;
            }
            if (v.fullName?.trim()) {
                if (!d.fullName.toLowerCase().includes(v.fullName.trim().toLowerCase()))
                    return false;
            }
            if (v.dateOfBirth) {
                if (d.dateOfBirth !== v.dateOfBirth.format("YYYY-MM-DD")) return false;
            }
            return true;
        });

        setResults(filtered);

        if (filtered.length > 0) {
            const decisionIds = [...new Set(filtered.map((d) => d.decisionId))];
            const currentDecisions = load<GraduationDecision[]>(KEYS.DECISIONS, []);
            const updated = currentDecisions.map((dec) =>
                decisionIds.includes(dec.id)
                    ? { ...dec, lookupCount: dec.lookupCount + 1 }
                    : dec
            );
            save(KEYS.DECISIONS, updated);
            setRefreshKey((k) => k + 1);
        }

        if (filtered.length === 0) {
            message.info("Không tìm thấy văn bằng nào phù hợp.");
        }
    };

    const handleReset = () => {
        form.resetFields();
        setResults(null);
    };

    const openDetail = (diploma: Diploma) => {
        setViewing(diploma);
        setDetailOpen(true);
    };

    return {
        results, viewing, detailOpen, setDetailOpen, form, refreshKey,
        handleSearch, handleReset, openDetail,
    };
}
