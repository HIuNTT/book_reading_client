import { Icon } from '@iconify/react'
import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Popconfirm,
  Row,
  Space,
  Table,
  TableProps,
  Tooltip,
} from 'antd'
import Breadcrumbs from 'components/core/Breadcrumbs'
import useDisclosure from 'hooks/useDisclosure'
import { adminRoute } from 'modules/admin/route'
import { Category } from 'types/category'

import { useState } from 'react'

import { queryClient } from 'configs/queryClient'

import { toast } from 'sonner'
import useGetAuthorList, { AuthorListParams } from '../services/getAuthorList'
import { Author } from 'types/author'
import { useDeleteAuthor } from '../services/deleteAuthor'
import AuthorModal from '../components/AuthorModal'
import { UserOutlined } from '@ant-design/icons'

export default function AuthorAdmin() {
  console.log('render author')

  const [form] = Form.useForm<{ search: string }>()

  const [reqQuery, setReqQuery] = useState<AuthorListParams>({ size: 10, page: 1 })
  const [currentRow, setCurrentRow] = useState<Author>()

  const getAuthorList = useGetAuthorList(reqQuery)
  const deleteAuthor = useDeleteAuthor()

  const disclosureAuthor = useDisclosure()

  const columns: TableProps<Author>['columns'] = [
    {
      title: 'Mã tác giả',
      dataIndex: 'id',
      width: 100,
      align: 'center',
    },
    {
      title: 'Ảnh đại diện',
      fixed: 'left',
      dataIndex: 'image',
      align: 'center',
      width: 150,
      render: (image: string) => <Avatar size="large" icon={<UserOutlined />} src={image} />,
    },
    {
      title: 'Tên tác giả',
      width: 200,
      dataIndex: 'name',
      align: 'left',
      fixed: 'left',
    },
    {
      title: 'Mô tả',
      ellipsis: true,
      dataIndex: 'description',
    },
    {
      title: 'Thao tác',
      fixed: 'right',
      align: 'center',
      width: 100,
      render: (_, record: Author) => {
        return (
          <div className="flex items-center justify-center">
            <Tooltip title="Sửa thông tin tác giả" placement="bottom">
              <Button
                type="link"
                size="small"
                icon={<Icon width="1rem" icon="ant-design:edit-outlined" />}
                onClick={() => {
                  setCurrentRow(record)
                  disclosureAuthor.onOpen()
                }}
              />
            </Tooltip>
            <Divider type="vertical" />
            <Popconfirm
              key="del"
              placement="left"
              title="Bạn chắc chắn muốn xóa?"
              okText="Xóa"
              cancelText="Hủy"
              cancelButtonProps={{ type: 'text', danger: true }}
              onConfirm={() => delAuthor(record)}
              okButtonProps={{ loading: deleteAuthor.isPending }}
            >
              <Tooltip title="Xóa tác giả này" placement="bottom">
                <Button
                  type="link"
                  size="small"
                  icon={<Icon width="1rem" icon="ant-design:delete-outlined" />}
                  danger
                />
              </Tooltip>
            </Popconfirm>
          </div>
        )
      },
    },
  ]

  const handleTableChange: TableProps<Author>['onChange'] = ({ current, pageSize }) => {
    queryClient.removeQueries({ queryKey: ['authorList'], exact: true })
    setReqQuery({ ...reqQuery, page: current, size: pageSize })
  }

  const onSubmit = (data: { search: string }) => {
    queryClient.removeQueries({ queryKey: ['authorList'], exact: true })
    setReqQuery({ ...reqQuery, page: 1, name: data.search || undefined })
  }

  const handleResetForm = () => {
    form.resetFields()
    queryClient.removeQueries({ queryKey: ['authorList'], exact: true })
    setReqQuery({ ...reqQuery, page: 1, name: undefined })
  }

  const delAuthor = (record: Category) => {
    deleteAuthor.mutate(record.id, {
      onSuccess: () => {
        queryClient.removeQueries({ queryKey: ['authorList'], exact: true })
        toast.success('Xóa thể loại thành công')
        setReqQuery({ ...reqQuery, page: 1 })
      },
    })
  }

  const handleModalOnSuccess = () => {
    queryClient.removeQueries({ queryKey: ['authorList'], exact: true })
    disclosureAuthor.onClose()
    setReqQuery({ ...reqQuery, page: 1 })
  }

  return (
    <div>
      <div className="px-10 pb-4 pt-2">
        <Breadcrumbs routes={adminRoute} />
        <div className="mb-1 mt-3">
          <span className="block overflow-hidden text-ellipsis whitespace-nowrap text-xl font-semibold capitalize leading-8">
            Quản lý tác giả
          </span>
        </div>
      </div>
      <div className="px-10 pb-8">
        <Card bordered={false} classNames={{ body: '!pb-0' }} className="mb-4 !shadow-none">
          <Form form={form} onFinish={onSubmit}>
            <Row>
              <Col span={24} md={12} lg={8}>
                <Form.Item
                  name="search"
                  label="Tên tác giả"
                  labelCol={{ style: { display: 'flex', alignItems: 'center' } }}
                >
                  <Input allowClear placeholder="Nhập tên tác giả" />
                </Form.Item>
              </Col>
              <Col span={24} md={12} lg={16}>
                <div className="text-right">
                  <Form.Item>
                    <Space size="middle">
                      <Button htmlType="button" onClick={handleResetForm}>
                        Nhập Lại
                      </Button>
                      <Button loading={getAuthorList.isFetching} htmlType="submit" type="primary">
                        Áp Dụng
                      </Button>
                    </Space>
                  </Form.Item>
                </div>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card bordered={false} className="!shadow-none" classNames={{ body: '!py-4' }}>
          <div className="mb-4 flex-col justify-between sm:flex sm:flex-row">
            <div className="mb-3 flex items-center text-[16px] font-medium capitalize sm:mb-0">Danh sách thể loại</div>
            <div className="text-right">
              <Button
                type="primary"
                icon={<Icon icon="ant-design:plus-outlined" />}
                onClick={() => {
                  setCurrentRow(undefined)
                  disclosureAuthor.onOpen()
                }}
              >
                Thêm tác giả
              </Button>
            </div>
          </div>
          <Table<Author>
            columns={columns}
            pagination={{
              current: reqQuery.page,
              pageSize: reqQuery.size,
              showSizeChanger: true,
              showQuickJumper: true,
              total: getAuthorList.data?.total_elements,
              showTotal: (total) => `Tổng ${total} tác giả`,
              size: 'default',
            }}
            dataSource={getAuthorList.data?.content}
            rowKey="id"
            loading={getAuthorList.isFetching}
            onChange={handleTableChange}
          />
        </Card>
      </div>
      <AuthorModal
        open={disclosureAuthor.isOpen}
        record={currentRow}
        onCancel={disclosureAuthor.onClose}
        onSuccess={handleModalOnSuccess}
      />
    </div>
  )
}
