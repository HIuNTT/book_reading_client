import AccountLayout from 'components/layout/AccountLayout'
import { nav } from 'constants/nav'
import { AppRoute } from 'routes'
import { lazy } from 'react'
import PrivateRoute from 'PrivateRoute'
import { ERole } from 'enums/role'

// eslint-disable-next-line react-refresh/only-export-components
const Profile = lazy(() => import('./pages/Profile'))

export const accountRoute: AppRoute = {
  path: nav.ACCOUNT.slice(1),
  element: <PrivateRoute roles={[ERole.USER, ERole.ADMIN]} element={<AccountLayout />} />,
  children: [
    {
      path: nav.PROFILE.slice(1),
      Component: Profile,
    },
  ],
}
