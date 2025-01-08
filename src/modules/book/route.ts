import { nav } from 'constants/nav'
import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

const BookLibrary = lazy(() => import('./pages/BookLibrary'))
const Book = lazy(() => import('./pages/Book'))

export interface BookParams {
  bookId: string
}

export const libraryRoute: RouteObject = {
  path: 'book-library',
  Component: BookLibrary,
}

export const bookRoute: RouteObject = {
  path: nav.BOOK.slice(1),
  children: [
    {
      path: ':bookId',
      Component: Book,
    },
  ],
}
