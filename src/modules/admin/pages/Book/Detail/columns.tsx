import { DeleteOutlined, EditOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { Button, message, Modal } from "antd"
import { ColumnsType } from "antd/es/table"
import { deleteChapter } from "modules/chapter";
import { BookItem } from "types/book";
import { ChapterItem } from "types/chapter";

export const configChapterColumns = (
  handleSetCurChapter: (x: ChapterItem) => void,
  handleReload: () => void,
  handleSetShowModalForm: () => void,
): ColumnsType<ChapterItem>  => {

  const handleClickEdit = (x: ChapterItem) => {
    handleSetCurChapter(x);
    handleSetShowModalForm();
    handleReload();
    
  };
  const {confirm} = Modal;

  const showDeleteConfirm = (x: BookItem) => {
    confirm({
      title: 'Delete this item',
      icon: <ExclamationCircleFilled style={{ color: 'red' }} />,
      content: 'Bạn có muốn xóa chương này không?',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          await deleteChapter(x?.id ?? -1).then(() => {
            message.success('Delete successfully!');
          });
          handleReload();
        } catch (error) {
          console.error('Error:', error);
        }
      },
    });
  };
  return [
    {
      title:'ID',
      dataIndex:'id',
      key:'id',
      width:'10%',
    },
    {
      title:'Tên chương',
      dataIndex:'title',
      key:'title',
      width:'15%',
    },
    {
      title:'Order Chap',
      dataIndex:'order_chap',
      key:'order_chap',
      width:'15%',
    },
    {
      title:'Tên sách',
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
            onClick={() => showDeleteConfirm(original)}
          >
            <DeleteOutlined />
          </Button>
        </div>
      ),
    },
  ]
}