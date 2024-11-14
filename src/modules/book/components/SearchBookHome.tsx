import { CloseOutlined, SearchOutlined } from '@ant-design/icons'
import { Input, InputProps, Popover, Spin } from 'antd'
import { debounce, gte } from 'lodash'
import { ReactNode, useEffect, useRef, useState } from 'react'
import useGetBookList from '../services/getBookList'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'
import useClickOutside from 'hooks/useClickOutside'

export default function SearchBookHome() {
  const [open, setOpen] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string>()

  const { nodeRef } = useClickOutside(() => setOpen(false))

  const navigate = useNavigate()

  const getBookList = useGetBookList({ size: 10, title: searchValue }, gte(searchValue?.trim().length, 3))

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
    <div style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 330px)' }}>
      <ul className="p-2 pr-0">
        {getBookList.isFetching ? (
          SearchLoading
        ) : !!getBookList.data && getBookList.data.pages[0].content.length > 0 ? (
          <>
            {getBookList.data.pages[0].content.map((book) => (
              <li
                key={book.id}
                className="flex cursor-pointer items-center rounded-xl p-1 hover:bg-[rgba(18,18,18,0.04)]"
                onClick={() => navigate(`/book/${book.id}`)}
              >
                <img
                  className="mx-2 my-[6px] mr-4 h-[76px] w-[58px] rounded-lg object-cover text-transparent"
                  src={book.thumbnail_url}
                  alt={book.title}
                />
                <div className="flex flex-1 flex-col overflow-hidden">
                  <div className="text-ellipsis whitespace-nowrap font-semibold">{book.title}</div>
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
      <Popover
        overlayClassName="xl:max-w-[456px] md:max-w-full w-full"
        content={content}
        open={open && gte(searchValue?.trim().length, 3)}
        arrow={false}
        overlayInnerStyle={{ padding: 0 }}
      >
        <div className="p-3">
          <div className="flex" ref={nodeRef}>
            <Input
              allowClear={{ clearIcon: <CloseOutlined className="text-[rgba(17,24,28,0.88)]" /> }}
              className="bg-[rgba(18,18,18,0.04)] focus-within:border-[rgba(18,18,18,0.32)] hover:bg-[rgba(18,18,18,0.08)] focus-within:hover:border-transparent"
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
        </div>
      </Popover>
    </div>
  )
}
