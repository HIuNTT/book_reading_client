import Detail from 'components/BookDetail/Detail'
import Footer from 'components/Footer'
import Rank from 'components/Home/Rank'
import VanHocVN from 'components/Home/VanHocVN'
import Header from 'components/layout/home/Header'

export default function BookDetail() {
  return (
    <div>
      <Header />
      <Detail />
      <VanHocVN />
      <Rank />
      <Footer />
    </div>
  )
}
