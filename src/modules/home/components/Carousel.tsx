import { StarFilled } from '@ant-design/icons'
import { Button, Divider, Space, Tag, Typography } from 'antd'
import ArrowLeft from 'components/common/ArrowLeft'
import ArrowRight from 'components/common/ArrowRight'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'
import { BookItem } from 'types/book'
import { cn } from 'utils/cn'
import { formatCompactNumber } from 'utils/number'

const { Text } = Typography

const slides: BookItem[] = [
  {
    id: 1,
    title: 'Nữ hoàng bệ hạ khuấy đảo showbiz',
    summary:
      'Đăng cơ năm thứ 29, Khương Lệnh Hi không may qua đời trên đường khải hoàn về kinh sau khi ngự giá thân chinh. Mở mắt ra, cô đã ở thế giới hiện đại một nghìn năm sau, trở thành một ngôi sao nhỏ chuyên gây rối bị lên án trong mắt mọi người. Bị mọi người lên án? Kẻ gây rối? Ngôi sao nhỏ? Khương Lệnh Hi chỉ cười nhạt, cô đường đường là Nữ đế, giỏi nhất xoay chuyển càn khôn trong tình thế tuyệt vọng!',
    avg_rating: 9.9,
    thumbnail_url: 'https://307a0e78.vws.vegacdn.vn/view/v2/image/img.retail_book/0/0/0/475.jpg',
    view: 100222,
    status: 'Đang ra',
    created_at: '2024',
    updated_at: '2024',
    author: {
      id: 1,
      name: 'Hồng Cửu',
      created_at: '2024',
      updated_at: '2024',
    },
    category_book: [
      {
        category_id: 1,
        category_name: 'Ngôn tình',
      },
      {
        category_id: 2,
        category_name: 'Cổ đại',
      },
      {
        category_id: 3,
        category_name: 'Tình yêu',
      },
      {
        category_id: 4,
        category_name: 'Hài hước',
      },
    ],
  },
  {
    id: 2,
    title: 'Phượng hồ',
    summary:
      'Là người bị đồng bọn tiễn lên "chầu trời", Lãnh Táp phát hiện ra cuộc đời của cô vẫn tràn đầy xui xẻo như trước. Cô đính hôn! Rồi bị từ hôn! Cô lại đính hôn! Thì người phải lấy lại là một tên biến thái! Lãnh gia bày tỏ, biện pháp duy nhất để đối phó với biến thái chính là đánh!',
    avg_rating: 9.9,
    thumbnail_url: 'https://307a0e78.vws.vegacdn.vn/view/v2/image/img.retail_book/0/0/0/389.jpg',
    view: 123987,
    status: 'Đang ra',
    created_at: '2024',
    updated_at: '2024',
    author: {
      id: 1,
      name: 'Hồng Cửu',
      created_at: '2024',
      updated_at: '2024',
    },
    category_book: [
      {
        category_id: 1,
        category_name: 'Ngôn tình',
      },
      {
        category_id: 2,
        category_name: 'Cổ đại',
      },
      {
        category_id: 3,
        category_name: 'Tình yêu',
      },
      {
        category_id: 4,
        category_name: 'Hài hước',
      },
      {
        category_id: 5,
        category_name: 'Cổ trang',
      },
    ],
  },
  {
    id: 3,
    title: 'Vụ án đảo Thỉ Nhạc',
    summary:
      'Tại sao trên hòn đảo thanh bình này lại lần lượt xảy ra những cái chết kinh hoàng? Thi thể phụ nữ không đầu trên bãi biển là ai? Vì sao xác phụ nữ bị đâm xuyên tim trong nhà kính lại nở nụ cười kỳ lạ sau khi chết? Những vụ án này là tự sát hay mưu sát? Những chuyện trên đảo Thỉ Nhạc như một làn sương mờ che phủ tầm mắt mọi người. Thực ra, trên đời này, thứ đáng sợ nhất chính là lòng người.',
    avg_rating: 9.8,
    thumbnail_url: 'https://307a0e78.vws.vegacdn.vn/view/v2/image/img.retail_book/0/0/0/442.jpg',
    view: 12231567,
    status: 'Đang ra',
    created_at: '2024',
    updated_at: '2024',
    author: {
      id: 1,
      name: 'Hồng Cửu',
      created_at: '2024',
      updated_at: '2024',
    },
    category_book: [
      {
        category_id: 1,
        category_name: 'Trinh thám',
      },
      {
        category_id: 2,
        category_name: 'Cổ đại',
      },
      {
        category_id: 3,
        category_name: 'Kinh dị',
      },
    ],
  },
  {
    id: 4,
    title: 'Lão tổ huyền môn bị ép trở thành thần',
    summary:
      'Từ bé, Tiểu Kiều đã lăn lộn dưới đáy xã hội, cô không phân biệt được thiện và ác, ngay và gian. Năm xưa, cô từng đánh nhau với người ta đến nỗi thương tích đầy mình vì miếng cơm manh áo. Khi ấy, một người đàn ông mặc Âu phục, dáng vẻ hào hoa phong nhã đã xuất hiện trước mặt cô. Người ấy chìa tay ra với cô và hỏi: “Có muốn đi theo tôi không?” Tiểu Kiều nghiêng đầu hỏi: “Có được ăn no không?”',
    avg_rating: 9.9,
    thumbnail_url: 'https://307a0e78.vws.vegacdn.vn/view/v2/image/img.retail_book/0/0/0/451.jpg',
    view: 20896500,
    status: 'Đang ra',
    created_at: '2024',
    updated_at: '2024',
    author: {
      id: 1,
      name: 'Hồng Cửu',
      created_at: '2024',
      updated_at: '2024',
    },
    category_book: [
      {
        category_id: 1,
        category_name: 'Ngôn tình',
      },
      {
        category_id: 2,
        category_name: 'Hiện đại',
      },
      {
        category_id: 3,
        category_name: 'Tình yêu',
      },
      {
        category_id: 4,
        category_name: 'Huyền huyễn',
      },
      {
        category_id: 5,
        category_name: 'Y thuật',
      },
    ],
  },
  {
    id: 6,
    title: 'Thời đại game quật khởi',
    summary:
      'Chung Minh là một họa sĩ xuất sắc, được mọi người tôn xưng là “đại thần thế giới ảo”. Anh sáng tạo ra một tựa game bùng nổ vang dội, thế nhưng khi thu lại được khoản lợi nhuận kếch xù, các đối tác trở mặt, đẩy anh ra khỏi dự án. Ngay sau đó anh lại phát hiện ra mình đã mắc ung thư giai đoạn cuối. Chung Minh không cam tâm, anh vẫn còn rất trẻ nhưng lại bất đắc dĩ phải rời xa thế giới này!',
    avg_rating: 9.9,
    thumbnail_url: 'https://307a0e78.vws.vegacdn.vn/view/v2/image/img.retail_book/0/0/0/197.jpg',
    view: 201000000,
    status: 'Đang ra',
    created_at: '2024',
    updated_at: '2024',
    author: {
      id: 1,
      name: 'Hồng Cửu',
      created_at: '2024',
      updated_at: '2024',
    },
    category_book: [
      {
        category_id: 1,
        category_name: 'Ngôn tình',
      },
      {
        category_id: 2,
        category_name: 'Cổ đại',
      },
      {
        category_id: 3,
        category_name: 'Tình yêu',
      },
      {
        category_id: 4,
        category_name: 'Hài hước',
      },
      {
        category_id: 5,
        category_name: 'Cổ trang',
      },
    ],
  },
  {
    id: 8,
    title: 'Tu chân liêu thiên quần',
    summary:
      'Tống Thư Hàng là một chàng trai có khuôn mặt hiền lành dễ gây thiện cảm, tính cách cũng vô cùng dễ chịu. Hắn là sinh viên khoa Kỹ thuật Cơ khí của Học viện Kỹ thuật Thiết kế và Chế tạo của Đại học Giang Nam. Một ngày, trong lúc hắn đang mơ hồ vì bị cảm thì có ID tên Hoàng Sơn Chân Quân mời hắn tham gia nhập vào group Nhóm Cửu Châu Số 1. Đoán có thể đây là một trong số mấy tên đã to đầu mà vẫn còn mơ mộng ở lớp mình nên Tống thư Hàng đồng ý.',
    avg_rating: 10,
    thumbnail_url: 'https://307a0e78.vws.vegacdn.vn/view/v2/image/img.retail_book/0/0/0/177.jpg',
    view: 524500000,
    status: 'Đang ra',
    created_at: '2024',
    updated_at: '2024',
    author: {
      id: 1,
      name: 'Hồng Cửu',
      created_at: '2024',
      updated_at: '2024',
    },
    category_book: [
      {
        category_id: 2,
        category_name: 'Hiện đại',
      },
      {
        category_id: 4,
        category_name: 'Trung quốc',
      },
      {
        category_id: 5,
        category_name: 'Tu tiên',
      },
      {
        category_id: 6,
        category_name: 'Huyền huyễn',
      },
    ],
  },
]

