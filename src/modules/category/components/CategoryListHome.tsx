import { Icon } from '@iconify/react/dist/iconify.js'
import useGetCategoryList from '../services/getCategoryList'
import { useNavigate } from 'react-router-dom'

export default function CategoryListHome() {
  const navigate = useNavigate()

  const getCategoryList = useGetCategoryList({})

  return (
    <div className="mx-auto mb-7 w-full px-4 sm:px-8 md:mb-9 min-[1024px]:mb-10 xxl:px-16">
      <div className="flex h-[84px] flex-wrap gap-3 overflow-hidden min-[1024px]:h-9">
        <div
          onClick={() => navigate('/book-library')}
          className="flex h-9 cursor-pointer rounded-md bg-[rgba(18,18,18,0.08)] px-[17px] py-[10px] leading-4 text-[rgb(62,62,65)] hover:text-textColor"
        >
          <span className="mr-2 inline-block">
            <Icon icon="ri:book-shelf-line" width="16" height="16" />
          </span>
          Toàn bộ mục sách
        </div>

        {getCategoryList.data?.content.map((category) => (
          <div
            key={category.id}
            onClick={() => navigate(`/book-library?value=${category.id}`)}
            className="h-9 cursor-pointer rounded-md bg-[rgba(18,18,18,0.08)] px-[17px] py-[10px] leading-4 text-[rgb(62,62,65)] hover:text-textColor"
          >
            {category.name}
          </div>
        ))}
      </div>
    </div>
  )
}
