import "./Styles/Footer.css";
import { Box, Icon, IconButton } from "@mui/material";
import { shades } from "../Theme";
import HouseOutlinedIcon from "@mui/icons-material/HouseOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import FaxOutlinedIcon from "@mui/icons-material/FaxOutlined";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import Instagram from "@mui/icons-material/Instagram";
import Twitter from "@mui/icons-material/Twitter";
import Google from "@mui/icons-material/Google";
import LinkedIn from "@mui/icons-material/LinkedIn";
import GitHub from "@mui/icons-material/GitHub";
import Reddit from "@mui/icons-material/Reddit";

const Footer = () => {
  return (
    <Box
      sx={{
        height: "350px",
        width: "100%",
        bgcolor: shades.default.secondary[600],
        color: "icon.primary",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: "0 3rem 0 3rem",
          justifyContent: "space-between",
          width: "100%",
          height: "50px",
          bgcolor: "primary.main",
        }}
      >
        <h5 className="social-media-text"> Join us on our social networks</h5>
        <div className="social-media">
          <IconButton>
            <Icon>
              <FacebookOutlinedIcon />
            </Icon>
          </IconButton>

          <IconButton>
            <Icon>
              <Instagram />
            </Icon>
          </IconButton>

          <IconButton>
            <Icon>
              <Twitter />
            </Icon>
          </IconButton>

          <IconButton>
            <Icon>
              <Google />
            </Icon>
          </IconButton>

          <IconButton>
            <Icon>
              <LinkedIn />
            </Icon>
          </IconButton>

          <IconButton>
            <Icon>
              <GitHub />
            </Icon>
          </IconButton>

          <IconButton>
            <Icon>
              <Reddit />
            </Icon>
          </IconButton>
        </div>
      </Box>
      {/* main footer */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          height: "255px",
        }}
      >
        {/* About */}
        <Box
          sx={{
            pt: "20px",
            pl: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            color: "icon.primary",
          }}
        >
          <h4 className="about-header">SHOPKART</h4>
          <p className="about-p">
            Welcome to our e-commerce website, your go-to destination for a
            seamless and delightful online shopping experience. At SHOPKART, we
            believe that shopping should be more than just a transaction ,it
            should be an immersive and enjoyable journey. Established with a
            passion for customer satisfaction, we strive to provide you with a
            diverse range of high-quality products that cater to your unique
            needs and preferences. Our extensive collection is carefully curated
            to ensure that every item meets our stringent standards of
            excellence
          </p>
        </Box>
        {/* Help */}
        <Box
          sx={{
            pt: "20px",
            ml: "-5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            color: "icon.primary",
          }}
        >
          <h4 className="about-header">HELP</h4>
          <h5 className="help-links">Terms Of Use</h5>
          <h5 className="help-links">Privacy</h5>
          <h5 className="help-links">Cancellation & Returns</h5>
          <h5 className="help-links">Grievance Redressal</h5>
          <h5 className="help-links">FAQ</h5>
        </Box>
        {/* Contact */}
        <Box
          sx={{
            pt: "20px",
            pr: "5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.2rem",
            color: "icon.primary",
          }}
        >
          <h4 className="contact-header">CONTACT</h4>
          <div className="contact-icons">
            <IconButton>
              <Icon>
                <HouseOutlinedIcon
                  sx={{
                    color: "icon.primary",
                  }}
                />
              </Icon>
            </IconButton>
            <span className="contact-text">
              #12/34 house address , State-123456, India
            </span>
          </div>
          <div className="contact-icons">
            <IconButton>
              <Icon>
                <MailOutlinedIcon
                  sx={{
                    color: "icon.primary",
                  }}
                />
              </Icon>
            </IconButton>
            <span className="contact-text">shopkart1234@shopkart.com</span>
          </div>
          <div className="contact-icons">
            <IconButton>
              <Icon>
                <LocalPhoneOutlinedIcon
                  sx={{
                    color: "icon.primary",
                  }}
                />
              </Icon>
            </IconButton>
            <span className="contact-text">+91 9876543210</span>
          </div>
          <div className="contact-icons">
            <IconButton>
              <Icon>
                <FaxOutlinedIcon
                  sx={{
                    color: "icon.primary",
                  }}
                />
              </Icon>
            </IconButton>
            <span className="contact-text">+91 9876543210</span>
          </div>
        </Box>
      </Box>
      {/* copyright section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "45px",
          bgcolor: shades.default.secondary[700],
          color: "icon.primary",
        }}
      >
        © 2023 Copyright: shopkart.com
      </Box>
    </Box>
  );
};

export default Footer;
