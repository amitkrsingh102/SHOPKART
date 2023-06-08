import { Box, Button } from "@mui/material";
import "./Styles/Checkout.css";
import { useNavigate } from "react-router-dom";
import { OrderItemsType } from "../Type";
import { convertCurrency } from "../Utils/CurrencyExchange";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { useEffect, useState } from "react";

type Props = {
  product: OrderItemsType;
};
export const FinalOrderItems = ({ product }: Props) => {
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
      </div>

      <div className="final-price">
        ₹ {convertCurrency(product.item.price, "dollar", "inr")}
      </div>
    </div>
  );
};

const OrderHistory = () => {
  const [finalOrderHistory, finalOrderHistorySet] = useState<OrderItemsType[]>(
    []
  );
  const navigate = useNavigate();

  const fetchFromDB = () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "users", user.uid);
          await getDoc(docRef).then((res) => {
            console.log(res.data()?.orderHistory);
            finalOrderHistorySet(res.data()?.orderHistory);
          });
        } catch (err) {
          console.error(err);
        }
      } else {
        navigate("/login");
      }
    });
  };
  useEffect(() => {
    fetchFromDB();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      {finalOrderHistory.length !== 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {finalOrderHistory?.map((it, idx) => {
            return <FinalOrderItems key={idx} product={it} />;
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
            <Button
              variant="contained"
              sx={{ display: "flex", gap: "5px", height: "50px" }}
              onClick={() => {
                navigate("/");
              }}
            >
              <span>Back to Home</span>
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
          <h1>No orders placed</h1>
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

export default OrderHistory;
