import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Badge, Card, ConfigProvider, Divider, Layout, Space, Typography } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import CommentList from 'modules/comment/components/CommentList'
import { ChapterParams } from '../route'
import { updateView, useGetChapter } from '..'
import { cn } from 'utils/cn'
import { useTimeoutFn } from 'react-use'
import PageLoading from 'components/common/PageLoading'
import { useUser } from 'stores/user'
import { saveHistory } from 'modules/book/services/history'
import { useTheme } from 'stores/theme'
import ChapterReader from '../components/ChapterReader'
import ViewerSetting from '../components/ViewerSetting'
import { useViewerSetting } from 'stores/viewerSetting'
import { themeSpace } from 'constants/viewerLayout'

export default function Chapter() {
  const [totalComments, setTotalComments] = useState<number>(0)
  const [headerOpen, setHeaderOpen] = useState<boolean>(true)

  const navigate = useNavigate()
  const { user } = useUser()
  const theme = useTheme()
  const { spaceColor } = useViewerSetting()

  const { bookId, order } = useParams<keyof ChapterParams>()

  const getChapter = useGetChapter(
    { bookId: Number(bookId), order: Number(order) },
    !!Number(bookId) && !!Number(order),
  )

  const commentsRef = useRef<HTMLDivElement>(null)

  const handleClickScrollToComments = () => {
    commentsRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleUpdateView = () => {
    if (getChapter.isSuccess) {
      updateView(getChapter.data?.id)
    }
  }
  useTimeoutFn(handleUpdateView, 20 * 1000)

  useEffect(() => {
    if (getChapter.isError) {
      navigate('/')
    }
  }, [getChapter.isError, navigate])

  useEffect(() => {
    if (user.id && getChapter.isSuccess) {
      saveHistory(getChapter.data?.id)
    }
  }, [user.id, getChapter.isSuccess, getChapter.data?.id])

  return (
    <ConfigProvider theme={theme.themeConfig}>
      <Layout>
        <Layout.Header
          className={cn('fixed top-0 z-50 flex h-[68px] w-full translate-y-0 justify-center p-0 transition-all', {
            '-translate-y-full': !headerOpen,
          })}
        >
          <div className="w-full max-w-[1200px]">
            <div className="flex h-full items-center justify-between px-7">
              <div className="mr-3 flex items-center">
                <div className="cursor-pointer" onClick={() => navigate(`/book/detail/${bookId}`)}>
                  <img className="mr-4 hover:opacity-65 active:opacity-30" src="/home-list.svg" alt="Home List Icon" />
                </div>
                <Typography.Text className="line-clamp-1 break-all text-[16px] font-bold leading-[22px]">
                  {getChapter.data?.title}
                </Typography.Text>
              </div>
              <div className="flex">
                <Space size={24} align="center" className="mr-10 [&>:nth-child(2)]:flex [&>:nth-child(2)]:items-center">
                  <img
                    className="hidden cursor-pointer hover:opacity-65 active:opacity-30"
                    src="/page.svg"
                    alt="Page Mode"
                  />
                  <Badge
                    onClick={handleClickScrollToComments}
                    color="#eee"
                    className="cursor-pointer"
                    offset={[4, -1]}
                    count={totalComments}
                    showZero
                    classNames={{ indicator: 'text-[10px] px-[5px] text-black' }}
                  >
                    <img className="hover:opacity-65 active:opacity-30" src="/comment.svg" alt="Comment" />
                  </Badge>
                </Space>
                <Space size={16}>
                  <div
                    className={cn('flex cursor-pointer items-center hover:opacity-65', {
                      'pointer-events-none cursor-default opacity-30 hover:opacity-30':
                        !getChapter.data?.order_previous,
                    })}
                    onClick={() => navigate(`/book/${getChapter.data?.book.id}/${getChapter.data?.order_previous}`)}
                  >
                    <LeftOutlined className="text-[24px]" />
                    <Typography.Text>Chương Trước</Typography.Text>
                  </div>
                  <Divider className="m-0" type="vertical" />
                  <div
                    className={cn('flex cursor-pointer items-center hover:opacity-65', {
                      'pointer-events-none cursor-default opacity-30 hover:opacity-30': !getChapter.data?.order_next,
                    })}
                    onClick={() => navigate(`/book/${getChapter.data?.book.id}/${getChapter.data?.order_next}`)}
                  >
                    <Typography.Text className="mr-1">Chương Sau</Typography.Text>
                    <RightOutlined className="text-[24px]" />
                  </div>
                </Space>
              </div>
            </div>
          </div>
        </Layout.Header>
        <Layout.Content>
          <div
            onClick={() => setHeaderOpen(!headerOpen)}
            className="min-h-full w-full pb-[10vh]"
            style={{ backgroundColor: themeSpace[spaceColor].backgroundColor }}
          >
            {getChapter.isFetching ? (
              <PageLoading />
            ) : getChapter.data?.file_url ? (
              <ChapterReader fileUrl={getChapter.data.file_url} />
            ) : null}
            {!!getChapter.data?.id && (
              <Card
                bordered={false}
                classNames={{ body: 'p-0' }}
                ref={commentsRef}
                className="mx-auto w-full max-w-[1200px] p-8"
                onClick={(e) => e.stopPropagation()}
              >
                <CommentList chapterId={getChapter.data.id} onTotalChange={setTotalComments} />
              </Card>
            )}
          </div>
        </Layout.Content>
        <ViewerSetting />
      </Layout>
    </ConfigProvider>
  )
}
