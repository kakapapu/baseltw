import { Modal, Form, Input, InputNumber } from 'antd';

export default ({ open, onCancel, onSubmit }: any) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then((values) => {
      onSubmit(values);
      form.resetFields();
    });
  };

  return (
    <Modal
      title="Thêm sản phẩm"
      visible={open}
      onOk={handleOk}
      onCancel={() => { form.resetFields(); onCancel(); }}
      okText="Thêm"
      cancelText="Hủy"
    >
      <Form form={form} layout="vertical">
        <Form.Item 
          name="name" 
          label="Tên sản phẩm" 
          rules={[{ required: true, message: 'Nhập tên!' }]}
        >
          <Input placeholder="Nhập tên sản phẩm" />
        </Form.Item>

        <Form.Item 
          name="price" 
          label="Giá" 
          rules={[
            { required: true, message: 'Nhập giá!' },
            { type: 'number', min: 1, message: 'Giá phải > 0!' }
          ]}
        >
          <InputNumber placeholder="Nhập giá" style={{ width: '100%' }} min={1} />
        </Form.Item>

        <Form.Item 
          name="quantity" 
          label="Số lượng" 
          rules={[
            { required: true, message: 'Nhập số lượng!' },
            { type: 'number', min: 1, message: 'Số lượng phải > 0!' }
          ]}
        >
          <InputNumber placeholder="Nhập số lượng" style={{ width: '100%' }} min={1} precision={0} />
        </Form.Item>
      </Form>
    </Modal>
  );
};