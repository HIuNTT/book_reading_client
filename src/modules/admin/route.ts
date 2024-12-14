import { authorAdminRoute } from 'modules/author/route'
import { categoryAdminRoute } from 'modules/category/route'
import { lazy } from 'react'
import { AppRoute } from 'routes'

const Dashboard = lazy(() => import('./pages/Dashboard'))
const Book = lazy(() => import('./pages/Book/index'))
const Chapter = lazy(() => import('./pages/Book/Detail/index'))

export const adminRoute: AppRoute[] = [
  {
    path: '/admin',
    name: 'Trang chủ',
    icon: 'ant-design:home-filled',
    showOnMenu: true,
    Component: Dashboard,
  },
  {
    path: '/admin/book',
    name: 'Sách',
    icon: 'ion:book-outline',
    showOnMenu: true,
    children: [
      { path: '/admin/book' },
      {
        path: '/admin/book/list',
        name: 'Tất cả sách',
        showOnMenu: true,
        element: 'Tất cả sách',
        Component: Book,
      },
      {
        path: '/admin/book/detail/:id',
        name: 'Chi tiết sách',
        showOnMenu: false,
        element: 'Chi tiết sách',
        Component: Chapter,
      },
    ],
  },

  { ...categoryAdminRoute },
  { ...authorAdminRoute },
]
