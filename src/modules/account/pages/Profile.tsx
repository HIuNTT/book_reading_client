import { Avatar, Card, Descriptions, DescriptionsProps, Modal, Space, Typography } from 'antd'
import { EGender } from 'enums/gender'
import useDisclosure from 'hooks/useDisclosure'
import { useTheme } from 'stores/theme'
import { useUser } from 'stores/user'
import { cn } from 'utils/cn'
import UpdateProfileModal from '../components/UpdateProfileModal'
import { formatDay } from 'utils/datetime'

export default function Profile() {
  const { theme } = useTheme()
  const { user } = useUser()

  const { isOpen, onClose, onOpen } = useDisclosure()

  const items: DescriptionsProps['items'] = [
    {
      label: 'Giới tính',
      children: user.gender ?? EGender.MALE,
    },
    {
      label: 'Ngày sinh',
      children: formatDay(user.birthday) ?? 'Không được thiết lập',
    },
    {
      label: 'Email',
      children: user.email,
    },
    {
      label: 'Số điện thoại',
      children: user.phone ?? 'Không được thiết lập',
    },
  ]

  return (
    <>
      <div className="mx-auto mb-10 px-4 sm:px-8 xxl:px-16 xxxl:w-[896px] xxxl:px-0">
        <div className="text-center text-xl md:text-3xl">Cài đặt thông tin</div>
        <div className="mt-5 md:mt-8 xxxl:mt-10">
          <Typography.Title level={5} className="font-medium">
            Thông tin cá nhân
          </Typography.Title>
          <Card bordered={true} className={cn({ 'bg-[rgb(32,32,32)]': theme === 'dark' })}>
            <div className="relative">
              <Space size="large">
                <Avatar
                  size={{ xs: 46, sm: 46, md: 62, lg: 62, xl: 62, xxl: 72 }}
                  src={
                    user.avatar_url ||
                    (user.gender === EGender.FEMALE ? '/avatar/female-130.png' : '/avatar/male-130.png')
                  }
                />
                <div>
                  <div className="mb-3 text-sm font-bold md:mb-1 md:text-base xxxl:mb-1 xxxl:text-lg">{user.name}</div>
                  <Descriptions
                    column={{ xs: 1, sm: 1, md: 3 }}
                    className="pr-10 [&_.ant-descriptions-item-content]:break-normal"
                    items={items}
                  />
                </div>
              </Space>
              <div
                className="absolute -right-[9px] top-1/2 -translate-y-1/2 cursor-pointer font-bold hover:text-primary md:right-0 xxxl:right-2"
                onClick={onOpen}
              >
                Chỉnh sửa
              </div>
            </div>
          </Card>
        </div>
      </div>
      <Modal
        destroyOnClose
        className="!transform-none"
        footer={null}
        width={500}
        open={isOpen}
        onCancel={onClose}
        centered
      >
        <UpdateProfileModal onClose={onClose} {...user} />
      </Modal>
    </>
  )
}
