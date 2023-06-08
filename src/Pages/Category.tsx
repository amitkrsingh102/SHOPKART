//style imports
import "./Styles/CategoryPage.css";

//mui imports
import { Box, Button, Icon } from "@mui/material";
import { shades } from "../Theme";
import NorthOutlinedIcon from "@mui/icons-material/NorthOutlined";
import SouthOutlinedIcon from "@mui/icons-material/SouthOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

//react imports
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useReducer } from "react";
import { Product, ProductArray, categories } from "../Type";
import { useFetch } from "../Hooks/useFetch";
import ProductCard from "../Components/ProductCard";

// image imports
import smartphones from "../assets/smartphone.jpg";
import laptops from "../assets/laptop.jpg";
import motorcycle from "../assets/motorcycle.jpg";
import automotive from "../assets/automotives.jpg";
import groceries from "../assets/groceries.jpg";
import skincare from "../assets/skincare.jpg";
import fragrances from "../assets/fragrances.jpg";
import tops from "../assets/tops.jpg";
import womensJewellery from "../assets/jewellery-women.jpg";
import womensBags from "../assets/bags-women.jpg";
import womensWatches from "../assets/watches-women.jpg";
import womensShoes from "../assets/shoes-women.jpg";
import womensDresses from "../assets/dress-women.jpg";
import mensShoes from "../assets/shoe-men.jpg";
import mensWatches from "../assets/watch-men.jpg";
import mensShirts from "../assets/shirt-men.jpg";
import sunglasses from "../assets/sunglasses-men.jpg";
import homeDecoration from "../assets/decoration.jpg";
import furniture from "../assets/furniture.jpg";
import lighting from "../assets/lighting.jpg";
import ReactLoading from "react-loading";

//Types

type Prop = {
  id: string;
  name: string;
  imgSrc?: string;
};
type AdditionalProp = {
  status: boolean;
  statusSet: () => void;
  name: string;
  cat: string;
};
type SortStateType = {
  priceSortInc: boolean;
  ratingSortInc: boolean;
  discountSortInc: boolean;
  priceSortDec: boolean;
  ratingSortDec: boolean;
  discountSortDec: boolean;
  sortOption?: string;
};
type ActionType =
  | {
      type: "STATUS_CHANGE_PRICE_INC";
      payload: { currentStatus: boolean; sortOption: string };
    }
  | {
      type: "STATUS_CHANGE_RATING_INC";
      payload: { currentStatus: boolean; sortOption: string };
    }
  | {
      type: "STATUS_CHANGE_DISCOUNT_INC";
      payload: { currentStatus: boolean; sortOption: string };
    }
  | {
      type: "STATUS_CHANGE_PRICE_DEC";
      payload: { currentStatus: boolean; sortOption: string };
    }
  | {
      type: "STATUS_CHANGE_RATING_DEC";
      payload: { currentStatus: boolean; sortOption: string };
    }
  | {
      type: "STATUS_CHANGE_DISCOUNT_DEC";
      payload: { currentStatus: boolean; sortOption: string };
    }
  | {
      type: "RESET";
    };

//Reducer

