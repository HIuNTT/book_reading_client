import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBookDetail } from "services/Book";
import DataChapterTable from "./DataChapterTable";

const Chapter = () => {

  const [curBook, setCurBook] = useState<API.BookItem>({});
  const [reload, setReload] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentName, setCurrentName] = useState<string | null>(null);
  const [showModalForm, setShowModalForm] = useState<boolean>(false);

  const handleSetCurBook = (x: API.BookItem) => {
    setCurBook(x);
  };
  const handleNameChange = (x: string) => {
    setCurrentName(x);
  };
  const navigate = useNavigate();
  const paramUrl = useParams();

  const [bookDetail, setBookDetail] = useState<API.BookItem>();

  const handleGetBookDetail = async () => {
    const res = await getBookDetail({ bookId: Number(paramUrl.id) });
    setBookDetail(res);
  };
  useEffect(() => {
    handleGetBookDetail();
  }, []);
  return (
    <div>
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
          onClick={() => navigate('/admin/book/list')}
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
          {bookDetail?.title}
        </div>
      </div>
      <DataChapterTable
        handleSetCurBook={handleSetCurBook}
        reload={reload}
        setReload={setReload}
        setShowModalForm={setShowModalForm}
        currentName={currentName}
        loading={loading}
        setLoading={setLoading}
      />
    </div>
  )
}

export default Chapter;