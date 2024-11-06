import { Table } from "antd"
import { FC, useEffect, useState } from "react";
import { configChapterColumns } from "./columns";

interface DataChapterTableProps {
  handleSetCurBook: (x: API.BookItem) => void;
  reload?: boolean;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
  setShowModalForm: React.Dispatch<React.SetStateAction<boolean>>;
  currentName: string | null;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
const DataChapterTable : FC<DataChapterTableProps> = ({
  handleSetCurBook,
  reload,
  setReload,
  setShowModalForm,
  currentName,
  loading,
  setLoading,
}) => {

  const [bookData, setBookData] = useState<API.BookItem[]>([{
    id: 1,
    title: 'string',
    summary: 'string',
    avg_rating: "string",
    thumbnail: 'string',
    view: 1,
    status: 'string',
    createdAt: 'string',
    updatedAt: 'string',
    createdBy: 1,
    updatedBy: 1,
    deleteAt: 'string',
    authorid: 1,
  }]);
  const handleReload = () => {
    setReload((pre) => !pre);
  };
  const handleSetShowModalForm = () => {
    setShowModalForm(true);
  };


  useEffect(() => {
  }, [reload, currentName]);

  return (
    <div className="">
      <Table
        loading={loading}
        columns={configChapterColumns(handleSetCurBook, handleReload, handleSetShowModalForm)}
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

export default DataChapterTable;