import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DataChapterTable from "./DataChapterTable";
import { getBookInfo } from "modules/book/services";
import { ChapterItem } from "types/chapter";
import { BookItem } from "types/book";
import CreatUpateForm from "./CreateUpdateForm";

const Chapter = () => {

  const [curChapter, setCurChapter] = useState<ChapterItem>();
  const [reload, setReload] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showModalForm, setShowModalForm] = useState<boolean>(false);

  const handleSetCurChapter = (x: ChapterItem) => {
    setCurChapter(x);
  };
  const navigate = useNavigate();
  const paramUrl = useParams();

  const [bookDetail, setBookDetail] = useState<BookItem>();

  const bookId = Number(paramUrl.id);
  const handleGetBookDetail = async () => {
    const res = await getBookInfo(bookId);
    setBookDetail(res);
  };
  useEffect(() => {
    handleGetBookDetail();
  }, []);
  return (
    <div className="ml-[10px]">
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
      <div className="my-[10px] ml-[20px]">
        <Button
          type="primary"
          style={{
            display: 'flex',
            gap: '2px',
            alignItems: 'center',
          }}
          onClick={() => setShowModalForm(true)}
        >
          <PlusOutlined />
          <span>
            Add
          </span>
        </Button>
      </div>
      <DataChapterTable
        handleSetCurChapter={handleSetCurChapter}
        reload={reload}
        setReload={setReload}
        setShowModalForm={setShowModalForm}
        bookId={bookId}
        loading={loading}
        setLoading={setLoading}
      />
      <CreatUpateForm
        showModal={showModalForm}
        setShowModal={setShowModalForm}
        curItem={curChapter}
        setReload={setReload}
        setCurChapter={setCurChapter} 
        bookId={bookId}
      />
    </div>
  )
}

export default Chapter;