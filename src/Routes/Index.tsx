import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "./Layout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Changepassword from "../Pages/Changepassword";
import Profile from "../Pages/Profile";
import Category from "../Pages/Category";
import Favourite from "../Pages/Favourite";
import ProductPage from "../Pages/ProductPage";
import SingleProduct from "../Pages/SingleProduct";
import Check_Order from "../Pages/Check_Order";
import Order from "../Pages/Order";
import AboutPage from "../Pages/AboutPage";
import Sale from "../Pages/Sale";
import ProductSales from "../Pages/ProductSales";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/logins" element={<Login />} />
        <Route path="/change" element={<Changepassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/favourite" element={<Favourite />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/sales" element={<Sale />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/product_sales" element={<ProductSales />} />
        <Route path="/product/:productName/:Id" element={<SingleProduct />} />
        <Route path="/category/:ID" element={<Category />} />
        <Route path="/register" element={<Register />} />
        <Route path="/check_order" element={<Check_Order />} />
        <Route path="/order" element={<Order />} />
      </Route>
    </>
  )
);