const sortReducer = (state: SortStateType, action: ActionType) => {
  switch (action.type) {
    case "STATUS_CHANGE_PRICE_INC":
      return {
        ratingSortInc: action.payload.currentStatus,
        discountSortInc: action.payload.currentStatus,
        priceSortInc: !action.payload.currentStatus,
        ratingSortDec: action.payload.currentStatus,
        discountSortDec: action.payload.currentStatus,
        priceSortDec: action.payload.currentStatus,
        sortOption: action.payload.sortOption,
      };
    case "STATUS_CHANGE_RATING_INC":
      return {
        ratingSortInc: !action.payload.currentStatus,
        discountSortInc: action.payload.currentStatus,
        priceSortInc: action.payload.currentStatus,
        ratingSortDec: action.payload.currentStatus,
        discountSortDec: action.payload.currentStatus,
        priceSortDec: action.payload.currentStatus,
        sortOption: action.payload.sortOption,
      };
    case "STATUS_CHANGE_DISCOUNT_INC":
      return {
        ratingSortInc: action.payload.currentStatus,
        discountSortInc: !action.payload.currentStatus,
        priceSortInc: action.payload.currentStatus,
        ratingSortDec: action.payload.currentStatus,
        discountSortDec: action.payload.currentStatus,
        priceSortDec: action.payload.currentStatus,
        sortOption: action.payload.sortOption,
      };
    case "STATUS_CHANGE_PRICE_DEC":
      return {
        ratingSortInc: action.payload.currentStatus,
        discountSortInc: action.payload.currentStatus,
        priceSortInc: action.payload.currentStatus,
        ratingSortDec: action.payload.currentStatus,
        discountSortDec: action.payload.currentStatus,
        priceSortDec: !action.payload.currentStatus,
        sortOption: action.payload.sortOption,
      };
    case "STATUS_CHANGE_RATING_DEC":
      return {
        ratingSortInc: action.payload.currentStatus,
        discountSortInc: action.payload.currentStatus,
        priceSortInc: action.payload.currentStatus,
        ratingSortDec: !action.payload.currentStatus,
        discountSortDec: action.payload.currentStatus,
        priceSortDec: action.payload.currentStatus,
        sortOption: action.payload.sortOption,
      };
    case "STATUS_CHANGE_DISCOUNT_DEC":
      return {
        ratingSortInc: action.payload.currentStatus,
        discountSortInc: action.payload.currentStatus,
        priceSortInc: action.payload.currentStatus,
        ratingSortDec: action.payload.currentStatus,
        discountSortDec: !action.payload.currentStatus,
        priceSortDec: action.payload.currentStatus,
        sortOption: action.payload.sortOption,
      };
    case "RESET":
      return {
        ratingSortInc: false,
        discountSortInc: false,
        priceSortInc: false,
        ratingSortDec: false,
        discountSortDec: false,
        priceSortDec: false,
      };
    default:
      return { ...state };
  }
};

//Helper Components
const SortOptions = ({ status, name, statusSet, cat }: AdditionalProp) => {
  return (
    <span>
      {cat === "INC" ? (
        <span>
          {status ? (
            <Button
              variant="contained"
              sx={{
                display: "flex",
                gap: "5px",
                alignItems: "center",
                justifyContent: "center",
                border: "primary.main",
              }}
            >
              <span>{name}</span>
              <Icon style={{ display: "flex" }}>
                <NorthOutlinedIcon fontSize="small" />
              </Icon>
            </Button>
          ) : (
            <Button
              onClick={() => {
                statusSet();
              }}
              variant="outlined"
              sx={{
                display: "flex",
                gap: "5px",
                alignItems: "center",
                justifyContent: "center",
                border: "primary.main",
              }}
            >
              <span>{name}</span>
              <Icon style={{ display: "flex" }}>
                <NorthOutlinedIcon fontSize="small" />
              </Icon>
            </Button>
          )}
        </span>
      ) : cat === "DEC" ? (
        <span>
          {status ? (
            <Button
              variant="contained"
              sx={{
                display: "flex",
                gap: "5px",
                alignItems: "center",
                justifyContent: "center",
                border: "primary.main",
              }}
            >
              <span>{name}</span>
              <Icon style={{ display: "flex" }}>
                <SouthOutlinedIcon fontSize="small" />
              </Icon>
            </Button>
          ) : (
            <Button
              onClick={() => {
                statusSet();
              }}
              variant="outlined"
              sx={{
                display: "flex",
                gap: "5px",
                alignItems: "center",
                justifyContent: "center",
                border: "primary.main",
              }}
            >
              <span>{name}</span>
              <Icon style={{ display: "flex" }}>
                <SouthOutlinedIcon fontSize="small" />
              </Icon>
            </Button>
          )}
        </span>
      ) : (
        <span>
          <Button
            onClick={() => {
              statusSet();
            }}
            variant="outlined"
            sx={{
              display: "flex",
              gap: "5px",
              alignItems: "center",
              justifyContent: "center",
              border: "primary.main",
            }}
          >
            <span>{name}</span>
            <Icon style={{ display: "flex" }}>
              <ClearOutlinedIcon fontSize="small" />
            </Icon>
          </Button>
        </span>
      )}
    </span>
  );
};

