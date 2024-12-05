import React, { useEffect, useState } from 'react';
import { BookItem } from 'types/book';
import { getBookList } from 'modules/book/services';
import BookListHome from 'modules/book/components/BookListHome';

const Ngontinh: React.FC = () => {
  const [bookData, setBookData] = useState<BookItem[]>([]) 
  const handleGetBooks = async () => {
    const res = await getBookList({categoryId:1})
    setBookData(res.content)
  } 

  useEffect(() => {
    handleGetBooks()
  },[])

  return (
    <div>
      <BookListHome books={bookData} title='Ngôn tình' />
    </div>
  );
};

export default Ngontinh;
