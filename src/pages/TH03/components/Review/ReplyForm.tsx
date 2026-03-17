import { useEffect } from 'react';
import { Modal, Form, Input } from 'antd';
import { Review } from '../../types';

interface Props {
  open: boolean;
  review: Review | null;
  onCancel: () => void;
  onSubmit: (reply: string) => void;
}

export default ({ open, review, onCancel, onSubmit }: Props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    review ? form.setFieldsValue({ reply: review.reply }) : form.resetFields();
  }, [review, open]);

  const handleOk = () => {
    form.validateFields().then(values => { onSubmit(values.reply); form.resetFields(); });
  };

  return (
    <Modal title="Phản hồi đánh giá" visible={open} onOk={handleOk} onCancel={() => { form.resetFields(); onCancel(); }} okText="Gửi" cancelText="Hủy">
      <Form form={form} layout="vertical">
        <Form.Item name="reply" label="Nội dung phản hồi" rules={[{ required: true, message: 'Nhập phản hồi!' }]}>
          <Input.TextArea rows={3} placeholder="Nhập phản hồi..." />
        </Form.Item>
      </Form>
    </Modal>
  );
};