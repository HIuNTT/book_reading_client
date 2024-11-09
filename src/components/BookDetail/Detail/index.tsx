import StarIcon from '/img/star_icon.png'
import BookIcon from '/img/book_icon.png'
import Comment from './Tab/Comment';
import Feedback from './Tab/Feedback';
import { Tabs } from 'antd';

const Detail = () => {

  const listTabs = [
    {
      id: 1,
      label: "Binh luan",
      children: <Comment />,
    },
    {
      id: 2,
      label: "Danh gia & Nhan xet",
      children: <Feedback />,
    },
  ];

  const data = {
    id: 1,
    avata: "",
    name: "Sach 1",
    tacgia: "tac gia",
    theloai: "the loai",
    nhaxuatban: "nha xuat ban",
    sosao: 5,
    soluongdanhgia: 20,
    mota: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  }
  return (
    <div className="flex gap-[80px] mt-3 w-full pl-[40px] bg-black">
      <div className="sticky top-[10%] h-full w-[310px] mr-15">
        <div className=" relative h-[450px] bg-gray-200 mb-10">
          <img src={data.avata} alt="" />
        </div>
      </div>
      <div className="content-between w-[45%]">
        <div className="pb-4 border-b-[1px] border-b-white">
          <h1 className="text-white text-[30px]">{data.name}</h1>
          <div className="flex mt-4 gap-6">
            <div className="flex items-center ">
              <span className="text-white block mr-1">{data.sosao}</span>
              <div className='flex items-center justify-center mr-2'>
                {data.sosao == 5 ?
                  <>
                    <img className='w-4 h-6' src={StarIcon}></img>
                    <img className='w-4 h-6' src={StarIcon}></img>
                    <img className='w-4 h-6' src={StarIcon}></img>
                    <img className='w-4 h-6' src={StarIcon}></img>
                    <img className='w-4 h-6' src={StarIcon}></img>
                  </>
                  : data.sosao >= 4 ?
                    <>
                      <img className='w-4 h-6' src={StarIcon}></img>
                      <img className='w-4 h-6' src={StarIcon}></img>
                      <img className='w-4 h-6' src={StarIcon}></img>
                      <img className='w-4 h-6' src={StarIcon}></img>
                    </>
                    : data.sosao >= 3 ?
                      <>
                        <img className='w-4 h-6' src={StarIcon}></img>
                        <img className='w-4 h-6' src={StarIcon}></img>
                        <img className='w-4 h-6' src={StarIcon}></img></>
                      : data.sosao >= 2 ?
                        <>
                          <img className='w-4 h-6' src={StarIcon}></img>
                          <img className='w-4 h-6' src={StarIcon}></img></>
                        : <img className='w-4 h-6' src={StarIcon}></img>
                }
              </div>
              <p className='text-white'>* {data.soluongdanhgia} danh gia</p>
            </div>
          </div>
          <div className='mt-4 grid grid-cols-2'>
            <div className='col-span-1'>
              <p className='text-[16px] text-gray-400'>Tác giả</p>
              <p className='text-[20px] text-white'>{data.tacgia}</p>
            </div>
            <div className='col-span-1'>
              <p className='text-[16px] text-gray-400'>Thể loại</p>
              <p className='text-[20px] text-white'>{data.theloai}</p>
            </div>
            <div className='col-span-1'>
              <p className='text-[16px] text-gray-400'>Nhà xuất bản</p>
              <p className='text-[20px] text-white'>{data.nhaxuatban}</p>
            </div>
          </div>
        </div>
        <div className='mt-[30px]'>
          <div className='mt-3'>
            <button className='rounded-full w-[230px] px-4 py-3 cursor-pointer flex justify-center items-center bg-green-400'>
              <img src={BookIcon} alt="" className='mr-2' />
              <p className='text-white text-[20px]'>Đọc sách</p>
            </button>
          </div>
          <div className='my-15'>
            <div className='text-white text-justify'>
              <span className='break-words'>  {data.mota}</span>
            </div>
          </div>
        </div>
        <div className='text-white mt-[20px] text-[24px]'>Độc giả nói gì về {data.name}</div>
        <div>
          <Tabs
            tabPosition="top"
            items={listTabs.map((item, index) => {
              const id = String(index + 1);
              return {
                label: <span className="text-white">{item.label}</span>,
                key: id,
                children: item.children,
              };
            })}
          />
        </div>
      </div>
    </div>
  )
};

export default Detail;