import { Button, Form, Input } from 'antd'
import { useUser } from 'stores/user'
import { cn } from 'utils/cn'
import { useCreateComment, useCreateReplyComment } from '../services/createComment'
import { queryClient } from 'configs/queryClient'
import { toast } from 'sonner'
import { HTMLAttributes } from 'react'

interface CommentInputProps {
  chapterId?: number
  className?: HTMLAttributes<HTMLFormElement>['className']
  parentId?: number
  onReplyCountChange?(): void
}

export default function CommentInput({ chapterId, className, parentId, onReplyCountChange }: CommentInputProps) {
  const [form] = Form.useForm<{ comment: string }>()
  const commentValue = Form.useWatch('comment', form)

  const user = useUser()

  const createComment = useCreateComment()
  const createReplyComment = useCreateReplyComment()

  const onSubmit = (value: { comment: string }) => {
    if (chapterId && !parentId) {
      createComment.mutate(
        { ...value, chapter_id: chapterId },
        {
          onSuccess: () => {
            form.resetFields()
            queryClient.refetchQueries({ queryKey: ['commentList'] }).then(() => toast.success('Bình luận thành công'))
          },
        },
      )
    }

    if (chapterId && parentId) {
      createReplyComment.mutate(
        { ...value, chapter_id: chapterId, id: parentId },
        {
          onSuccess: () => {
            form.resetFields()
            queryClient.refetchQueries({ queryKey: ['replyCommentList'] }).then(() => {
              toast.success('Trả lời bình luận thành công')
              onReplyCountChange?.()
            })
          },
        },
      )
    }
  }

  return (
    <>
      {user.user.id ? (
        <Form form={form} onFinish={onSubmit} className={className}>
          <Form.Item className="mb-0" name="comment" shouldUpdate>
            <div className="relative">
              <Input.TextArea
                variant="filled"
                placeholder="Để lại bình luận~"
                showCount
                maxLength={999}
                autoSize={{ minRows: 3, maxRows: 6 }}
                className="bg-[rgb(238,238,238)] focus-within:border-transparent hover:border-transparent"
                classNames={{ count: 'bottom-[10px] right-[63px]', textarea: 'pb-10' }}
              />
              <div className="absolute bottom-2 right-[9px] z-10">
                <Button
                  className={cn({ 'pointer-events-none cursor-default opacity-50': !commentValue?.trim() })}
                  htmlType="submit"
                  size="small"
                  shape="round"
                  type="primary"
                >
                  Gửi
                </Button>
              </div>
            </div>
          </Form.Item>
        </Form>
      ) : (
        <div className="w-full max-w-full rounded-lg bg-[rgb(238,238,238)] text-center leading-9">
          Vui lòng đăng nhập để bình luận
        </div>
      )}
    </>
  )
}
