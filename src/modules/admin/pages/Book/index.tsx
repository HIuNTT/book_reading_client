import { Button, Input, Select, Typography } from "antd";
import DataBookTable from "./DataBookTable";
import CreatUpateForm from "./CreateUpdateForm";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import { BookItem } from "types/book";
import { Author } from "types/author";
import { getAuthorList } from "modules/author/services/getAuthorList";
import { Category } from "types/category";
import { getCategoryList } from "modules/category/services/getCategoryList";

const { Title } = Typography;

export const statusSelect = [
  { label: 'Chưa hoàn thành', value: "Chưa hoàn thành" },
  { label: 'Hoàn thành', value: "Hoàn thành" },
];


const Book = () => {
  const [curBook, setCurBook] = useState<BookItem>();
  const [reload, setReload] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showModalForm, setShowModalForm] = useState<boolean>(false);
  const [currentName, setCurrentName] = useState<string | null>(null);
  const [currentStatus, setCurrentStatus] = useState<string | null>(null);
  const [currentAuthorId, setCurrentAuthorId] = useState<number | null>(null);
  const [currentCategoryId, setCurrentCategoryId] = useState<number | null>(null);
  const [listAuthor, setListAuthor] = useState<Author[]>();
  const [listCategory, setListCategory] = useState<Category[]>();

  const handleGetListAuthor = async () => {
    const res = await getAuthorList();
    if (res) {
      setListAuthor(res.content);
    }
  };

  const handleGetListCategory = async () => {
    const res = await getCategoryList();
    if (res) {
      setListCategory(res.content);
    }
  };

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
    <div className="mx-[5px]">
      <Title level={3}>Danh sach sach</Title>
      <div className="flex gap-3 mb-[12px] justify-between">
        <div className="w-full flex gap-2">
          <Input
            style={{
              width: '200px',
              marginBottom: '24px',
              padding:'0px 11px'
            }}
            placeholder='Search by name'
            prefix={<SearchOutlined />}
            onChange={(e) => handleNameChange(e.target.value)}
            allowClear
          />

          <Select
            allowClear
            placeholder="Search by status"
            style={{
              width: '200px',
              marginBottom: '24px',
            }}
            options={statusSelect.map((op) => ({ label: op.label, value: op.value }))}
            onChange={handleStatusChange}
          />

          <Select
            allowClear
            placeholder="Search by author"
            style={{
              width: '200px',
              marginBottom: '24px',
            }}
            options={listAuthor?.map((op) => ({ label: op.name, value: op.id }))}
            onChange={handleAuthorIdChange}
          />
          <Select
            allowClear
            placeholder="Search by category"
            style={{
              width: '200px',
              marginBottom: '24px',
            }}
            options={listCategory?.map((op) => ({ label: op.name, value: op.id }))}
            onChange={handleCategoryIdChange}
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
        listAuthor={listAuthor}
        setListAuthor={setListAuthor}
        handleGetListAuthor={handleGetListAuthor}
        listCategory={listCategory}
        setListCategory={setListCategory}
        handleGetListCategory={handleGetListCategory}
      />
    </div>
  )
}

export default Book