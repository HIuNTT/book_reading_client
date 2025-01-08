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
  );
};

export default Rank;
