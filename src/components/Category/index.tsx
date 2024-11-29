import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";
import Header from "components/layout/home/Header";
import { getBookList } from "modules/book/services";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BookItem } from "types/book";

const Category = () => {

  const { Title } = Typography;
  const navigate = useNavigate();
  const paramUrl = useParams();
  const categoryId = Number(paramUrl.id);

  const [bookData, setBookData] = useState<BookItem[]>([]);
  const handleGetBookList = async () => {
    const res = await getBookList({categoryId: categoryId});
    setBookData(res.content);
  };

  useEffect(() => {
    handleGetBookList();
  },[])

  return (
    <div>
      <Header />
      <div
        style={{
          display: 'flex',
          gap: '8px',
          height: '24px',
          alignItems: 'center',
          marginBottom: '4px',
        }}
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
          style={{
            fontSize: '22px',
            fontWeight: 600,
            lineHeight: '24px',
          }}
        >
           
        </div>
      </div>
    </div>
  )
}
export default Category;