import React, { useEffect, useState } from 'react';
import { BookItem } from 'types/book';
import { getBookList } from 'modules/book/services';
import BookListHome from 'modules/book/components/BookListHome';

const VanHocVN: React.FC = () => {
  const [bookData, setBookData] = useState<BookItem[]>([]) 
  const handleGetBooks = async () => {
    const res = await getBookList({categoryId:4})
    setBookData(res.content)
  } 

  useEffect(() => {
    handleGetBooks()
  },[])

  return (
    <div>
      <BookListHome books={bookData} title='Văn học Việt Nam' />
    </div>
  );
};

export default VanHocVN;
