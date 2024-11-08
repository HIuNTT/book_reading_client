import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="mb-[-30px] max-w-[400px]">
        <img src="/img/404-bg.png" alt="404 bg" />
      </div>
      <div className="text-center text-xl font-bold">
        Ối, <br /> trang không tồn tại!
      </div>
      <div className="mt-2">
        <div className="text-center text-sm text-[#7a7a7a]">
          Không tìm thấy trang bạn yêu cầu. <br /> Hy vọng bạn tìm được cách quay lại!
        </div>
      </div>
      <div className="mt-8">
        <Button className="min-w-80 max-w-80 font-bold" size="large" type="primary" onClick={() => navigate('/')}>
          Trở Về Trang Chủ
        </Button>
      </div>
    </div>
  )
}
