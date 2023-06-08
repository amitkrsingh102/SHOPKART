import { useNavigate } from "react-router-dom";
import { Product } from "../Type";
import "./Styles/NewFeaturedCard.css";
import { convertCurrency } from "../Utils/CurrencyExchange";

type Props = {
  item: Product;
  isNew?: boolean;
  isFeatured?: boolean;
};

const NewFeaturedCard = ({ item, isNew, isFeatured }: Props) => {
  const price = convertCurrency(item?.price as number, "dollar", "inr");
  const navigate = useNavigate();
  return (
    <div
      className="feature-card"
      onClick={() => {
        isNew || isFeatured
          ? navigate("/categories/all")
          : navigate(`/product/${item.id}`);
      }}
    >
      <div className="card-image">
        {isNew && <span className="featured-new">New</span>}
        {isFeatured && <span className="featured-new">Featured</span>}
        <img src={item.images[0]} alt="img1" className="image-one" />
        <img src={item.images[1]} alt="img2" className="image-two" />
      </div>
      <h2 className="cart-item-title">{item.title}</h2>
      <div className="card-prices">
        <h3 className="old-price">
          ₹ {((price * 100) / (100 - item.discountPercentage)).toFixed(2)}
        </h3>
        <h3 className="new-price">₹ {price}</h3>
      </div>
    </div>
  );
};

export default NewFeaturedCard;
