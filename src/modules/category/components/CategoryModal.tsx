import { Form, Input, Modal } from 'antd'
import { Category } from 'types/category'
import { CategoryDto, useCreateCategory } from '../services/createCategory'
import { toast } from 'sonner'
import { memo, useEffect } from 'react'
import { UpdateCategoryDto, useUpdateCategory } from '../services/updateCategory'
import { getCategory } from '../services/getCategory'

interface CategoryModalProps {
  open: boolean
  onCancel: () => void
  record?: Partial<Category>
  onSuccess: () => void
}

function CategoryModal({ open, onCancel, record, onSuccess }: CategoryModalProps) {
  console.log('render category modal')

  const [form] = Form.useForm<CategoryDto>()

  const { mutate: mutateCreateCategory, isPending: isPendingCreateCategory } = useCreateCategory()
  const { mutate: mutateUpdateCategory, isPending: isPendingUpdateCategory } = useUpdateCategory()

  const onSubmit = (data: CategoryDto | UpdateCategoryDto) => {
    if (record?.id) {
      console.log('update')
      mutateUpdateCategory(
        { ...data, id: record.id },
        {
          onSuccess: () => {
            toast.success('Cập nhật thể loại thành công')
            onSuccess()
            form.resetFields()
          },
        },
      )
    } else {
      mutateCreateCategory(data, {
        onSuccess: () => {
          toast.success('Thêm thể loại thành công')
          onSuccess()
          form.resetFields()
        },
      })
    }
  }

  useEffect(() => {
    if (record?.id && open) {
      form.resetFields()
      getCategory(record.id).then((data) => form.setFieldsValue(data))
    }
  }, [open, record, form])

  return (
    <Modal
      width={620}
      centered
      destroyOnClose
      title={record ? 'Chỉnh sửa thể loại' : 'Thêm thể loại mới'}
      open={open}
      onCancel={() => {
        onCancel()
        form.resetFields()
      }}
      cancelText="Hủy"
      okText="Lưu"
      classNames={{ header: '!mb-5 capitalize' }}
      onOk={() => form.submit()}
      cancelButtonProps={{ danger: true, type: 'text' }}
      maskClosable={false}
      confirmLoading={isPendingCreateCategory || isPendingUpdateCategory}
    >
      <Form layout="vertical" form={form} onFinish={onSubmit}>
        <Form.Item<CategoryDto>
          required
          label="Tên thể loại:"
          name="name"
          rules={[{ required: true, message: 'Vui lòng không để trống' }]}
        >
          <Input allowClear placeholder="Nhập tên thể loại" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default memo(CategoryModal)
