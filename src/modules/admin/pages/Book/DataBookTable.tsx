import { Table } from "antd"
import { configColumns } from "./colums"
import { FC, useEffect, useState } from "react";
import { BookItem } from "types/book";
import { getBookList } from "modules/book/services";

interface DataBookTableProps {
  handleSetCurBook: (x: BookItem) => void;
  reload?: boolean;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
  setShowModalForm: React.Dispatch<React.SetStateAction<boolean>>;
  currentName: string | null;
  currentStatus: string | null;
  currentAuthorId: number | null;
  currentCategoryId: number | null;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
const DataBookTable : FC<DataBookTableProps> = ({
  handleSetCurBook,
  reload,
  setReload,
  setShowModalForm,
  currentName,
  currentStatus,
  currentAuthorId,
  currentCategoryId,
  loading,
  setLoading,
}) => {

  const [bookData, setBookData] = useState<BookItem[]>([]);

  const handleReload = () => {
    setReload((pre) => !pre);
  };
  const handleSetShowModalForm = () => {
    setShowModalForm(true);
  };

  const handleGetBooks = async () => {
    setLoading(true);
    const res = await getBookList({
      title: currentName,
      status: currentStatus,
      authorId: currentAuthorId,
      categoryId: currentCategoryId
    });
    setBookData(res.content);
    setLoading(false);
  };

  useEffect(() => {
    handleGetBooks();
  }, [reload, currentName, currentStatus, currentAuthorId, currentCategoryId]);

  return (
    <div className="my-[5px]">
      <Table
        loading={loading}
        columns={configColumns(handleSetCurBook, handleReload, handleSetShowModalForm)}
        dataSource={bookData}
        pagination={{
          showQuickJumper: true,
          defaultCurrent: 1,
          defaultPageSize: 10,
          total: bookData.length,
        }}
      />
    </div>
  )
}

export default DataBookTable;