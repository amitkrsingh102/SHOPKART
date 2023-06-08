import "./App.css";
import { getDesignTokens } from "./Theme";
import { createContext, useMemo, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { PaletteMode } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ErrorPage from "./Pages/404Page";
import Category from "./Pages/Category";
import ProductItem from "./Pages/Product";
import Cart from "./Components/Cart";
import Profile from "./Components/Profile";
import Wishlist from "./Pages/Wishlist";
import Quantity from "./Pages/Quantity";
import OrderHistory from "./Pages/OrderHistory";
import { GlobalStateProvider } from "./context/globalStateContext";

//Theme context
export const ThemeModeContex = createContext({
  changeMode: () => {
    return;
  },
  currentMode: "",
});

//Local state context
export const ProfileAndCartContext = createContext({
  openCart: (args: boolean) => {
    args;
    return;
  },
  cartStatus: false,

  openProfile: (args: boolean) => {
    args;
    return;
  },
  profileStatus: false,
});

const App = () => {
  // mui variables
  const [mode, modeSet] = useState<PaletteMode>("light");

  // localState
  const [openCart, openCartSet] = useState(false);
  const [openProfile, openProfileSet] = useState(false);

  const modeselect = useMemo(
    () => ({
      changeMode: () => {
        modeSet((prevMode: PaletteMode) =>
          prevMode === "light" ? "dark" : "light"
        );
      },
      currentMode: mode,
    }),
    [mode]
  );

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  const localState = useMemo(
    () => ({
      openCart: (args: boolean) => {
        openCartSet(args);
      },
      cartStatus: openCart,

      openProfile: (args: boolean) => {
        openProfileSet(args);
      },
      profileStatus: openProfile,
    }),
    [openCart, openProfile]
  );

  return (
    <ThemeModeContex.Provider value={modeselect}>
      <ThemeProvider theme={theme}>
        <ProfileAndCartContext.Provider value={localState}>
          <GlobalStateProvider>
            <div className="app">
              <Navbar />
              {localState.cartStatus && <Cart />}
              {localState.profileStatus && <Profile />}
              <Routes>
                <Route path="*" element={<ErrorPage />} />
                <Route path="/" element={<Home />} />
                <Route path="/categories/:category" element={<Category />} />
                <Route path="/product/:productId" element={<ProductItem />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/quantity" element={<Quantity />} />
                <Route path="/order_history" element={<OrderHistory />} />
              </Routes>
              <Footer />
            </div>
          </GlobalStateProvider>
        </ProfileAndCartContext.Provider>
      </ThemeProvider>
    </ThemeModeContex.Provider>
  );
};
export default App;
