import React, { useEffect } from "react";
import "./App.css";
import ProductList from "./features/product-list/components/ProductList";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import Signup from "./features/auth/components/Signup";
import SignupPage from "./pages/SignupPage";
import { Route, Routes } from "react-router-dom";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import Protected from "./features/auth/components/Protected";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "./features/auth/authSlice";
import { fetchItemByUserIdAsync } from "./features/cart/cartSlice";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser)

  useEffect(()=>{
      dispatch(fetchItemByUserIdAsync(user?.id))
  },[dispatch, user])

  return (
    <div>
      {/* <Home/> */}
      {/* <LoginPage/> */}

      <Routes>
       <Route path="/" element={<Protected><Home /></Protected> } />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cart" element={<Protected><CartPage /></Protected>} />
        <Route path="/checkout" element={<Protected><CheckoutPage /></Protected>} />
        <Route path="/product-detail/:id" element={<Protected><ProductDetailPage/></Protected>}/>


      </Routes>
    </div>
  );
}

export default App;
