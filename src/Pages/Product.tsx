//style imports
import "./Styles/Product.css";

//mui imports
import { Box, Button } from "@mui/material";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

//react imports
import { useParams } from "react-router-dom";
import { useFetch } from "../Hooks/useFetch";
import { Product, ProductArray } from "../Type";
import CarouselCustom from "../Components/Carousel";
import { convertCurrency } from "../Utils/CurrencyExchange";
import ReactLoading from "react-loading";
import NewFeaturedCard from "../Components/NewFeaturedCard";
import { useGlobalState } from "../context/globalStateContext";

const ProductItem = () => {
  const {
    getOrderItems,
    setOrderItems,
    getWishlist,
    setWishlist,
    removeFromWishlist,
  } = useGlobalState();
  const { productId } = useParams();
  const { data, done } = useFetch<ProductArray | null>(
    "https://dummyjson.com/products?limit=100"
  );
  const currentProduct = data?.products[parseInt(productId as string) - 1];
  return (
    <Box
      sx={{
        pt: "3.3rem",
        minHeight: "100%",
        backgroundColor: "background.default",
        color: "background.paper",
      }}
    >
      {done ? (
        <Box>
          <Box sx={{ display: "flex" }}>
            {/* image container */}
            <Box sx={{ pt: "2.2rem" }}>
              <CarouselCustom images={currentProduct?.images} />
            </Box>
            {/* description conatiner */}
            <Box sx={{ p: "5rem 0 5rem 3rem" }}>
              <div className="product-description-container">
                <h1 className="product-title">{currentProduct?.title}</h1>

                <span className="rating">
                  <span>{currentProduct?.rating?.toFixed(1)}</span>
                  <StarOutlinedIcon fontSize="inherit" />
                </span>

                <div className="individiual-product-description">
                  {currentProduct?.description} Lorem, ipsum dolor sit amet
                  consectetur adipisicing elit. Facere, repellat dolorem rerum
                  quisquam deleniti excepturi! Culpa numquam maxime ullam
                  quisquam.
                </div>
                {/* price section */}
                <div className="price-container">
                  <span className="selling-price">
                    ₹
                    {convertCurrency(
                      currentProduct?.price as number,
                      "dollar",
                      "inr"
                    )}
                  </span>

                  <div className="product-discount-container">
                    <span className="cost-price">
                      ₹
                      {(
                        (convertCurrency(
                          currentProduct?.price as number,
                          "dollar",
                          "inr"
                        ) *
                          100) /
                        (100 - (currentProduct?.discountPercentage as number))
                      ).toFixed(2)}
                    </span>
                    <span className="product-discount">
                      {currentProduct?.discountPercentage}% off
                    </span>
                  </div>
                </div>
                {/* checkout section */}
                <div className="check-out">
                  <Button
                    variant="outlined"
                    onClick={() => {
                      if (
                        getOrderItems.filter(
                          (f) => f.item.id === currentProduct?.id
                        ).length === 0
                      ) {
                        setOrderItems(currentProduct as Product);
                      }
                    }}
                  >
                    Add to cart
                  </Button>
                  <Button
                    variant="outlined"
                    className="check-out-btn"
                    sx={{ display: "flex", gap: "5px" }}
                    onClick={() => {
                      if (
                        getWishlist.filter((f) => f.id === currentProduct?.id)
                          .length === 0
                      ) {
                        setWishlist(currentProduct as Product);
                      } else {
                        removeFromWishlist(currentProduct as Product);
                      }
                    }}
                  >
                    <span>WISHLIST</span>
                    {getWishlist.filter((item) => item.id == currentProduct?.id)
                      .length == 0 ? (
                      <FavoriteBorderIcon fontSize="small" />
                    ) : (
                      <FavoriteIcon
                        fontSize="small"
                        sx={{ color: "rgb(220,20,60)" }}
                      />
                    )}
                  </Button>
                </div>
                {/* other info section */}
                <div className="brand-stock">
                  <ul>
                    <li>Brand : {currentProduct?.brand}</li>
                    <li>Currently in stock : {currentProduct?.stock}</li>
                    <li>Category : {currentProduct?.category}</li>
                  </ul>
                </div>
              </div>
            </Box>
          </Box>

          {/* related products */}
          <Box
            sx={{
              width: "100%",
              pt: "3.3rem",
              pb: "2rem",
              overflowY: "scroll",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <h2>Related Products</h2>
            <Box sx={{ display: "flex", gap: "10px" }}>
              {data?.products
                .filter(
                  (f) =>
                    f.category === currentProduct?.category &&
                    f.id !== currentProduct.id
                )
                .map((item) => (
                  // <Related key={item.id} relatedItem={item} />
                  <NewFeaturedCard key={item.id} item={item} />
                ))}
            </Box>
          </Box>
        </Box>
      ) : (
        <Box
          minHeight="100vh"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ReactLoading type="bars" color="grey" width="100px" height="100px" />
        </Box>
      )}
    </Box>
  );
};

export default ProductItem;
