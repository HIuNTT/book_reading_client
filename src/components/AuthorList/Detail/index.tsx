import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Header from "components/layout/home/Header";
import { getAuthor } from "modules/author/services/getAuthor";
import BookItemHome from "modules/book/components/BookItemHome";
import { getBookList } from "modules/book/services";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Author } from "types/author";
import { BookItem } from "types/book";

const AuthorDetail = () => {
  const navigate = useNavigate();
  const paramUrl = useParams();
  const authorId = Number(paramUrl.id);

  const [bookData, setBookData] = useState<BookItem[]>([]);
  const [authorDetail, setAuthorDetail] = useState<Author>();
  const handleGetBookList = async () => {
    const res = await getBookList({ authorId: authorId });
    setBookData(res.content);
  };

  const handleGetAuthorDetail = async () => {
    const res = await getAuthor(authorId);
    setAuthorDetail({ ...res, id: authorId });
  };

  console.log("authorDetail",authorDetail);
  

  useEffect(() => {
    handleGetBookList();
    handleGetAuthorDetail();
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
        <div className="flex flex-col gap-3 items-center justify-center py-[20px]">
            <img src={authorDetail?.image} alt="" className="w-[200px] h-[200px] rounded-full"/>
            <p className="px-[200px]">{authorDetail?.description}</p>
        </div>
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
export default AuthorDetail;