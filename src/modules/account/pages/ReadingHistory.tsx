import { Button, Col, Divider, Empty, Row, theme, Typography } from 'antd'
import ButtonRead from 'components/common/ButtonRead'
import LoadingIcon from 'components/common/LoadingIcon'
import { useGetBookHistoryInfinite } from 'modules/book/services/history'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from 'stores/user'

export default function ReadingHistory() {
  const { user } = useUser()

  const navigate = useNavigate()

  const { token } = theme.useToken()

  const {
    data: bookList,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isFetching,
    isLoading,
  } = useGetBookHistoryInfinite({ size: 12 }, !!user.id)

  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage])

  return (
    <div className="mx-auto mb-10 max-w-[1073px] px-[15px] md:px-[50px] min-[1024px]:px-16 xxxl:px-0">
      <div className="text-center text-xl md:text-3xl">Lịch sử đọc</div>
      <div className="mt-3">
        <Divider type="horizontal" />
        {(isFetching && !isFetchingNextPage) || isLoading ? (
          <div className="py-4">
            <LoadingIcon />
          </div>
        ) : !!bookList && bookList.pages[0].content.length > 0 ? (
          <>
            <Row
              gutter={[
                { xs: 7, sm: 7, md: 16, lg: 18, xl: 20, xxl: 24 },
                { xs: 20, sm: 20, md: 20, lg: 30, xl: 30, xxl: 30 },
              ]}
            >
              {bookList.pages.map((page) =>
                page.content.map((book) => (
                  <Col md={6} span={12} sm={8} key={book.id} className="group">
                    <Link to={`/book/${book.id}/${book.chapter_history.order_chap}`} className="text-white">
                      <div className="relative overflow-hidden" style={{ borderRadius: token.borderRadius }}>
                        <div className="relative pt-[146.25%]">
                          <div className="absolute left-0 top-0 h-full w-full">
                            <img
                              className="h-full w-full object-fill"
                              src={book.thumbnail_url}
                              alt={book.title}
                              style={{
                                transition: 'opacity 0.3s',
                                backgroundColor: token.colorBgElevated,
                              }}
                            />
                          </div>
                        </div>
                        <div
                          className="absolute bottom-0 left-0 right-0 h-9"
                          style={{
                            backgroundImage:
                              'linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.04) 6%, rgba(0, 0, 0, 0.09) 12%, rgba(0, 0, 0, 0.13) 19%, rgba(0, 0, 0, 0.18) 26%, rgba(0, 0, 0, 0.24) 34%, rgba(0, 0, 0, 0.29) 42%, rgba(0, 0, 0, 0.35) 50%, rgba(0, 0, 0, 0.41) 58%, rgba(0, 0, 0, 0.46) 66%, rgba(0, 0, 0, 0.51) 74%, rgba(0, 0, 0, 0.57) 81%, rgba(0, 0, 0, 0.62) 88%, rgba(0, 0, 0, 0.66) 94%, rgba(0, 0, 0, 0.7) 100%)',
                          }}
                        >
                          <div className="absolute bottom-[10px] left-[10px] w-[calc(100%-10px)] overflow-hidden text-ellipsis whitespace-nowrap text-[13px] font-medium text-white">{`Đọc đến ${book.chapter_history.title.split(/[:-]/).at(0)?.trim().toLowerCase()}`}</div>
                        </div>
                        <div className="absolute bottom-[10px] right-[10px] hidden size-8 text-primary group-hover:block hover:text-[rgb(255,87,151)] xxxl:size-10">
                          <ButtonRead />
                        </div>
                      </div>
                      <div
                        style={{ color: token.colorText }}
                        className="mt-[6px] line-clamp-2 text-[13px] font-medium capitalize opacity-[0.87] sm:mt-[10px] md:text-[14px] xxxl:text-[16px]"
                      >
                        {book.title}
                      </div>
                    </Link>
                  </Col>
                )),
              )}
            </Row>
            {isFetchingNextPage && (
              <div className="py-4">
                <LoadingIcon />
              </div>
            )}
            {hasNextPage && !isFetchingNextPage && <div ref={ref}></div>}
          </>
        ) : (
          <Empty
            className="mt-6"
            imageStyle={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}
            image="/img/no-data.png"
            description={
              <>
                <div className="flex flex-col">
                  <Typography.Text className="text-[22px] font-medium opacity-85">Không có lịch sử đọc</Typography.Text>
                  <Typography.Text className="text-[16px] opacity-65">
                    Bạn chưa đọc sách nào cả, hãy nhanh chóng đọc sách thôi!
                  </Typography.Text>
                </div>
                <Button type="primary" className="mt-6" onClick={() => navigate('/')}>
                  Đọc sách ngay bây giờ
                </Button>
              </>
            }
          ></Empty>
        )}
      </div>
    </div>
  )
}
