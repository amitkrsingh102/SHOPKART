import "./Styles/Quantity.css";
import { Box, Button, IconButton } from "@mui/material";
import { OrderItemsType } from "../Type";
import { convertCurrency } from "../Utils/CurrencyExchange";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useGlobalState } from "../context/globalStateContext";
import { db } from "../firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import { useAuth } from "../context/authContext";

type Props = {
  product: OrderItemsType;
};
export const CheckOutItems = ({ product }: Props) => {
  const {
    removeFromOrderItems,
    getWishlist,
    setWishlist,
    removeFromWishlist,
    changeItemCount,
  } = useGlobalState();
  const navigate = useNavigate();
  return (
    <div className="cart-item-container">
      <div
        className="cart-item-image"
        onClick={() => {
          navigate(`/product/${product.item.id}`);
        }}
      >
        <img src={product.item.thumbnail} alt={product.item.title} />
      </div>
      <div
        className="cart-item-description"
        onClick={() => {
          navigate(`/product/${product.item.id}`);
        }}
      >
        <div className="title">{product.item.title}</div>
        <div className="base-price">
          ₹ {convertCurrency(product.item.price, "dollar", "inr")}
        </div>
      </div>
      <div className="item-count">
        <button
          onClick={() => {
            product.count > 1
              ? changeItemCount(product.item, product.count - 1)
              : removeFromOrderItems(product.item);
          }}
        >
          <RemoveIcon fontSize="small" />
        </button>
        <span>{product.count}</span>
        <button
          onClick={() => {
            changeItemCount(product.item, product.count + 1);
          }}
        >
          <AddIcon fontSize="small" />
        </button>
      </div>
      <div className="wishlist-item">
        <IconButton
          sx={{ display: "flex", gap: "5px", color: "rgb(210,70,70)" }}
          onClick={() => {
            if (
              getWishlist.filter((f) => f.id === product.item?.id).length === 0
            ) {
              setWishlist(product.item);
            } else {
              removeFromWishlist(product.item);
            }
          }}
        >
          {getWishlist.filter((item) => item.id == product.item?.id).length ===
          0 ? (
            <FavoriteBorderIcon fontSize="small" />
          ) : (
            <FavoriteIcon fontSize="small" sx={{ color: "rgb(220,20,60)" }} />
          )}
        </IconButton>
      </div>
      <div className="final-price">
        ₹ {convertCurrency(product.item.price, "dollar", "inr") * product.count}
      </div>
    </div>
  );
};

const Quantity = () => {
  const { getOrderItems, clearOrderItems } = useGlobalState();
  const currentUser = useAuth();

  const navigate = useNavigate();
  let cartTotal = 0;

  const updateToDB = async (args: OrderItemsType[]) => {
    if (currentUser) {
      try {
        const docRef = doc(db, "users", currentUser.user?.uid as string);
        await updateDoc(docRef, { orderHistory: args });
      } catch (err) {
        navigate("/login");
      }
    } else {
      navigate("./login");
    }
  };

  const handleCheckout = () => {
    const finalOrder: OrderItemsType[] = [];
    getOrderItems.map((item) => finalOrder.push(item));
    clearOrderItems();
    updateToDB(finalOrder);
  };

  return (
    <Box
      sx={{
        paddingTop: "3.3rem",
        backgroundColor: "background.default",
        width: "100%",
        height: "100vh",
        overflowX: "hidden",
        color: "background.paper",
      }}
    >
      {getOrderItems.length !== 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {getOrderItems?.map((it, idx) => {
            cartTotal =
              cartTotal +
              convertCurrency(it.item.price, "dollar", "inr") * it.count;
            return <CheckOutItems key={idx} product={it} />;
          })}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "20px",
              height: "200px",
              gap: "20px",
            }}
          >
            <h1 className="cartTotal">TOTAL : ₹{cartTotal}</h1>
            <Button
              variant="contained"
              sx={{ display: "flex", gap: "5px", height: "50px" }}
              onClick={() => {
                handleCheckout();
              }}
            >
              <span>Proceed to Payment</span>
              <NavigateNextIcon />
            </Button>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            height: "80vh",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1>Cart is Empty</h1>
          <h2>Browse items & add them to cart</h2>
          <Button
            variant="outlined"
            onClick={() => {
              navigate("/");
            }}
          >
            Browse Items
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Quantity;
