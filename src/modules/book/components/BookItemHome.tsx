import { StarFilled } from '@ant-design/icons'
import { Icon } from '@iconify/react/dist/iconify.js'
import { Divider, Popover, Space, Tag, theme, Typography } from 'antd'
import ButtonRead from 'components/common/ButtonRead'
import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTheme } from 'stores/theme'
import { BookItem } from 'types/book'
import { cn } from 'utils/cn'
import { formatCompactNumber } from 'utils/number'

const { Paragraph, Text } = Typography
const { useToken } = theme

interface BookItemProps {
  bookItem: BookItem
}

export default function BookItemHome({ bookItem }: BookItemProps) {
  const triggerRef = useRef<HTMLDivElement>(null)

  const [contentWidth, setContentWidth] = useState<number>(0)

  const navigate = useNavigate()
  const { token } = useToken()

  const { theme } = useTheme()

  const handlePopoverHover = () => {
    if (triggerRef.current) {
      const triggerWidth = triggerRef.current.offsetWidth
      const width = triggerWidth + triggerWidth * 0.4
      setContentWidth(width)
    }
  }

  const content = (
    <div className="w-full">
      <Link to={`/book/detail/${bookItem.id}`}>
        <div className="relative w-full max-[767px]:hidden">
          <div
            className="w-full bg-cover bg-no-repeat pt-[56%]"
            style={{
              backgroundImage: `url(${bookItem.thumbnail_url})`,
              backgroundPosition: 'center 80%',
              backgroundColor: token.colorBgElevated,
            }}
          ></div>
          {/* Flag */}
          <div></div>
          {/* Butto read */}
          <div className="absolute bottom-2 right-3 flex size-8 text-primary hover:text-[#ff5b9a] xxxl:size-10">
            <ButtonRead />
          </div>
        </div>
      </Link>
      <div className="cursor-pointer select-none" onClick={() => navigate(`/book/detail/${bookItem.id}`)}>
        <div className="relative flex h-[258px] w-full px-2 max-[1679px]:h-[220px] max-[767px]:hidden">
          <div className="w-full">
            <Paragraph
              className="mb-0 capitalize leading-6 hover:text-primary md:mt-2 md:text-[16px] min-[1680px]:mt-3 min-[1680px]:text-[20px]"
              ellipsis={{ rows: 1 }}
            >
              {bookItem.title}
            </Paragraph>
            <div className="flex flex-col">
              <Space className="mt-2 gap-[6px] max-[1679px]:mt-[6px]">
                <div className="flex items-center">
                  <div className="text-[14px] text-primary min-[1680px]:text-[16px]">
                    <span className="text-[12px] min-[1680px]:text-[14px]">
                      <StarFilled />
                    </span>
                    <span className="ml-1 font-bold">{bookItem.avg_rating}</span>
                  </div>
                </div>
                <Divider
                  type="vertical"
                  className={cn('mx-0 border-[1px] border-[rgba(0,0,0,0.2)]', {
                    'border-[rgba(255,255,255,0.2)]': theme === 'dark',
                  })}
                />
                <Text className="flex items-center leading-[19px] max-[1679px]:text-[12px]">
                  <Icon icon="mdi:eye" className="mr-1" />
                  {formatCompactNumber(bookItem.view)}
                </Text>
              </Space>

              <div className="mt-[6px] h-[22px] overflow-hidden xxxl:mt-2 xxxl:h-6">
                {bookItem.category_book.map((category) => (
                  <Tag
                    key={category.category_id}
                    bordered={false}
                    className={cn('mb-[2px] bg-[rgba(0,0,0,0.08)] text-[11px] xxxl:text-[13px]', {
                      'bg-[rgba(255,255,255,0.08)] text-[rgb(236,236,236)]': theme === 'dark',
                    })}
                  >
                    {category.category_name}
                  </Tag>
                ))}
              </div>
              <section className="mt-[6px] h-[100px] xxxl:mt-2 xxxl:h-[118px]">
                <p className="line-clamp-5 text-[12px] xxxl:text-[14px]">{bookItem.summary}</p>
              </section>
              <div className="absolute bottom-[10px] right-0 flex w-full items-center justify-end px-2 text-primary hover:text-[rgb(236,87,144)] xxxl:bottom-[12px]">
                <span className="text-[12px] xxxl:text-[14px]">Xem thêm</span>
                <Icon width={10} icon="fe:arrow-right" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <Popover
        align={{ points: ['tc', 'tc'], targetOffset: ['0%', '5%'] }}
        content={content}
        autoAdjustOverflow={false}
        arrow={false}
        overlayStyle={{ width: `${contentWidth}px` }}
        overlayClassName="max-w-[396px]"
        overlayInnerStyle={{ padding: 0, borderRadius: '6px', overflow: 'hidden' }}
        zIndex={100}
        onOpenChange={handlePopoverHover}
      >
        <div ref={triggerRef} className="group relative max-[767px]:hover:scale-[1.05]" style={{ transition: '0.3s' }}>
          <Link to={`/book/detail/${bookItem.id}`} className="text-white">
            <div className="relative z-[2] overflow-hidden rounded-md before:block before:pt-[146.25%]">
              <span className="absolute inset-0 overflow-hidden">
                <img
                  className="h-0 max-h-full min-h-full w-0 min-w-full max-w-full"
                  style={{ backgroundColor: token.colorBgElevated }}
                  src={bookItem.thumbnail_url}
                  alt={bookItem.title}
                />
              </span>
              {/* Flag top right */}
              <div></div>
              {/* Update info layer */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[60px]"
                style={{
                  backgroundImage:
                    'linear-gradient(0deg, rgba(10, 12, 15, 0.8) 0%, rgba(10, 12, 15, 0.74) 4%, rgba(10, 12, 15, 0.59) 17%, rgba(10, 12, 15, 0.4) 34%, rgba(10, 12, 15, 0.21) 55%, rgba(10, 12, 15, 0.06) 78%, rgba(10, 12, 15, 0) 100%)',
                }}
              >
                {bookItem.new_chapter && (
                  <div className="absolute bottom-[10px] left-2 right-[10px] overflow-hidden text-ellipsis whitespace-nowrap text-[14px] font-medium tracking-[0px] max-[1680px]:text-[12px]">
                    {`${bookItem.status === 'Hoàn thành' ? 'Trọn bộ' : 'Cập nhật'} ${bookItem.status === 'Hoàn thành' ? bookItem.new_chapter.order_chap.toString() + ' chương' : 'chương ' + bookItem.new_chapter.order_chap.toString()}`}
                  </div>
                )}
              </div>
            </div>
          </Link>
          <div
            className="h-[49.5px] cursor-pointer pt-[7.5px] sm:h-[50.75px] sm:pt-[8.75px] min-[1024px]:h-[52px] min-[1024px]:pt-[10px] xxl:h-[58px]"
            onClick={() => navigate(`/book/detail/${bookItem.id}`)}
          >
            <p className="line-clamp-2 capitalize group-hover:text-primary xxl:text-[16px]">{bookItem.title}</p>
          </div>
        </div>
      </Popover>
    </>
  )
}
