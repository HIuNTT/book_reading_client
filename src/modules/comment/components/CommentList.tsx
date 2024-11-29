import { Empty, Tabs, TabsProps, Typography } from 'antd'
import CommentItem from './CommentItem'
import CommentInput from './CommentInput'
import { useGetCommentList } from '../services/getComment'
import LoadingIcon from 'components/common/LoadingIcon'
import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'

interface CommentListProps {
  chapterId: number
  onTotalChange?(total: number): void
}

export default function CommentList({ chapterId, onTotalChange }: CommentListProps) {
  const [sortBy, setSortBy] = useState<'createdAt,desc' | 'likeCount,desc'>('createdAt,desc')

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage, isFetching, isLoading } = useGetCommentList({
    chapterId,
    sort: sortBy,
  })

  useEffect(() => {
    if (data?.pages[0]) {
      onTotalChange?.(data.pages[0].total_elements)
    }
  }, [data?.pages, onTotalChange])

  const items: TabsProps['items'] = [
    {
      key: 'createdAt,desc',
      label: 'Mới nhất',
    },
    {
      key: 'likeCount,desc',
      label: 'Nhiều like',
    },
  ]

  const onChange = (key: string) => {
    setSortBy(key as 'createdAt,desc' | 'likeCount,desc')
  }

  return (
    <div className="flex flex-col">
      <Typography.Title className="mb-6 px-[15px]" level={3}>
        {isLoading
          ? 'Bình Luận'
          : data?.pages[0].number_of_elements
            ? `Bình Luận (${data.pages[0].total_elements})`
            : 'Bình Luận (0)'}
      </Typography.Title>
      <div>
        <CommentInput chapterId={chapterId} />
      </div>
      <div className="mt-8 px-[15px]">
        <Tabs items={items} onChange={onChange} />
      </div>
      <div>
        {isLoading || (isFetching && !data?.pages.length) ? (
          <LoadingIcon />
        ) : !!data && data.pages[0].content.length > 0 ? (
          <>
            {data?.pages.map(
              (page) => page && page.content.map((item) => <CommentItem key={item.id} comment={item} />),
            )}
            {isFetchingNextPage ? (
              <LoadingIcon />
            ) : hasNextPage ? (
              <div className="flex cursor-pointer items-center justify-center py-2" onClick={() => fetchNextPage()}>
                Xêm thêm bình luận
                <Icon width="20px" className="ml-1 translate-y-[5%]" icon="mingcute:down-fill" />
              </div>
            ) : null}
          </>
        ) : (
          <Empty
            className="mt-6"
            imageStyle={{ display: 'flex', justifyContent: 'center' }}
            image="/img/no-data.png"
            description={<Typography.Text className="font-medium">Vẫn chưa có bình luận</Typography.Text>}
          ></Empty>
        )}
      </div>
    </div>
  )
}
