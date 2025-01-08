import { lazy } from 'react'
import { AppRoute } from 'routes'

const AuthorAdmin = lazy(() => import('./pages/AuthorAdmin'))

export const authorAdminRoute: AppRoute = {
  path: '/admin/author',
  name: 'Tác giả',
  icon: 'lucide:user-round',
  showOnMenu: true,
  Component: AuthorAdmin,
}
