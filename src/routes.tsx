import AuthorDetail from 'components/AuthorList/Detail'
import Category from 'components/Category'
import AdminLayout from 'components/layout/admin'
import AuthLayout from 'components/layout/AuthLayout'
import MainLayout from 'components/layout/home'
import { ERole } from 'enums/role'
import { isEmpty } from 'lodash'
import { accountRoute } from 'modules/account/route'
import { adminRoute } from 'modules/admin/route'
import { bookRoute, libraryRoute } from 'modules/book/route'
import BookDetail from 'modules/bookDetail'
import { chapterRoute } from 'modules/chapter/route'
import { homeRoute } from 'modules/home/route'
import PrivateRoute from 'PrivateRoute'
import { lazy } from 'react'
import { Navigate, NonIndexRouteObject, useRoutes } from 'react-router-dom'

const NotFound = lazy(() => import('components/common/NotFound'))

export type AppRoute = NonIndexRouteObject & {
  path: string
  name?: string
  icon?: string
  showOnMenu?: boolean
  roles?: ERole[]
  redirect?: string
  children?: AppRoute[]
}

function formatRoutes(routes: AppRoute[]): NonIndexRouteObject[] {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return routes.map(({ name, icon, showOnMenu, children, redirect, roles, ...rest }) => {
    if (redirect) {
      return {
        ...rest,
        element: <Navigate to={redirect} replace />,
      }
    }

    if (!isEmpty(roles) && rest.element) {
      rest.element = <PrivateRoute roles={roles} element={rest.element} />
    }
    return {
      ...rest,
      children: children ? formatRoutes(children) : [],
    }
  })
}

export default function Routes() {
  const element = useRoutes([
    {
      path: '/book/detail',
      element: (
        <AuthLayout>
          <MainLayout />
        </AuthLayout>
      ),
      children: [
        {
          path: ':id',
          element: <BookDetail />,
        },
      ],
    },
    {
      path: '',
      element: (
        <AuthLayout>
          <MainLayout />
        </AuthLayout>
      ),
      children: [homeRoute, libraryRoute, bookRoute, ...formatRoutes([accountRoute])],
    },
    chapterRoute,
    {
      path: '/admin',
      element: (
        <AuthLayout>
          <PrivateRoute roles={[ERole.ADMIN]} element={<AdminLayout />} />
        </AuthLayout>
      ),
      children: formatRoutes(adminRoute),
    },
    {
      path: '*',
      element: <NotFound />,
    },
    {
      path: '/category/:id',
      element: <Category />,
    },
    {
      path: '/author/:id',
      element: <AuthorDetail />,
    },
  ])
  return element
}
