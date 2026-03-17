import { useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Select, TimePicker } from 'antd';
import { Employee } from '../../types';
import dayjs from 'dayjs';

const dayOptions = [
  { value: 'Mon', label: 'Thứ 2' },
  { value: 'Tue', label: 'Thứ 3' },
  { value: 'Wed', label: 'Thứ 4' },
  { value: 'Thu', label: 'Thứ 5' },
  { value: 'Fri', label: 'Thứ 6' },
  { value: 'Sat', label: 'Thứ 7' },
  { value: 'Sun', label: 'Chủ nhật' },
];

interface Props {
  open: boolean;
  editing: Employee | null;
  onCancel: () => void;
  onSubmit: (values: any) => void;
}

export default ({ open, editing, onCancel, onSubmit }: Props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (editing) {
      form.setFieldsValue({
        ...editing,
        workHours: [dayjs(editing.workHours.start, 'HH:mm'), dayjs(editing.workHours.end, 'HH:mm')]
      });
    } else {
      form.resetFields();
    }
  }, [editing, open]);

  const handleOk = () => {
    form.validateFields().then(values => {
      const { workHours, ...rest } = values;
      onSubmit({
        ...rest,
        workHours: { start: workHours[0].format('HH:mm'), end: workHours[1].format('HH:mm') }
      });
      form.resetFields();
    });
  };

  return (
    <Modal title={editing ? 'Sửa nhân viên' : 'Thêm nhân viên'} open={open} onOk={handleOk} onCancel={() => { form.resetFields(); onCancel(); }} okText="Lưu" cancelText="Hủy">
      <Form form={form} layout="vertical">
        <Form.Item name="name" label="Tên nhân viên" rules={[{ required: true, message: 'Nhập tên!' }]}>
          <Input placeholder="Nhập tên nhân viên" />
        </Form.Item>
        <Form.Item name="phone" label="Số điện thoại" rules={[{ required: true, message: 'Nhập SĐT!' }]}>
          <Input placeholder="Nhập số điện thoại" />
        </Form.Item>
        <Form.Item name="maxCustomers" label="Giới hạn khách/ngày" rules={[{ required: true, message: 'Nhập số!' }]}>
          <InputNumber min={1} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="workDays" label="Ngày làm việc" rules={[{ required: true, message: 'Chọn ngày!' }]}>
          <Select mode="multiple" options={dayOptions} placeholder="Chọn ngày làm việc" />
        </Form.Item>
        <Form.Item name="workHours" label="Giờ làm việc" rules={[{ required: true, message: 'Chọn giờ!' }]}>
          <TimePicker.RangePicker format="HH:mm" style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};