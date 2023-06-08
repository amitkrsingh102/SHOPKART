import "./Styles/Search.css";

//mui imports
import SearchIcon from "@mui/icons-material/Search";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { Box, Icon, IconButton } from "@mui/material";

//react imports
import { ChangeEvent, FormEvent, useState } from "react";
import { shades } from "../Theme";
import { useFetch } from "../Hooks/useFetch";
import { Product, ProductArray } from "../Type";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  // sets the current search input value
  const [searchInput, searchInputSet] = useState("");

  // sets the search results array for the dropdown menu
  const [searchArray, searchArraySet] = useState<Product[]>([]);

  // custom hook to fetch the products data
  const { data, done } = useFetch<ProductArray | null>(
    "https://dummyjson.com/products?limit=100"
  );

  //action after pressing the enter key on search
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    searchArray?.length !== 0 && navigate(`/product/${searchArray?.[0]?.id}`);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    searchInputSet((_prev) => "");
  };

  // setting the search results
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    searchInputSet((_prev) => e.target.value);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    searchArraySet((_prev) =>
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      data!.products.filter((item) =>
        item.title
          .toLocaleLowerCase()
          .split(" ")
          .join("")
          .includes(e.target.value)
      )
    );
  };

  return (
    <Box
      sx={{
        width: "30vw",
        color: "icon.primary",
        border: `1px solid ${shades.default.blue[300]}`,
        borderRadius: "5px",
        mr: "20rem",
        position: "fixed",
        right: "20rem",
        top: "5px",
      }}
    >
      {/* the search bar  */}
      <form
        className="search-form"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <IconButton
          onClick={() => {
            navigate(`/product/${searchArray?.[0]?.id}`);
          }}
        >
          <Icon>
            <SearchIcon
              sx={{
                color: "icon.primary",
              }}
            />
          </Icon>
        </IconButton>
        <input
          name="search-input"
          type="text"
          placeholder="Search items..."
          className="search-input"
          color="icon.primary"
          value={searchInput}
          onChange={(e) => {
            handleChange(e);
          }}
        />
        {searchInput !== "" ? (
          <IconButton
            sx={{ background: "rgba(255, 255, 255, 0.1)", borderRadius: "0" }}
            onClick={() => {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              searchInputSet((_prev) => "");
            }}
          >
            <Icon>
              <ClearOutlinedIcon
                sx={{
                  color: "icon.primary",
                }}
              />
            </Icon>
          </IconButton>
        ) : (
          <div></div>
        )}
      </form>

      {/* search results */}
      <Box
        sx={{
          maxHeight: "20rem",
          overflowY: "scroll",
          bgcolor: "primary.main",
        }}
      >
        {searchInput !== "" &&
          done &&
          searchArray?.map((item) => (
            <div
              className="search-item"
              key={item.id}
              onClick={() => {
                navigate(`/product/${item.id}`);
              }}
            >
              {item.title}
            </div>
          ))}
      </Box>
    </Box>
  );
};

export default Search;
