import { Avatar, Button, Layout, Modal, Popover, Switch } from 'antd'
import LoginModal from 'modules/auth/components/LoginModal'
import useDisclosure from 'hooks/useDisclosure'
import SignupModal from 'modules/auth/components/SignupModal'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import SearchBookHome from 'modules/book/components/SearchBookHome'
import { useUser } from 'stores/user'
import { Icon } from '@iconify/react'
import { EGender } from 'enums/gender'
import { ReactNode, useEffect, useState } from 'react'
import { cn } from 'utils/cn'
import { queryClient } from 'configs/queryClient'
import { useTheme } from 'stores/theme'
import { MoonOutlined } from '@ant-design/icons'
import { ERole } from 'enums/role'
import { nav } from 'constants/nav'

interface DropdownItem {
  key: string
  label: string
  icon: ReactNode
  extra?: ReactNode
  onClick?(): void
}

function Header() {
  const [isTop, setIsTop] = useState(true)

  const { user, clear } = useUser()
  const { theme, toggleTheme } = useTheme()

  const navigate = useNavigate()
  const { pathname } = useLocation()

  const isHome = pathname === '/'

  const disclosureLogin = useDisclosure()
  const disclosureSignup = useDisclosure()

  useEffect(() => {
    function handleScrollTop() {
      if (window.scrollY > 20) {
        setIsTop(false)
      } else {
        setIsTop(true)
      }
    }

    window.addEventListener('scroll', handleScrollTop)
    return () => {
      window.removeEventListener('scroll', handleScrollTop)
    }
  }, [])

  const handleSwitchChange = (checked: boolean) => {
    toggleTheme(checked ? 'dark' : 'light')
  }

  const items: DropdownItem[] = [
    ...(user.role.name === ERole.ADMIN
      ? [
          {
            key: 'admin',
            label: 'Trang quản lý',
            icon: <Icon width="1.3rem" icon="eos-icons:admin-outlined" />,
            onClick: () => navigate('/admin'),
          },
        ]
      : []),
    {
      key: 'account/profile',
      label: 'Quản lý tài khoản',
      icon: <Icon width="1.3rem" icon="lucide:user-round" />,
      onClick: () => navigate('/account/profile'),
    },
    {
      key: 'night_mode',
      label: 'Chế độ tối',
      icon: <MoonOutlined className="text-[20px]" />,
      extra: <Switch checked={theme === 'dark'} onChange={handleSwitchChange} />,
    },
    {
      key: 'logout',
      label: 'Đăng xuất',
      icon: <Icon width="1.3rem" icon="material-symbols:logout" />,
      onClick: () => {
        queryClient.clear()
        clear()
        navigate('/')
      },
    },
  ]

  const renderContent = (
    <div className="w-[240px] max-w-[350px] p-1">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-[19px] font-medium">{user.name}</div>
        <Avatar
          size={44}
          src={user.avatar_url || (user.gender === EGender.FEMALE ? '/avatar/female-130.png' : '/avatar/male-130.png')}
        />
      </div>
      <div className="w-full">
        {items.map((item) => (
          <div
            className={cn(
              'flex cursor-pointer items-center justify-start rounded-xl p-4 hover:bg-[rgba(18,18,18,0.04)]',
              {
                'hover:bg-[rgba(255,255,255,0.04)]': theme === 'dark',
              },
            )}
            onClick={item.onClick}
            key={item.key}
          >
            <div className="mr-4">{item.icon}</div>
            <div className="text-[16px] font-medium">{item.label}</div>
            {item.extra && <div className="ml-auto">{item.extra}</div>}
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <>
      <Layout.Header
        className={cn(
          'sticky top-0 z-[150] h-[var(--app-home-header-height)] max-w-[2560px] border-b border-[rgba(255,255,255,0.08)] px-4 sm:px-8 xxl:px-16',
          {
            'border-b-0 bg-transparent': isTop,
          },
          { 'border-[rgba(18,18,18,0.08)]': theme === 'light' },
        )}
        style={{
          transition:
            'background-color 0.2s var(--transition-curve), box-shadow 0.2s var(--transition-curve), color 0.2s var(--transition-curve), opacity 0.2s var(--transition-curve), transform 0.4s var(--transition-curve)',
        }}
      >
        <div className="flex h-full items-center justify-between lg:py-1.5">
          <div className="flex h-full items-center">
            <div className="flex h-full items-center">
              <Link to="/" className="flex h-full items-center">
                <div className="h-10 w-10">
                  <img src="/logo.svg" alt="Waka Logo" />
                </div>
                <div className="relative ml-2.5 w-[100px]">
                  {theme === 'light' && (
                    <img
                      className={cn('absolute', { 'opacity-0': isTop && isHome })}
                      src={'/img/logo waka rose.png'}
                      alt="Waka Logo Text"
                    />
                  )}
                  <img
                    className={cn({ 'opacity-0': !isTop && theme === 'light' })}
                    src={'/img/logo waka white.png'}
                    alt="Waka Logo Text"
                  />
                </div>
              </Link>
              <div className="ml-6 flex gap-[30px]">
                <div
                  onClick={() => navigate('/')}
                  className={cn(
                    'cursor-pointer select-none text-[16px] font-medium leading-6 opacity-80 hover:text-primary',
                    { 'font-bold opacity-100': isHome },
                    { 'text-white': isTop && isHome && theme === 'light' },
                  )}
                >
                  Trang chủ
                </div>
                <div
                  onClick={() => navigate('/book-library')}
                  className={cn(
                    'cursor-pointer select-none text-[16px] font-medium leading-6 opacity-80 hover:text-primary',
                    { 'font-bold opacity-100': pathname.startsWith('/book-library') },
                    { 'text-white': isTop && isHome && theme === 'light' },
                  )}
                >
                  Tìm sách
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-1 justify-center">
            <SearchBookHome isTop={isTop} isHome={isHome} />
          </div>
          {user.username ? (
            <div className="flex items-center gap-5">
              <Button
                size="large"
                className={cn(
                  '!w-12 bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.08)]',
                  { 'bg-[rgba(18,18,18,0.04)] hover:bg-[rgba(18,18,18,0.08)]': theme === 'light' },
                  {
                    'bg-[rgba(255,255,255,0.12)] text-white hover:bg-[rgba(255,255,255,0.2)]': isTop && isHome,
                  },
                )}
                color="default"
                variant="filled"
                icon={<Icon width="24" icon="lucide:clock-5" />}
                onClick={() => navigate(nav.ACCOUNT + nav.HISTORY)}
                style={{ transition: 'background-color 0.2s cubic-bezier(0.05, 0, 0.2, 1)' }}
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
              <Button
                size="large"
                type="text"
                variant="text"
                onClick={disclosureSignup.onOpen}
                className={cn(
                  'bg-[rgba(255,255,255,0.04)] font-medium hover:bg-[rgba(255,255,255,0.08)]',
                  { 'bg-[rgba(18,18,18,0.04)] hover:bg-[rgba(18,18,18,0.08)]': theme === 'light' },
                  {
                    'bg-[rgba(255,255,255,0.12)] text-white hover:bg-[rgba(255,255,255,0.2)]': isTop && isHome,
                  },
                )}
                style={{ transition: 'background-color 0.2s cubic-bezier(0.05, 0, 0.2, 1)' }}
              >
                Đăng ký
              </Button>
              <Button
                size="large"
                type="text"
                onClick={disclosureLogin.onOpen}
                className={cn(
                  'bg-[rgba(255,255,255,0.04)] font-medium hover:bg-[rgba(255,255,255,0.08)]',
                  { 'bg-[rgba(18,18,18,0.04)] hover:bg-[rgba(18,18,18,0.08)]': theme === 'light' },
                  {
                    'bg-[rgba(255,255,255,0.12)] text-white hover:bg-[rgba(255,255,255,0.2)]': isTop && isHome,
                  },
                )}
                style={{ transition: 'background-color 0.2s cubic-bezier(0.05, 0, 0.2, 1)' }}
              >
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
