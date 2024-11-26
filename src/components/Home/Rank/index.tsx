import React, { useEffect, useState } from 'react';
import { BookItem } from 'types/book';
import { getBookList } from 'modules/book/services';
import BookListHome from 'modules/book/components/BookListHome';

const Rank: React.FC = () => {
  const [bookData, setBookData] = useState<BookItem[]>([]) 
  const handleGetBooks = async () => {
    const res = await getBookList({
      sort: 'avgRating,desc'
    })
    setBookData(res.content)
  } 

  useEffect(() => {
    handleGetBooks()
  },[])

  return (
    <div>
      <BookListHome books={bookData} title='Bảng xếp hạng' />
    </div>
    // <div className="w-full mt-[50px] pl-[40px]">
    //   <div className="flex items-center">
    //     <h2 className="text-[26px]">Bảng xếp hạng</h2>
    //   </div>
    //   <div className="w-full mt-[20px] relative">
    //   <button
    //       className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full z-10 hover:bg-gray-300"
    //       onClick={scrollLeft}
    //     >
    //         <img src={ArrowLeft} alt="" className='w-[30px] h-[30px]'/>
    //     </button>

    //     <div
    //       className="w-full max-w-full flex overflow-hidden whitespace-nowrap"
    //       ref={itemContainerRef}
    //     >
    //       {bookData.map((item, index) => (
    //         <div
    //           key={index}
    //           className="cursor-pointer w-[230px] mr-[40px] flex-shrink-0"
    //         >
    //           <div className="w-full h-[300px] bg-gray-200">
    //             <img src={item.thumbnail_url} alt="" />
    //           </div>
    //           <div className="w-full mt-[5px]">{item.title}</div>
    //         </div>
    //       ))}
    //     </div>

    //     <button
    //       className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full z-10 hover:bg-gray-300"
    //       onClick={scrollRight}
    //     >
    //       <img src={ArrowRight} alt="" className='w-[30px] h-[30px] bg-none' />
    //     </button>
    //   </div>
    // </div>
  );
};

export default Rank;
