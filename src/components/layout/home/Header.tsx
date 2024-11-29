import { Avatar, Button, Layout, Modal, Popover } from 'antd'
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
import { Category } from 'types/category'
import { getCategoryList } from 'modules/category/services/getCategoryList'
import { queryClient } from 'configs/queryClient'

interface DropdownItem {
  key: string
  label: string
  icon: ReactNode
  onClick?(): void
}

function Header() {
  const [isTop, setIsTop] = useState(true)

  const { user, clear } = useUser()

  const navigate = useNavigate()
  const { pathname } = useLocation()

  const isHome = pathname === '/'
  console.log('render')

  const disclosureLogin = useDisclosure()
  const disclosureSignup = useDisclosure()

  const [listCategory, setListCategory] = useState<Category[]>();
  const handleGetListCategory = async () => {
    const res = await getCategoryList();
    if (res) {
      setListCategory(res.content);
    }
  };

  useEffect(() => {
    handleGetListCategory()
  }, [])

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
        queryClient.removeQueries({ queryKey: ['userInfo'] })
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
            key={item.key}
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
      <Layout.Header
        className={cn(
          'sticky top-0 z-[150] h-[var(--app-home-header-height)] max-w-[2560px] border-b bg-white px-4 sm:px-8 xxl:px-16',
          {
            'border-b-0 bg-transparent': isTop && isHome,
          },
        )}
        style={{
          transition:
            'background-color 0.2s var(--transition-curve), box-shadow 0.2s var(--transition-curve), color 0.2s var(--transition-curve), opacity 0.2s var(--transition-curve), transform 0.4s var(--transition-curve)',
        }}
      >
        <div className="flex h-full items-center justify-between lg:py-1.5">
          <div className="flex h-full items-center">
            <div className="h-full">
              <Link to="/" className="flex h-full items-center">
                <div className="h-10 w-10">
                  <img src="/logo.svg" alt="Waka Logo" />
                </div>
                <div className="relative ml-2.5 w-[100px]">
                  <img
                    className={cn('absolute', { 'opacity-0': isTop && isHome })}
                    src={'/img/logo waka rose.png'}
                    alt="Waka Logo Text"
                  />
                  <img
                    className={cn({ 'opacity-0': !isTop && !isHome })}
                    src={'/img/logo waka white.png'}
                    alt="Waka Logo Text"
                  />
                </div>
              </Link>
            </div>
          </div>

          <div className='flex gap-3 ml-[20px]'>
            {listCategory?.map((item) => (
              <Link
                key={item.id}
                to={`/category/${item.id}`}
                className="hover:bg-slate-300 px-[5px] rounded-xl py-[0px] cursor-pointe"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex flex-1 justify-center">
            <SearchBookHome isTop={isTop} isHome={isHome} />
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
              <Button
                size="large"
                color="primary"
                variant={isTop && isHome ? 'text' : 'filled'}
                onClick={disclosureSignup.onOpen}
                className={cn({
                  'bg-[rgba(255,255,255,0.12)] text-white hover:bg-[rgba(255,255,255,0.2)]': isTop && isHome,
                })}
                style={{ transition: 'background-color 0.2s cubic-bezier(0.05, 0, 0.2, 1)' }}
              >
                Đăng ký
              </Button>
              <Button
                size="large"
                type="primary"
                onClick={disclosureLogin.onOpen}
                className={cn({
                  'bg-[rgba(255,255,255,0.12)] text-white hover:bg-[rgba(255,255,255,0.2)]': isHome && isTop,
                })}
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
