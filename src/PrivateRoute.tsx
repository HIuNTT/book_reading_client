import NotFound from 'components/common/NotFound'
import { ERole } from 'enums/role'
import { Navigate, PathRouteProps } from 'react-router-dom'
import { useUser } from 'stores/user'

export interface PrivateRouteProps extends PathRouteProps {
  roles?: ERole[]
}

export default function PrivateRoute({ roles, ...props }: PrivateRouteProps) {
  const { tokens, user } = useUser()
  const role = user.role.name || ERole.USER

  return tokens.accessToken ? (
    roles?.includes(role) ? (
      props.element
    ) : (
      <NotFound />
    )
  ) : roles?.includes(ERole.ADMIN) ? (
    <NotFound />
  ) : (
    <Navigate to="/" replace />
  )
}
