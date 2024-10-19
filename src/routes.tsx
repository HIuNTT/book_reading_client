import AdminLayout from 'components/layout/admin'
import { ERole } from 'enums/role'
import Redirect from 'modules/admin/Redirect'
import { adminRoute } from 'modules/admin/route'
import BookDetail from 'modules/bookDetail'
import { lazy } from 'react'
import { Navigate, NonIndexRouteObject, useRoutes } from 'react-router-dom'

const HomePage = lazy(() => import('modules/home/pages/HomePage'))

export type AppRoute = NonIndexRouteObject & {
  path: string
  name: string
  icon?: string
  showOnMenu?: boolean
  role?: ERole
  children?: AppRoute[]
}

function formatRoutes(routes: AppRoute[]): NonIndexRouteObject[] {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return routes.map(({ name, icon, showOnMenu, children, ...rest }) => ({
    ...rest,
    children: children ? formatRoutes(children) : [],
  }))
}

export default function Routes() {
  const element = useRoutes([
    {
      path: '',
      element: <HomePage />,
    },
    {
      path: '*',
      element: <Navigate to="/" />,
    },
    {
      path: '/detail',
      element: <BookDetail />,
    },
    {
      path: '/admin',
      element: (
        <Redirect>
          <AdminLayout />
        </Redirect>
      ),
      children: formatRoutes(adminRoute),
    },
  ])
  return element
}
