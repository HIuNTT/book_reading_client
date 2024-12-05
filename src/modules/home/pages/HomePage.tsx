import Rank from 'components/Home/Rank'
import Carousel from '../components/Carousel'
import RecommendedBookList from 'modules/book/components/RecommendedBookList'
import { useUser } from 'stores/user'
import AuthorList from 'components/AuthorList'
import HistoryList from 'modules/book/components/HistoryList'
import CategoryListHome from 'modules/category/components/CategoryListHome'
import { useGetBookUpList } from 'modules/book/services'
import LoadingIcon from 'components/common/LoadingIcon'
import BookListHome from 'modules/book/components/BookListHome'

export default function HomePage() {
  console.log('HomePage')

  const user = useUser()

  const getBookUpList = useGetBookUpList({ page: 1, size: 30 })

  return (
    <div>
      <Carousel />
      {user.user.id ? <RecommendedBookList /> : null}
      <CategoryListHome />
      <HistoryList title="Đọc tiếp" />
      {getBookUpList.isFetching ? (
        <LoadingIcon />
      ) : getBookUpList.data ? (
        <BookListHome title="Mới cập nhật" books={getBookUpList.data.content} />
      ) : null}
      <Rank />
      <AuthorList />
    </div>
  )
}
