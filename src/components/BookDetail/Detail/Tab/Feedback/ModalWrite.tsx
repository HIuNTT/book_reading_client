import { Form, message, Modal } from "antd";
import { FC, useEffect, useState } from "react";
import StarEmpty from "/public/img/star_empty.png"
import Star from "/public/img/star.png"
import { FeedbackItem, FeedBackPayload } from "types/feadback";
import { createFeedback } from "modules/feedback";
import { ProFormTextArea } from "@ant-design/pro-components";

interface ModalWriteProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  bookId: number;
}
const ModalWrite: FC<ModalWriteProps> = ({
  showModal,
  setShowModal,
  bookId,
}
) => {

  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const handleCloseModal = () => {
    setShowModal(false);
    setLoading(false);
    form?.resetFields();
  }

  const [rating, setRating] = useState(0);
  const handleClick = (index: number) => {
    setRating(index + 1);
  };
  
  const jsonString = localStorage.getItem("user");
  let accessToken;
  if (jsonString) {
    const data = JSON.parse(jsonString);
    accessToken = data?.state?.tokens?.accessToken;
  }

  const handleSave = async (formItem: FeedbackItem) => {
    const payload: FeedBackPayload = {
      content: formItem.content,
      rating: rating
    }
    createFeedback(bookId, payload).then(() => message.success("Thêm feedback thành công!")).then(() => {handleCloseModal()}).catch(() => message.error("Bạn đã feedback cho sách này"))
  }

  useEffect(() => {
    form.setFieldValue('rating',rating)
    // form.setFieldValue('content',rating)
  },[])

  return (
    <Modal
      title="Đánh giá và nhận xét"
      okText="Gửi nhận xét"
      cancelText="Hủy"
      open={showModal}
      onCancel={handleCloseModal}
      onOk={() => form.submit()}
      confirmLoading={loading}
    >
      <Form
        form={form}
        layout="vertical"
        name="roleForm"
        onFinish={handleSave}
        style={{
          padding: '12px 0',
        }}
      >
        <div className="flex items-center mb-4 gap-3">
          <p>Đánh giá</p>
          <div className="flex items-center justify-center">
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <img
                  key={index}
                  src={index < rating ? Star : StarEmpty}
                  className="w-[24px] h-[24px] cursor-pointer"
                  onClick={() => handleClick(index)}
                  alt={`Star ${index + 1}`}
                />
              ))}
          </div>
        </div>
        <div>
          <ProFormTextArea 
          className="border-black border-[1px] rounded-xl w-full p-[8px]" 
          placeholder="Hãy cho chúng mình một vài nhận xét và ý kiến nhé!"
          label='Nhận xét'
          name={'content'}
          />
          {/* <textarea name="" id="" className="border-black border-[1px] rounded-xl w-full p-[8px]" placeholder="Hãy cho chúng mình một vài nhận xét và ý kiến nhé!"></textarea> */}
        </div>
      </Form>
    </Modal>
  )
}

export default ModalWrite;