import { lazy } from 'react'
import { AppRoute } from 'routes'

const Dashboard = lazy(() => import('./pages/Dashboard'))
const Book = lazy(() => import('./pages/Book/index'))

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
      { path: '/admin/book', redirect: '/admin/book/list' },
      {
        path: '/admin/book/list',
        name: 'Tất cả sách',
        showOnMenu: true,
        element: 'Tất cả sách',
        Component: Book,
      },
      {
        path: '/admin/book/add',
        name: 'Thêm sách mới',
        showOnMenu: true,
        element: 'Thêm sách mới',
      },
    ],
  },
  {
    path: '/admin/category',
    name: 'Thể loại',
    icon: 'bx:category',
    showOnMenu: true,
    element: 'Thể loại',
  },
  {
    path: '/admin/chapter',
    name: 'Chương',
    icon: 'grommet-icons:chapter-add',
    showOnMenu: true,
    children: [
      { path: '/admin/chapter', redirect: '/admin/chapter/list' },
      {
        path: '/admin/chapter/list',
        name: 'Tất cả chương',
        showOnMenu: true,
        element: 'Tất cả chương',
      },
      {
        path: '/admin/chapter/add',
        name: 'Thêm chương mới',
        showOnMenu: true,
        element: 'Thêm chương mới',
      },
    ],
  },
  {
    path: '/admin/banner',
    name: 'Banner',
    icon: 'bi:badge-ad',
    showOnMenu: true,
    children: [
      { path: '/admin/banner', redirect: '/admin/banner/list' },
      {
        path: '/admin/banner/list',
        name: 'Tất cả banner',
        showOnMenu: true,
        element: 'Tất cả banner',
      },
      {
        path: '/admin/banner/add',
        name: 'Thêm banner mới',
        showOnMenu: true,
        element: 'Thêm banner mới',
      },
    ],
  },
  {
    path: '/admin/recommend',
    name: 'Đề xuất',
    icon: 'tabler:file-ai',
    showOnMenu: true,
    children: [
      { path: '/admin/recommend', redirect: '/admin/recommend/list' },
      {
        path: '/admin/recommend/list',
        name: 'Sửa module',
        showOnMenu: true,
        element: 'Tất cả module',
      },
    ],
  },
]
