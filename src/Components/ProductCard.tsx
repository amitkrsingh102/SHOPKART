import "./Styles/ProductCard.css";
import { Product } from "../Type";
import { useNavigate } from "react-router-dom";
import { convertCurrency } from "../Utils/CurrencyExchange";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import { Box, Button } from "@mui/material";
import { useGlobalState } from "../context/globalStateContext";

type Props = {
  item: Product;
};
const ProductCard = ({ item }: Props) => {
  const { getOrderItems, setOrderItems } = useGlobalState();
  const navigate = useNavigate();
  const scrolltop = () => {
    document.querySelector(".body")?.scrollTo(0, 0);
  };
  return (
    <Box sx={{ color: "background.paper" }}>
      <div className="card-main">
        <div
          className="card-image-container"
          onClick={() => {
            navigate(`/product/${item.id}`);
            scrolltop();
          }}
        >
          <img src={item.thumbnail} alt={item.title} />
        </div>
        <div
          className="card-description-container"
          onClick={() => {
            navigate(`/product/${item.id}`);
            scrolltop();
          }}
        >
          <div className="card-description-title">{item.title}</div>
          <span className="card-description-rating">
            <span>{item.rating?.toFixed(1)}</span>
            <StarOutlinedIcon fontSize="small" />
          </span>
          <div className="card-description">{item.description}</div>
        </div>
        <div className="card-price-container">
          <span className="sp">
            ₹{convertCurrency(item.price, "dollar", "inr")}
          </span>
          <div className="discount-container">
            <span className="cp">
              ₹
              {(
                (convertCurrency(item.price, "dollar", "inr") * 100) /
                (100 - item.discountPercentage)
              ).toFixed(2)}
            </span>
            <span className="discount">{item.discountPercentage}% off</span>
          </div>
          <Button
            variant="outlined"
            onClick={() => {
              if (
                getOrderItems.filter((f) => f.item.id === item?.id).length === 0
              ) {
                setOrderItems(item);
              }
            }}
          >
            Add to cart
          </Button>
        </div>
      </div>
    </Box>
  );
};

export default ProductCard;
