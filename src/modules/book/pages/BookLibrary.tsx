import { Col, Empty, Row, Typography } from 'antd'
import ButtonRead from 'components/common/ButtonRead'
import { categories } from 'constants/category'
import { statuses } from 'constants/status'
import { Link, useLocation } from 'react-router-dom'
import { useGetBookListInfinite } from '../services'
import { useEffect, useState } from 'react'
import { cn } from 'utils/cn'
import LoadingIcon from 'components/common/LoadingIcon'
import { useInView } from 'react-intersection-observer'
import qs from 'qs'

const sortOptions: { key: string; lable: string }[] = [
  { key: 'view,desc', lable: 'Lượt đọc' },
  { key: 'createdAt,desc', lable: 'Mới phát hành' },
]

export default function BookLibrary() {
  const { search } = useLocation()
  const { value } = qs.parse(search, { ignoreQueryPrefix: true })

  const [categoryId, setCategoryId] = useState<number>(value ? Number(value) : 0)
  const [status, setStatus] = useState<string | undefined>(undefined)
  const [sort, setSort] = useState<string>('view,desc')

  const getBookList = useGetBookListInfinite({ size: 12, ...(categoryId && { categoryId }), status, sort }, true)

  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView) {
      getBookList.fetchNextPage()
    }
  }, [inView, getBookList.fetchNextPage])

  return (
    <div className="px-[50px] pb-[60px] min-[1024px]:px-[60px] min-[1680px]:px-[190px]">
      <div>
        <div className="mt-6 flex first:mt-4 min-[1024px]:mt-4 min-[1024px]:first:mt-6">
          <div className="mr-4 w-[88px] max-w-[120px] shrink-0 text-right text-base leading-[30px] max-[1023px]:hidden">
            Thể loại
          </div>
          <div className="flex cursor-pointer flex-wrap gap-2 overflow-hidden">
            {categories.map((category) => (
              <div
                key={category.id}
                onClick={() => setCategoryId(category.id)}
                className={cn(
                  'rounded-md bg-[rgba(18,18,18,0.08)] px-3 py-[10px] leading-4 text-[rgb(62,62,65)] hover:text-textColor',
                  { 'text-primary hover:text-primary': category.id === categoryId },
                )}
              >
                {category.name}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 flex min-[1024px]:mt-4">
          <div className="mr-4 w-[88px] max-w-[120px] shrink-0 text-right text-base leading-[30px] max-[1023px]:hidden">
            Trạng thái
          </div>
          <div className="flex cursor-pointer flex-wrap gap-2 overflow-hidden">
            {statuses.map((statusItem, idx) => (
              <div
                key={idx}
                onClick={() => setStatus(statusItem.value)}
                className={cn(
                  'rounded-md bg-[rgba(18,18,18,0.08)] px-3 py-[10px] leading-4 text-[rgb(62,62,65)] hover:text-textColor',
                  { 'text-primary hover:text-primary': statusItem.value === status },
                )}
              >
                {statusItem.label}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 flex min-[1024px]:mt-4">
          <div className="mr-4 w-[88px] max-w-[120px] shrink-0 text-right text-base leading-[30px] max-[1023px]:hidden">
            Sắp xếp
          </div>
          <div className="flex cursor-pointer flex-wrap gap-2 overflow-hidden">
            {sortOptions.map((option) => (
              <div
                key={option.key}
                onClick={() => setSort(option.key)}
                className={cn(
                  'rounded-md bg-[rgba(18,18,18,0.08)] px-3 py-[10px] leading-4 text-[rgb(62,62,65)] hover:text-textColor',
                  { 'text-primary hover:text-primary': option.key === sort },
                )}
              >
                {option.lable}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8 min-[1024px]:mt-7 xxxl:mt-9">
        {getBookList.isFetching ? (
          <div className="py-4">
            <LoadingIcon />
          </div>
        ) : !!getBookList.data && getBookList.data.pages[0].content.length > 0 ? (
          <Row
            gutter={[
              { xxl: 20, xs: 14, sm: 14, md: 14, lg: 14, xl: 14 },
              { xxl: 50, xs: 40, sm: 40, md: 40, lg: 40, xl: 40 },
            ]}
          >
            {getBookList.data.pages.map((page) =>
              page.content.map((book) => (
                <Col
                  key={book.id}
                  lg={4}
                  className="group cursor-pointer hover:scale-[1.05]"
                  style={{ transition: '0.3s' }}
                  span={6}
                >
                  <Link to={`/book/detail/${book.id}`} className="text-white">
                    <div className="relative">
                      <div className="relative before:block before:pt-[146.25%]">
                        <img
                          className="absolute inset-0 h-full w-full rounded-md bg-[#f5f5f5] object-fill"
                          src={book.thumbnail_url}
                          alt="Book Cover"
                        />
                        <div className="absolute bottom-0 left-0 hidden h-full w-full group-hover:block">
                          <div className="absolute bottom-1/2 left-1/2 size-8 -translate-x-1/2 translate-y-1/2 text-primary hover:text-[rgb(255,87,151)] xxxl:size-10">
                            <ButtonRead />
                          </div>
                          <div
                            className="absolute bottom-0 h-[84px] w-full rounded-b-md"
                            style={{
                              backgroundImage: 'linear-gradient(-180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.55) 80%)',
                            }}
                          ></div>
                        </div>
                        <div
                          className="absolute bottom-0 left-0 right-0 h-12 rounded-b-md"
                          style={{
                            backgroundImage:
                              'linear-gradient(0deg, rgba(10, 12, 15, 0.8) 0%, rgba(10, 12, 15, 0.74) 4%, rgba(10, 12, 15, 0.59) 17%, rgba(10, 12, 15, 0.4) 34%, rgba(10, 12, 15, 0.21) 55%, rgba(10, 12, 15, 0.06) 78%, rgba(10, 12, 15, 0) 100%)',
                          }}
                        >
                          {book.new_chapter && (
                            <div className="absolute bottom-[10px] left-2 right-[10px] overflow-hidden text-ellipsis whitespace-nowrap text-[14px] font-medium tracking-[0px] max-[1680px]:text-[12px]">
                              {`${book.status === 'Hoàn thành' ? 'Trọn bộ' : 'Cập nhật'} ${book.status === 'Hoàn thành' ? book.new_chapter.order_chap.toString() + ' chương' : 'chương ' + book.new_chapter.order_chap.toString()}`}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="pt-[7px] md:pt-[10px]" style={{ transition: 'color 0.3s' }}>
                      <p className="line-clamp-2 font-medium capitalize text-textColor opacity-80 group-hover:text-primary min-[1024px]:text-[16px]">
                        {book.title}
                      </p>
                    </div>
                  </Link>
                </Col>
              )),
            )}

            {getBookList.isFetchingNextPage && (
              <div className="py-4">
                <LoadingIcon />
              </div>
            )}

            {getBookList.hasNextPage && <div ref={ref}></div>}
          </Row>
        ) : (
          <Empty
            className="mt-6"
            imageStyle={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}
            image="/img/no-data.png"
            description={
              <Typography.Text className="text-[22px] font-medium opacity-85">
                Không có nội dung liên quan
              </Typography.Text>
            }
          ></Empty>
        )}
      </div>
    </div>
  )
}
