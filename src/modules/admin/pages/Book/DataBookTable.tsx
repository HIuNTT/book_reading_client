import { Table } from "antd"
import { configColumns } from "./colums"
import { FC, useEffect, useState } from "react";
import { getBooks } from "services/Book";

interface DataBookTableProps {
  handleSetCurBook: (x: API.BookItem) => void;
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

  const [bookData, setBookData] = useState<API.BookItem[]>([]);

  const handleReload = () => {
    setReload((pre) => !pre);
  };
  const handleSetShowModalForm = () => {
    setShowModalForm(true);
  };

  const handleGetBooks = async () => {
    setLoading(true);
    const res = await getBooks({
      title: currentName,
      status:currentStatus,
      authorId:currentAuthorId,
      categoryId:currentCategoryId,
      page: 0,
      size: 1,
      sort: "",
    });
    setBookData(res);
    setLoading(false);
  };

  useEffect(() => {
    handleGetBooks();
  }, [reload, currentName, currentStatus, currentAuthorId, currentCategoryId]);

  return (
    <div className="">
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