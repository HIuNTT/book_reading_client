import ButtonRead from 'components/common/ButtonRead'
import { Link, useNavigate } from 'react-router-dom'
import { BookHistory } from 'types/book'

interface HistoryItemProps {
  bookItem: BookHistory
}

export default function HistoryItem({ bookItem }: HistoryItemProps) {
  const navigate = useNavigate()

  return (
    <div className="group relative hover:scale-[1.05]" style={{ transition: '0.3s' }}>
      <Link to={`/book/${bookItem.id}/${bookItem.chapter_history.order_chap}`} className="text-white">
        <div className="relative z-[2] overflow-hidden rounded-md before:block before:pt-[146.25%]">
          <span className="absolute inset-0 overflow-hidden">
            <img
              className="h-0 max-h-full min-h-full w-0 min-w-full max-w-full bg-[rgb(182,182,182)]"
              src={bookItem.thumbnail_url}
              alt={bookItem.title}
            />
          </span>
          {/* Update info layer */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[60px]"
            style={{
              backgroundImage:
                'linear-gradient(0deg, rgba(10, 12, 15, 0.8) 0%, rgba(10, 12, 15, 0.74) 4%, rgba(10, 12, 15, 0.59) 17%, rgba(10, 12, 15, 0.4) 34%, rgba(10, 12, 15, 0.21) 55%, rgba(10, 12, 15, 0.06) 78%, rgba(10, 12, 15, 0) 100%)',
            }}
          >
            <div className="absolute bottom-[14px] left-2 right-[10px] overflow-hidden text-ellipsis whitespace-nowrap text-[14px] font-medium tracking-[0px] max-[1680px]:text-[12px]">
              {`Đọc tiếp ${bookItem.chapter_history.title.split('-').at(-1)?.trim().toLowerCase()}`}
            </div>
            <div className="absolute bottom-[10px] right-2 flex size-6 text-primary transition-all group-hover:opacity-85 xxxl:size-8">
              <ButtonRead />
            </div>
          </div>
        </div>
      </Link>
      <div
        className="h-[49.5px] cursor-pointer pt-[7.5px] sm:h-[50.75px] sm:pt-[8.75px] min-[1024px]:h-[52px] min-[1024px]:pt-[10px] xxl:h-[58px]"
        onClick={() => navigate(`/book/detail/${bookItem.id}`)}
      >
        <p className="line-clamp-2 capitalize text-textColor group-hover:text-primary xxl:text-[16px]">
          {bookItem.title}
        </p>
      </div>
    </div>
  )
}
