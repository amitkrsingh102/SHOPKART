//mui imports
import { Box } from "@mui/material";

//react imports
import Slider from "../Components/Slider";
import FeaturedProducts from "../Components/FeaturedProducts";

const Home = () => {
  return (
    <Box
      sx={{
        pt: "3.3rem",
        minHeight: "100vh",
        // height: "100%",
        bgcolor: "rgb(37,39,45)",
        color: "white",
        overflowX: "hidden",
      }}
    >
      <Slider />
      <FeaturedProducts type="trending" />
      <FeaturedProducts type="featured" />
      <Box sx={{ height: "10px" }}></Box>
      {/* DUMMY BOX */}
    </Box>
  );
};

export default Home;
