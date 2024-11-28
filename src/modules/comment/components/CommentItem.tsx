import { DeleteOutlined, HeartFilled, HeartOutlined } from '@ant-design/icons'
import { Icon } from '@iconify/react/dist/iconify.js'
import { Avatar, Modal, Typography } from 'antd'
import { EGender } from 'enums/gender'
import { useUser } from 'stores/user'
import { Comment } from 'types/comment'
import { useLikeComment } from '../services/likeComment'
import { useEffect, useState } from 'react'
import { cn } from 'utils/cn'
import { useDeleteComment } from '../services/deleteComment'
import CommentInput from './CommentInput'
import { useGetReplyCommentList } from '../services/getComment'
import LoadingIcon from 'components/common/LoadingIcon'

const { confirm } = Modal

interface CommentItemProps {
  comment: Comment
}

export default function CommentItem({ comment }: CommentItemProps) {
  const [isLike, setIsLike] = useState<boolean>(comment.check_like)
  const [likeCount, setLikeCount] = useState<number>(comment.like_count)
  const [replyCount, setReplyCount] = useState<number>(comment.reply_count)
  const [isDeleted, setIsDeleted] = useState<boolean>(false)
  const [isReplying, setIsReplying] = useState<boolean>(false)

  const user = useUser()

  const likeComment = useLikeComment()
  const deleteComment = useDeleteComment()
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useGetReplyCommentList(
    { parentId: comment.id, sort: 'createdAt,desc' },
    isReplying && !comment.parent_id && replyCount > 0,
  )

  const handleLikeUnlikeComment = () => {
    likeComment.mutate(
      { commentId: comment.id, like: !isLike },
      {
        onSuccess: () => {
          setIsLike(!isLike)
          setLikeCount(isLike ? likeCount - 1 : likeCount + 1)
        },
      },
    )
  }

  const handleDeleteComment = () => {
    deleteComment.mutate(
      { id: comment.id },
      {
        onSuccess: () => {
          setIsDeleted(true)
        },
      },
    )
  }

  const handleReplyCountChange = () => {
    setReplyCount((prev) => prev + 1)
  }

  const showDeleteConfirm = () => {
    confirm({
      title: 'Bạn có chắc chắn muốn xóa bình luận của mình không?',
      content: 'Bình luận đã xóa không thể khôi phục.',
      okText: 'Xóa',
      okType: 'primary',
      cancelText: 'Hủy',
      centered: true,
      cancelButtonProps: { color: 'danger', variant: 'filled' },
      okButtonProps: { danger: true },
      className: '!transform-none',
      onOk: handleDeleteComment,
    })
  }

  useEffect(() => {
    setIsLike(comment.check_like)
    setLikeCount(comment.like_count)
    setReplyCount(comment.reply_count)
  }, [comment.check_like, comment.like_count, comment.reply_count])

  return (
    <>
      {isDeleted ? null : (
        <>
          <div className="flex w-full border-t px-[18px] py-5 first:border-t-0">
            <div>
              <Avatar
                size={46}
                src={
                  comment.user.avatar_url ||
                  (comment.user.gender === EGender.FEMALE ? '/avatar/female-130.png' : '/avatar/male-130.png')
                }
              />
            </div>
            <div className="ml-3 flex w-full flex-col">
              <div className="flex items-center justify-between">
                <Typography.Text className="text-[13px] font-semibold">{comment.user.name}</Typography.Text>
                <Typography.Text className="text-[12px] text-[#656565]">{comment.last_updated}</Typography.Text>
              </div>
              <div className="mt-[10px]">
                <Typography.Paragraph className="mb-2 whitespace-pre-wrap">{comment.comment}</Typography.Paragraph>
                {!comment.parent_id && (
                  <Typography.Text className="text-[12px] text-[#656565]">{comment.title}</Typography.Text>
                )}
              </div>
              <div className="mt-5">
                <div className="flex items-center">
                  <div
                    className={cn('mr-6 flex cursor-pointer', { 'text-red-500': isLike })}
                    onClick={handleLikeUnlikeComment}
                  >
                    {isLike ? <HeartFilled className="text-[16px]" /> : <HeartOutlined className="text-[16px]" />}
                    <span className="ml-1">{likeCount > 0 ? `${likeCount}` : 'Thích'}</span>
                  </div>
                  {!comment.parent_id && (
                    <div className="mr-6 flex cursor-pointer" onClick={() => setIsReplying(!isReplying)}>
                      <span className="inline-flex items-center">
                        <Icon width="17px" icon="mage:message-round" />
                      </span>
                      <span className="ml-1">{replyCount > 0 ? `${replyCount}` : 'Trả lời'}</span>
                    </div>
                  )}
                  {comment.user.id === user.user.id && (
                    <div className="mr-6 flex cursor-pointer" onClick={showDeleteConfirm}>
                      <DeleteOutlined className="text-[16px]" />
                      <span className="ml-1">Xóa</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {isReplying && (
            <div className="mb-6">
              <CommentInput
                chapterId={comment.chapter_id}
                parentId={comment.id}
                onReplyCountChange={handleReplyCountChange}
              />
            </div>
          )}
          {isReplying && (
            <div className="mb-5 rounded-lg bg-[rgb(247,247,247)] pl-[18px]">
              {isLoading ? (
                <LoadingIcon />
              ) : !!data && data.pages[0].content.length > 0 ? (
                <>
                  {data?.pages.map(
                    (page) => page && page.content.map((item) => <CommentItem key={item.id} comment={item} />),
                  )}
                  {isFetchingNextPage ? (
                    <LoadingIcon />
                  ) : hasNextPage ? (
                    <div
                      className="flex cursor-pointer items-center justify-center py-2"
                      onClick={() => fetchNextPage()}
                    >
                      Xêm thêm trả lời
                      <Icon width="20px" className="ml-1 translate-y-[5%]" icon="mingcute:down-fill" />
                    </div>
                  ) : null}
                </>
              ) : null}
            </div>
          )}
        </>
      )}
    </>
  )
}
