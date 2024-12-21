import { StarFilled } from '@ant-design/icons'
import { Button, Divider, Skeleton, Space, Tag, Typography } from 'antd'
import ArrowLeft from 'components/common/ArrowLeft'
import ArrowRight from 'components/common/ArrowRight'
import LoadingIcon from 'components/common/LoadingIcon'
import { useGetBannerBookList } from 'modules/book/services'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from 'stores/theme'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'
import { cn } from 'utils/cn'
import { formatCompactNumber } from 'utils/number'

const { Text } = Typography

export default function Carousel() {
  const [activeIndex, setActiveIndex] = useState<number>(0)

  const { theme } = useTheme()

  const { data, isFetching } = useGetBannerBookList({ page: 1, size: 6, sort: 'view,desc' })

  const swiperRef = useRef<SwiperRef>(null)

  const navigate = useNavigate()

  return (
    <div>
      {isFetching ? (
        <LoadingIcon />
      ) : !!data && data.number_of_elements > 0 ? (
        <div className="relative -mt-[var(--app-home-header-height)] mb-7 px-0 pt-[var(--app-home-header-height)] md:mb-9 md:px-8 min-[1024px]:mb-10 xxl:px-16">
          <div
            className="absolute inset-0 z-[1] bg-cover bg-center transition-all duration-[0.3s] ease-linear"
            style={{
              backgroundImage: `url(${data?.content[activeIndex].banner_url})`,
            }}
          >
            <div
              className="absolute inset-0 z-10 backdrop-blur-3xl"
              style={{
                background:
                  theme === 'dark'
                    ? 'linear-gradient(0deg, rgb(20, 20, 20) 5%, rgba(0, 0, 0, 0) 60%) rgba(0, 0, 0, 0.6)'
                    : 'linear-gradient(0deg, rgb(255, 255, 255) 5%, rgba(0, 0, 0, 0) 60%) rgba(0, 0, 0, 0.6)',
              }}
            ></div>
          </div>
          <div className="relative mt-0 cursor-pointer md:mt-6 xxl:mt-8">
            {data?.content.map((slide) => (
              <div
                className={cn(
                  'pointer-events-none absolute bottom-4 left-4 z-20 max-w-[80%] text-white opacity-0 transition-opacity delay-200 duration-500 ease-linear md:bottom-[18%] md:left-14 md:max-w-[50%] min-[1024px]:bottom-[28%] min-[1024px]:left-[64px]',
                  {
                    'opacity-100': slide.id === data.content[activeIndex].id,
                  },
                )}
                key={slide.id}
              >
                <div className="mb-4 line-clamp-2 w-[50vw] font-['Merienda'] text-[20px] capitalize sm:text-[30px] md:mb-0 md:line-clamp-1 md:w-[38vw] md:text-[35px] lg:text-[40px] xl:text-[45px] xxl:text-[55px]">
                  {slide.title}
                </div>
                <Space
                  classNames={{ item: '[&>span]:xxl:text-[16px] [&>span]:md:text-[14px] [&>span]:text-[12px]' }}
                  key={slide.id}
                  className="mt-3"
                >
                  <Text className="font-bold text-primary">
                    <StarFilled className="mr-1" />
                    {slide.avg_rating}
                  </Text>
                  <Divider type="vertical" className="mx-0 border-[1px] border-[rgba(255,255,255,0.2)]" />
                  <Text className="text-white" style={{ textShadow: 'rgba(0, 0, 0, 0.5) 0px 1px 2px' }}>
                    {formatCompactNumber(slide.view, 100000)} Lượt Đọc
                  </Text>
                  <Divider type="vertical" className="mx-0 border-[1px] border-[rgba(255,255,255,0.2)]" />
                  <Text className="text-white" style={{ textShadow: 'rgba(0, 0, 0, 0.5) 0px 1px 2px' }}>
                    {slide.status}
                  </Text>
                </Space>
                <div className="mt-3 hidden md:block">
                  {slide.category_book.map((category) => (
                    <Tag
                      bordered={false}
                      className="mb-1 select-none bg-[rgba(255,255,255,0.08)] text-[14px] capitalize text-[rgb(236,236,236)]"
                      key={category.category_id}
                    >
                      {category.category_name}
                    </Tag>
                  ))}
                </div>
                <div
                  className="mt-3 line-clamp-2 h-[42px] w-[31vw] text-ellipsis text-[14px] font-medium max-[767px]:hidden xxl:line-clamp-3 xxl:h-[72px] xxl:text-base"
                  style={{ textShadow: 'rgba(0, 0, 0, 0.5) 0px 1px 2px' }}
                >
                  {slide.summary}
                </div>
              </div>
            ))}

            <Button
              onClick={() => navigate(`/book/detail/${data?.content[activeIndex].id}`)}
              type="primary"
              size="middle"
              className="absolute bottom-[5%] left-4 z-10 max-[767px]:hidden md:left-14 min-[1024px]:bottom-[10%] min-[1024px]:left-[64px] min-[1024px]:px-[24px] min-[1024px]:py-[23px] min-[1024px]:text-[16px] xxl:bottom-[12%] xxl:px-[28px] xxl:py-[27px] xxl:text-[20px]"
            >
              Đọc Ngay
            </Button>

            <div
              onClick={() => swiperRef.current?.swiper.slidePrev()}
              className="absolute top-[50%] z-10 hidden -translate-x-full -translate-y-[50%] -scale-x-[1] cursor-pointer items-center text-white opacity-80 hover:opacity-100 md:-left-1 md:flex md:w-6 xxl:-left-2 xxl:w-[40px]"
            >
              <ArrowLeft />
            </div>
            <div
              onClick={() => swiperRef.current?.swiper.slideNext()}
              className="absolute top-[50%] z-10 hidden -translate-y-[50%] translate-x-full cursor-pointer items-center text-white opacity-80 hover:opacity-100 md:-right-1 md:flex md:w-6 xxl:-right-2 xxl:w-[40px]"
            >
              <ArrowRight />
            </div>
            <Swiper
              ref={swiperRef}
              speed={800}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              slidesPerView={1}
              spaceBetween={0}
              autoHeight={true}
              loop={true}
              pagination={{
                clickable: true,
              }}
              modules={[Autoplay, Pagination]}
              className="md:rounded-xl [&>.swiper-pagination]:-translate-x-6 [&>.swiper-pagination]:text-right"
              onSlideChange={(swiper) => {
                setActiveIndex(swiper.realIndex)
              }}
              onClick={(swiper) => navigate(`/book/detail/${data?.content[swiper.realIndex].id}`)}
            >
              {isFetching ? (
                <SwiperSlide>
                  <Skeleton.Node active={true} style={{ width: '100%', height: '100%' }} />
                </SwiperSlide>
              ) : (
                data?.content.map((book) => (
                  <SwiperSlide
                    key={book.id}
                    className="opacity-30 transition-opacity duration-[0.6s] ease-linear [&.swiper-slide-active]:opacity-100"
                  >
                    <div className="relative h-[50vw] before:absolute before:z-[2] before:h-full before:w-full before:bg-[rgba(0,0,0,0.35)] min-[1024px]:h-[40vw] xxl:h-[35vw]">
                      <div className="relative h-full w-full">
                        <div className="absolute bottom-0 right-0 top-0 z-10 min-[1024px]:-top-[15%] min-[1024px]:right-[5%] min-[1024px]:w-[40vw] min-[1024px]:rotate-12 xxl:right-[10%] xxl:w-[35vw]">
                          <img
                            className="pointer-events-none h-full select-none min-[1024px]:h-auto"
                            src={book.thumbnail_url}
                            alt="Slide Thumbnail"
                          />
                        </div>
                        <div
                          className="absolute inset-0 bg-cover bg-no-repeat blur-[8px]"
                          style={{ backgroundImage: `url(${book.banner_url})`, backgroundPosition: 'center' }}
                        ></div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))
              )}
            </Swiper>
          </div>
        </div>
      ) : null}
    </div>
  )
}
