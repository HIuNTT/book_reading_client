import StarIcon from '/img/star_icon.png'
import BookIcon from '/img/book_icon.png'
import { Button } from 'antd'
import { useEffect, useState } from 'react'
import { BookItem } from 'types/book'
import { useNavigate, useParams } from 'react-router-dom'
import { getBookInfo } from 'modules/book/services'
import { FeedbackItem } from 'types/feadback'
import { getFeedbackList } from 'modules/feedback'
import { ChapterItem } from 'types/chapter'
import { getChapterList } from 'modules/chapter'
import { FormOutlined } from '@ant-design/icons'
import ModalWrite from './Tab/Feedback/ModalWrite'

const Detail = () => {
  const paramUrl = useParams()
  const [bookDetail, setBookDetail] = useState<BookItem>()
  const bookId = Number(paramUrl.id)
  const navigate = useNavigate()
  const [total, setTotal] = useState<number>()
  const [feadbackList, setFeedbackList] = useState<FeedbackItem[]>([])
  const handleGetFeedbacks = async () => {
    const res = await getFeedbackList({ bookId: bookId })
    setFeedbackList(res.content)
    setTotal(res.total_elements)
  }
  const handleGetBookDetail = async () => {
    const res = await getBookInfo(bookId)
    setBookDetail({ ...res, id: bookId })
  }

  const [chapterList, setChapterList] = useState<ChapterItem[]>([])
  const handleGetChapters = async () => {
    const res = await getChapterList({ bookId: bookId })
    setChapterList(res.content)
  }
  const [showModalForm, setShowModalForm] = useState<boolean>(false)

  useEffect(() => {
    handleGetFeedbacks()
    handleGetBookDetail()
    handleGetChapters()
  }, [])

  return (
    <div className="mt-3 flex w-full gap-[80px] bg-black pl-[40px]">
      <div className="mr-15 sticky top-[20%] h-full w-[310px]">
        <div className="relative mb-10 h-[450px] bg-gray-200">
          <img src={bookDetail?.thumbnail_url} alt="" className="w-full" />
        </div>
      </div>
      <div className="w-[45%] content-between">
        <div className="border-b-[1px] border-b-white pb-4">
          <h1 className="text-[30px] text-white">{bookDetail?.title}</h1>
          <div className="mt-4 flex gap-6">
            <div className="flex items-center">
              <span className="mr-1 block text-white">{bookDetail?.avg_rating}</span>
              <div className="mr-2 flex items-center justify-center">
                {bookDetail?.avg_rating == 5 ? (
                  <>
                    <img className="h-6 w-4" src={StarIcon}></img>
                    <img className="h-6 w-4" src={StarIcon}></img>
                    <img className="h-6 w-4" src={StarIcon}></img>
                    <img className="h-6 w-4" src={StarIcon}></img>
                    <img className="h-6 w-4" src={StarIcon}></img>
                  </>
                ) : bookDetail?.avg_rating == 4 ? (
                  <>
                    <img className="h-6 w-4" src={StarIcon}></img>
                    <img className="h-6 w-4" src={StarIcon}></img>
                    <img className="h-6 w-4" src={StarIcon}></img>
                    <img className="h-6 w-4" src={StarIcon}></img>
                  </>
                ) : bookDetail?.avg_rating == 3 ? (
                  <>
                    <img className="h-6 w-4" src={StarIcon}></img>
                    <img className="h-6 w-4" src={StarIcon}></img>
                    <img className="h-6 w-4" src={StarIcon}></img>
                  </>
                ) : bookDetail?.avg_rating == 2 ? (
                  <>
                    <img className="h-6 w-4" src={StarIcon}></img>
                    <img className="h-6 w-4" src={StarIcon}></img>
                  </>
                ) : (
                  <img className="h-6 w-4" src={StarIcon}></img>
                )}
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2">
            <div className="col-span-1">
              <p className="text-[16px] text-gray-400">Tác giả</p>
              <p className="text-[20px] text-white">{bookDetail?.author.name}</p>
            </div>
            <div className="col-span-1">
              <p className="text-[16px] text-gray-400">Thể loại</p>
              <p className="text-[20px] text-white">{bookDetail?.category_book.map((item) => item.category_name)}</p>
            </div>
          </div>
        </div>
        <div className="mt-[30px]">
          <div className="mt-3">
            <button
              onClick={() => navigate(`/book/${bookId}/1`)}
              className="flex w-[230px] cursor-pointer items-center justify-center rounded-full bg-green-400 px-4 py-3"
            >
              <img src={BookIcon} alt="" className="mr-2" />
              <p className="text-[20px] text-white">Đọc sách</p>
            </button>
          </div>
          <div className="my-[20px]">
            <div className="text-justify text-white">
              <span className="break-words"> {bookDetail?.summary}</span>
            </div>
          </div>
        </div>
        <div className="mt-[20px] text-[24px] text-white">Độc giả nói gì về {bookDetail?.title}</div>
        <div className="rounded-xl bg-[#262729] px-6 py-4 text-white">
          <div className="flex items-center">
            <div className="mr-10">
              <div className="flex items-center justify-center gap-3">
                <h5 className="text-[50px] font-bold text-white">{bookDetail?.avg_rating}</h5>
                <img className="h-6 w-4" src={StarIcon} />
              </div>
              <p className="text-[16px] text-white">{total} danh gia</p>
            </div>
            <div>
              <Button className="rounded-full" onClick={() => setShowModalForm(true)}>
                <FormOutlined />
                Viết đánh giá
              </Button>
            </div>
          </div>
          {feadbackList.map((item, index) => (
            <div key={index} className="mb-[10px] mt-[30px] rounded-xl bg-[#3c3f43] p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={item.user.avatar_url}
                    alt=""
                    className="h-[42px] w-[42px] rounded-full bg-slate-400 object-cover"
                  />
                  <h5 className="text-white">{item.user.name}</h5>
                </div>
                <div className="text-white">{item.last_updated}</div>
              </div>
              <div className="mt-2 flex items-center justify-between pl-14 text-[16px] text-white">
                <span>{item.content}</span>
                <img className="h-6 w-4" src={StarIcon}></img>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-[10px]">
          <h2 className="text-[30px]">Danh sách chương</h2>
          {chapterList.map((item) => (
            <div
              className="h-[50px] border-b-[1px] hover:cursor-pointer"
              onClick={() => navigate(`/book/${bookId}/${item.order_chap}`)}
            >
              <p className="text-[20px] text-white">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
      <ModalWrite showModal={showModalForm} setShowModal={setShowModalForm} bookId={bookId} />
    </div>
  )
}

export default Detail
