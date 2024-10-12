import BookDetail from 'modules/bookDetail'
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
    {
      path: '/detail',
      element: <BookDetail />,
    },
  ])
  return element
}
