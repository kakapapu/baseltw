

import { Modal, Descriptions } from "antd";
import dayjs from "dayjs";
import { Diploma, RegistryBook, GraduationDecision, FormField } from "../types";
import { load, KEYS } from "../data";


interface Props {
  diploma: Diploma | null;
  open: boolean;
  onClose: () => void;
  showDecisionInfo?: boolean;
}

export default function DiplomaDetail({
  diploma,
  open,
  onClose,
  showDecisionInfo = false,
}: Props) {
  const books = load<RegistryBook[]>(KEYS.BOOKS, []);
  const decisions = load<GraduationDecision[]>(KEYS.DECISIONS, []);
  const formFields = load<FormField[]>(KEYS.FIELDS, []);

  if (!diploma) return null;

  const book = books.find((b) => b.id === diploma.registryBookId);
  const decision = decisions.find((d) => d.id === diploma.decisionId);

  return (
    <Modal
      title="Chi tiết Văn bằng"
      visible={open}
      onCancel={onClose}
      footer={null}
      width={620}
    >
      <Descriptions bordered column={1} size="small">
        <Descriptions.Item label="Số vào sổ">
          {diploma.entryNumber}
        </Descriptions.Item>
        <Descriptions.Item label="Số hiệu VB">
          {diploma.diplomaNumber}
        </Descriptions.Item>
        <Descriptions.Item label="Mã sinh viên">
          {diploma.studentId}
        </Descriptions.Item>
        <Descriptions.Item label="Họ tên">
          {diploma.fullName}
        </Descriptions.Item>
        <Descriptions.Item label="Ngày sinh">
          {dayjs(diploma.dateOfBirth).format("DD/MM/YYYY")}
        </Descriptions.Item>

        <Descriptions.Item label="Sổ văn bằng">
          {book ? `${book.name} (${book.year})` : "N/A"}
        </Descriptions.Item>
        <Descriptions.Item label="Quyết định TN">
          {decision?.decisionNumber ?? "N/A"}
        </Descriptions.Item>

        {showDecisionInfo && decision && (
          <>
            <Descriptions.Item label="Ngày ban hành QĐ">
              {dayjs(decision.issueDate).format("DD/MM/YYYY")}
            </Descriptions.Item>
            <Descriptions.Item label="Trích yếu QĐ">
              {decision.summary}
            </Descriptions.Item>
          </>
        )}

        {formFields.map((field) => {
          const val = diploma.extraFields[field.id];
          if (val === undefined || val === null) return null;

          const displayVal =
            field.dataType === "Date"
              ? dayjs(val as string).format("DD/MM/YYYY")
              : String(val);

          return (
            <Descriptions.Item key={field.id} label={field.name}>
              {displayVal}
            </Descriptions.Item>
          );
        })}
      </Descriptions>
    </Modal>
  );
}
