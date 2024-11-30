import StarIcon from '/img/star_icon.png'
import BookIcon from '/img/book_icon.png'
import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { BookItem } from 'types/book';
import { useNavigate, useParams } from 'react-router-dom';
import { getBookInfo } from 'modules/book/services';
import { ChapterItem } from 'types/chapter';
import { getChapterList } from 'modules/chapter';
import { FeedbackItem } from 'types/feadback';
import { getFeedbackList } from 'modules/feedback';
import { FormOutlined } from '@ant-design/icons';
import ModalWrite from './Tab/Feedback/ModalWrite';

const Detail = () => {
  const paramUrl = useParams();
  const [bookDetail, setBookDetail] = useState<BookItem>();
  const bookId = Number(paramUrl.id);
  const navigate = useNavigate();

  const [total, setTotal] = useState<number>();
  const [feadbackList, setFeedbackList] = useState<FeedbackItem[]>([]);
  const handleGetFeedbacks = async () => {
    const res = await getFeedbackList({ bookId: bookId })
    setFeedbackList(res.content);
    setTotal(res.total_elements);
  }
  const handleGetBookDetail = async () => {
    const res = await getBookInfo(bookId);
    setBookDetail({ ...res, id: bookId });
  };
  const [chapterList, setChapterList] = useState<ChapterItem[]>([]);
  const handleGetChapters = async () => {
    const res = await getChapterList({ bookId: bookId })
    setChapterList(res.content)
  }
  const [showModalForm, setShowModalForm] = useState<boolean>(false);

  useEffect(() => {
    handleGetFeedbacks();
    handleGetBookDetail();
    handleGetChapters();
  }, []);

  return (
    <div className="flex gap-[80px] mt-3 w-full pl-[40px] bg-black">
      <div className="sticky top-[20%] h-full w-[310px] mr-15">
        <div className=" relative h-[450px] bg-gray-200 mb-10">
          <img src={bookDetail?.thumbnail_url} alt="" />
        </div>
      </div>
      <div className="content-between w-[45%]">
        <div className="pb-4 border-b-[1px] border-b-white">
          <h1 className="text-white text-[30px]">{bookDetail?.title}</h1>
          <div className="flex mt-4 gap-6">
            <div className="flex items-center ">
              <span className="text-white block mr-1">{bookDetail?.avg_rating}</span>
              <div className='flex items-center justify-center mr-2'>
                {bookDetail?.avg_rating == 5 ?
                  <>
                    <img className='w-4 h-6' src={StarIcon}></img>
                    <img className='w-4 h-6' src={StarIcon}></img>
                    <img className='w-4 h-6' src={StarIcon}></img>
                    <img className='w-4 h-6' src={StarIcon}></img>
                    <img className='w-4 h-6' src={StarIcon}></img>
                  </> : bookDetail?.view == 4 ?
                    <>
                      <img className='w-4 h-6' src={StarIcon}></img>
                      <img className='w-4 h-6' src={StarIcon}></img>
                      <img className='w-4 h-6' src={StarIcon}></img>
                      <img className='w-4 h-6' src={StarIcon}></img>
                    </>
                    : bookDetail?.view == 3 ?
                      <>
                        <img className='w-4 h-6' src={StarIcon}></img>
                        <img className='w-4 h-6' src={StarIcon}></img>
                        <img className='w-4 h-6' src={StarIcon}></img></>
                      : bookDetail?.view == 2 ?
                        <>
                          <img className='w-4 h-6' src={StarIcon}></img>
                          <img className='w-4 h-6' src={StarIcon}></img></>
                        : <img className='w-4 h-6' src={StarIcon}></img>
                }
              </div>
            </div>
          </div>
          <div className='mt-4 grid grid-cols-2'>
            <div className='col-span-1'>
              <p className='text-[16px] text-gray-400'>Tác giả</p>
              <p className='text-[20px] text-white'>{bookDetail?.author.name}</p>
            </div>
            <div className='col-span-1'>
              <p className='text-[16px] text-gray-400'>Thể loại</p>
              <p className='text-[20px] text-white'>{bookDetail?.category_book.map((item) => item.category_name)}</p>
            </div>
          </div>
        </div>
        <div className='mt-[30px]'>
          <div className='mt-3'>
            <button onClick={() => navigate(`/book/${bookId}/:oder`)} className='rounded-full w-[230px] px-4 py-3 cursor-pointer flex justify-center items-center bg-green-400'>
              <img src={BookIcon} alt="" className='mr-2' />
              <p className='text-white text-[20px]'>Đọc sách</p>
            </button>
          </div>
          <div className='my-[20px]'>
            <div className='text-white text-justify'>
              <span className='break-words'>  {bookDetail?.summary}</span>
            </div>
          </div>
        </div>
        <div className='text-white mt-[20px] text-[24px]'>Độc giả nói gì về {bookDetail?.title}</div>
        <div className="text-white py-4 px-6 rounded-xl bg-[#262729]">
          <div className="flex items-center">
            <div className="mr-10">
              <div className='flex items-center justify-center gap-3'>
                <h5 className="font-bold text-[50px] text-white">{bookDetail?.avg_rating}</h5>
                <img className='w-4 h-6' src={StarIcon} />
              </div>
              <p className="text-white text-[16px]">{total} danh gia</p>
            </div>
            <div>
              <Button className='rounded-full' onClick={() => setShowModalForm(true)}>
                <FormOutlined />
                Viết đánh giá
              </Button>
            </div>

          </div>
          {feadbackList.map((item, index) =>
            <div key={index} className=" mt-[30px] p-6 mb-[10px] bg-[#3c3f43] rounded-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={item.user.avatar_url} alt="" className="w-[42px] h-[42px] rounded-full object-cover bg-slate-400" />
                  <h5 className="text-white">{item.user.name}</h5>
                </div>
                <div className="text-white">
                  {item.last_updated}
                </div>
              </div>
              <div className="pl-14 flex items-center justify-between text-[16px] text-white mt-2">
                <span>{item.content}</span>
                <img className='w-4 h-6' src={StarIcon}></img>
              </div>
            </div>
          )}
        </div>
        <div className='mt-[10px]'>
          <h2 className='text-[30px]'>Danh sách chương</h2>
          {chapterList.map((item) => (
            <div className='border-b-[1px] h-[50px] hover:cursor-pointer' onClick={() => navigate(`/book/${bookId}/${item.order_chap}`)}>
              <p className='text-[20px] text-white'>{item.title}</p>
            </div>
          ))}
        </div>
      </div>
      <ModalWrite
        showModal={showModalForm}
        setShowModal={setShowModalForm}
        bookId={bookId}
      />
    </div>
  )
};

export default Detail;