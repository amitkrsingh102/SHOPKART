import { Box, Button } from "@mui/material";
import ProductCard from "../Components/ProductCard";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../context/globalStateContext";

const Wishlist = () => {
  const navigate = useNavigate();
  const { getWishlist, removeFromWishlist } = useGlobalState();
  return (
    <Box
      sx={{
        pt: "3.5rem",
        pb: "5rem",
        minHeight: "100vh",
        bgcolor: "background.default",
        color: "background.paper",
        overflowY: "scroll",
      }}
    >
      {getWishlist.length !== 0 ? (
        getWishlist.map((item) => (
          <Box key={item.id} sx={{ display: "flex" }}>
            <ProductCard item={item} />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Button
                variant="outlined"
                sx={{ height: "2rem", display: "flex", gap: "5px" }}
                onClick={() => {
                  removeFromWishlist(item);
                }}
              >
                <span>Remove</span>
                <DeleteOutlineOutlinedIcon fontSize="small" />
              </Button>
            </Box>
          </Box>
        ))
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
          <h1>Wishlist Empty</h1>
          <h2>Browse items & Wishlist them</h2>
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

export default Wishlist;
