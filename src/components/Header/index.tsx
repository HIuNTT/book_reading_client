import SearchIcon from '@/../../public/img/search_icon.png'
import BellIcon from '@/../../public/img/bell_icon.png'
import UserIcon from '@/../../public/img/user_icon.png'
import HomeIcon from '@/../../public/img/home_icon.png'

const Data = [
  {
    id: 1,
    name: "Loai 1"
  },
  {
    id: 2,
    name: "Loai 2"
  },
  {
    id: 3,
    name: "Loai 3"
  },
  {
    id: 4,
    name: "Loai 4"
  },
  {
    id: 5,
    name: "Loai 5"
  },
];
const Header = () => {
  return (
    <div className="w-full px-[40px] bg-[#e369ac] pt-[5px]">
      <div className="flex justify-between gap-8">
        <div className="flex gap-9 items-center">
          <div className="py-1 px-3">
            <img src={HomeIcon} alt="Home" className='max-w-10 cursor-pointer' />
          </div>
          <div className="flex flex-1 gap-x-5 flex-wrap cursor-pointer">
            {Data.map((item, index) => (
              <div className="py-2" key={index}>{item.name}</div>
            ))}
          </div>
        </div>
        <div className="flex gap-4 h-fit items-center">
          <div className="py-1 px-3">
            <img src={SearchIcon} alt="Search" className='max-w-8 cursor-pointer' />
          </div>
          <div className="py-1 px-3">
            <img src={BellIcon} alt="Bell" className='max-w-8 cursor-pointer' />
          </div>
          <div className="py-1 px-3 rounded-full overflow-hidden">
            <img src={UserIcon} alt="User" className='max-w-8 w-[32px] h-[32px] cursor-pointer' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;