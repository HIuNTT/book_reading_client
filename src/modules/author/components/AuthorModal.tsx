import { Form, Input, Modal } from 'antd'
import { toast } from 'sonner'
import { memo, useEffect, useState } from 'react'
import { AuthorDto, useCreateAuthor } from '../services/createAuthor'
import { UpdateAuthorDto, useUpdateAuthor } from '../services/updateAuthor'
import { Author } from 'types/author'
import ImageUpload from 'components/core/ImageUpload'

interface AuthorModalProps {
  open: boolean
  onCancel: () => void
  record?: Partial<Author>
  onSuccess: () => void
}

function AuthorModal({ open, onCancel, record, onSuccess }: AuthorModalProps) {
  const [form] = Form.useForm<AuthorDto>()

  const [loading, setLoading] = useState<boolean>(false)

  const { mutate: mutateCreateAuthor, isPending: isPendingCreateAuthor } = useCreateAuthor()
  const { mutate: mutateUpdateAuthor, isPending: isPendingUpdateAuthor } = useUpdateAuthor()

  const onSubmit = (data: AuthorDto | UpdateAuthorDto) => {
    if (record?.id) {
      mutateUpdateAuthor(
        { ...data, id: record.id },
        {
          onSuccess: () => {
            toast.success('Cập nhật tác giả thành công')
            onSuccess()
            form.resetFields()
          },
        },
      )
    } else {
      mutateCreateAuthor(data, {
        onSuccess: () => {
          toast.success('Thêm tác giả thành công')
          onSuccess()
          form.resetFields()
        },
      })
    }
  }

  useEffect(() => {
    if (record?.id && open) {
      form.resetFields()
      form.setFieldsValue({ ...record, image: record.image_key })
    }
  }, [open, record, form])

  return (
    <Modal
      width={620}
      centered
      destroyOnClose
      title={record ? 'Chỉnh sửa tác giả' : 'Thêm tác giả mới'}
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
      confirmLoading={isPendingCreateAuthor || isPendingUpdateAuthor || loading}
    >
      <Form layout="vertical" form={form} onFinish={onSubmit}>
        <Form.Item<AuthorDto>
          required
          label="Tên tác giả"
          name="name"
          rules={[{ required: true, message: 'Vui lòng không để trống' }]}
        >
          <Input allowClear placeholder="Nhập tên tác giả" />
        </Form.Item>
        <Form.Item<AuthorDto> label="Mô tả" name="description">
          <Input.TextArea autoSize={{ minRows: 1, maxRows: 3 }} allowClear placeholder="Nhập mô tả" />
        </Form.Item>
        <Form.Item<AuthorDto> label="Ảnh đại diện" name="image">
          <ImageUpload name={record?.image_key} imageUrl={record?.image} onLoading={setLoading} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default memo(AuthorModal)
