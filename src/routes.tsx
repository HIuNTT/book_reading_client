import AdminLayout from 'components/layout/admin'
import AuthLayout from 'components/layout/AuthLayout'
import MainLayout from 'components/layout/home'
import { ERole } from 'enums/role'
import { isEmpty } from 'lodash'
import { adminRoute } from 'modules/admin/route'
import BookDetail from 'modules/bookDetail'
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

const routes: AppRoute[] = [homeRoute]

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
      path: '',
      element: (
        <AuthLayout>
          <MainLayout />
        </AuthLayout>
      ),
      children: formatRoutes(routes),
    },
    {
      path: '/book/detail/:id',
      element: <BookDetail />,
    },
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
  ])
  return element
}
