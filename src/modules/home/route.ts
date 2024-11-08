import { lazy } from 'react'
import { AppRoute } from 'routes'

const HomePage = lazy(() => import('./pages/HomePage'))

export const homeRoute: AppRoute = {
  path: '/',
  Component: HomePage,
}
