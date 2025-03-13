import { Route, Routes } from "react-router-dom";
import WrappedAbout from "./components/About";
import WrappedUser from "./components/User";
import WrappedCart from "./components/Cart";
import "react-toastify/dist/ReactToastify.css";
import { AnimatePresence } from "motion/react";
import WrappedTrade from "./components/TradePage";
import WrappedShop from "./components/Shop";
import WrappedDetails from "./components/ItemDetails";
import WrappedSell from "./components/SellItems";

export default function App() {
  return (
    <>
      <AnimatePresence mode="wait">
        <Routes key={location.pathname} location={location}>
          <Route path="/trade" element={<WrappedTrade />} />
          <Route path="/shop" element={<WrappedShop />} />
          <Route path="/about" element={<WrappedAbout />} />
          <Route path="/cart" element={<WrappedCart />} />
          <Route path="/sell" element={<WrappedSell />} />
          <Route path="/itemdetail/:id" element={<WrappedDetails />} />
          <Route path="/user/:userid" element={<WrappedUser />} />
          <Route path="/" element={<WrappedShop />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}
