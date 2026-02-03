import React from "react";
import "./App.css";
import ProductList from "./features/product-list/ProductList";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import Signup from "./features/auth/components/Signup";
import SignupPage from "./pages/SignupPage";
import { Route, Routes } from "react-router-dom";
import CartPage from "./pages/CartPage";

function App() {
  return (
    <div>
      {/* <Home/> */}
      {/* <LoginPage/> */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </div>
  );
}

export default App;
