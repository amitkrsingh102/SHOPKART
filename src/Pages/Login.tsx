import "./Styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { shades } from "../Theme";
import { useState } from "react";
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import ReactLoading from "react-loading";

const Login = () => {
  const navigate = useNavigate();
  const [, errorSet] = useState(false);
  const [loading, loadingSet] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = e.target as HTMLFormElement;
    const email = (formElement[0] as HTMLInputElement).value;
    const password = (formElement[1] as HTMLInputElement).value;

    try {
      loadingSet(true);
      await signInWithEmailAndPassword(auth, email, password);
      loadingSet(false);
      navigate("/");
    } catch (e) {
      loadingSet(false);
      errorSet(true);
      console.error(e);
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
                Welcome to Logo! We're thrilled to have you here. Whether you're
                a returning customer or joining us for the first time, we're
                committed to providing you with a seamless and enjoyable
                shopping experience. At Logo, we strive to bring you a vast
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
                early access to sales. Thank you for choosing Logo.
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
              <h1 style={{ textAlign: "center", color: "white" }}>LOGO</h1>
              <h3 style={{ paddingLeft: "30px", color: "white" }}>Login</h3>
              <form
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: "20px",
                }}
              >
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="form-input"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="form-input"
                />
                <button className="form-btn">Sign In</button>
              </form>
              <span
                style={{
                  textAlign: "center",
                  color: "white",
                  fontSize: "14px",
                }}
              >
                Not a member yet ?{" "}
                <Link to={"/register"} style={{ color: "white" }}>
                  Register
                </Link>
              </span>
            </div>
          </div>
        </Box>
      )}
    </Box>
  );
};

export default Login;
