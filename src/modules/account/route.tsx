/* eslint-disable react-refresh/only-export-components */
import AccountLayout from 'components/layout/AccountLayout'
import { nav } from 'constants/nav'
import { AppRoute } from 'routes'
import { lazy } from 'react'
import PrivateRoute from 'PrivateRoute'
import { ERole } from 'enums/role'

const Profile = lazy(() => import('./pages/Profile'))
const ReadingHistory = lazy(() => import('./pages/ReadingHistory'))

export const accountRoute: AppRoute = {
  path: nav.ACCOUNT.slice(1),
  element: <PrivateRoute roles={[ERole.USER, ERole.ADMIN]} element={<AccountLayout />} />,
  children: [
    {
      path: nav.PROFILE.slice(1),
      Component: Profile,
    },
    {
      path: nav.HISTORY.slice(1),
      Component: ReadingHistory,
    },
  ],
}
