import { FC, useEffect, useState } from 'react';
import StarIcon from '/img/star_icon.png'
import { FeedbackItem } from 'types/feadback';
import { getFeedbackList } from 'modules/feedback';
import { BookItem } from 'types/book';
import { Button } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import ModalWrite from './ModalWrite';
import { ChapterItem } from 'types/chapter';
import { getChapterList } from 'modules/chapter';
import { useNavigate } from 'react-router-dom';

interface DataFeedbackProps {
  bookDetail: BookItem | undefined
}

const Feedback: FC<DataFeedbackProps> = (bookDetail) => {
  const [total, setTotal] = useState<number>();
  const [feadbackList, setFeedbackList] = useState<FeedbackItem[]>([]);
  const handleGetFeedbacks = async () => {
    const res = await getFeedbackList({ bookId: bookDetail.bookDetail?.id || null })
    setFeedbackList(res.content);
    setTotal(res.total_elements);
  }

  
  const navigate = useNavigate()
  // const [feedbackUser, setFeedbackUser] = useState<FeedbackItem>();
  // const handleGetFeedbackUser = async () => {
  //   const res = await getFeedbackUser({ bookId: bookDetail.bookDetail?.id || null });
  //   setFeedbackUser(res)
  // }

  const [showModalForm, setShowModalForm] = useState<boolean>(false);
  const bookId = Number(bookDetail.bookDetail?.id);

  useEffect(() => {
    // handleGetFeedbackUser();
    handleGetFeedbacks();
  
  }, [])
  return (
    <div className="mt-5 mb-10">
      <div className="text-white py-4 px-6 rounded-xl bg-[#262729]">
        <div className="flex items-center">
          <div className="mr-10">
            <div className='flex items-center justify-center gap-3'>
              <h5 className="font-bold text-[50px] text-white">{bookDetail.bookDetail?.view}</h5>
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

        {/* {feedbackUser ? <>
          <div className=" mt-[30px] p-6 mb-[10px] bg-[#3c3f43] rounded-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={feedbackUser?.user.avatar_url} alt="" className="w-[42px] h-[42px] rounded-full object-cover bg-slate-400" />
                <h5 className="text-white">{feedbackUser.user.name}</h5>
              </div>
              <div className="text-white">
                {feedbackUser.last_updated}
              </div>
            </div>
            <div className="pl-14 flex items-center justify-between text-[16px] text-white mt-2">
              <span>{feedbackUser.content}</span>
              <img className='w-4 h-6' src={StarIcon}></img>
            </div>
          </div>
        </> : <></>
        } */}

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
      <ModalWrite
        showModal={showModalForm}
        setShowModal={setShowModalForm}
        bookId={bookId}
      />
    </div>
  )
};

export default Feedback