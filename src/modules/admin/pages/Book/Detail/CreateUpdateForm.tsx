// import { Form, message, Modal, UploadFile } from "antd";
// import {
//   ProFormDatePicker,
//   ProFormSelect,
//   ProFormText,
//   ProFormUploadButton,
// } from '@ant-design/pro-components';
// import { FC, useEffect, useState } from "react";
// import { postBook, putBook } from "services/Book";


// interface CreateUpdateFormProps {
//   showModal: boolean;
//   setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
//   curItem?: API.BookItem;
//   setReload: React.Dispatch<React.SetStateAction<boolean>>;
//   setCurBook: React.Dispatch<React.SetStateAction<API.BookItem>>;
// }


// const CreatUpateForm : FC<CreateUpdateFormProps> = ({
//   showModal,
//   setShowModal,
//   curItem,
//   setReload,
//   setCurBook
// }) => {

//   const [form] = Form.useForm();
//   const [loading, setLoading] = useState(false);
//   const [curAvatarFile, setCurAvatarFile] = useState<UploadFile<any>[]>([]);

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setCurBook({});
//     setCurAvatarFile([]);
//     setReload((pre) => !pre);
//     setLoading(false);
//     form?.resetFields();
//   };

//   const handleSave = async (formItem: API.BookItem) => {
//     setLoading(true);
//     const payload: API.PayloadBook = {
//       title: curItem?.title,
//       summary: curItem?.summary,
//       avg_rating: formItem?.avg_rating,
//       thumbnail: formItem?.avg_rating,
//       status: formItem?.status,
//       view: formItem?.view,
//     };

//     if (!curItem?.id) {
//       postBook(payload)
//         .then(() => {
//           message.success('Create successfully!');
//         })
//         .then(() => {
//           handleCloseModal();
//         });
//     } else {
//       putBook({
//         ...payload,
//         id: curItem.id,
//       })
//         .then(() => {
//           message.success('Update successfully!');
//         })
//         .then(() => {
//           handleCloseModal();
//         });
//     }
//     setLoading(false);
//   };

  

//   console.log('curItem',curItem);
  

//   useEffect(() => {
//     form.setFieldValue('id', curItem?.id);
//     form.setFieldValue('title', curItem?.title);
//     form.setFieldValue('summary', curItem?.summary);
//     form.setFieldValue('avg_rating', curItem?.avg_rating);
//   }, [curItem]);

//   return (
//     <Modal
//       title = {
//         !curItem?.id ? "Add Book" : "Edit Book"
//       }
//       okText = "Save"
//       cancelText = "Cancel"
//       onOk={() => form.submit()}
//       open={showModal}
//       confirmLoading={loading}
//       onCancel={handleCloseModal}
//     >
//       <Form
//       form={form}
//       layout="vertical"
//       name="roleForm"
//       onFinish={handleSave}
//       style={{
//         padding: '12px 0',
//       }}
//       >
//         <ProFormText
//           label='Tên sách'
//           placeholder={''}
//           name={'title'}
//         />
//         <ProFormSelect
//           allowClear
//           label= 'The loai'
//           name={'authorid'}
//           placeholder=' Chon the loai'
//           mode="single"
//         />
//         <ProFormText
//           label='Tóm tắt'
//           placeholder={''}
//           name={'summary'}
//         />
//         <ProFormUploadButton
//           label='Avatar'
//           title='Upload'
//           name={'avg_rating'}
//           max={1}
//         />
//       </Form>
//     </Modal>
//   )
// }

// export default CreatUpateForm;