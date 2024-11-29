import Carousel from '../components/Carousel'
import BookListHome from 'modules/book/components/BookListHome'
import RecommendedBookList from 'modules/book/components/RecommendedBookList'
import { useUser } from 'stores/user'
import { BookItem } from 'types/book'
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
        category_id: 5,
        category_name: 'Huyền huyễn',
      },
    ],
  },
]

const slides2: BookItem[] = [...slides, ...slides.reverse()]

export default function HomePage() {
  console.log('HomePage')

  const user = useUser()

  return (
    <div>
      <Carousel />
      <BookListHome books={slides} title="Đề xuất hot" />
      <BookListHome books={slides2} title="Đọc tiếp" isHistory={true} />
      {user.user.id ? <RecommendedBookList /> : null}
      <BookListHome books={slides2} title="Ngôn tình" viewMoreUrl="/category/ngon-tinh" />
    </div>
  )
}
