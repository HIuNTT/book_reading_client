import AuthLayout from 'components/layout/AuthLayout'
import { Outlet, RouteObject } from 'react-router-dom'
import { lazy } from 'react'

// eslint-disable-next-line react-refresh/only-export-components
const Chapter = lazy(() => import('./pages/Chapter'))

export interface ChapterParams {
  bookId: string
  order: string
}

export const chapterRoute: RouteObject = {
  path: '/book',
  element: (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  ),
  children: [
    {
      path: ':bookId/:order',
      Component: Chapter,
    },
  ],
}
