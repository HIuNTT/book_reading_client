import { Button, Input, Typography } from "antd";
import DataBookTable from "./DataBookTable";
import CreatUpateForm from "./CreateUpdateForm";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import { BookItem } from "types/book";

const { Title } = Typography;

const Book = () => {
  const [curBook, setCurBook] = useState<BookItem>();
  const [reload, setReload] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showModalForm, setShowModalForm] = useState<boolean>(false);
  const [currentName, setCurrentName] = useState<string | null>(null);
  const [currentStatus, setCurrentStatus] = useState<string | null>(null);
  const [currentAuthorId, setCurrentAuthorId] = useState<number | null>(null);
  const [currentCategoryId, setCurrentCategoryId] = useState<number | null>(null);

  const handleSetCurBook = (x: BookItem) => {
    setCurBook(x);
  };
  const handleNameChange = (x: string) => {
    setCurrentName(x);
  };
  const handleStatusChange = (x: string) => {
    setCurrentStatus(x);
  };
  const handleAuthorIdChange = (x: number) => {
    setCurrentAuthorId(x);
  };
  const handleCategoryIdChange = (x: number) => {
    setCurrentCategoryId(x);
  };

  return (
    <div>
      <Title level={3}>Danh sach sach</Title>
      <div className="flex gap-3 mb-[12px] justify-between">
        <div className="w-full flex gap-2">
          <Input
            style={{
              width: '200px',
              marginBottom: '24px',
            }}
            placeholder='Search by name'
            prefix={<SearchOutlined />}
            onChange={(e) => handleNameChange(e.target.value)}
            allowClear
          />
          <Input
            style={{
              width: '200px',
              marginBottom: '24px',
            }}
            placeholder='Search by status'
            prefix={<SearchOutlined />}
            onChange={(e) => handleStatusChange(e.target.value)}
            allowClear
          />
          <Input
            style={{
              width: '200px',
              marginBottom: '24px',
            }}
            placeholder='Search by author'
            prefix={<SearchOutlined />}
            onChange={(e) => handleAuthorIdChange(e.target.valueAsNumber)}
            allowClear
          />
          <Input
            style={{
              width: '200px',
              marginBottom: '24px',
            }}
            placeholder='Search by category'
            prefix={<SearchOutlined />}
            onChange={(e) => handleCategoryIdChange(e.target.valueAsNumber)}
            allowClear
          />
        </div>
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
      <DataBookTable
        handleSetCurBook={handleSetCurBook}
        reload={reload}
        setReload={setReload}
        setShowModalForm={setShowModalForm}
        currentName={currentName}
        currentStatus={currentStatus}
        currentAuthorId={currentAuthorId}
        currentCategoryId={currentCategoryId}
        loading={loading}
        setLoading={setLoading}
      />
      <CreatUpateForm
        showModal={showModalForm}
        setShowModal={setShowModalForm}
        curItem={curBook}
        setReload={setReload}
        setCurBook={setCurBook} 
      />
    </div>
  )
}

export default Book