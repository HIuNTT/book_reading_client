import { Icon } from '@iconify/react'
import { Button, Card, Col, Divider, Form, Input, Popconfirm, Row, Space, Table, TableProps, Tooltip } from 'antd'
import Breadcrumbs from 'components/core/Breadcrumbs'
import useDisclosure from 'hooks/useDisclosure'
import { adminRoute } from 'modules/admin/route'
import { Category } from 'types/category'
import CategoryModal from '../components/CategoryModal'
import { useState } from 'react'
import useGetCategoryList, { CategoryListParams } from '../services/getCategoryList'
import { queryClient } from 'configs/queryClient'
import { useDeleteCategory } from '../services/deleteCategory'
import { toast } from 'sonner'

export default function CategoryAdmin() {
  console.log('render category')

  const [form] = Form.useForm<{ search: string }>()

  const [reqQuery, setReqQuery] = useState<CategoryListParams>({ size: 10, page: 1 })
  const [currentRow, setCurrentRow] = useState<Category>()

  const getCategoryList = useGetCategoryList(reqQuery)
  const deleteCategory = useDeleteCategory()

  const disclosureCategory = useDisclosure()

  const columns: TableProps<Category>['columns'] = [
    {
      title: 'Mã thể loại',
      dataIndex: 'id',
      width: 100,
      align: 'center',
      fixed: 'left',
    },
    {
      title: 'Tên thể loại',
      dataIndex: 'name',
      align: 'left',
      fixed: 'left',
    },
    {
      title: 'Thời gian thêm',
      dataIndex: 'createdAt',
      width: 200,
      align: 'center',
    },
    {
      title: 'Thời gian cập nhật',
      dataIndex: 'updatedAt',
      width: 200,
      align: 'center',
    },
    {
      title: 'Thao tác',
      fixed: 'right',
      align: 'center',
      width: 100,
      render: (_, record: Category) => {
        return (
          <div className="flex items-center justify-center">
            <Tooltip title="Sửa thông tin thể loại" placement="bottom">
              <Button
                type="link"
                size="small"
                icon={<Icon width="1rem" icon="ant-design:edit-outlined" />}
                onClick={() => {
                  setCurrentRow(record)
                  disclosureCategory.onOpen()
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
              onConfirm={() => delCategory(record)}
              okButtonProps={{ loading: deleteCategory.isPending }}
            >
              <Tooltip title="Xóa thể loại này" placement="bottom">
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

  const handleTableChange: TableProps<Category>['onChange'] = ({ current, pageSize }) => {
    queryClient.removeQueries({ queryKey: ['categoryList'], exact: true })
    setReqQuery({ ...reqQuery, page: current, size: pageSize })
  }

  const onSubmit = (data: { search: string }) => {
    queryClient.removeQueries({ queryKey: ['categoryList'], exact: true })
    setReqQuery({ ...reqQuery, page: 1, name: data.search || undefined })
  }

  const handleResetForm = () => {
    form.resetFields()
    queryClient.removeQueries({ queryKey: ['categoryList'], exact: true })
    setReqQuery({ ...reqQuery, page: 1, name: undefined })
  }

  const delCategory = (record: Category) => {
    deleteCategory.mutate(record.id, {
      onSuccess: () => {
        queryClient.removeQueries({ queryKey: ['categoryList'], exact: true })
        toast.success('Xóa thể loại thành công')
        setReqQuery({ ...reqQuery, page: 1 })
      },
    })
  }

  const handleModalOnSuccess = () => {
    queryClient.removeQueries({ queryKey: ['categoryList'], exact: true })
    disclosureCategory.onClose()
    setReqQuery({ ...reqQuery, page: 1 })
  }

  return (
    <div>
      <div className="px-10 pb-4 pt-2">
        <Breadcrumbs routes={adminRoute} />
        <div className="mb-1 mt-3">
          <span className="block overflow-hidden text-ellipsis whitespace-nowrap text-xl font-semibold capitalize leading-8">
            Quản lý thể loại
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
                  label="Tên thể loại"
                  labelCol={{ style: { display: 'flex', alignItems: 'center' } }}
                >
                  <Input allowClear placeholder="Nhập tên thể loại" />
                </Form.Item>
              </Col>
              <Col span={24} md={12} lg={16}>
                <div className="text-right">
                  <Form.Item>
                    <Space size="middle">
                      <Button htmlType="button" onClick={handleResetForm}>
                        Nhập Lại
                      </Button>
                      <Button loading={getCategoryList.isFetching} htmlType="submit" type="primary">
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
                  disclosureCategory.onOpen()
                }}
              >
                Thêm thể loại
              </Button>
            </div>
          </div>
          <Table<Category>
            columns={columns}
            pagination={{ current: reqQuery.page, pageSize: reqQuery.size, showQuickJumper: true }}
            dataSource={getCategoryList.data}
            rowKey="id"
            scroll={{ x: 'max-content' }}
            loading={getCategoryList.isFetching}
            onChange={handleTableChange}
          />
        </Card>
      </div>
      <CategoryModal
        open={disclosureCategory.isOpen}
        record={currentRow}
        onCancel={disclosureCategory.onClose}
        onSuccess={handleModalOnSuccess}
      />
    </div>
  )
}
