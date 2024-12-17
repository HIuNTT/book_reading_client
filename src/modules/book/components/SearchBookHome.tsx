import { SearchOutlined } from '@ant-design/icons'
import { Input, InputProps, Popover, Spin } from 'antd'
import { debounce, gte } from 'lodash'
import { ReactNode, useEffect, useRef, useState } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'
import useClickOutside from 'hooks/useClickOutside'
import { cn } from 'utils/cn'
import { useGetBookListInfinite } from '../services'

interface SearchBookHomeProps {
  isTop?: boolean
  isHome?: boolean
}

export default function SearchBookHome({ isTop, isHome }: SearchBookHomeProps) {
  const [open, setOpen] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string>()

  const { nodeRef } = useClickOutside(() => setOpen(false))

  const navigate = useNavigate()

  const getBookList = useGetBookListInfinite({ size: 10, title: searchValue }, gte(searchValue?.trim().length, 3))

  const debouncedSearch = useRef(debounce((value: string) => setSearchValue(value), 500)).current

  const onValueChange: InputProps['onChange'] = ({ target: { value } }) => {
    if (value.length === 0) {
      setOpen(false)
      return
    }
    debouncedSearch(value)
    setOpen(true)
  }

  useEffect(() => {
    debouncedSearch.cancel()
  }, [debouncedSearch])

  const SearchLoading: ReactNode = (
    <div className="p-4 text-center">
      <Spin size="large" indicator={<Icon icon="eos-icons:loading" />} />
    </div>
  )

  const content = (
    <div className="overflow-auto rounded-xl">
      <ul className="overflow-auto p-2" style={{ maxHeight: 'calc(100vh - 330px)' }}>
        {getBookList.isFetching ? (
          SearchLoading
        ) : !!getBookList.data && getBookList.data.pages[0].content.length > 0 ? (
          <>
            {getBookList.data.pages[0].content.map((book) => (
              <li
                key={book.id}
                className="flex cursor-pointer items-center rounded-xl p-1 hover:bg-[rgba(255,255,255,0.04)]"
                onClick={() => navigate(`/book/detail/${book.id}`)}
              >
                <img
                  className="mx-2 my-[6px] mr-4 h-[76px] w-[58px] rounded-lg object-cover text-transparent"
                  src={book.thumbnail_url}
                  alt={book.title}
                />
                <div className="flex flex-1 flex-col overflow-hidden">
                  <div className="overflow-hidden text-ellipsis whitespace-nowrap font-semibold">{book.title}</div>
                </div>
              </li>
            ))}
          </>
        ) : (
          <div className="p-4 text-center">
            <div>Không tìm thấy</div>
          </div>
        )}
      </ul>
    </div>
  )

  return (
    <div className="w-full md:max-w-full xl:max-w-[480px]">
      <div className="p-3">
        <div className="relative" ref={nodeRef}>
          <Popover
            overlayClassName="w-full"
            content={content}
            open={open && gte(searchValue?.trim().length, 3)}
            getPopupContainer={(triggerNode: HTMLElement) => triggerNode.parentElement as HTMLElement}
            arrow={false}
            overlayInnerStyle={{ padding: 0 }}
            overlayStyle={{ top: 'calc(100% + 13px)' }}
            placement="bottom"
            color="#2c2c2c"
          >
            <div className="flex">
              <Input
                allowClear={{
                  clearIcon: (
                    <Icon
                      width="1rem"
                      icon="ep:close-bold"
                      className={cn('text-[rgb(179,179,179)] hover:text-white', {
                        'text-white hover:text-white': isTop && isHome,
                      })}
                    />
                  ),
                }}
                className={cn(
                  'bg-[rgba(255,255,255,0.04)] focus-within:border-[rgba(255,255,255,0.32)] hover:bg-[rgba(255,255,255,0.08)] focus-within:hover:border-transparent',
                  {
                    'border-transparent bg-[rgba(255,255,255,0.12)] text-white backdrop-blur-[20px] hover:bg-[rgba(255,255,255,0.2)] [&>input]:placeholder:text-[rgba(255,255,255,0.75)]':
                      isTop && isHome,
                  },
                )}
                style={{
                  transition:
                    'background-color 0.2s cubic-bezier(0.05, 0, 0.2, 1), border-color 0.2s cubic-bezier(0.05, 0, 0.2, 1)',
                }}
                prefix={<SearchOutlined className="text-[20px]" />}
                classNames={{ prefix: 'mr-2' }}
                size="large"
                variant="filled"
                placeholder="Nhập tên sách, tác giả..."
                onChange={onValueChange}
                onClear={() => setSearchValue('')}
                onFocus={() => setOpen(true)}
              />
            </div>
          </Popover>
        </div>
      </div>
    </div>
  )
}
