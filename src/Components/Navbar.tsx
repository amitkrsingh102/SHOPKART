// react imports
import { useContext } from "react";
import { ProfileAndCartContext, ThemeModeContex } from "../App";
import { useNavigate } from "react-router-dom";

// mui imports
import { Badge, Box, Icon, IconButton } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Search from "./Search";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import { useGlobalState } from "../context/globalStateContext";

const Navbar = () => {
  const toggleTheme = useContext(ThemeModeContex);
  const localState = useContext(ProfileAndCartContext);
  const { getOrderItems } = useGlobalState();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        p: "10px",
        alignItems: "center",
        justifyContent: "space-between",
        bgcolor: "primary.main",
        maxHeight: "3.3rem",
        width: "100%",
        position: "fixed",
        zIndex: "10",
      }}
    >
      {/* LOGO */}
      <Box
        onClick={() => {
          navigate("/");
        }}
        sx={{
          pl: "1rem",
          cursor: "pointer",
          fontSize: "25px",
          color: "white",
        }}
      >
        <i>SHOPKART</i>
      </Box>

      {/* Search */}
      <Search />
      {/* Category */}
      <IconButton
        onClick={() => {
          navigate("/categories/all");
        }}
        sx={{
          borderRadius: "5px",
          color: "icon.primary",
          ml: "40rem",
        }}
      >
        <p style={{ fontSize: "medium", paddingRight: "10px" }}>
          All Categories
        </p>
        <Icon>
          <CategoryOutlinedIcon
            sx={{
              color: "icon.primary",
            }}
          />
        </Icon>
      </IconButton>
      {/* Actions */}
      <Box
        sx={{
          display: "flex",
          gap: "1rem",
          pr: "1rem",
        }}
      >
        {/* ThemeSwitch */}
        <IconButton onClick={toggleTheme.changeMode} size="large">
          <Icon>
            {toggleTheme.currentMode === "light" ? (
              <LightModeOutlinedIcon
                sx={{
                  color: "icon.primary",
                }}
              />
            ) : (
              <DarkModeOutlinedIcon
                sx={{
                  color: "icon.primary",
                }}
              />
            )}
          </Icon>
        </IconButton>
        {/* Cart */}
        <IconButton
          size="large"
          onClick={() => {
            localState.openCart(!localState.cartStatus);
          }}
        >
          <Badge badgeContent={getOrderItems.length} color="success">
            <Icon>
              <LocalMallOutlinedIcon
                sx={{
                  color: "icon.primary",
                }}
              />
            </Icon>
          </Badge>
        </IconButton>
        {/* Profile */}
        <IconButton
          size="large"
          onClick={() => {
            localState.openProfile(!localState.profileStatus);
          }}
        >
          <Icon>
            <AccountCircleOutlinedIcon
              sx={{
                color: "icon.primary",
              }}
            />
          </Icon>
        </IconButton>
      </Box>
    </Box>
  );
};

export default Navbar;
