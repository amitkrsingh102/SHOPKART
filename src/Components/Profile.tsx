import "./Styles/Profile.css";
import { useContext } from "react";
import { ProfileAndCartContext } from "../App";
import { Box, Button, Icon, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import avatar from "../assets/image-avatar.png";
import EditIcon from "@mui/icons-material/Edit";
import InventoryIcon from "@mui/icons-material/Inventory";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";

const ProfileItems = () => {
  const navigate = useNavigate();

  return (
    <div className="profile-item-container">
      <div className="profile-item" onClick={() => navigate("/wishlist")}>
        <Icon>
          <FavoriteIcon fontSize="small" />
        </Icon>
        <span>Your Wishlist</span>
      </div>
      <div className="profile-item" onClick={() => navigate("/order_history")}>
        <Icon>
          <InventoryIcon fontSize="small" />
        </Icon>
        <span>Your Orders</span>
      </div>
      <div className="profile-item">
        <Icon>
          <LocalOfferIcon fontSize="small" />
        </Icon>
        <span>Offers/Coupons</span>
      </div>
      <div className="profile-item">
        <Icon>
          <ContactSupportIcon fontSize="small" />
        </Icon>
        <span>Need Help ?</span>
      </div>
    </div>
  );
};

const Profile = () => {
  const { user } = useAuth();
  const localState = useContext(ProfileAndCartContext);
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        p: "10px",
        mr: "0.3rem",
        width: "370px",
        // minHeight: "calc(80% - 3.3rem)",
        height: "31rem",
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
      <IconButton
        sx={{ position: "absolute", right: "0", top: "0", margin: "2px" }}
        onClick={() => {
          localState.openProfile(false);
        }}
      >
        <Icon>
          <CloseIcon />
        </Icon>
      </IconButton>

      <Box
        sx={{
          mt: "2rem",
          p: "1rem",
          width: "100%",
          height: "150px",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          gap: "1.5rem",
          bgcolor: "primary.main",
          position: "relative",
          boxShadow: "1px 1px 10px black",
        }}
      >
        {/* image */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            objectFit: "cover",
            height: "6rem",
            width: "6rem",
          }}
        >
          {!user ? (
            <img src={avatar} alt="user-image" className="user-image" />
          ) : (
            <img
              src={user.photoURL as string}
              alt="user-image"
              className="user-image"
            />
          )}
        </Box>
        {/* name and bio */}
        <Box
          sx={{
            display: "flex",
            gap: "3px",
            flexDirection: "column",
          }}
        >
          {!user ? <h2>username</h2> : <h2>{user?.displayName}</h2>}
          {!user ? <h4>email</h4> : <h4>{user.email}</h4>}
          {!user ? (
            <div></div>
          ) : (
            <div>
              Member since {user?.metadata.creationTime?.substring(5, 16)}
            </div>
          )}
        </Box>
        <IconButton
          sx={{
            position: "absolute",
            right: "0",
            top: "0",
            margin: "2px",
          }}
        >
          <Icon>
            <EditIcon fontSize="small" />
          </Icon>
        </IconButton>
      </Box>

      <ProfileItems />
      {!user ? (
        <Button
          variant="contained"
          fullWidth
          sx={{ height: "3rem" }}
          onClick={() => {
            navigate("/login");
            localState.openProfile(false);
          }}
        >
          LOGIN / SIGN UP
        </Button>
      ) : (
        <Button
          variant="contained"
          fullWidth
          sx={{ height: "3rem" }}
          onClick={() => {
            signOut(auth);
            localStorage.clear();
            window.location.reload();
          }}
        >
          LOGOUT
        </Button>
      )}
    </Box>
  );
};

export default Profile;
