import { Icon } from '@iconify/react/dist/iconify.js'
import { Button, Divider, Form, Input } from 'antd'
import { LoginDto, useAuthLogin } from '../services/login'
import { CSSProperties } from 'react'
import { useUser } from 'stores/user'
import { toast } from 'sonner'
interface LoginModalProp {
  onSwitchSignup?(): void
  onCloseModal?(): void
}

export default function LoginModal({ onSwitchSignup, onCloseModal }: LoginModalProp) {
  console.log('render login modal')

  const [form] = Form.useForm<LoginDto>()

  const login = useAuthLogin()
  const user = useUser()

  const onSubmit = async (values: LoginDto) => {
    const data = await login.mutateAsync(values)

    user.setTokens({ accessToken: data.data.access_token, refreshToken: data.data.refresh_token })
    toast.success('Đăng nhập thành công')
    onCloseModal?.()
    form.resetFields()
  }

  /** Hàm xử lý chuyển sang modal đăng ký tài khoản */
  const handleSwitchSignup = () => {
    form.resetFields()
    onCloseModal?.()
    onSwitchSignup?.()
  }

  return (
    <>
      <div className="px-2 py-3 text-center">
        <div className="flex justify-center">
          <img width="96" src="/logo.svg" alt="Waka Logo" />
        </div>
        <h2 className="mb-6 mt-4 text-[24px] font-semibold">Đăng Nhập Tài Khoản</h2>
        <div>
          <Form onFinish={onSubmit} form={form} layout="vertical">
            <Form.Item<LoginDto> label="Tên đăng nhập" name="username">
              <Input placeholder="Nhập tên đăng nhập" />
            </Form.Item>
            <Form.Item<LoginDto> label="Mật khẩu" name="password">
              <Input.Password classNames={{ suffix: 'text-[16px]' }} placeholder="Nhập mật khẩu" />
            </Form.Item>
            <div className="mb-4 mt-[-10px] text-end">
              <span className="cursor-pointer hover:text-[rgba(0,0,0,0.65)]">Quên mật khẩu?</span>
            </div>
            <Form.Item className="mb-4" shouldUpdate>
              {() => {
                const disabled = !form.getFieldsValue().username?.length || !form.getFieldsValue().password?.length
                const disabledStyle: CSSProperties = {}
                if (disabled) {
                  disabledStyle.opacity = 0.5
                  disabledStyle.cursor = 'default'
                  disabledStyle.pointerEvents = 'none'
                }

                return (
                  <Button
                    style={disabled ? disabledStyle : {}}
                    htmlType="submit"
                    className="!font-semibold"
                    size="middle"
                    block
                    type="primary"
                    loading={login.isPending}
                  >
                    Đăng nhập
                  </Button>
                )
              }}
            </Form.Item>
            <div className="leading-none">
              <span className="mr-2 text-[13px]">Bạn chưa có tài khoản?</span>
              <span className="cursor-pointer text-[13px] text-primary" onClick={handleSwitchSignup}>
                Đăng ký ngay
              </span>
            </div>
          </Form>
          <Divider style={{ borderColor: 'rgba(0,0,0,0.1)', fontSize: '14px' }} plain>
            Hoặc tiếp tục với
          </Divider>
          <Button
            htmlType="button"
            size="large"
            block
            icon={<Icon width="1.8rem" icon="flat-color-icons:google" />}
            variant="filled"
            color="primary"
          >
            Tiếp tục với Google
          </Button>
        </div>
      </div>
    </>
  )
}
