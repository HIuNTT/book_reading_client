import BookNew from 'components/Home/BookNew'
import DeXuat from 'components/Home/DeXuat'
import Rank from 'components/Home/Rank'
import Slider from 'components/Home/Slider'

export default function HomePage() {
  return (
    <div>
      <Slider />
      <BookNew />
      <DeXuat />
      <Rank />
    </div>
  )
}
