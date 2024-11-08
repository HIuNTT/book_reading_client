import { lazy } from 'react'
import { AppRoute } from 'routes'

const CategoryAdmin = lazy(() => import('./pages/CategoryAdmin'))

export const categoryAdminRoute: AppRoute = {
  path: '/admin/category',
  name: 'Thể loại',
  icon: 'bx:category',
  showOnMenu: true,
  Component: CategoryAdmin,
}
