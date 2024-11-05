import { Button, Input, Typography } from "antd";
import DataBookTable from "./DataBookTable";
import CreatUpateForm from "./CreateUpdateForm";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { useState } from "react";

const { Title } = Typography;

const Book = () => {
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