export default function Carousel() {
  const [activeIndex, setActiveIndex] = useState<number>(0)

  const swiperRef = useRef<SwiperRef>(null)

  const navigate = useNavigate()

  return (
    <div>
      <div className="relative -mt-[var(--app-home-header-height)] mb-6 px-0 pt-[var(--app-home-header-height)] md:px-8 xxl:px-16">
        <div
          className="absolute inset-0 z-[1] bg-cover bg-center transition-all duration-[0.3s] ease-linear"
          style={{
            backgroundImage: `url(${slides[activeIndex].thumbnail_url})`,
          }}
        >
          <div
            className="absolute inset-0 z-10 backdrop-blur-3xl"
            style={{
              background: 'linear-gradient(0deg, rgb(255, 255, 255) 5%, rgba(0, 0, 0, 0) 60%) rgba(0, 0, 0, 0.5)',
            }}
          ></div>
        </div>
        <div className="relative mt-0 cursor-pointer md:mt-6 xxl:mt-8">
          {slides.map((slide) => (
            <div
              className={cn(
                'pointer-events-none absolute bottom-4 left-4 z-20 max-w-[80%] text-white opacity-0 transition-opacity delay-200 duration-500 ease-linear md:bottom-[18%] md:left-14 md:max-w-[50%] min-[1024px]:bottom-[28%] min-[1024px]:left-[64px]',
                {
                  'opacity-100': slide.id === slides[activeIndex].id,
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
            onClick={() => navigate(`/book/${slides[activeIndex].id}`)}
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
            onClick={(swiper) => navigate(`/book/${slides[swiper.realIndex].id}`)}
          >
            {slides.map((slide) => (
              <SwiperSlide
                key={slide.id}
                className="opacity-30 transition-opacity duration-[0.6s] ease-linear [&.swiper-slide-active]:opacity-100"
              >
                <div className="relative h-[50vw] before:absolute before:z-[2] before:h-full before:w-full before:bg-[rgba(0,0,0,0.35)] min-[1024px]:h-[40vw] xxl:h-[35vw]">
                  <div className="relative h-full w-full">
                    <div className="absolute bottom-0 right-0 top-0 z-10 min-[1024px]:-top-[15%] min-[1024px]:right-[5%] min-[1024px]:w-[40vw] min-[1024px]:rotate-12 xxl:right-[10%] xxl:w-[35vw]">
                      <img
                        className="pointer-events-none h-full select-none min-[1024px]:h-auto"
                        src={slide.thumbnail_url}
                        alt="Slide Thumbnail"
                      />
                    </div>
                    <div
                      className="absolute inset-0 bg-cover bg-no-repeat blur-[10px]"
                      style={{ backgroundImage: `url(${slide.thumbnail_url})`, backgroundPosition: '50% 30%' }}
                    ></div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  )
}
