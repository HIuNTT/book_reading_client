import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Badge, Divider, Layout, Space, Typography } from 'antd'

import { useNavigate, useParams } from 'react-router-dom'
import EpubView, { EpubViewRef } from '../components/EpubView'
import { useRef, useState } from 'react'
import { RenditionOptions } from 'epubjs/types/rendition'
import CommentList from 'modules/comment/components/CommentList'
import { ChapterParams } from '../route'

export default function Chapter() {
  console.log('render chapter')

  const navigate = useNavigate()
  const { bookId, chapterId } = useParams<keyof ChapterParams>()

  const [number, setNumber] = useState(0)
  const [totalComments, setTotalComments] = useState<number>()

  const epubRef = useRef<EpubViewRef>(null)
  const epubOptions = useRef<RenditionOptions>({ flow: 'scrolled' })

  return (
    <Layout className="bg-transparent">
      <Layout.Header className="fixed top-0 z-50 flex h-[68px] w-full justify-center border-b-[1px] bg-white p-0">
        <div className="w-full max-w-[1200px]">
          <div className="flex h-full items-center justify-between px-7">
            <div className="mr-3 flex items-center">
              <div className="cursor-pointer" onClick={() => navigate('/book/2')}>
                <img className="mr-4 hover:opacity-65 active:opacity-30" src="/home-list.svg" alt="Home List Icon" />
              </div>
              <Typography.Text className="line-clamp-1 break-all text-[16px] font-bold leading-[22px]">
                Bảo Bối - Chương 1
              </Typography.Text>
            </div>
            <div className="flex">
              <Space size={24} align="center" className="mr-10 [&>:nth-child(2)]:flex [&>:nth-child(2)]:items-center">
                <img className="cursor-pointer hover:opacity-65 active:opacity-30" src="/page.svg" alt="Page Mode" />
                <Badge
                  color="#11181c"
                  className="cursor-pointer"
                  offset={[4, -1]}
                  count={totalComments}
                  classNames={{ indicator: 'text-[10px] px-[5px]' }}
                >
                  <img className="hover:opacity-65 active:opacity-30" src="/comment.svg" alt="Comment" />
                </Badge>
              </Space>
              <Space size={16}>
                <div className="flex cursor-default items-center opacity-30">
                  <LeftOutlined className="text-[24px]" />
                  <Typography.Text>Chương Trước</Typography.Text>
                </div>
                <Divider className="m-0 border-[rgba(0,0,0,0.1)]" type="vertical" />
                <div className="flex cursor-pointer items-center hover:opacity-65">
                  <Typography.Text className="mr-1">Chương Sau</Typography.Text>
                  <RightOutlined className="text-[24px]" />
                </div>
              </Space>
            </div>
          </div>
        </div>
      </Layout.Header>
      <Layout.Content className="min-h-full w-full bg-transparent">
        <div className="mx-auto min-h-full w-full max-w-[720px]">
          <div className="min-h-screen py-[10vh]">
            <button onClick={() => setNumber((prev) => prev + 1)}>{number}</button>
            <EpubView
              url="https://res.cloudinary.com/dcqo7fy3q/raw/upload/v1732435754/n%E1%BB%99i-dung_nqkkzq.epub"
              ref={epubRef}
              location="epubcfi(/6/2!/4/2/1:0)"
              epubOptions={epubOptions.current}
              onLocationChange={(location: string) => {
                window.localStorage.setItem('epub', location)
                console.log(location)
              }}
            />
          </div>
        </div>
        <div className="mx-auto w-full max-w-[1200px] p-8">
          <CommentList chapterId={Number(chapterId)} onTotalChange={setTotalComments} />
        </div>
      </Layout.Content>
    </Layout>
  )
}
