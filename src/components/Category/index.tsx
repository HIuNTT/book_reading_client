import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Header from "components/layout/home/Header";
import BookItemHome from "modules/book/components/BookItemHome";
import { getBookList } from "modules/book/services";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BookItem } from "types/book";

const Category = () => {
  const navigate = useNavigate();
  const paramUrl = useParams();
  const categoryId = Number(paramUrl.id);

  const [bookData, setBookData] = useState<BookItem[]>([]);
  const handleGetBookList = async () => {
    const res = await getBookList({ categoryId: categoryId });
    setBookData(res.content);
  };

  useEffect(() => {
    handleGetBookList();
  }, [])

  return (
    <div>
      <Header />
      <div
      className="w-full p-[20px]"
      >
        <Button
          style={{
            border: 'none',
            backgroundColor: 'transparent',
            boxShadow: 'unset',
            padding: '0',
          }}
          onClick={() => navigate('/')}
        >
          <ArrowLeftOutlined />
        </Button>
        <div
          className="grid grid-cols-5 gap-4 mt-[10px]"
        >
          {bookData.map((item) => (
            <div className="">
              <BookItemHome bookItem={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default Category;