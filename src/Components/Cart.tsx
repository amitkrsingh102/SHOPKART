import "./Styles/Cart.css";
import { Product } from "../Type";
import { convertCurrency } from "../Utils/CurrencyExchange";
import { Box, Button, Icon, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../context/globalStateContext";
import { ProfileAndCartContext } from "../App";
import { useContext } from "react";

type Props = {
  item: Product;
};

const CartItem = ({ item }: Props) => {
  const { removeFromOrderItems } = useGlobalState();

  return (
    <div>
      <div className="item">
        <img src={item.thumbnail} alt={item.title} />
        <span>{item.title} </span>

        <span className="item-cost">
          <span>₹</span>
          {convertCurrency(item.price, "dollar", "inr")}
        </span>
        <IconButton
          onClick={() => {
            removeFromOrderItems(item);
          }}
        >
          <Icon>
            <DeleteIcon fontSize="small" />
          </Icon>
        </IconButton>
      </div>
    </div>
  );
};

const Cart = () => {
  const localState = useContext(ProfileAndCartContext);
  const { getOrderItems } = useGlobalState();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        p: "10px",
        mr: "4rem",
        width: "450px",
        height: "500px",
        bgcolor: "cart.primary",
        position: "fixed",
        right: "0",
        top: "3.3rem",
        zIndex: "8",
        borderRadius: "10px",
        color: "text.secondary",
        boxShadow: "1px 1px 10px black",
      }}
    >
      <h2
        style={{
          paddingBottom: "8px",
          textAlign: "center",
        }}
      >
        Your Cart
      </h2>
      <IconButton
        sx={{ position: "absolute", right: "0", top: "0", margin: "2px" }}
        onClick={() => {
          localState.openCart(false);
        }}
      >
        <Icon>
          <CloseIcon />
        </Icon>
      </IconButton>
      {getOrderItems.length == 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            alignItems: "center",
            justifyContent: "center",
            height: "74%",
          }}
        >
          <h1>CART EMPTY</h1>

          <Button
            variant="outlined"
            onClick={() => {
              localState.openCart(false);
            }}
          >
            Continue Shopping
          </Button>
        </Box>
      ) : (
        <Box sx={{ height: "74%", pt: "1rem", overflowY: "scroll" }}>
          {getOrderItems.map((item) => (
            <CartItem key={item.item.id} item={item.item} />
          ))}
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          borderTop: "1px solid grey",
          padding: "10px 10px 5px 5px",
        }}
      ></Box>
      <Button
        onClick={() => {
          getOrderItems.length !== 0 && navigate("/quantity");
        }}
        variant="contained"
        fullWidth
        sx={{ marginTop: "12px", padding: "10px 0px" }}
      >
        CHECKOUT
      </Button>
    </Box>
  );
};

export default Cart;
