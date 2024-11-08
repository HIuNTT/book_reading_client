import { Icon } from '@iconify/react'
import { Avatar, Dropdown, Layout, theme } from 'antd'
import type { MenuProps } from 'antd'
import { EGender } from 'enums/gender'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useUser } from 'stores/user'

interface HeaderProps {
  collapsed: boolean
  toggle: () => void
}

export default function Header({ collapsed, toggle }: HeaderProps) {
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const navigate = useNavigate()

  const { user, clear } = useUser()

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'Cài đặt',
      icon: <Icon icon="uil:setting" />,
      onClick: () => {
        toast.info('Tính năng sẽ sớm phát triển')
      },
    },
    {
      type: 'divider',
    },
    {
      key: '2',
      label: 'Đăng xuất',
      icon: <Icon icon="material-symbols:logout" />,
      onClick: () => {
        clear()
        navigate('/')
      },
    },
  ]

  return (
    <Layout.Header
      style={{ background: colorBgContainer }}
      className="flex h-[var(--app-header-height)] items-center justify-between px-5"
    >
      <div onClick={toggle} className="cursor-pointer">
        <span>
          {collapsed ? (
            <Icon width="1.1rem" icon="ant-design:menu-unfold-outlined" />
          ) : (
            <Icon width="1.1rem" icon="ant-design:menu-fold-outlined" />
          )}
        </span>
      </div>
      <div className="cursor-pointer">
        <Dropdown menu={{ items }} placement="bottomRight">
          <Avatar
            size="large"
            src={
              user.avatar_url || (user.gender === EGender.FEMALE ? '/avatar/female-130.png' : '/avatar/male-130.png')
            }
          />
        </Dropdown>
      </div>
    </Layout.Header>
  )
}
