import { lazy } from 'react'
import { Navigate, useRoutes } from 'react-router-dom'

const HomePage = lazy(() => import('modules/home/pages/HomePage'))

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
  ])
  return element
}
