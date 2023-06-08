//style imports
import "./Styles/404Page.css";

//mui imports
import { Box, Button } from "@mui/material";

//react imports
import { useNavigate } from "react-router-dom";

//image imports
import errImg from "../assets/404edit.jpg";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        height: "346px",
        pt: "4rem",
        display: "flex",
        gap: "3rem",
        alignItems: "center",
        bgcolor: "background.default",
      }}
    >
      <img src={errImg} alt="404" className="err-img" />
      <span className="error-code ">404</span>
      <span className="error-message">Page not Found...</span>
      <Button
        variant="contained"
        onClick={() => {
          navigate("/");
        }}
      >
        Back to Home
      </Button>
    </Box>
  );
};

export default ErrorPage;
