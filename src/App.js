import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registration from "./pages/Registration";
import Category from "./pages/Category";
import Subcategory from "./pages/Subcategory";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Productshow from "./pages/Productshow";
import "bootstrap/dist/css/bootstrap.css";
import Addcart from "./pages/Addcart";
import Saveproduct from "./pages/Saveproduct";
import Otp from "./pages/Otp";
import Profile from "./pages/Profile";
import Order_tracker from "./pages/Order_tracker";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/category" element={<Category />} />
        <Route path="/subcategory" element={<Subcategory />} />
        <Route path="/productshow" element={<Productshow />} />
        <Route path="/addcart" element={<Addcart />} />
        <Route path="/saveproduct" element={<Saveproduct />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/order_tracker" element={<Order_tracker/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
