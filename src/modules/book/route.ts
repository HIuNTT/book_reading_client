import { lazy } from 'react'
import { AppRoute } from 'routes'

const BookLibrary = lazy(() => import('./pages/BookLibrary'))

export const libraryRoute: AppRoute = {
  path: 'book-library',
  Component: BookLibrary,
}
