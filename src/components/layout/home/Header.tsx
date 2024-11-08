import { Avatar, Button, Layout, Modal, Popover } from 'antd'
import LoginModal from 'modules/auth/components/LoginModal'
import useDisclosure from 'hooks/useDisclosure'
import SignupModal from 'modules/auth/components/SignupModal'
import { Link, useNavigate } from 'react-router-dom'
import SearchBookHome from 'modules/book/components/SearchBookHome'
import { useUser } from 'stores/user'
import { Icon } from '@iconify/react'
import { EGender } from 'enums/gender'
import { ReactNode } from 'react'

interface DropdownItem {
  key: string
  label: string
  icon: ReactNode
  onClick?(): void
}

function Header() {
  const { user, clear } = useUser()

  const navigate = useNavigate()

  const disclosureLogin = useDisclosure()
  const disclosureSignup = useDisclosure()

  const items: DropdownItem[] = [
    {
      key: 'account/profile',
      label: 'Quản lý tài khoản',
      icon: <Icon width="1.3rem" icon="lucide:user-round" />,
      onClick: () => navigate('/account/profile'),
    },
    {
      key: 'account/bookcase',
      label: 'Tủ sách của tôi',
      icon: <Icon width="1.3rem" icon="material-symbols:bookmark-add-outline" />,
      onClick: () => navigate('/account/bookcase'),
    },
    {
      key: 'account/transaction-histories',
      label: 'Lịch sử giao dịch',
      icon: <Icon width="1.3rem" icon="eva:shopping-bag-outline" />,
      onClick: () => navigate('/account/transaction-histories'),
    },
    {
      key: 'logout',
      label: 'Đăng xuất',
      icon: <Icon width="1.3rem" icon="material-symbols:logout" />,
      onClick: () => {
        clear()
      },
    },
  ]

  const renderContent = (
    <div className="w-[240px] max-w-[326px] p-1">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-[19px] font-medium">{user.username}</div>
        <Avatar
          size={44}
          src={user.avatar_url || (user.gender === EGender.FEMALE ? '/avatar/female-130.png' : '/avatar/male-130.png')}
        />
      </div>
      <div className="w-full">
        {items.map((item) => (
          <div
            className="flex cursor-pointer items-center justify-start rounded-xl p-4 hover:bg-[#1212120a]"
            onClick={item.onClick}
          >
            <div className="mr-4">{item.icon}</div>
            <div className="text-[16px] font-medium">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <>
      <Layout.Header className="sticky top-0 z-[150] h-[var(--app-home-header-height)] max-w-[2560px] border-b bg-white px-4 sm:px-8 xxl:px-16">
        <div className="flex h-full items-center justify-between lg:py-1.5">
          <div className="flex h-full items-center">
            <div className="h-full">
              <Link to="/" className="flex h-full items-center">
                <div className="h-10 w-10">
                  <img src="/logo.svg" alt="Waka Logo" />
                </div>
                <div className="ml-2.5 w-[100px]">
                  <img src="/img/logo waka rose.png" alt="Waka Logo Text" />
                </div>
              </Link>
            </div>
          </div>
          <div className="flex flex-1 justify-center">
            <SearchBookHome />
          </div>
          {user.username ? (
            <div className="flex items-center gap-5">
              <Button
                size="large"
                className="!w-12"
                color="default"
                variant="filled"
                icon={<Icon width="24" icon="lucide:clock-5" />}
              />
              <Popover content={renderContent} placement="bottomRight" arrow={false}>
                <div className="flex h-[44px] cursor-pointer">
                  <Avatar
                    size={44}
                    src={
                      user.avatar_url ||
                      (user.gender === EGender.FEMALE ? '/avatar/female-130.png' : '/avatar/male-130.png')
                    }
                  />
                </div>
              </Popover>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Button size="large" color="primary" variant="filled" onClick={disclosureSignup.onOpen}>
                Đăng ký
              </Button>
              <Button size="large" type="primary" onClick={disclosureLogin.onOpen}>
                Đăng nhập
              </Button>
            </div>
          )}
        </div>
      </Layout.Header>

      <Modal
        className="!transform-none"
        classNames={{ content: '!rounded-[20px]' }}
        open={disclosureLogin.isOpen}
        footer={null}
        width={500}
        centered
        onCancel={disclosureLogin.onClose}
      >
        <LoginModal onSwitchSignup={disclosureSignup.onOpenChange} onCloseModal={disclosureLogin.onClose} />
      </Modal>

      <Modal
        className="!transform-none"
        classNames={{ content: '!rounded-[20px]' }}
        open={disclosureSignup.isOpen}
        footer={null}
        width={500}
        centered
        onCancel={disclosureSignup.onClose}
      >
        <SignupModal onSwitchLogin={disclosureLogin.onOpenChange} onCloseModal={disclosureSignup.onClose} />
      </Modal>
    </>
  )
}

export default Header
