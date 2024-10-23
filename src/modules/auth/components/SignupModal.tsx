import { Icon } from '@iconify/react'
import { Button, Divider, Form, Input } from 'antd'
import { SignupDto } from '../services/signup'
import { CSSProperties } from 'react'

interface SignupModalProp {
  onSwitchLogin?(): void
  onCloseModal?(): void
}

export default function SignupModal({ onSwitchLogin, onCloseModal }: SignupModalProp) {
  const [form] = Form.useForm<SignupDto>()

  const onSubmit = (data: SignupDto) => {
    console.log(data)
  }

  /** Hàm xử lý chuyển sang modal đăng nhập */
  const handleSwitchLogin = () => {
    form.resetFields()
    onCloseModal?.()
    onSwitchLogin?.()
  }

  return (
    <>
      <h1 className="mb-6 text-center text-2xl font-semibold">Đăng Ký Tài Khoản</h1>
      <div className="px-14">
        <Form name="Signup" form={form} layout="vertical" onFinish={onSubmit}>
          <Form.Item<SignupDto>
            required
            label="Email"
            name="email"
            rules={[{ type: 'email', message: 'Email không đúng định dạng' }]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item<SignupDto>
            required
            label="Mật khẩu"
            name="password"
            extra="Mật khẩu bao gồm ít nhất 6 ký tự"
            rules={[{ min: 6, max: 20, message: 'Mật khẩu phải có độ dài từ 6 đến 20 ký tự' }]}
          >
            <Input.Password classNames={{ suffix: 'text-[16px]' }} placeholder="Mật khẩu" />
          </Form.Item>

          <Form.Item<SignupDto>
            extra="Mật khẩu bao gồm ít nhất 6 ký tự"
            required
            label="Nhập lại mật khẩu"
            name="rePassword"
            dependencies={['password']}
            validateFirst
            rules={[
              { min: 6, max: 20, message: 'Mật khẩu phải có độ dài từ 6 đến 20 ký tự' },
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

          <Form.Item shouldUpdate>
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
                  shape="round"
                  size="large"
                  block
                  type="primary"
                >
                  Đăng ký
                </Button>
              )
            }}
          </Form.Item>

          <Divider style={{ borderColor: 'rgba(0,0,0,0.1)', fontSize: '15px' }} plain>
            Hoặc tiếp tục với
          </Divider>

          <Form.Item>
            <Button
              htmlType="button"
              shape="round"
              size="large"
              block
              icon={<Icon width="1.8rem" icon="flat-color-icons:google" />}
              variant="filled"
              color="primary"
            >
              Tiếp tục với Google
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Divider className="border-black/20" plain />
      <div className="text-center">
        <span className="mr-2 text-[15px]">Bạn đã có tài khoản?</span>
        <span className="text-primary cursor-pointer text-[15px]" onClick={handleSwitchLogin}>
          Đăng nhập ngay
        </span>
      </div>
    </>
  )
}
