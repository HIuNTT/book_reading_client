import { getAuthorList } from "modules/author/services/getAuthorList";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Author } from "types/author";
import ArrowLeft from 'components/common/ArrowLeft'
import ArrowRight from 'components/common/ArrowRight'
import { Swiper, SwiperClass, SwiperRef, SwiperSlide } from 'swiper/react'

const AuthorList = () => {

  const [listAuthor, setListAuthor] = useState<Author[]>();
  const handleGetListAuthor = async () => {
    const res = await getAuthorList();
    if (res) {
      setListAuthor(res.content);
    }
  };
  const navigate = useNavigate()

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

  useEffect(() => {
    handleGetListAuthor();
  }, []);

  return (
    <div className="w-full mt-[50px] pl-[40px] mx-auto px-4 sm:px-8 xxl:px-16">
      <div className="flex items-center">
        <h2 className="text-[26px]">Tác giả</h2>
      </div>
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
          {listAuthor?.map((item) => (
            <SwiperSlide className="select-none">
              <div
                className="cursor-pointer w-[230px] mr-[40px] flex-shrink-0"
                onClick={() => navigate(`/author/${item.id}`)}
              >
                <div className="w-[200px] h-[200px] rounded-full bg-gray-200">
                  <img src={item.image} alt="" className="rounded-full w-full h-full"/>
                </div>
                <div className="w-full mt-[5px]">{item.name}</div>
              </div>
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
  )
}

export default AuthorList;