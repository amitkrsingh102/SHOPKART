import "./Styles/Slider.css";
import img1 from "../assets/StanderdDefinationPics/furniture.jpg";
import img2 from "../assets/StanderdDefinationPics/laptop.jpg";
import img3 from "../assets/StanderdDefinationPics/jewellery-women.jpg";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import WestOutlinedIcon from "@mui/icons-material/WestOutlined";
import { useState } from "react";

const Slider = () => {
  const [currentSlide, currentSlideSet] = useState(0);
  const data = [img1, img2, img3];

  const prevSlide = () => {
    currentSlideSet(currentSlide == 0 ? 2 : (prev) => prev - 1);
  };
  const nextSlide = () => {
    currentSlideSet(currentSlide == 2 ? 0 : (prev) => prev + 1);
  };

  return (
    <div className="slider">
      <div
        className="slider-container"
        style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
      >
        <img src={data[0]} alt="img1" />
        <img src={data[1]} alt="img1" />
        <img src={data[2]} alt="img1" />
      </div>
      <div className="icons">
        <div className="icon left" onClick={prevSlide}>
          <WestOutlinedIcon />
        </div>
        <div className="icon right" onClick={nextSlide}>
          <EastOutlinedIcon />
        </div>
      </div>
    </div>
  );
};

export default Slider;
