import { Link, useNavigate, useParams } from 'react-router-dom'
import { BookParams } from '../route'
import { useGetBookInfo } from '../services'
import { useLayoutEffect } from 'react'
import { ItemType } from 'antd/lib/breadcrumb/Breadcrumb'
import { Breadcrumb, Col, Row, theme, Typography } from 'antd'

export default function Book() {
  const { bookId } = useParams<keyof BookParams>()

  const navigate = useNavigate()

  const { token } = theme.useToken()

  const { data: bookInfo, isError } = useGetBookInfo(Number(bookId), !!Number(bookId))

  useLayoutEffect(() => {
    if (!bookId || !Number(bookId) || isError) {
      navigate('/')
    }
  }, [bookId, navigate, isError])

  const items: ItemType[] = [
    {
      title: <Link to="/">Trang chủ</Link>,
    },
    {
      title: bookInfo?.title,
    },
  ]

  return (
    <div className="mx-auto box-content max-w-[1520px] px-[50px] pb-[60px] min-[1024px]:px-[60px] xxxl:px-0">
      <Breadcrumb items={items} className="pt-[18px]" />
      <Row gutter={30}>
        <Col span={24} xxl={8} lg={9} className="">
          <div className="relative mx-auto mb-4 before:block before:pt-[146.25%] max-xl:max-w-[400px]">
            <img
              className="absolute inset-0 h-full w-full bg-[rgb(31,31,31)] object-fill"
              src={bookInfo?.thumbnail_url}
              style={{ backgroundColor: token.colorBgElevated, borderRadius: token.borderRadius }}
              alt={bookInfo?.title}
            />
            <div
              className="absolute bottom-0 h-[84px] w-full rounded-b-md"
              style={{
                backgroundImage: 'linear-gradient(-180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.55) 80%)',
              }}
            ></div>
          </div>
        </Col>
        <Col span={24} xxl={16} lg={15}>
          <Typography.Title
            className="text-center text-[24px] capitalize md:text-[28px] lg:text-left xxl:text-[38px]"
            level={3}
          >
            {bookInfo?.title}
          </Typography.Title>
        </Col>
      </Row>
      <Typography.Paragraph
        className="whitespace-pre-wrap text-[13px] md:text-[14px] md:leading-[21px] xxxl:text-base"
        ellipsis={{ rows: 3, expandable: true, symbol: 'Xem thêm' }}
      >
        {bookInfo?.summary}
      </Typography.Paragraph>
    </div>
  )
}