const CategotyItem = ({ id, name, imgSrc }: Prop) => {
  const navigate = useNavigate();

  return (
    <span
      style={{
        backgroundImage: `url(${imgSrc})`,
        backgroundSize: "cover",
        backgroundPositionX: "center",
        backgroundPositionY: "center",
        color: shades.default.primary[500],
        textShadow: "",
      }}
      className="category-item"
      onClick={() => {
        navigate(`/categories/${id}`);
      }}
    >
      <span>{name}</span>
    </span>
  );
};

// main component
const Category = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  const initialState: SortStateType = {
    priceSortInc: false,
    ratingSortInc: false,
    discountSortInc: false,
    priceSortDec: false,
    ratingSortDec: false,
    discountSortDec: false,
    sortOption: "",
  };
  const [state, dispatch] = useReducer(sortReducer, initialState);

  const { data, done } = useFetch<ProductArray | null>(
    "https://dummyjson.com/products?limit=100"
  );
  const comparetorFunctionForSorting = (a: Product, b: Product): number => {
    switch (state.sortOption) {
      case "priceInc":
        return b.price - a.price;
      case "priceDec":
        return a.price - b.price;
      case "ratingInc":
        return b.rating - a.rating;
      case "ratingDec":
        return a.rating - b.rating;
      case "discountInc":
        return b.discountPercentage - a.discountPercentage;
      case "discountDec":
        return a.discountPercentage - b.discountPercentage;
      default:
        return 0;
    }
  };

  useEffect(() => {
    if (!categories.includes(category as string)) {
      navigate("/error");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

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
      {category === "all" ? (
        // category section
        <Box
          sx={{
            p: "0 1rem",
          }}
        >
          <Box>
            {/* Fashion grid */}
            <Box>
              <h1 className="category-header">FASHION</h1>
              <h2 className="category-sub-header men">Men</h2>
              <div className="wrapper-div">
                <CategotyItem
                  id="mens-watches"
                  name="Watches"
                  imgSrc={mensWatches}
                />
                <CategotyItem id="mens-shoes" name="Shoes" imgSrc={mensShoes} />
                <CategotyItem
                  id="mens-shirts"
                  name="Shirts"
                  imgSrc={mensShirts}
                />
                <CategotyItem
                  id="sunglasses"
                  name="Sunglasses"
                  imgSrc={sunglasses}
                />
              </div>
              <h2 className="category-sub-header">Women</h2>
              <div className="wrapper-div">
                <CategotyItem
                  id="womens-jewellery"
                  name="Jewellery"
                  imgSrc={womensJewellery}
                />
                <CategotyItem
                  id="womens-bags"
                  name="Bags"
                  imgSrc={womensBags}
                />
                <CategotyItem
                  id="womens-watches"
                  name="Watches"
                  imgSrc={womensWatches}
                />
                <CategotyItem
                  id="womens-shoes"
                  name="Shoes"
                  imgSrc={womensShoes}
                />
                <CategotyItem
                  id="womens-dresses"
                  name="Dresses"
                  imgSrc={womensDresses}
                />
                <CategotyItem id="tops" name="Tops" imgSrc={tops} />
              </div>
            </Box>
            {/* Electronics Grid */}
            <Box>
              <h1 className="category-header">ELECTRONICS</h1>
              <div className="wrapper-div">
                <CategotyItem
                  id="smartphones"
                  name="Smartphones"
                  imgSrc={smartphones}
                />
                <CategotyItem id="laptops" name="Laptops" imgSrc={laptops} />
              </div>
            </Box>
            {/* Home Decore grid */}
            <Box>
              <h1 className="category-header">HOME DECOR</h1>
              <div className="wrapper-div">
                <CategotyItem
                  id="home-decoration"
                  name="Decoration"
                  imgSrc={homeDecoration}
                />
                <CategotyItem
                  id="furniture"
                  name="Furniture"
                  imgSrc={furniture}
                />
                <CategotyItem id="lighting" name="Lighting" imgSrc={lighting} />
              </div>
            </Box>
            {/* Others grid */}
            <Box>
              <h1 className="category-header">OTHERS</h1>
              <div className="wrapper-div">
                <CategotyItem
                  id="skincare"
                  name="Skin care"
                  imgSrc={skincare}
                />
                <CategotyItem
                  id="fragrances"
                  name="Fragrances"
                  imgSrc={fragrances}
                />
                <CategotyItem
                  id="motorcycle"
                  name="Motorcycle"
                  imgSrc={motorcycle}
                />
                <CategotyItem
                  id="automotive"
                  name="Automotive"
                  imgSrc={automotive}
                />
                <CategotyItem
                  id="groceries"
                  name="Groceries"
                  imgSrc={groceries}
                />
              </div>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              p: "0 1rem",
              width: "100%",
              height: "2.5rem",
              zIndex: "-1",
            }}
          >
            <SortOptions
              status={state.priceSortInc}
              cat="INC"
              name="price"
              statusSet={() =>
                dispatch({
                  type: "STATUS_CHANGE_PRICE_INC",
                  payload: {
                    currentStatus: state.priceSortInc,
                    sortOption: "priceInc",
                  },
                })
              }
            />
            <SortOptions
              status={state.ratingSortInc}
              cat="INC"
              name="rating"
              statusSet={() =>
                dispatch({
                  type: "STATUS_CHANGE_RATING_INC",
                  payload: {
                    currentStatus: state.ratingSortInc,
                    sortOption: "ratingInc",
                  },
                })
              }
            />
            <SortOptions
              status={state.discountSortInc}
              cat="INC"
              name="discount"
              statusSet={() =>
                dispatch({
                  type: "STATUS_CHANGE_DISCOUNT_INC",
                  payload: {
                    currentStatus: state.discountSortInc,
                    sortOption: "discountInc",
                  },
                })
              }
            />
            <SortOptions
              status={state.priceSortDec}
              cat="DEC"
              name="price"
              statusSet={() =>
                dispatch({
                  type: "STATUS_CHANGE_PRICE_DEC",
                  payload: {
                    currentStatus: state.priceSortDec,
                    sortOption: "priceDec",
                  },
                })
              }
            />{" "}
            <SortOptions
              status={state.ratingSortDec}
              cat="DEC"
              name="rating"
              statusSet={() =>
                dispatch({
                  type: "STATUS_CHANGE_RATING_DEC",
                  payload: {
                    currentStatus: state.ratingSortDec,
                    sortOption: "ratingDec",
                  },
                })
              }
            />{" "}
            <SortOptions
              status={state.discountSortDec}
              cat="DEC"
              name="discount"
              statusSet={() =>
                dispatch({
                  type: "STATUS_CHANGE_DISCOUNT_DEC",
                  payload: {
                    currentStatus: state.discountSortDec,
                    sortOption: "discountDec",
                  },
                })
              }
            />
            <SortOptions
              status={false}
              name="Remove All Filters"
              cat="CLEAR"
              statusSet={() =>
                dispatch({
                  type: "RESET",
                })
              }
            />
          </Box>
          {done ? (
            data?.products
              .sort(comparetorFunctionForSorting)
              .filter((f) => f.category === category)
              .map((item) => <ProductCard key={item.id} item={item} />)
          ) : (
            <Box
              minHeight="100vh"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ReactLoading
                type="bars"
                color="grey"
                width="100px"
                height="100px"
              />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Category;
