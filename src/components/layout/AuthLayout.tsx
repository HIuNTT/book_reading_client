import PageLoading from 'components/common/PageLoading'
import { useGetUserInfo } from 'modules/user/services/getUserInfo'
import { PropsWithChildren, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useUser } from 'stores/user'

export default function AuthLayout({ children }: PropsWithChildren) {
  const [loading, setLoading] = useState<boolean>(true)

  const { setUser, clear, tokens } = useUser()

  const getUserInfo = useGetUserInfo(!!(tokens.accessToken || tokens.refreshToken))

  useEffect(() => {
    if (getUserInfo.data) {
      setUser(getUserInfo.data)
    }
    if (getUserInfo.isError) {
      clear()
      toast.error('Lỗi không xác định. Vui lòng đăng nhập lại!')
    }
  }, [clear, getUserInfo.data, getUserInfo.isError, setUser])

  useEffect(() => {
    if (getUserInfo.isSuccess || getUserInfo.isError || !tokens.accessToken) {
      setLoading(false)
    }
  }, [getUserInfo.isSuccess, getUserInfo.isError, tokens.accessToken])

  if (!loading) {
    return children
  }

  return <PageLoading />
}
