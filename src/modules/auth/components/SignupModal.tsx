import { Button, Form, Input } from 'antd'
import { SignupDto, useAuthSignup } from '../services/signup'
import { CSSProperties } from 'react'
import { toast } from 'sonner'

interface SignupModalProp {
  onSwitchLogin?(): void
  onCloseModal?(): void
}

export default function SignupModal({ onSwitchLogin, onCloseModal }: SignupModalProp) {
  const [form] = Form.useForm<SignupDto>()

  const signup = useAuthSignup()

  const onSubmit = async (data: SignupDto) => {
    await signup.mutateAsync(data)
    toast.success('Đăng ký tài khoản thành công')
    onCloseModal?.()
    form.resetFields()
  }

  /** Hàm xử lý chuyển sang modal đăng nhập */
  const handleSwitchLogin = () => {
    form.resetFields()
    onCloseModal?.()
    onSwitchLogin?.()
  }

  return (
    <>
      <div className="px-2 py-3">
        <div className="flex justify-center">
          <img width="96" src="/logo.svg" alt="Waka Logo" />
        </div>
        <h2 className="mb-6 mt-4 text-center text-[24px] font-semibold">Đăng Ký Tài Khoản</h2>
        <Form name="Signup" form={form} layout="vertical" onFinish={onSubmit}>
          <Form.Item<SignupDto> required label="Tên đăng nhập" name="username">
            <Input placeholder="Nhập tên đăng nhập" />
          </Form.Item>
          <Form.Item<SignupDto>
            required
            label="Email"
            name="email"
            rules={[{ type: 'email', message: 'Email không đúng định dạng' }]}
          >
            <Input placeholder="Nhập tài khoản email" />
          </Form.Item>

          <Form.Item<SignupDto>
            required
            label="Mật khẩu"
            name="password"
            rules={[{ min: 8, max: 20, message: 'Mật khẩu phải có độ dài từ 8 đến 20 ký tự' }]}
          >
            <Input.Password classNames={{ suffix: 'text-[16px]' }} placeholder="Mật khẩu" />
          </Form.Item>

          <Form.Item<SignupDto>
            required
            className="mb-7"
            label="Nhập lại mật khẩu"
            name="rePassword"
            dependencies={['password']}
            validateFirst
            rules={[
              { min: 8, max: 20, message: 'Mật khẩu phải có độ dài từ 8 đến 20 ký tự' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('Nhập lại mật khẩu mới chưa trùng khớp'))
                },
              }),
            ]}
          >
            <Input.Password classNames={{ suffix: 'text-[16px]' }} placeholder="Nhập lại mật khẩu" />
          </Form.Item>

          <Form.Item className="mb-4" shouldUpdate>
            {() => {
              const disabled =
                !form.getFieldsValue().email?.length ||
                !form.getFieldsValue().password?.length ||
                !form.getFieldsValue().rePassword?.length
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
                  block
                  type="primary"
                  loading={signup.isPending}
                >
                  Đăng ký
                </Button>
              )
            }}
          </Form.Item>
          <div className="text-center leading-none">
            <span className="mr-2 text-[13px] opacity-85">Bạn đã có tài khoản?</span>
            <span className="cursor-pointer text-[13px] font-bold" onClick={handleSwitchLogin}>
              Đăng nhập ngay
            </span>
          </div>
        </Form>
      </div>
    </>
  )
}
