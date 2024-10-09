import React, { useRef } from 'react';
import ArrowLeft from '@/../../public/img/arrowleft.png'
import ArrowRight from '@/../../public/img/arrowright.png'

const Data = [
  {
    id: 1,
    avt: "Sach 1",
    name: "Sach 1"
  },
  {
    id: 1,
    avt: "Sach 1",
    name: "Sach 1"
  },
  {
    id: 1,
    avt: "Sach 1",
    name: "Sach 1"
  },
  {
    id: 1,
    avt: "Sach 1",
    name: "Sach 1"
  },
  {
    id: 1,
    avt: "Sach 1",
    name: "Sach 1"
  },
  {
    id: 1,
    avt: "Sach 1",
    name: "Sach 1"
  },
  {
    id: 1,
    avt: "Sach 1",
    name: "Sach 1"
  },
  {
    id: 1,
    avt: "Sach 1",
    name: "Sach 1"
  },
  {
    id: 1,
    avt: "Sach 1",
    name: "Sach 1"
  },
  {
    id: 1,
    avt: "Sach 1",
    name: "Sach 1"
  },
  {
    id: 1,
    avt: "Sach 1",
    name: "Sach 1"
  },
  {
    id: 1,
    avt: "Sach 1",
    name: "Sach 1"
  }
];
const Rank: React.FC = () => {
  const itemContainerRef = useRef<HTMLDivElement | null>(null);

  // Số pixel mỗi lần nhấn
  const scrollAmount = 230 * 4; // Chiều rộng của mỗi item

  const scrollLeft = () => {
    if (itemContainerRef.current) {
      itemContainerRef.current.scrollBy({
        top: 0,
        left: -scrollAmount,
        behavior: 'smooth', // Hiệu ứng cuộn mượt mà
      });
    }
  };

  const scrollRight = () => {
    if (itemContainerRef.current) {
      itemContainerRef.current.scrollBy({
        top: 0,
        left: scrollAmount,
        behavior: 'smooth', // Hiệu ứng cuộn mượt mà
      });
    }
  };

  return (
    <div className="w-full mt-[50px] pl-[40px]">
      <div className="flex items-center">
        <h2 className="text-[26px]">Bảng xếp hạng</h2>
      </div>
      <div className="w-full mt-[20px] relative">
      <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full z-10 hover:bg-gray-300"
          onClick={scrollLeft}
        >
            <img src={ArrowLeft} alt="" className='w-[30px] h-[30px]'/>
        </button>

        <div
          className="w-full max-w-full flex overflow-hidden whitespace-nowrap"
          ref={itemContainerRef}
        >
          {Data.map((item, index) => (
            <div
              key={index}
              className="cursor-pointer w-[230px] mr-[40px] flex-shrink-0"
            >
              <div className="w-full h-[300px] bg-gray-200">
                <img src={item.avt} alt="" />
              </div>
              <div className="w-full mt-[5px]">{item.name}</div>
            </div>
          ))}
        </div>

        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full z-10 hover:bg-gray-300"
          onClick={scrollRight}
        >
          <img src={ArrowRight} alt="" className='w-[30px] h-[30px] bg-none' />
        </button>
      </div>
    </div>
  );
};

export default Rank;
