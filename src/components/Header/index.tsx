import SearchIcon from '@/../../public/img/search_icon.png'
import BellIcon from '@/../../public/img/bell_icon.png'
import UserIcon from '@/../../public/img/user_icon.png'
import HomeIcon from '@/../../public/img/home_icon.png'

const Data = [
  {
    id: 1,
    name: 'Loai 1',
  },
  {
    id: 2,
    name: 'Loai 2',
  },
  {
    id: 3,
    name: 'Loai 3',
  },
  {
    id: 4,
    name: 'Loai 4',
  },
  {
    id: 5,
    name: 'Loai 5',
  },
]
const Header = () => {
  return (
    <div className="w-full bg-[#e369ac] px-[40px] pt-[5px]">
      <div className="flex justify-between gap-8">
        <div className="flex items-center gap-9">
          <div className="px-3 py-1">
            <img src={HomeIcon} alt="Home" className="max-w-10 cursor-pointer" />
          </div>
          <div className="flex flex-1 cursor-pointer flex-wrap gap-x-5">
            {Data.map((item, index) => (
              <div className="py-2" key={index}>
                {item.name}
              </div>
            ))}
          </div>
        </div>
        <div className="flex h-fit items-center gap-4">
          <div className="px-3 py-1">
            <img src={SearchIcon} alt="Search" className="max-w-8 cursor-pointer" />
          </div>
          <div className="px-3 py-1">
            <img src={BellIcon} alt="Bell" className="max-w-8 cursor-pointer" />
          </div>
          <div className="overflow-hidden rounded-full px-3 py-1">
            <img src={UserIcon} alt="User" className="h-[32px] w-[32px] max-w-8 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
