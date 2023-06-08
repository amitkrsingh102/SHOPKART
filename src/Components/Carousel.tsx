import "./Styles/Carousel.css";
import Carousel from "react-material-ui-carousel";

type Props = {
  images: string[] | undefined;
};

const CarouselCustom = ({ images }: Props) => {
  return (
    <div className="image-container">
      <Carousel autoPlay={false} navButtonsAlwaysVisible={true}>
        {images?.map((item, i) => (
          <img className="image" src={item} key={i}></img>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselCustom;
