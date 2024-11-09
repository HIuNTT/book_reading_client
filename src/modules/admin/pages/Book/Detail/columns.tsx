import { DeleteOutlined, EditOutlined, ExclamationCircleFilled, PlusOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd"
import { ColumnsType } from "antd/es/table"
import { BookItem } from "types/book";
import { ChapterItem } from "types/chapter";

export const configChapterColumns = (
  handleSetCurBook: (x: ChapterItem) => void,
  handleReload: () => void,
  handleSetShowModalForm: () => void,
): ColumnsType<ChapterItem>  => {

  const handleClickEdit = (x: ChapterItem) => {
    handleSetCurBook(x);
    handleSetShowModalForm();
    handleReload();
    
  };
  const {confirm} = Modal;

  const showDeleteConfirm = (x: BookItem) => {
    // confirm({
    //   title: 'Delete this item',
    //   icon: <ExclamationCircleFilled style={{ color: 'red' }} />,
    //   content: 'Do you really want to delete this item? This process can not be undone.',
    //   okText: 'Delete',
    //   okType: 'danger',
    //   cancelText: 'Cancel',
    //   onOk: async () => {
    //     try {
          
    //       handleReload();
    //     } catch (error) {
    //       console.error('Error:', error);
    //     }
    //   },
    // });
  };
  return [
    {
      title:'ID',
      dataIndex:'id',
      key:'id',
      width:'10%',
    },
    {
      title:'Tên sách',
      dataIndex:'title',
      key:'title',
      width:'15%',
    },
    {
      title:'Order Chap',
      dataIndex:'order_chap',
      key:'order_chap',
      width:'35%',
    },
    {
      title:'Ten sach',
      dataIndex:'book.title',
      key:'book.title',
      width:'10%',
      render: (_, original) => <div>{original.title}</div>,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      width: '10%',
      render: (_, original) => (
        <div
          style={{
            display: 'flex',
            gap: '6px',
          }}
        >
          <Button
            style={{ padding: '2px 6px', border: 'none' }}
            onClick={() => handleClickEdit(original) }
          >
            <EditOutlined />
          </Button>
          <Button
            style={{ padding: '2px 6px', border: 'none' }}
            // onClick={() => showDeleteConfirm(original)}
          >
            <DeleteOutlined />
          </Button>
        </div>
      ),
    },
  ]
}