import { Button, DatePicker, Form, FormProps, Input, Select, Typography } from 'antd'
import ImageUpload from 'components/core/ImageUpload'
import { EGender } from 'enums/gender'
import { UpdateProfileDto, useUpdateProfile } from 'modules/user/services/updateProfile'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useUser } from 'stores/user'
import { User } from 'types/user'
import dayjs from 'dayjs'

interface UpdateProfileModalProps extends Partial<User> {
  onClose: () => void
}

export default function UpdateProfileModal({ onClose, ...profile }: UpdateProfileModalProps) {
  const [form] = Form.useForm<UpdateProfileDto>()

  const [loading, setLoading] = useState<boolean>(false)

  const { user, setUser } = useUser()

  const { mutate, isPending } = useUpdateProfile()

  const onSubmit: FormProps<UpdateProfileDto>['onFinish'] = (data) => {
    mutate(
      { ...data, birthday: dayjs(data.birthday).format('YYYY-MM-DD') },
      {
        onSuccess: (data) => {
          setUser({ ...user, ...data })
          toast.success('Cập nhật thông tin cá nhân thành công')
          onClose()
        },
      },
    )
  }

  useEffect(() => {
    form.setFieldsValue({
      avatar: profile.avatar_key || undefined,
      name: profile.name || undefined,
      gender: profile.gender || EGender.MALE,
      birthday: profile.birthday ? dayjs(profile.birthday) : dayjs('1970-01-01'),
      email: profile.email || undefined,
      phone: profile.phone || undefined,
    })
  }, [form, profile])

  return (
    <div className="px-2 py-3">
      <Typography.Title className="mb-6 text-center" level={4}>
        Thông tin cá nhân
      </Typography.Title>
      <Form layout="vertical" form={form} onFinish={onSubmit}>
        <Form.Item<UpdateProfileDto> name="avatar">
          <ImageUpload
            className="flex justify-center"
            description={null}
            name={profile.avatar_key || (profile.gender === EGender.FEMALE ? 'female-130.png' : 'male-130.png')}
            imageUrl={
              profile.avatar_url ||
              (profile.gender === EGender.FEMALE ? '/avatar/female-130.png' : '/avatar/male-130.png')
            }
            type="picture-circle"
            onLoading={setLoading}
          />
        </Form.Item>
        <Form.Item<UpdateProfileDto> name="name" label="Họ và tên">
          <Input placeholder="Nhập họ và tên" />
        </Form.Item>
        <Form.Item<UpdateProfileDto> name="gender" label="Giới tính">
          <Select
            options={[
              { label: 'Nam', value: EGender.MALE },
              { label: 'Nữ', value: EGender.FEMALE },
              { label: 'Khác', value: EGender.OTHER },
            ]}
          />
        </Form.Item>
        <Form.Item<UpdateProfileDto> name="birthday" label="Ngày sinh">
          <DatePicker allowClear={false} format="DD/MM/YYYY" placeholder="Chọn ngày" />
        </Form.Item>
        <Form.Item<UpdateProfileDto>
          name="email"
          label="Email"
          rules={[{ type: 'email', message: 'Email không hợp lệ' }]}
        >
          <Input placeholder="Nhập email" />
        </Form.Item>
        <Form.Item<UpdateProfileDto> name="phone" label="Số điện thoại">
          <Input maxLength={11} placeholder="Nhập số điện thoại" />
        </Form.Item>
        <Form.Item className="mb-0 pt-4 text-right">
          <Button htmlType="button" className="mr-3" onClick={onClose}>
            Hủy bỏ
          </Button>
          <Button type="primary" htmlType="submit" loading={isPending || loading}>
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
