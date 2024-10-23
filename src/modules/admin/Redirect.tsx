import { PropsWithChildren, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { adminRoute } from './route'

/** Tự động điều hướng sang route con nếu route cha không có element */
export default function Redirect({ children }: PropsWithChildren) {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const currentRoute = adminRoute.find((route) => route.path === pathname)
    if (currentRoute && !currentRoute.element && !currentRoute.Component) {
      navigate(currentRoute.children?.[0].path || '/admin', { replace: true })
    }
  }, [pathname, navigate])

  return children
}
