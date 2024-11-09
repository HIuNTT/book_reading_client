import { Form, message, Modal, UploadFile } from "antd";
import {
  ProFormSelect,
  ProFormText,
  ProFormUploadButton,
} from '@ant-design/pro-components';
import { FC, useEffect, useState } from "react";
// import { postBook, putBook } from "services/Book";
import { BookItem } from "types/book";
import { Category } from "types/category";
import { getCategoryList } from "modules/category/services/getCategoryList";


interface CreateUpdateFormProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  curItem?: BookItem;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
  setCurBook: React.Dispatch<React.SetStateAction<BookItem | undefined>>;
}


const CreatUpateForm: FC<CreateUpdateFormProps> = ({
  showModal,
  setShowModal,
  curItem,
  setReload,
  setCurBook
}) => {

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const [categorySelected, setCategorySelected] = useState<number[]>(
    curItem?.category_book?.map((e) => e?.category_id || 0) || [],
  );

  const [listCategory, setListCategory] = useState<Category[]>();
  const [curThumbnailFile, setCurThumbnailFile] = useState<UploadFile<any>[]>([]);

  const handleCloseModal = () => {
    setShowModal(false);
    setReload((pre) => !pre);
    setLoading(false);
    setCurThumbnailFile([]);
    form?.resetFields();
  };

  const handleThumbnailChange = (file: File | null) => {
  
};

  const handleSave = async (formItem: BookItem) => {
    setLoading(true);
    let thumbnailFile;
    setLoading(false);
  };

  const handleGetListSolo = async () => {
    const res = await getCategoryList();
    if (res) {
      setListCategory(res.content);
    }
  };

  useEffect(() => {
    handleGetListSolo();
  }, [curItem]);

  return (
    <Modal
      title={
        !curItem?.id ? "Add Book" : "Edit Book"
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
          label='Tên sách'
          placeholder={''}
          name={'title'}
        />
        <ProFormSelect
            label='The loai'
            name={'authorid'}
            placeholder=' Chon the loai'
            options={listCategory?.map((item) => ({ label: item.name, value: item.id }))}
            mode="multiple"
            onChange={(e: number[]) => setCategorySelected(e)}
          />
        <ProFormText
          label='Tóm tắt'
          placeholder={''}
          name={'summary'}
        />
        <ProFormUploadButton
          label='Thumbnail'
          title='Upload'
          name={'avg_rating'}
          max={1}
          fieldProps={{ onRemove: () => setCurThumbnailFile([]) }}
          fileList={curThumbnailFile}
          onChange={(e) => {
            if (e.fileList.length > 0) {
              // handleThumbnailChange(e.fileList[0].originFileObj);
              setCurThumbnailFile(e.fileList);
            }
          }}
        />
      </Form>
    </Modal>
  )
}

export default CreatUpateForm;