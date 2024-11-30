import { DeleteOutlined, EditOutlined, ExclamationCircleFilled, PlusOutlined } from "@ant-design/icons";
import { Button, message, Modal, Tag, Tooltip } from "antd"
import { ColumnsType } from "antd/es/table"
import { deleteBook } from "modules/book/services";
import { useNavigate } from "react-router-dom";
import { BookItem } from "types/book";
import { FormatDay } from "utils/datetime";

export const configColumns = (
  handleSetCurBook: (x: BookItem) => void,
  handleReload: () => void,
  handleSetShowModalForm: () => void,
): ColumnsType<BookItem>  => {

  const handleClickEdit = (x: BookItem) => {
    handleSetCurBook(x);
    handleSetShowModalForm();
    handleReload();
    
  };
  const {confirm} = Modal;
  const navigate = useNavigate();

  const showDeleteConfirm = (x: BookItem) => {
    confirm({
      title: 'Delete this item',
      icon: <ExclamationCircleFilled style={{ color: 'red' }} />,
      content: 'Bạn có muốn xóa sách này không?',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          await deleteBook(x?.id ?? -1).then(() => {
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
      width:'5%',
    },
    {
      title:'Tên sách',
      dataIndex:'title',
      key:'title',
      width:'15%',
    },
    {
      title:'Tóm tắt',
      dataIndex:'summary',
      key:'summary',
      width:'30%',
      render: (text: string) => (
        <span>
          {text.length > 100 ? `${text.slice(0, 100)}...` : text}
        </span>
      ),
    },
    {
      title:'Tác giả',
      dataIndex:'author',
      key:'author',
      width:'10%',
      render: (_, origin) => (
        <div>{origin.author?.name}</div>
      )
    },
    {
      title:'Trạng thái',
      dataIndex:'status',
      key:'status',
      width:'10%',
    },
    {
      title:'Ngày tạo',
      dataIndex:'created_at',
      key:'created_at',
      width:'10%',
      render: (_, original) => {
        return <div>{FormatDay(original.created_at ?? '')}</div>;
      },
    },
    {
        title: "Category",
        dataIndex: 'category_book',
        key: 'category_book',
        render: (_, original) => (
          <div
            style={{
              display: 'flex',
              gap: '2px',
              flexWrap: 'wrap',
            }}
          >
            {!original.category_book?.length && ' - '}
            {original.category_book?.map((member, indexM) => {
              return <>{indexM <= 4 && <Tag style={{ fontSize: '13px' }}>{member.category_name}</Tag>}</>;
            })}
            {original.category_book && original.category_book?.length > 5 && (
              <Tooltip
                color="#FFF"
                placement="bottom"
                title={
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      rowGap: '6px',
                      backgroundColor: '#FFF',
                    }}
                  >
                    {original.category_book?.map((member, indexM) => {
                      return (
                        <>{indexM > 4 && <Tag style={{ fontSize: '13px' }}>{member.category_name}</Tag>}</>
                      );
                    })}
                  </div>
                }
              >
                <Tag style={{ cursor: 'pointer' }}>...</Tag>
              </Tooltip>
            )}
          </div>
        ),
        width: '45%',
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
          <Button
            style={{ padding: '2px 6px', border: 'none' }}
            onClick={() => navigate(`/admin/book/detail/${original.id}`)}
          >
           <PlusOutlined /> Add Chapter
          </Button>
        </div>
      ),
    },
  ]
}