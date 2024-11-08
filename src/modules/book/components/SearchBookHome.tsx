import { Input } from 'antd'

export default function SearchBookHome() {
  return (
    <div className="w-full md:max-w-full xl:max-w-[480px]">
      <div className="flex p-3">
        {/* <div>Icon</div>
        <input type="text" className="border-none outline-none" placeholder="Tìm sách" /> */}
        <Input variant="filled" />
      </div>
    </div>
  )
}
