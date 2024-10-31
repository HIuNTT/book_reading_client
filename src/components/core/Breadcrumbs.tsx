import { Breadcrumb } from 'antd'
import { BreadcrumbProps, ItemType } from 'antd/es/breadcrumb/Breadcrumb'
import { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AppRoute } from 'routes'

interface BreadcrumbsProps {
  routes: AppRoute[]
}

export default function Breadcrumbs({ routes }: BreadcrumbsProps) {
  const { pathname } = useLocation()

  const breadcrumbItems = useMemo(() => {
    const result: ItemType[] = []
    const findRoutes = (items: AppRoute[]) => {
      for (const item of items) {
        if (pathname.startsWith(item.path)) {
          result.push({ path: item.path, title: item.name })
          if (item.children) {
            findRoutes(item.children)
          }
          if (pathname === item.path) break
        }
      }
    }
    findRoutes(routes)
    return result
  }, [pathname, routes])

  const itemRender: BreadcrumbProps['itemRender'] = (currentRoute, _params, items) => {
    const isLast = currentRoute?.path === items[items.length - 1]?.path

    return isLast ? <span>{currentRoute.title}</span> : <Link to={currentRoute.path!}>{currentRoute.title}</Link>
  }

  return !!breadcrumbItems.length && <Breadcrumb className="mb-4" itemRender={itemRender} items={breadcrumbItems} />
}
