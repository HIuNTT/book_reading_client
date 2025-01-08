import { Form, message, Modal, UploadFile } from "antd";
import {
  ProFormDigit,
  ProFormText,
  ProFormUploadButton,
} from '@ant-design/pro-components';
import { FC, useEffect, useState } from "react";
import { ChapterItem, ChapterPayload } from "types/chapter";
import { createChapter, updateChapter } from "modules/chapter";
import { postFile } from "modules/book/services";


interface CreateUpdateFormProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  curItem?: ChapterItem;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
  setCurChapter: React.Dispatch<React.SetStateAction<ChapterItem | undefined>>;
  bookId: number;
}


const CreatUpateForm: FC<CreateUpdateFormProps> = ({
  showModal,
  setShowModal,
  curItem,
  setReload,
  setCurChapter,
  bookId
}) => {

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileUrl, setFileUrl] = useState<FormData | undefined>();
  const [curFileUrl, setCurFileUrl] = useState<UploadFile<any>[]>([]);

  const handleCloseModal = () => {
    setShowModal(false);
    setCurFileUrl([]);
    setReload((pre) => !pre);
    setLoading(false);
    setCurChapter(undefined);
    form?.resetFields();
  };

  const handleFileChange = async (file: File) => {
    const formData = new FormData();
    if (file) {
      formData.append('file', file);
      setFileUrl(formData);
    } else {
      setFileUrl(undefined);
    }
  };

  const handleSave = async (formItem: ChapterItem) => {
    setLoading(true);
    let nameFileUrl = "";

    if (fileUrl) {
      const response = await postFile(fileUrl);
      nameFileUrl = (response?.data?.key as string) + '';
    }

    const payload: ChapterPayload = {
      title: formItem?.title,
      order_chap: formItem?.order_chap,
      file_key: nameFileUrl,
    };
    console.log("nameFileUrl",nameFileUrl);
    

    if (!curItem?.id) {
      createChapter(bookId,payload).then(() => message.success("Tạo mới chương thành công!")).then(() => { handleCloseModal() })
    } else {
      updateChapter(bookId, {
        ...payload,
        id: curItem.id,
      }).then(() => message.success("Cập nhật chương thành công!")).then(() => { handleCloseModal() })
    }
    setLoading(false);
  };

  useEffect(() => {
    form.setFieldValue('id', curItem?.id);
    form.setFieldValue('title', curItem?.title);
    form.setFieldValue('order_chap', curItem?.order_chap);
    form.setFieldValue('file_url', curItem?.file_url);
  }, [curItem]);

  return (
    <Modal
      title={
        !curItem?.id ? "Add Chapter" : "Edit Chapter"
      }
      okText="Save"
      cancelText="Cancel"
      onOk={() => form.submit()}
      open={showModal}
      confirmLoading={loading}
      onCancel={handleCloseModal}
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
        <ProFormText
          label='Tên chương'
          placeholder={''}
          name={'title'}
          rules={[{ required: true, message: 'Vui lòng không để trống' }]}
        />
        <ProFormDigit
          label='order_chap'
          placeholder={''}
          name={'order_chap'}
          rules={[{ required: true, message: 'Vui lòng không để trống' }]}
        />
        <ProFormUploadButton
          label='file_url'
          title='Upload'
          name={'file_url'}
          max={1}
          fieldProps={{ onRemove: () => setCurFileUrl([]) }}
          fileList={curFileUrl.map((file) => ({
            ...file,
            status: 'done', 
          }))}
          onChange={(e) => {
            if (e.fileList.length > 0) {
              const file = e.fileList[0].originFileObj;
              if (file) {
                handleFileChange(file);
              }
              setCurFileUrl(e.fileList.map((file) => ({ ...file, status: 'done' }))); 
            }
          }}
        />
      </Form>
    </Modal>
  )
}

export default CreatUpateForm;