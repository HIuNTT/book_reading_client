import { Typography } from 'antd'
import ArrowLeft from 'components/common/ArrowLeft'
import ArrowRight from 'components/common/ArrowRight'
import { useRef } from 'react'
import { useUser } from 'stores/user'
import { Swiper, SwiperClass, SwiperRef, SwiperSlide } from 'swiper/react'
import { useGetRecommendedBookList } from '../services'
import RecommendedBookItem from './RecommendedBookItem'
import LoadingIcon from 'components/common/LoadingIcon'

const { Title } = Typography

export default function RecommendedBookList() {
  const user = useUser()

  const getRecommendedBookList = useGetRecommendedBookList({ user_id: user.user.id }, !!user.user.id)

  const swiperRef = useRef<SwiperRef>(null)
  const nextButtonRef = useRef<HTMLDivElement>(null)
  const prevButtonRef = useRef<HTMLDivElement>(null)

  const handleNavigationChange = (swiper: SwiperClass) => {
    const isEnoughSlides = swiper.slides.length > (swiperRef.current?.swiper.params.slidesPerView as number)
    if (prevButtonRef.current) {
      prevButtonRef.current.style.display = isEnoughSlides && !swiper.isBeginning ? 'block' : 'none'
    }
    if (nextButtonRef.current) {
      nextButtonRef.current.style.display = isEnoughSlides && !swiper.isEnd ? 'block' : 'none'
    }
  }

  return (
    <>
      {getRecommendedBookList.isLoading ? (
        <LoadingIcon />
      ) : getRecommendedBookList.data ? (
        <div>
          <div className="mx-auto w-full px-4 sm:px-8 xxl:px-16">
            <Title
              level={2}
              className="mb-0 text-[15px] leading-[15px] min-[480px]:text-[20px] min-[480px]:leading-5 md:text-[22px] md:leading-8 xxl:text-[28px]"
            >
              <span>Đề xuất cho bạn</span>
            </Title>
            <div className="relative">
              <div
                ref={prevButtonRef}
                onClick={() => swiperRef.current?.swiper.slidePrev()}
                className="absolute left-0 top-0 z-10 h-[calc(100%-49.5px)] w-4 -translate-x-full -scale-x-[1] cursor-pointer items-center text-white opacity-80 hover:opacity-100 sm:-left-1 sm:h-[calc(100%-50.75px)] sm:w-6 min-[1024px]:h-[calc(100%-52px)] xxl:-left-2 xxl:h-[calc(100%-58px)] xxl:w-[40px]"
              >
                <ArrowLeft />
              </div>
              <Swiper
                ref={swiperRef}
                slidesPerView={3}
                grid={{ rows: 1 }}
                spaceBetween={8}
                slidesPerGroup={3}
                autoHeight={true}
                allowTouchMove={false}
                breakpoints={{
                  768: {
                    slidesPerView: 4,
                    spaceBetween: 16,
                    slidesPerGroup: 4,
                  },
                  1024: {
                    slidesPerView: 6,
                    spaceBetween: 16,
                    slidesPerGroup: 6,
                  },
                  1700: {
                    slidesPerView: 8,
                    spaceBetween: 16,
                    slidesPerGroup: 8,
                  },
                }}
                onSwiper={handleNavigationChange}
                onSlideChange={handleNavigationChange}
                onResize={handleNavigationChange}
                className="-mx-1 px-1 pb-4 pt-3 md:-mx-[7px] md:px-[7px] md:py-4 min-[1024px]:-mx-[13px] min-[1024px]:px-[13px] min-[1024px]:pb-9 min-[1024px]:pt-4"
              >
                {getRecommendedBookList.data?.map((book) => (
                  <SwiperSlide className="select-none" key={book.book_id}>
                    <RecommendedBookItem bookItem={book} />
                  </SwiperSlide>
                ))}
              </Swiper>
              <div
                ref={nextButtonRef}
                onClick={() => swiperRef.current?.swiper.slideNext()}
                className="absolute right-0 top-[0] z-10 h-[calc(100%-49.5px)] w-[16px] translate-x-full cursor-pointer text-white opacity-80 hover:opacity-100 sm:-right-1 sm:h-[calc(100%-50.75px)] sm:w-6 min-[1024px]:h-[calc(100%-52px)] xxl:-right-2 xxl:h-[calc(100%-58px)] xxl:w-[40px]"
              >
                <ArrowRight />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
