import { Table } from "antd"
import { getChapterList } from "modules/chapter";
import { FC, useEffect, useState } from "react";
import { ChapterItem } from "types/chapter";
import { configChapterColumns } from "./columns";

interface DataChapterTableProps {
  handleSetCurChapter: (x: ChapterItem) => void;
  reload?: boolean;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
  setShowModalForm: React.Dispatch<React.SetStateAction<boolean>>;
  bookId: number | null;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
const DataChapterTable : FC<DataChapterTableProps> = ({
  handleSetCurChapter,
  reload,
  setReload,
  setShowModalForm,
  loading,
  bookId,
  setLoading,
}) => {

  const [chapterData, setChapterData] = useState<ChapterItem[]>([]);
  const handleReload = () => {
    setReload((pre) => !pre);
  };
  const handleSetShowModalForm = () => {
    setShowModalForm(true);
  };
  

  const handleGetChapters = async () => {
    setLoading(true);
    const res = await getChapterList({bookId: bookId});
    setChapterData(res.content);
    setLoading(false);
  };


  useEffect(() => {
    handleGetChapters();
  }, [reload]);

  return (
    <div className="">
      <Table
        loading={loading}
        columns={configChapterColumns(handleSetCurChapter, handleReload, handleSetShowModalForm)}
        dataSource={chapterData}
        pagination={{
          showQuickJumper: true,
          defaultCurrent: 1,
          defaultPageSize: 10,
          total: chapterData.length,
        }}
      />
    </div>
  )
}

export default DataChapterTable;