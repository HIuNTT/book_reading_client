import { ClockCircleOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Menu, MenuProps, Space, theme, Typography } from 'antd'
import { queryClient } from 'configs/queryClient'
import { nav } from 'constants/nav'
import { EGender } from 'enums/gender'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useUser } from 'stores/user'

type MenuItem = Required<MenuProps>['items'][number]

const items: MenuItem[] = [
  {
    key: nav.ACCOUNT + nav.PROFILE,
    label: 'Quản lý tài khoản',
    icon: <UserOutlined />,
  },
  {
    key: nav.ACCOUNT + nav.HISTORY,
    label: 'Lịch sử đọc',
    icon: <ClockCircleOutlined />,
  },
  { type: 'divider' },
  {
    key: nav.ACCOUNT + '/logout',
    label: 'Đăng xuất',
    icon: <LogoutOutlined />,
    type: 'item',
  },
]

export default function AccountLayout() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const { user, clear } = useUser()

  const { token } = theme.useToken()

  const handleMenuItemClick: MenuProps['onClick'] = ({ key }) => {
    if (pathname === key) return
    if (key === nav.ACCOUNT + '/logout') {
      queryClient.clear()
      clear()
      navigate('/')
    } else {
      navigate(key)
    }
  }

  return (
    <div className="mx-auto">
      <div className="flex">
        <div
          className="sticky ml-4 h-[calc(100vh-var(--app-home-header-height))] min-w-[250px] px-5 max-[1023px]:hidden sm:ml-8 xxl:ml-16 xxxl:w-[340px]"
          style={{ borderRight: `1px solid ${token.colorSplit}` }}
        >
          <Space size={16} className="w-full py-6 pl-5">
            <Avatar
              size={50}
              src={
                user.avatar_url || (user.gender === EGender.FEMALE ? '/avatar/female-130.png' : '/avatar/male-130.png')
              }
            />
            <Typography.Title className="mb-0" level={4}>
              {user.name}
            </Typography.Title>
          </Space>
          <Menu defaultSelectedKeys={[pathname]} className="border-0" items={items} onClick={handleMenuItemClick} />
        </div>
        <div className="flex-1 pt-5 md:pt-6 min-[1024px]:pt-8 xxxl:pt-10">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
