import { Form, message, Modal, UploadFile } from 'antd'
import { ProFormSelect, ProFormText, ProFormTextArea, ProFormUploadButton } from '@ant-design/pro-components'
import { FC, useEffect, useState } from 'react'
import { BookItem, BookPayload } from 'types/book'
import { Category } from 'types/category'
import { createBook, postFile, updateBook } from 'modules/book/services'
import { Author } from 'types/author'

interface CreateUpdateFormProps {
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  curItem?: BookItem
  setReload: React.Dispatch<React.SetStateAction<boolean>>
  setCurBook: React.Dispatch<React.SetStateAction<BookItem | undefined>>
  listAuthor: Author[] | undefined
  setListAuthor: React.Dispatch<React.SetStateAction<Author[] | undefined>>
  handleGetListAuthor: () => Promise<void>
  listCategory: Category[] | undefined
  setListCategory: React.Dispatch<React.SetStateAction<Category[] | undefined>>
  handleGetListCategory: () => Promise<void>
}

const CreatUpateForm: FC<CreateUpdateFormProps> = ({
  showModal,
  setShowModal,
  curItem,
  setReload,
  setCurBook,
  listAuthor,
  setListAuthor,
  handleGetListAuthor,
  listCategory,
  setListCategory,
  handleGetListCategory,
}) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const [categorySelected, setCategorySelected] = useState<number[]>(
    curItem?.category_book?.map((e) => e?.category_id || 0) || [],
  )

  const [author, setAuthor] = useState<number | undefined>()
  const [thumbnailFile, setThumbnailFile] = useState<FormData | undefined>()
  const [bannerlFile, setBannerFile] = useState<FormData | undefined>()
  const [curThumbnailFile, setCurThumbnailFile] = useState<UploadFile<any>[]>([])
  const [curBannerFile, setCurBannerFile] = useState<UploadFile<any>[]>([])

  const handleCloseModal = () => {
    setShowModal(false)
    setReload((pre) => !pre)
    setLoading(false)
    setCurThumbnailFile([])
    setCurBannerFile([])
    setListAuthor([])
    setListCategory([])
    setCurBook(undefined)
    setAuthor(undefined)
    setCategorySelected([])
    form?.resetFields()
  }

  const handleThumbnailChange = async (file: File) => {
    const formData = new FormData()
    if (file) {
      formData.append('file', file)
      setThumbnailFile(formData)
    } else {
      setThumbnailFile(undefined)
    }
  }

  const handleBannerChange = async (file: File) => {
    const formData = new FormData()
    if (file) {
      formData.append('file', file)
      setBannerFile(formData)
    } else {
      setBannerFile(undefined)
    }
  }

  const category_book = categorySelected.map((id) => ({ category_id: id }))

  const handleSave = async (formItem: BookItem) => {
    setLoading(true)
    let nameThumbnailFile
    let nameBannerFile

    if (thumbnailFile) {
      nameThumbnailFile = await postFile(thumbnailFile)
    }

    if (bannerlFile) {
      nameBannerFile = await postFile(bannerlFile)
    }

    const payload: BookPayload = {
      title: formItem.title,
      summary: formItem.summary,
      thumbnail: nameThumbnailFile?.data.key || curItem?.thumbnail_url,
      banner: nameBannerFile?.data.key || curItem?.banner_url,
      author_id: author || curItem?.author?.id,
      category_book: category_book,
    }

    if (!curItem?.id) {
      createBook(payload)
        .then(() => message.success('Tạo mới sách thành công!'))
        .then(() => {
          handleCloseModal()
        })
    } else {
      updateBook({
        ...payload,
        id: curItem.id,
      })
        .then(() => message.success('Cập nhật sách thành công!'))
        .then(() => {
          handleCloseModal()
        })
    }
    setLoading(false)
  }

  useEffect(() => {
    console.log('curItem:', curItem);
    form.setFieldValue('title', curItem?.title)
    form.setFieldValue('author_id', curItem?.author?.id)
    if (curItem) {
      const selectedCategories = curItem.category_book?.map((item) => item.category_id) || [];
      setCategorySelected(selectedCategories);
  
      form.setFieldsValue({
        category_book: curItem.category_book?.map((item) => ({
          label: item.category_name,
          value: item.category_id,
        })),
      });
    }
    form.setFieldValue('summary', curItem?.summary)
    if (curItem?.thumbnail_url) {
      setCurThumbnailFile([
        {
          uid: '0', 
          name: 'thumbnail_url', 
          status: 'done', 
          url: curItem?.thumbnail_url, 
        },
      ]);
    }

    if (curItem?.banner_url) {
      setCurBannerFile([
        {
          uid: '1', 
          name: 'banner_url', 
          status: 'done', 
          url: curItem?.banner_url, 
        },
      ]);
    }
    handleGetListAuthor()
    handleGetListCategory()
  }, [curItem])

  return (
    <Modal
      title={!curItem?.id ? 'Add Book' : 'Edit Book'}
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
          label="Tên sách"
          placeholder={''}
          name={'title'}
          rules={[{ required: true, message: 'Vui lòng không để trống' }]}
        />
        <ProFormSelect
          label="Thể loại"
          name={'category_book'}
          placeholder=" Chọn thể loại"
          options={listCategory?.map((item) => ({ label: item.name, value: item.id }))}
          mode="multiple"
          onChange={(e: number[]) => setCategorySelected(e)}
          rules={[{ required: true, message: 'Vui lòng không để trống' }]}
        />
        <ProFormSelect
          label="Tác giả"
          name={'author_id'}
          placeholder="Chọn tác giả"
          options={listAuthor?.map((item) => ({ label: item.name, value: item.id }))}
          mode="single"
          onChange={(e: number) => setAuthor(e)}
          rules={[{ required: true, message: 'Vui lòng không để trống' }]}
        />
        <ProFormTextArea
          label="Tóm tắt"
          placeholder={''}
          name={'summary'}
          rules={[{ required: true, message: 'Vui lòng không để trống' }]}
        />
        <ProFormUploadButton
          label="Ảnh bìa"
          title="Upload"
          name={'thumbnail_url'}
          max={1}
          fieldProps={{
            onRemove: () => setCurThumbnailFile([]),
          }}
          fileList={curThumbnailFile.map((file) => ({
            ...file,
            status: 'done', 
          }))}
          onChange={(e) => {
            if (e.fileList.length > 0) {
              const file = e.fileList[0].originFileObj;
              if (file) {
                handleThumbnailChange(file);
              }
              setCurThumbnailFile(e.fileList.map((file) => ({ ...file, status: 'done' }))); 
            }
          }}
        />

        <ProFormUploadButton
          label="Ảnh banner"
          title="Upload"
          name={'banner_url'}
          max={1}
          fieldProps={{ onRemove: () => setCurBannerFile([]) }}
          fileList={curBannerFile.map((file) => ({
            ...file,
            status: 'done', 
          }))}
          onChange={(e) => {
            if (e.fileList.length > 0) {
              const file = e.fileList[0].originFileObj;
              if (file) {
                handleBannerChange(file);
              }
              setCurBannerFile(e.fileList.map((file) => ({ ...file, status: 'done' }))); 
            }
          }}
        />
      </Form>
    </Modal>
  )
}

export default CreatUpateForm
