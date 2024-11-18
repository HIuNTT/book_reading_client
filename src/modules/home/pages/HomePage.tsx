import BookNew from 'components/Home/BookNew'
import DeXuat from 'components/Home/DeXuat'
import Rank from 'components/Home/Rank'
import Slider from 'components/Home/Slider'
import Carousel from '../components/Carousel'

export default function HomePage() {
  return (
    <div>
      <Carousel />
      <Slider />
      <BookNew />
      <DeXuat />
      <Rank />
    </div>
  )
}
