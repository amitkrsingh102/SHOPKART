import "./Styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { shades } from "../Theme";
import { useState } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { auth, db, storage } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import ReactLoading from "react-loading";

const Register = () => {
  const navigate = useNavigate();

  const [error, errorSet] = useState(false);
  const [loading, loadingSet] = useState(false);

  // submits the form and create a db for the registered user
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // getting form data
    const formElement = e.target as HTMLFormElement;
    const fullName = (formElement[0] as HTMLInputElement).value;
    const email = (formElement[1] as HTMLInputElement).value;
    const username = (formElement[2] as HTMLInputElement).value;
    const password = (formElement[3] as HTMLInputElement).value;
    const profileImage = (formElement[4] as HTMLInputElement)
      .files?.[0] as File;

    try {
      loadingSet(true);
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // storing the profile image
      const storageRef = ref(storage, username);
      const uploadTask = uploadBytesResumable(storageRef, profileImage);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        (err) => {
          errorSet(true);
          console.error(err);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            try {
              // updating the profile with the username and the uploaded photographs
              await updateProfile(res.user, {
                displayName: username,
                photoURL: downloadURL,
              });
              // creating user storage
              const userDocRef = doc(db, "users", res.user.uid);
              await setDoc(userDocRef, {
                uid: res.user.uid,
                username: username,
                fullname: fullName,
                email: email,
                photoURL: downloadURL,
                orderHistory: [],
              });

              signOut(auth);
              loadingSet(false);
              navigate("/login");
            } catch (error) {
              loadingSet(false);
              console.error("Error creating user storage:", error);
            }
          });
        }
      );
    } catch (err) {
      errorSet(true);
      console.error(err);
    }
  };

  return (
    <Box>
      {loading ? (
        <Box
          minHeight="100vh"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "background.default",
          }}
        >
          <ReactLoading type="bars" color="grey" width="100px" height="100px" />
        </Box>
      ) : (
        <Box
          sx={{
            pt: "3.3rem",
            bgcolor: "background.default",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="actor"></div>
          <div className="actor"></div>
          <div className="actor"></div>
          <div
            style={{
              position: "relative",
              display: "flex",
              boxShadow: "1px 2px 10px black",
            }}
          >
            <div
              className="welcome-section"
              style={{
                width: "550px",
                height: "600px",
                background: shades.default.secondary[600],
                borderRight: "2px solid grey",
              }}
            >
              <h1 className="welcome-heading">Welcome</h1>
              <p className="welcome-msg">
                Welcome to ShopKart! We're thrilled to have you here. Whether
                you're a returning customer or joining us for the first time,
                we're committed to providing you with a seamless and enjoyable
                shopping experience. At ShopKart, we strive to bring you a vast
                selection of high-quality products from trusted brands, all at
                competitive prices. From trendy fashion and accessories to
                cutting-edge electronics and home essentials, we've got you
                covered.
                <br />
                <br /> By logging in to your account, you gain access to a world
                of convenience. Enjoy personalized recommendations, save your
                favorite items for later, and easily track your orders every
                step of the way. Our secure login ensures that your information
                is protected, giving you peace of mind as you shop with us. Not
                a member yet? No problem! Signing up is quick and effortless.
                Join our ever-growing community of satisfied customers and
                unlock exclusive benefits, including special promotions and
                early access to sales. Thank you for choosing ShopKart.
                <br />
                Happy shopping!
              </p>
            </div>
            <div
              style={{
                padding: "50px 25px",
                width: "350px",
                height: "600px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "20px",
                background: shades.default.secondary[600],
              }}
            >
              <h1 style={{ textAlign: "center", color: "white" }}>SHOPKART</h1>
              <h3 style={{ paddingLeft: "30px", color: "white" }}>Register</h3>
              <form
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  // alignItems: "center",
                  justifyContent: "center",
                  gap: "20px",
                }}
              >
                <input
                  type="text"
                  name="fullname"
                  placeholder="fullname"
                  className="form-input"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="form-input"
                  required
                />
                <input
                  type="text"
                  name="username"
                  placeholder="username"
                  className="form-input"
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="form-input"
                  required
                />
                <input
                  type="file"
                  name="profileImage"
                  placeholder="profile picture"
                  id="fileInput"
                  style={{ display: "none" }}
                  required
                />
                <label
                  className="fileInput"
                  htmlFor="fileInput"
                  style={{
                    marginLeft: "15px",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <AddPhotoAlternateIcon fontSize="large" />
                  <span style={{ fontSize: "14px" }}>
                    Upload Profile picture
                  </span>
                </label>
                {error && (
                  <span className="error-text">Something went Wrong!</span>
                )}
                <button className="form-btn">Sign Up</button>
              </form>
              <span
                style={{
                  textAlign: "center",
                  color: "white",
                  fontSize: "14px",
                }}
              >
                Already a member ?{" "}
                <Link to={"/login"} style={{ color: "white" }}>
                  Login
                </Link>
              </span>
            </div>
          </div>
        </Box>
      )}
    </Box>
  );
};

export default Register;
