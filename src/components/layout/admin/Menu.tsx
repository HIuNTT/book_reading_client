import { Icon } from '@iconify/react/dist/iconify.js'
import { Menu, MenuProps } from 'antd'
import { adminRoute } from 'modules/admin/route'
import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AppRoute } from 'routes'

type MenuItem = Required<MenuProps>['items'][number]

interface MenuComponentProps {
  collapsed?: boolean
}

const formatMenuItem = (items: AppRoute[]): MenuItem[] => {
  return items
    ?.filter(({ showOnMenu }) => showOnMenu)
    ?.map(({ path, name, icon, children }) => ({
      key: path,
      label: name,
      icon: icon && <Icon icon={icon} />,
      children: children && formatMenuItem(children),
    }))
}

const getOpenKeys = (items1: AppRoute[], pathname: string): string[] => {
  let openKeys: string[] = []
  const findKeys = (items2: AppRoute[], currentOpenKeys: string[] = []) => {
    for (const item of items2) {
      if (pathname.startsWith(item.path)) {
        openKeys = [...currentOpenKeys, item.path]
        if (item.children) {
          findKeys(item.children, openKeys)
        }
        if (item.path === pathname) break
      }
    }
  }
  findKeys(items1)
  return openKeys
}

export default function MenuComponent({ collapsed }: MenuComponentProps) {
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])

  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    setSelectedKeys([pathname])
    if (collapsed) return
    setTimeout(() => {
      setOpenKeys(getOpenKeys(adminRoute, pathname))
    })
  }, [pathname, collapsed])

  const onOpenChange: MenuProps['onOpenChange'] = (openKeys) => {
    setOpenKeys(openKeys)
  }

  const handleMenuItemClick: MenuProps['onClick'] = ({ key }) => {
    if (pathname === key) return
    navigate(key)
  }

  const items = useMemo(() => formatMenuItem(adminRoute), [])

  return (
    <div className="scrollbar-none h-[calc(100vh-var(--app-header-height))] w-full overflow-auto">
      <Menu
        openKeys={openKeys}
        selectedKeys={selectedKeys}
        items={items}
        mode="inline"
        onClick={handleMenuItemClick}
        onOpenChange={onOpenChange}
      />
    </div>
  )
}
