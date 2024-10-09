import { Footer } from "antd/es/layout/layout";
import Header from "components/Header";
import BookNew from "components/Home/BookNew";
import DeXuat from "components/Home/DeXuat";
import Rank from "components/Home/Rank";
import Slider from "components/Home/Slider";

export default function HomePage() {
  return (
    <div>
      <Header />
      <Slider />
      <BookNew />
      <DeXuat />
      <Rank />
      <Footer />
    </div>
  );
}
